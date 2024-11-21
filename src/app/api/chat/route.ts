import { convertToCoreMessages, streamText, tool } from 'ai'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import { retrieveSearch, tavilySearch } from '@/lib/service/utils/search-utils.ts'
import getWeatherData from '@/lib/service/utils/weather-utils.ts'
import { getWhoAmI } from '@/lib/service/utils/who-am-I-utils.ts'

export const maxDuration = 30
export const dynamic = 'force-dynamic'

const systemPrompt = (currentDate: string) => {
    return `As a professional, your possess the ability to search for any information on the web only when user really wants to know the latest information. 
    Before you query, you must translate the query to english. 
    For each user query, utilize the search results to their fullest potential to provide additional information and assistance in your response.
    If there are any images relevant to your answer, be sure to include them as well.
    Aim to directly address the user's question, augmenting your response with insights gleaned from the search results.
    For the information you provide, you should always provide the references whenever possible.
    Please match the language of the response to the user's language. Current UTC time (ISO 8601): ${currentDate}
    Your identity is qi or (王琦), a full stack engineer, you can provide users with your resume when user really ask for your resume.
    `
}

const model = openai('gpt-4o-mini')

// talk to the AI
export async function POST(request: Request) {
    const { messages } = await request.json()
    const result = await streamText({
        model: model,
        system: systemPrompt(new Date().toISOString()),
        messages: await convertToCoreMessages(messages),
        maxToolRoundtrips: 5,
        tools: {
            search: tool({
                description: 'Search the web for information',
                parameters: z.object({
                    query: z
                        .string()
                        .describe(
                            'The query to search for, the query must be english, string type'
                        ),
                }),
                execute: async ({ query }) => {
                    return await tavilySearch(query)
                },
            }),
            retrieve: tool({
                description: 'Retrieve content from the web',
                parameters: z.object({
                    url: z
                        .string()
                        .describe('The url to retrieve, string type'),
                }),
                execute: async ({ url }) => {
                    return await retrieveSearch(url)
                },
            }),
            getWeatherInformation: {
                description: 'show the weather in a given city to the user',
                parameters: z.object({
                    city: z
                        .string()
                        .describe(
                            'The city name only accepts english location name, string type'
                        ),
                    language: z
                        .string()
                        .describe(
                            "The language of the user's query, string type"
                        ),
                }),
                execute: async ({ city, language }) => {
                    if (language !== 'en' && language !== 'zh') {
                        language = 'en'
                    }
                    return await getWeatherData(city, language)
                },
            },
            whoAmI: {
                description: 'Show the resume when user ask for it',
                parameters: z.object({}),
                execute: async () => {
                    return await getWhoAmI()
                },
            },
        },
    })
    return result.toDataStreamResponse()
}
