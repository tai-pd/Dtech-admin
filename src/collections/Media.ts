import { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../../media',
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 480 },
      { name: 'large', width: 1200, height: 1200 },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt text',
    },
  ],
}

export default Media
