'use client'

import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useMemo } from 'react'
import useChatPage from '@/features/chatbot/hooks/use-chat-page.ts'
import DragZoneOverlay from '@/features/chatbot/components/drag-zone-overlay.tsx'
import MessageList from '@/features/chatbot/components/message-list.tsx'
import EmptyMessagePlaceholder from '@/features/chatbot/components/empty-message-placeholder.tsx'
import ChatPanel from '@/features/chatbot/components/chat-panel/chat-panel.tsx'

export default function Page() {
    const router = useRouter()
    const chatId = useMemo(() => uuidv4(), [])

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
        onNavigateToChatIdPage: () => {
            router.push(`/c/${chatId}`)
        },
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
                {messages && messages.length > 0 ? (
                    <div className="px-4">
                        <MessageList
                            messages={messages}
                            isLoading={isLoading}
                        />
                        <div ref={scrollRef} className="h-12 w-full" />
                    </div>
                ) : (
                    <EmptyMessagePlaceholder />
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
