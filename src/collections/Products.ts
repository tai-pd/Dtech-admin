import { CollectionConfig } from 'payload'

// TODO: Ensure 'brands' collection is defined in your Payload config
const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Sản phẩm', plural: 'Sản phẩm' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'brand', 'category'] },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Tên sản phẩm',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      admin: { position: 'sidebar' },
    },
    {
      name: 'sku',
      type: 'text',
      label: 'Mã sản phẩm',
      admin: { position: 'sidebar' },
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      label: 'Thương hiệu',
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Danh mục',
      admin: { position: 'sidebar' },
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Hình ảnh sản phẩm',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Mô tả',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Mô tả ngắn',
    },
    {
      name: 'specifications',
      type: 'array',
      label: 'Thông số kỹ thuật',
      fields: [
        { name: 'key', type: 'text', label: 'Tên' },
        { name: 'value', type: 'text', label: 'Giá trị' },
      ],
    },
    {
      name: 'attachments',
      type: 'array',
      label: 'Tài liệu đính kèm',
      fields: [
        { name: 'file', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text' },
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
    {
      name: 'published',
      type: 'checkbox',
      label: 'Đã xuất bản',
      defaultValue: true,
    },
  ],
}

export default Products
