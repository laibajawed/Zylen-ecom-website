import { TrolleyIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const productType = {
    name: 'product',
    title: 'Product',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Product Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'images',
            title: 'Product Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name:'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name:'intro',
            title:'Product Intro',
            type:'string',
        }),
        defineField({
            name:'price',
            title:'Product Price',
            type:'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name:'discount',
            title:'Discount Percentage',
            type:'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name:'category',
            title:'Category',
            type:'array',
             of: [{ type: 'reference', to: { type: 'category' } }],
        }),
        defineField({
            name:'stock',
            title:'Stock',
            type:'number',
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Hot', value: 'hot' },
                    { title: 'Sale', value: 'Sale' },
                ],
        
            },
        }),
        defineField({
            name:'variant',
            title:'Product Variant',
            type:'string',
            options: {
                list: [
                    {title: 'T-shirt', value: 't-shirt'},
                    {title: 'Jacket', value: 'jacket'},
                    {title: 'Pants', value: 'pants'},
                    {title: 'Hoodie', value: 'hoodie'},
                    {title: 'Short', value: 'short'},
                    {title: 'Others', value: 'others'},
                ]
            }
        })

    ],
    preview: {
        select: {
            title: 'title',
            media: 'images',
            subtitle: 'price',
        },
        
          
    prepare(selection) {
        const { title, media, subtitle } = selection;
        const image =media && media[0]
        return {
            title:title,
            media:image,
            subtitle:`$${subtitle}`,
        }
    }
    },
}