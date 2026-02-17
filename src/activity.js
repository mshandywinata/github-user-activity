import { colors } from "./colors.js";

export const activity = {
    PushEvent: ({ repo, payload, count }) => {
        const branch = payload.ref.replace("refs/heads/", "");
        return `${colors.green}Pushed${colors.reset} ${colors.blue}${count}${colors.reset} time(s) to ${colors.cyan}${branch}${colors.reset} in ${colors.yellow}${repo.name}${colors.reset}`;
    },
    ForkEvent: ({ repo }) => {
        return `${colors.magenta}Forked${colors.reset} ${colors.yellow}${repo.name}${colors.reset}`;
    },
    WatchEvent: ({ repo }) => {
        return `${colors.yellow}Starred${colors.reset} ${colors.yellow}${repo.name}${colors.reset}`;
    },
    CreateEvent: ({ repo, payload }) => {
        return `${colors.green}Created${colors.reset} ${colors.cyan}${payload.ref_type}${colors.reset} in ${colors.yellow}${repo.name}${colors.reset}`;
    },
    IssueEvent: ({ repo, payload }) => {
        return `${colors.magenta}${payload.action}${colors.reset} an issue in ${colors.yellow}${repo.name}${colors.reset}`;
    },
    PullRequestEvent: ({ repo, payload }) => {
        return `${colors.blue}${payload.action}${colors.reset} a pull request in ${colors.yellow}${repo.name}${colors.reset}`;
    },
    default: ({ type, repo }) => {
        return `${colors.gray}Performed${colors.reset} ${colors.cyan}${type}${colors.reset} on ${colors.yellow}${repo.name}${colors.reset}`;
    },
};

export function aggregatePushEvents(events) {
    const pushEvents = [];
    const otherEvents = [];
    const pushMap = {};

    for (const e of events) {
        if (e.type === "PushEvent") {
            const key = `${e.repo.name}:${e.payload.ref}`;
            if (!pushMap[key]) {
                pushMap[key] = { ...e, count: 0 };
            }
            pushMap[key].count++;
        } else {
            otherEvents.push(e);
        }
    }

    for (const key in pushMap) {
        pushEvents.push(pushMap[key]);
    }

    return [...pushEvents, ...otherEvents];
}

export async function getRecentActivity(username, limit=3) {
    const url = `https://api.github.com/users/${username}/events`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`response status: ${response.status}`);
        }

        const events = await response.json();
        const limitedEvents = events.slice(0, limit);

        return limitedEvents.map(({ type, repo, payload, created_at}) => ({
            type,
            repo,
            payload,
            created_at
        }));
    } catch (error) {
        throw new Error(error.message);
    }
}