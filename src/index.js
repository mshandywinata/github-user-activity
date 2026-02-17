#!/usr/bin/env node
import { getRecentActivity, activity, aggregatePushEvents } from "./activity.js";
import { colors } from "./colors.js";

const usernameInput = process.argv.slice(2, 3).join(" ");
const limitInput = process.argv[3] ? parseInt(process.argv[3]) : 3;

const events = await getRecentActivity(usernameInput, limitInput);
const aggregated = aggregatePushEvents(events);

aggregated.sort((a, b) => {
    new Date(a.creted_at) - new Date(b.creted_at);
});

for (const e of aggregated) {
    const formatter = activity[e.type] || activity.default;
    const time = new Date(e.created_at).toLocaleString();
    console.log(`${colors.gray}[${time}]${colors.reset} ${formatter(e)}`);
}
