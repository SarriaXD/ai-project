import React from 'react'
import './global.css'
import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'
import { AuthProvider } from '@/lib/client/auth-provider.tsx'
import ToastProvider from '@/components/toast-provider.tsx'
import FPSCounter from '@/components/FPS-counter.tsx'

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    metadataBase: new URL('https://ai-final-project.sarria.ca'),
    icons: {
        icon: '/logo.png',
    },
    description:
        "This is a Purchasing Online Without Extra Research Artificial Intelligence Chatbot. It's a project to help people to buy products online without extra research.",
    title: "Online Purchasing Without Extra Research AI Chatbot",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <ToastProvider>
                        <FPSCounter />
                        {children}
                    </ToastProvider>
                    <Analytics />
                </AuthProvider>
            </body>
        </html>
    )
}
