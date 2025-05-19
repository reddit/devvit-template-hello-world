import { Devvit } from "@devvit/public-api";

// Side effect import to bundle the server. The /index is required for server splitting.
import "../server/index";
import { defineConfig } from "@devvit/server";

defineConfig({
  name: "Hello World",
  description: "Hello World",
  entry: "index.html",
  height: "tall",
  menu: {
    enable: true,
    label: "New Hello World Post",
    postTitle: "Hello World",
  },
});

export default Devvit;
