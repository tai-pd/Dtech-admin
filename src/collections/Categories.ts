import type { CollectionConfig } from 'payload'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Danh mục', plural: 'Danh mục' },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'order', type: 'number', admin: { position: 'sidebar' } },
  ],
}

export default Categories
