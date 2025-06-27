import { Octokit } from "octokit";
import { db } from "@/server/db";
import axios from "axios";
import { summarizer } from "./gemini";
import { Prompt } from "next/font/google";

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const githubUrl = "https://github.com/nturf/dev";

export const getCommitHast = async (githubUrl: string): Promise<Response> => {
    const { owner, repo } = githubUrl.split("/").slice(-2);
    if (!owner || !repo) {
        throw new Error("Invalid github Url");
    }
    const { data } = await octokit.rest.repos.listCommits({
        owner,
        repo,
    });
    const sortedCommits = data.sort(
        (a: any, b: any) =>
            new Date(b.commit.author.date).getTime() -
            new Date(a.commit.author.date).getTime(),
    ) as any[];

    return sortedCommits.slice(0, 15).map((commit: any) => ({
        commitHash: commit.sha as string,
        commitMessage: commit.commit.message ?? "",
        commitAuthorName: commit.commit?.author?.name ?? "",
        commitAuthorAvatar: commit?.author?.avatar_url ?? "",
        commitDate: commit.commit?.author?.date ?? "",
    }));
};

async function summarizeCommit(githubUrl: string, commitHash: string) {
    const { data } = await axios.get(
        ` ${githubUrl}/commit/${commitHash}.diff`,
        {
            headers: {
                Accept: "applications/vnd.github.v3.diff",
            },
        },
    );
    return await summarizer(data);
}

export const pullCommit = async (projectId: string) => {
    const { project, githubUrl } = await fetchProjectGithubUrl(projectId);
    const commitHashes = await getCommitHast(githubUrl);
    const unprocessedCommit = await filterUnprocessedCommit(
        projectId,
        commitHashes,
    );
    const summaryResponse = await Promise.allSettled(
        unprocessedCommit.map((commit) => {
            return summarizeCommit(githubUrl, commit.commitHash);
        }),
    );
    const summaries = summaryResponse.map((response) => {
        if (response.status === "fulfilled") {
            return response.value as string;
        }
        return "";
    });
    console.log(unprocessedCommit);
    return unprocessedCommit;
};

async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: { id: projectId },
        select: {
            githubUrl: true,
        },
    });

    if (!project?.githubUrl) {
        throw new Error("Project has no github url");
    }

    return { project, githubUrl: project?.githubUrl };
}

async function filterUnprocessedCommit(
    projectId: string,
    commitHashes: Response[],
) {
    const processedCommit = await db.commit.findMany({
        where: { projectId },
    });
    const unprocessedCommit = commitHashes.filter(
        (commit) =>
            !processedCommit.some(
                (processedCommit: any) =>
                    processedCommit.commitHash === commit.commitHash,
            ),
    );
    return unprocessedCommit;
}
pullCommit("cmcctctn10007sb2aibaqilxt");
