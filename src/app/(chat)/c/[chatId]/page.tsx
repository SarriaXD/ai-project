'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { notFound, usePathname } from 'next/navigation'
import { Message } from 'ai'
import { useAuth } from '@/hooks/use-auth.ts'
import { chatApiClient } from '@/lib/client/data/chat-api-client.ts'
import useChatPage from '@/features/chatbot/hooks/use-chat-page.ts'
import DragZoneOverlay from '@/features/chatbot/components/drag-zone-overlay.tsx'
import MessageList from '@/features/chatbot/components/message-list.tsx'
import ChatPanel from '@/features/chatbot/components/chat-panel/chat-panel.tsx'

export default function Page() {
    const chatId = usePathname().split('/').filter(Boolean).pop() || ''
    const { user, loading: userLoading } = useAuth()
    const [initialMessages, setInitialMessages] = useState<Message[]>([])
    // load init data
    useEffect(() => {
        if (userLoading) {
            return
        }
        if (!user) {
            notFound()
        }
        if (user && chatId) {
            const fetchData = async () => {
                const data = await chatApiClient.fetchHistory(chatId)
                setInitialMessages(data?.messages ?? [])
            }
            fetchData().catch(() => {
                toast.error('unable to fetch history data')
            })
        }
    }, [setInitialMessages, chatId, user, userLoading])

    const {
        messages,
        input,
        isLoading,
        setInput,
        stop,
        getRootProps,
        getInputProps,
        isDragActive,
        open,
        filesState,
        onFilesLoad,
        onFileRemove,
        onSubmit,
        scrollRef,
    } = useChatPage({
        chatId,
        initialMessages,
    })

    return (
        <>
            <main
                {...getRootProps({
                    className: 'flex-1 overflow-y-auto',
                })}
            >
                <input {...getInputProps()} />
                <DragZoneOverlay isDragActive={isDragActive} />
                {messages && messages.length > 0 && (
                    <div className="px-4">
                        <MessageList
                            messages={messages}
                            isLoading={isLoading}
                        />
                        <div ref={scrollRef} className="h-12 w-full" />
                    </div>
                )}
            </main>
            <ChatPanel
                value={input}
                isLoading={isLoading}
                filesState={filesState}
                onFilesLoad={onFilesLoad}
                onFileRemove={onFileRemove}
                open={open}
                onSubmit={onSubmit}
                onMessageChange={setInput}
                onStop={stop}
            />
        </>
    )
}
