import { CollectionConfig } from 'payload'
import slugify from 'slugify'

const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Bài viết', plural: 'Bài viết' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'author', 'published'] },
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
    { name: 'excerpt', type: 'textarea', label: 'Tóm tắt' },
    { name: 'content', type: 'richText', label: 'Nội dung' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', label: 'Ảnh đại diện' },
    { name: 'author', type: 'relationship', relationTo: 'users', label: 'Tác giả' },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Danh mục',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'value', type: 'text', label: 'Tag' }],
      label: 'Thẻ',
    },
    { name: 'published', type: 'checkbox', label: 'Đã xuất bản', defaultValue: true },
    { name: 'publishDate', type: 'date', label: 'Ngày xuất bản' },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}

export default Posts
