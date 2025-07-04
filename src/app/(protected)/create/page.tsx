"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormInput = {
    repoUrl: string;
    projectName: string;
    githubToken?: string;
};

const CreatePage = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>();
    const createProject = api.project.createProject.useMutation();
    const refetch = useRefetch();

    function onSubmit(data: FormInput) {
        // window.alert(JSON.stringify(data, null, 2))
        createProject.mutate(
            {
                githubUrl: data.repoUrl,
                name: data.projectName,
                githubToken: data.githubToken,
            },
            {
                onSuccess: () => {
                    toast.success("Project created successfully");
                    refetch();
                    reset();
                },
                onError: () => {
                    toast.error("Failed to create project");
                },
            },
        );
        return true;
    }

    return (
        <div className="flex h-full items-center justify-center gap-12">
            <img src="/gitchan.svg" className="h-56 w-auto rounded-md" />
            <div>
                <div>
                    <h1 className="text-2xl font-semibold">
                        Link your GitHub repo
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Enter the URL of your Github repo
                    </p>
                </div>
                <div className="h-4"></div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            {...register("projectName", { required: true })}
                            placeholder="Project Name"
                        />
                        <div className="h-2"></div>
                        <Input
                            {...register("repoUrl", { required: true })}
                            placeholder="Repo URL"
                        />
                        <div className="h-2"></div>
                        <Input
                            {...register("githubToken")}
                            placeholder="GitHub Token (if private repo)"
                        />
                        <div className="h-4"></div>
                        <Button
                            type="submit"
                            disabled={createProject.isPending}
                            className="cursor-pointer"
                        >
                            Done!
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
