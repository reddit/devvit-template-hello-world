import { Devvit } from "@devvit/public-api";

// Side effect import to bundle the server
import "../server/src/index";
import { defineConfig } from "@devvit/server";

defineConfig({
  name: "Hello World",
  description: "Hello World",
  entry: "index.html",
  height: "tall",
  inline: true,
  menu: {
    enable: true,
    label: "New Hello World Post",
    postTitle: "Hello World",
  },
});

export default Devvit;
