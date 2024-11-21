'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth.ts'
import { useMediaQuery } from '@/hooks/use-media-query.ts'
import ChatSidebar from '@/features/chatbot/components/chat-sidebar.tsx'
import ChatHeader from '@/features/chatbot/components/chat-header.tsx'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth()
    const [open, setOpen] = useState(false)
    const isMobile = useMediaQuery('(max-width: 735px)')
    useEffect(() => {
        if (!isMobile) {
            setOpen(!!user)
        }
    }, [user, isMobile])

    return (
        <div className="flex size-full">
            {user && <ChatSidebar open={open} onClose={() => setOpen(false)} />}
            <div className="flex h-full flex-1 flex-col overflow-hidden">
                <ChatHeader
                    loading={loading}
                    isSidebarOpen={open}
                    onClickSidebar={setOpen}
                />
                {children}
            </div>
        </div>
    )
}

export default Layout
