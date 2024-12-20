import { convertToCoreMessages, streamText, tool } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { findRelevantProducts } from '@/lib/ai/find-relevantProducts.ts'

export const maxDuration = 30
export const dynamic = 'force-dynamic'

const systemPrompt = () => {
    return `You are a online shopping assistant, you are helping the user to find the best product for them.
    You can search products by using tool call "findRelevantProducts" and you should translate user's question into english as query param.
    You must select the most relevant products in tool call results based on user's question.
    If user ask you a question with image, you need to summarize the image and search for related products.
    You should only answer product related questions.
    `
}

const model = openai('gpt-4o-mini')

// talk to the AI
export async function POST(request: Request) {
    const { messages } = await request.json()
    const result = await streamText({
        model: model,
        system: systemPrompt(),
        messages: convertToCoreMessages(messages),
        maxSteps: 5,
        tools: {
            findRelevantProducts: tool({
                description: 'Search for related products',
                parameters: z.object({
                    description: z
                        .string()
                        .describe(
                            'the description of the product you want to search',
                        ),
                }),
                execute: async (query) => {
                    return findRelevantProducts(query.description)
                },
            }),
        },
    })
    return result.toDataStreamResponse()
}
