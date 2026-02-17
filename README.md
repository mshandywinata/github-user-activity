# github-user-activity

A simple command-line tool to fetch and display a GitHub user's recent activity.

## Installation

```bash
git clone https://github.com/mshandywinata/github-user-activity.git
cd github-user-activity
npm link
```

## Usage

```bash
github-activity <username> [limit]
```

### Examples

```bash
github-activity mshandywinata        # shows last 3 events (default)
github-activity mshandywinata 10     # shows last 10 events
```

### Sample Output

```
[2/17/2026, 3:45:00 PM] Pushed 5 time(s) to main in user/repo
[2/17/2026, 3:30:00 PM] Starred user/other-repo
[2/17/2026, 3:15:00 PM] Created branch in user/repo
[2/17/2026, 3:00:00 PM] Forked user/cool-project
```

## Supported Events

| Event | Display |
|---|---|
| `PushEvent` | Pushed X time(s) to branch in repo |
| `ForkEvent` | Forked repo |
| `WatchEvent` | Starred repo |
| `CreateEvent` | Created ref_type in repo |
| `IssuesEvent` | action an issue in repo |
| `PullRequestEvent` | action a pull request in repo |
| Other events | Performed type on repo |

> Push events to the same branch and repo are aggregated and displayed with a count.

## Built With

- Node.js (ES Modules)
- GitHub Events API
- No external dependencies
