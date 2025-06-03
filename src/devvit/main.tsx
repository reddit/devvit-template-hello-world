import { Devvit } from "@devvit/public-api";

// Side effect import to bundle the server. The /index is required for server splitting.
// import "../server/index";
// import { defineConfig } from "@devvit/server";

// defineConfig({
//   name: "Hello World",
//   description: "Hello World",
//   entry: "index.html",
//   height: "tall",
//   inline: true,
//   menu: {
//     enable: true,
//     label: "[Webbit] New Hello World Post",
//     postTitle: "Hello World",
//   },
// });

Devvit.addCustomPostType({
  name: "Hello World",
  description: "A simple hello world post type",
  render: (context) => {
    if (context.postId === "t3_THROW_ERROR") {
      throw new Error("Test error.");
    }

    console.log("Post ID!!:", context.postId);
    console.log("App Name!!:", context.appName);
    console.log("User ID!!:", context.userId);
    console.log("Subreddit ID!!:", context.subredditId);
    console.log("App version!!:", context.appVersion);
    return <blocks></blocks>;
  },
});

export default Devvit;
