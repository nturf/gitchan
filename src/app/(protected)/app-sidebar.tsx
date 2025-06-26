"use client"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenuItem, SidebarMenuButton, SidebarMenu, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Bot, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { useProject } from "@/hooks/use-project"

const items = [
    {
        title: "Dashbaord",
        url: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Q&A",
        url: "/qa",
        icon: Bot
    },
    {
        title: "Meetings",
        url: "/meetings",
        icon: Presentation
    },
    {
        title: "Billings",
        url: "/billings",
        icon: CreditCard
    }
]

const AppSidebar = () => {
    const pathname = usePathname()
    const { open } = useSidebar()
    const { projects, projectId, setProjectId } = useProject()
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <div className="flex items-center gap-2 ">
                    <Image src="/logo.png" alt="logo" width={40} height={40} />
                    {open && (
                        <h1 className="text-xl font-bold text-primary/80"> GitChan</h1>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(item => {
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url} className={cn({
                                                "!bg-primary !text-white": pathname === item.url
                                            })}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Projects
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projects?.map(projects => {
                                return (
                                    <SidebarMenuItem key={projects.name}>
                                        <SidebarMenuButton asChild>
                                            <div onClick={() => {
                                                setProjectId(projects.id)
                                            }}>
                                                <div className={cn(
                                                    "rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary",
                                                    {
                                                        "bg-primary text-white": projects.id === projectId
                                                    }
                                                )}>
                                                    {projects.name[0]}
                                                </div>
                                                <span>{projects.name}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                            <div className="h-2"></div>
                            <SidebarMenuItem>
                                <Link href="/create">
                                    {open && (
                                        <Button size="sm" variant={"outline"} className=" cursor-pointerw-fit cursor-pointer">
                                            <Plus />
                                            Create Project
                                        </Button>

                                    )}
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>


                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar >
    )
}

export default AppSidebar
