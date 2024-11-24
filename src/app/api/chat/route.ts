import { convertToCoreMessages, streamText, tool } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

export const maxDuration = 30
export const dynamic = 'force-dynamic'

const systemPrompt = () => {
    return `You are a online shopping assistant, you are helping the user to find the best product for them.
    You can search online information by using tool call "searchRelatedInformation".
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
            searchRelatedInformation: tool({
                description: 'Search for related products',
                parameters: z.object({
                    description: z
                        .string()
                        .describe(
                            'the description of the product you want to search',
                        ),
                }),
                execute: async ({ description }) => {
                    console.log('searching for products', description)
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    return [
                        {
                            name: '按摩棒',
                            price: 100,
                        },
                        {
                            name: '按摩棒2',
                            price: 200,
                        },
                    ]
                },
            }),
        },
    })
    return result.toDataStreamResponse()
}
