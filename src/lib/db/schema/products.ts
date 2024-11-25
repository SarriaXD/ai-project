import { pgTable, text, doublePrecision, bigint, boolean } from 'drizzle-orm/pg-core'

export const products = pgTable('products', {
    asin: text('asin').primaryKey(),
    title: text('title'),
    imgUrl: text('imgUrl'),
    productURL: text('productURL'),
    stars: doublePrecision('stars'),
    reviews: bigint('reviews', { mode: 'number' }),
    price: doublePrecision('price'),
    listPrice: doublePrecision('listPrice'),
    categoryName: text('categoryName'),
    isBestSeller: boolean('isBestSeller'),
    boughtInLastMonth: bigint('boughtInLastMonth', { mode: 'number' }),
})
