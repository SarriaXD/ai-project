import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import { db } from '../db'
import { cosineDistance, desc, eq, gt, sql } from 'drizzle-orm'
import { embeddings } from '../db/schema/embeddings'
import { products } from '@/lib/db/schema/products.ts'

const embeddingModel = openai.embedding('text-embedding-3-small')

const generateEmbedding = async (value: string): Promise<number[]> => {
    const input = value.replace('\\n', ' ')
    const { embedding } = await embed({
        model: embeddingModel,
        value: input,
    })
    return embedding
}


export const findRelevantProducts = async (userQuery: string) => {
    const userQueryEmbedded = await generateEmbedding(userQuery)
    const similarity = sql<number>`1 - (
    ${cosineDistance(
            embeddings.embedding,
            userQueryEmbedded,
    )}
    )`
    const result = await db
        .select({
            product: products,  // 选择整个 product
            similarity,
        })
        .from(embeddings)
        .innerJoin(products, eq(embeddings.productAsin, products.asin))  // 通过 asin 连接
        .where(gt(similarity, 0.1))
        .orderBy(desc(similarity))
        .limit(20)
    console.log("userQuery:", userQuery, "result:", result)
    return result
}

