import { ToolInvocation } from 'ai'
import React from 'react'

interface ToolcallItemProps {
    toolInvocation: ToolInvocation
}

const ToolcallItem = ({ toolInvocation }: ToolcallItemProps) => {
    if (toolInvocation.toolName == 'searchRelatedInformation') {
        return <SearchRelatedInformationItem toolInvocation={toolInvocation} />
    } else {
        return null
    }
}

const SearchRelatedInformationItem = ({ toolInvocation }: ToolcallItemProps) => {
    if ('result' in toolInvocation) {
        return null
    } else {
        return (
            <div className="flex justify-start pl-10">
                <div className="rounded-[20px] bg-[#2F2F2F] px-4 py-2">
                    <p className="animate-pulse break-all text-lg font-bold italic text-white">
                        Searching Related Products
                    </p>
                </div>
            </div>
        )
    }
}

export default ToolcallItem
