"use client"
import Link from "next/link"
import React from "react"
import { useUser } from "@clerk/nextjs"
import { useProject } from "@/hooks/use-project"
import { ExternalLink, Github } from "lucide-react"
import CommitUi from "./commit-log"

const Dashboard = () => {
    const { project } = useProject()
    return (
        <div>
            {project?.id}

            <div className="flex flex-wrap items-center justify-between gap-y-4">
                <div className="bg-primary w-fit rounded-md px-4 py-3">
                    <div className="flex items-center">
                        <Github className="size-5 text-white" />
                        <div className="ml-2">
                            <p className="text-sm font-medium text-white">
                                This project is linked to{" "}
                                <Link
                                    href={project?.githubUrl ?? ""}
                                    className="inline-flex items-center text-white/80 hover:underline"
                                >
                                    {project?.githubUrl}
                                    <ExternalLink className="ml-1 size-4" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-4"></div>

                <div className="flex items-center gap-4">
                    TeamMembers InviteButton ArchiveButton
                </div>

                <div className="mt-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                        AskQuestionCard MeetingCard
                    </div>
                </div>

                <div className="mt-8">
                    <CommitUi />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
