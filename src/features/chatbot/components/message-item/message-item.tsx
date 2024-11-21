import { Message } from 'ai'
import React from 'react'
import UserItem from '@/features/chatbot/components/message-item/message-user-item.tsx'
import ToolcallItem from '@/features/chatbot/components/message-item/message-toolcall-item.tsx'
import AssistantItem from '@/features/chatbot/components/message-item/message-assistant-item.tsx'

export interface MessageProps {
    message: Message
    isLoading: boolean
    isLast: boolean
}

const MessageItem = (props: MessageProps) => {
    const { message } = props
    const { role } = message
    if (role === 'user') {
        return <UserItem {...props} />
    } else if (role === 'assistant') {
        if (message.toolInvocations && message.toolInvocations.length > 0) {
            return (
                <div>
                    {message.toolInvocations.map((toolInvocation) => (
                        <ToolcallItem
                            key={toolInvocation.toolCallId}
                            toolInvocation={toolInvocation}
                        />
                    ))}
                </div>
            )
        } else {
            return <AssistantItem {...props} />
        }
    }
}

export default MessageItem
