import React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import AppSidebar from "./app-sidebar"


type Props = {
    children: React.ReactNode
}

const sidebarLayout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className="w-full m-2">
                <div className="flex items-center gap-2 border-sidebar-border bg-sidebar border shadow rounded-md p-2 px-4 ">
                    <div className="ml-auto"></div>
                    <UserButton />
                </div>
                <div className=" mt-5 border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-0rem)] p-4">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}

export default sidebarLayout
