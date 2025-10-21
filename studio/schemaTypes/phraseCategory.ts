// studio/schemaTypes/phraseCategory.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'phraseCategory',
  title: 'Phrase Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'icon',
      title: 'Icon Emoji',
      type: 'string',
      description: 'Emoji to display for this category'
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'icon',
      sortOrder: 'sortOrder'
    },
    prepare(selection) {
      const {title, subtitle, sortOrder} = selection
      return {
        title: `${subtitle} ${title}`,
        subtitle: `Order: ${sortOrder}`
      }
    }
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}]
    }
  ]
})