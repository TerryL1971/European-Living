import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'phrase',
  title: 'Phrase',
  type: 'document',
  fields: [
    defineField({
      name: 'english',
      title: 'English',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'phraseCategory'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'translations',
      title: 'Translations',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'language', type: 'string', title: 'Language Code', options: {
            list: [
              {title: 'German', value: 'de'},
              {title: 'French', value: 'fr'},
              {title: 'Italian', value: 'it'},
              {title: 'Spanish', value: 'es'},
              {title: 'Dutch', value: 'nl'},
              {title: 'Czech', value: 'cs'}
            ]
          }},
          {name: 'translation', type: 'string', title: 'Translation'},
          {name: 'pronunciation', type: 'string', title: 'Pronunciation'}
        ],
        preview: {
          select: {
            language: 'language',
            translation: 'translation'
          },
          prepare({language, translation}) {
            return {
              title: translation,
              subtitle: language?.toUpperCase()
            }
          }
        }
      }]
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string'
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number'
    })
  ],
  preview: {
    select: {
      title: 'english',
      category: 'category.name',
      icon: 'icon'
    },
    prepare({title, category, icon}) {
      return {
        title: `${icon || ''} ${title}`,
        subtitle: category
      }
    }
  }
})