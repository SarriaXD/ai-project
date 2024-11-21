import { FormEvent } from 'react'
import ChatTextfield, { FilesState } from './chat-textfield.tsx'

interface ChatPanelProps {
    value: string
    isLoading: boolean
    filesState: FilesState
    onFilesLoad: (files: File[]) => void
    onFileRemove: (name: string, contentType: string) => void
    open: () => void
    onMessageChange: (message: string) => void
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    onStop: () => void
}

const ChatPanel = ({
    value,
    isLoading,
    onMessageChange,
    onSubmit,
    open,
    filesState,
    onFilesLoad,
    onFileRemove,
    onStop,
}: ChatPanelProps) => {
    return (
        <div className="w-full bg-gray-900 px-4 pb-4 pt-2">
            <div className="mx-auto max-w-[800px]">
                <ChatTextfield
                    value={value}
                    isLoading={isLoading}
                    filesState={filesState}
                    onFilesLoad={onFilesLoad}
                    onFileRemove={onFileRemove}
                    onOpenFile={open}
                    onMessageChange={onMessageChange}
                    onSubmit={onSubmit}
                    onStop={onStop}
                />
            </div>
        </div>
    )
}

export default ChatPanel
