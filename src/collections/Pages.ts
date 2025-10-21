import { CollectionConfig } from 'payload'
import slugify from 'slugify'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Trang', plural: 'Trang' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug'] },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.title && !data.slug) {
          data.slug = slugify(String(data.title), { lower: true, strict: true })
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Tiêu đề' },
    { name: 'slug', type: 'text', label: 'Slug', admin: { position: 'sidebar' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Ảnh header' },
    { name: 'content', type: 'richText', label: 'Nội dung' },
    {
      name: 'sections',
      label: 'Sections (blocks)',
      type: 'blocks',
      blocks: [
        {
          slug: 'text',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'body', type: 'richText' },
          ],
        },
        {
          slug: 'cta',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'link', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
    { name: 'published', type: 'checkbox', label: 'Đã xuất bản', defaultValue: true },
    { name: 'order', type: 'number', label: 'Thứ tự', admin: { position: 'sidebar' } },
  ],
}

export default Pages
