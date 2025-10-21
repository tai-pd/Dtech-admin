// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import sharp from 'sharp' // sharp-import
import { fileURLToPath } from 'url'

import { defaultLexical } from '@/fields/defaultLexical'

import Brands from './collections/Brands'
import Categories from './collections/Categories'
import Media from './collections/Media'
import Pages from './collections/Pages'
import Posts from './collections/Posts'
import Products from './collections/Products'
import Users from './collections/User'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: process.env.NODE_ENV === 'production' ? undefined : { rejectUnauthorized: false },
    },
  }),
  collections: [Users, Media, Categories, Brands, Products, Pages, Posts],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  onInit: async (payloadInstance) => {
    try {
      // Chỉ tạo admin nếu DB chưa có user nào
      const usersResult = await payloadInstance.find({
        collection: 'users',
        limit: 1,
      })

      if (usersResult.totalDocs === 0) {
        // Chỉ tự động tạo admin khi biến môi trường bật (an toàn cho prod)
        const autoCreate = process.env.AUTO_CREATE_ADMIN === 'true'
        if (!autoCreate) {
          payloadInstance.logger.info(
            'No users found, but AUTO_CREATE_ADMIN is not enabled — skipping auto create.',
          )
          return
        }

        const email = process.env.ADMIN_EMAIL || 'admin@dtech.local'
        const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!'
        const name = process.env.ADMIN_NAME || 'Admin DTech'

        payloadInstance.logger.info(`No users found — creating default admin (${email})`)

        await payloadInstance.create({
          collection: 'users',
          data: {
            email,
            password,
            name,
            roles: ['admin'],
          },
        })

        payloadInstance.logger.info('Default admin user created.')
      }
    } catch (err) {
      // Log lỗi nhưng không ngăn Payload khởi động
      // eslint-disable-next-line no-console
      payloadInstance.logger.error('Error in onInit admin creation:', err)
    }
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
