import express from "express";
import type { Request, Response } from "express";
import { getReddit } from "@devvit/reddit";
import { getRedis } from "@devvit/redis";
import {
  createServer,
  getContext,
  getServerPort,
  webbitEnable,
} from "@devvit/server";

import {
  InitResponse,
  IncrementResponse,
  DecrementResponse,
} from "../shared/types/api";

const router = express.Router();

router.get(
  "/api/init",
  async (_req, res: Response<InitResponse>): Promise<void> => {
    const context = getContext();
    const redis = getRedis();
    const postId = context.postId;

    if (!postId) {
      console.error("API Init Error: postId not found in devvit context");
      res.status(400).json({
        status: "error",
        message: "postId is required but missing from context",
      });
      return;
    }

    const user = await getReddit().getCurrentUser();
    console.log("API Init for user: ", user?.username);

    try {
      const count = await redis.get("count");
      res.json({
        type: "init",
        postId: postId,
        count: count ? parseInt(count) : 0,
      });
    } catch (error) {
      console.error(`API Init Error for post ${postId}:`, error);
      let errorMessage = "Unknown error during initialization";
      if (error instanceof Error) {
        errorMessage = `Initialization failed: ${error.message}`;
      }
      res.status(400).json({ status: "error", message: errorMessage });
    }
  }
);

router.post(
  "/api/increment",
  async (_req, res: Response<IncrementResponse>): Promise<void> => {
    const context = getContext();
    const redis = getRedis();
    const postId = context.postId;

    if (!postId) {
      res.status(400).json({
        status: "error",
        message: "postId is required",
      });
      return;
    }

    res.json({
      count: await redis.incrby("count", 1),
      postId,
      type: "increment",
    });
  }
);

router.post(
  "/api/decrement",
  async (_req, res: Response<DecrementResponse>): Promise<void> => {
    const context = getContext();
    const redis = getRedis();
    const postId = context.postId;
    if (!postId) {
      res.status(400).json({
        status: "error",
        message: "postId is required",
      });
      return;
    }

    res.json({
      count: await redis.incrby("count", -1),
      postId,
      type: "decrement",
    });
  }
);

router.get(
  "/api/hello",
  async (
    req: Request,
    res: Response<
      { message: string; status: string } | { postId: string; message: string }
    >
  ): Promise<void> => {
    const context = getContext();
    const postId = context.postId;
    if (!postId) {
      res.status(400).json({
        status: "error",
        message: "postId is required",
      });
      return;
    }

    const message =
      typeof req.query["message"] === "string" ? req.query["message"] : "";
    res.json({ message, postId });
  }
);

const app = express();
app.use(router);

const server = createServer(app);
server.on("error", (err) => console.error(`server error; ${err.stack}`));
server.listen(getServerPort(), () => {
  const addr = server.address();
  if (addr === null) {
    console.log("Server address is null, but I'm listening!");
    return;
  }
  if (typeof addr === "string") {
    console.log(`Server is listening on ${addr}`);
    return;
  }
  if (typeof addr === "object") {
    console.log(`Server is listening on ${addr.address}:${addr.port}`);
    return;
  }
  console.error("...the hell is it doing?");
});
