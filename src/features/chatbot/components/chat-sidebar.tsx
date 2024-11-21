import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/use-auth.ts'
import { chatApiClient } from '@/lib/client/data/chat-api-client.ts'
import ChatHistories from '@/features/chatbot/components/chat-histories.tsx'

interface ChatSidebarProps {
    open: boolean
    onClose: () => void
}

const useChatHistories = () => {
    const path = usePathname()
    const match = path.match(/c\/(.+)$/)
    const currentChatId = match ? match[1] : undefined
    const [histories, setHistories] = React.useState<
        {
            chatId: string
            title?: string
            updatedAt: Date
        }[]
    >([])
    const { user } = useAuth()
    useEffect(() => {
        let unsubscribe = () => {}
        if (user) {
            unsubscribe = chatApiClient.listenHistories(
                user.uid,
                20,
                (histories) => {
                    setHistories(histories)
                },
                () => {
                    toast.error('Failed to fetch chat histories')
                }
            )
        }
        return unsubscribe
    }, [user])
    return { histories, currentChatId }
}

const ChatSidebar = ({ open, onClose }: ChatSidebarProps) => {
    const { histories, currentChatId } = useChatHistories()
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{
                        backdropFilter: 'blur(0px)',
                        WebkitBackdropFilter: 'blur(0px)',
                    }}
                    animate={{
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                    }}
                    exit={{
                        backdropFilter: 'blur(0px)',
                        WebkitBackdropFilter: 'blur(0px)',
                    }}
                    onClick={onClose}
                    className="fixed z-10 size-full bg-transparent md:static md:w-auto md:backdrop-blur-none"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 'auto' }}
                        exit={{ width: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.6 }}
                        className="inline-block h-full"
                    >
                        <motion.div
                            initial={{
                                x: '-256px',
                            }}
                            animate={{
                                x: 0,
                            }}
                            exit={{
                                x: '-256px',
                            }}
                            transition={{
                                ease: [0.76, 0, 0.24, 1],
                                duration: 0.6,
                            }}
                            className={'inline-block h-full'}
                        >
                            <ChatHistories
                                histories={histories}
                                currentChatId={currentChatId}
                                onClose={onClose}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ChatSidebar
