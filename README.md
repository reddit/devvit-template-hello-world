## Devvit Hello World Experimental

An experimental hello world template that explores a new way to build applications on Reddit's developer platform.

If you're looking for a more batteries included starter, please check out:

- [devvit-threejs-starter-experimental](https://github.com/reddit/devvit-threejs-starter-experimental)

## Getting Started

### Prerequisites

> Make sure you have Node 22 downloaded on your machine before running!

```sh
npm install -g devvit

devvit login
```

1. **Create your project**

```sh
git clone https://github.com/reddit/devvit-threejs-starter-experimental YOUR_PROJECT_NAME

cd YOUR_PROJECT_NAME

npm install
```

2. **Make a subreddit**: Make a private subreddit on Reddit.com. This will be where you do your own development. Go to Reddit.com, scroll the left side bar down to communities, and click "Create a community."
3. **Update the name in package.json**: Find the `dev:devvit` command and replace `YOUR_SUBREDDIT_NAME` with the subreddit name you just created.
4. **Update yaml file**: In `devvit.yaml` replace `YOUR_APP_NAME` with the name of your app. This will be shown to users that play your app.
5. **Upload**: Run `npm run upload` and go through the prompts
6. **Playtest**: Run `npm run dev` to playtest your application in production by going to your subreddit.

## Commands

- `npm run dev`: Starts a development server where you can develop your application live on Reddit.
- `npm run upload`: Uploads a new version of your app
- `npm run type-check`: Type checks your app
