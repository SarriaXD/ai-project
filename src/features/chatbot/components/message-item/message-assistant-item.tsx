import { Dog } from 'public/icons'
import React from 'react'
import { MessageProps } from '@/features/chatbot/components/message-item/message-item.tsx'
import MarkdownBlock from '@/features/chatbot/components/markdown-block/markdown-block.tsx'

const AssistantItem = ({ message }: MessageProps) => {
    return (
        <div className="flex gap-4">
            <div className="size-8 self-start rounded-full border border-gray-800 p-2 text-gray-100">
                <Dog className="size-full" />
            </div>
            <div className="min-w-0 flex-1">
                <MarkdownBlock markdown={message.content} />
            </div>
        </div>
    )
}

export default AssistantItem
