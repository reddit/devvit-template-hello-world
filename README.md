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

1. **Create your project from the template**
   <br /><img src="https://github.com/user-attachments/assets/a234a6d6-42ff-4188-b5b9-79d7573c9300" width="400" />
2. **Set up your new repo**
   <br /><img src="https://github.com/user-attachments/assets/590d7457-4751-461c-896b-a54abcb72022" width="400" />
3. **Clone the repo down to your computer**
   <br /><img src="https://github.com/user-attachments/assets/a09cf721-4605-4c7e-beae-1e7bd665c4fa" width="400" />
4. `cd your-app-name`
5. `npm install`
6. **Make a subreddit**: Make a private subreddit on Reddit.com. This will be where you do your own development. Go to Reddit.com, scroll the left side bar down to communities, and click "Create a community."
7. **Update the name in package.json**: Find the `dev:devvit` command and replace `YOUR_SUBREDDIT_NAME` with the subreddit name you just created.
8. **Update yaml file**: In `devvit.yaml` replace `YOUR_APP_NAME` with the name of your app. This will be shown to users that play your app.
9. **Upload**: Run `npm run deploy` and go through the prompts
10. **Playtest**: Run `npm run dev` to playtest your application in production by going to your subreddit.

## Commands

- `npm run dev`: Starts a development server where you can develop your application live on Reddit.
- `npm run deploy`: Uploads a new version of your app
- `npm run type-check`: Type checks your app
