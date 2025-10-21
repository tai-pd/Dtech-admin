import { CollectionConfig } from 'payload'

const Brands: CollectionConfig = {
  slug: 'brands',
  labels: { singular: 'Hãng', plural: 'Hãng' },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'description', type: 'textarea' },
  ],
}

export default Brands
