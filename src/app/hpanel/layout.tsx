import type React from "react"
import { Sidebar } from "@/components/layouts/Sidebar"
import { HpanelHeader } from "@/components/layouts/HpanelHeader"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <HpanelHeader />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    )
}
