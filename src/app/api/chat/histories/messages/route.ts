// import { generateText, Message } from 'ai'
// import { openai } from '@ai-sdk/openai'

// Save a message to a chat conversation
import { validateAndDecodeToken } from '@/lib/service/utils/validate-token-utils.ts'
import { addMessage } from '@/lib/service/db/db.ts'

export async function POST(request: Request) {
    try {
        const { chatId, message } = await request.json()
        const token = await validateAndDecodeToken(request)
        if (!chatId || !message) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        }
        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const userId = token.uid
        await addMessage(userId, chatId, message)

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('Error storing conversation:', error)
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }
}

// Get a chat summary
// const getSummarizedTitle = async (message: Message, title?: string) => {
//     if (title) return
//     const { text } = await generateText({
//         model: openai('gpt-4o-mini'),
//         prompt: `Using one phrase to summarize a topic, Don't have any punctuation. here is the content: ${message.content}`,
//     })
//     return text
// }
