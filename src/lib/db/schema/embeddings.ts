import { pgTable, serial, varchar, vector, index } from 'drizzle-orm/pg-core'
import { products } from '@/lib/db/schema/products.ts'

export const embeddings = pgTable(
    'embeddings',
    {
        id: serial('id').primaryKey(),
        productAsin: varchar('product_asin', { length: 191 }).references(
            () => products.asin,
            { onDelete: 'cascade' },
        ),
        embedding: vector('embedding', { dimensions: 1536 }).notNull(),
    },
    table => ({
        embeddingIndex: index('embeddingIndex').using(
            'hnsw',
            table.embedding.op('vector_cosine_ops'),
        ),
    }),
)
