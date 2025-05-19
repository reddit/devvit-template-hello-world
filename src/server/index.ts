import express from "express";
import { createServer, getContext } from "@devvit/server";
import {
  InitResponse,
  IncrementResponse,
  DecrementResponse,
} from "../shared/types/api";

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

router.get<
  { postId: string },
  InitResponse | { status: string; message: string }
>("/api/init", async (_req, res): Promise<void> => {
  const context = getContext();
  const postId = context.postId;

  if (!postId) {
    console.error("API Init Error: postId not found in devvit context");
    res.status(400).json({
      status: "error",
      message: "postId is required but missing from context",
    });
    return;
  }

  try {
    const count = await context.redis.get("count");
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
});

router.post<
  { postId: string },
  IncrementResponse | { status: string; message: string },
  unknown
>("/api/increment", async (_req, res): Promise<void> => {
  const context = getContext();
  const postId = context.postId;

  if (!postId) {
    res.status(400).json({
      status: "error",
      message: "postId is required",
    });
    return;
  }

  res.json({
    count: await context.redis.incrBy("count", 1),
    postId,
    type: "increment",
  });
});

router.post<
  { postId: string },
  DecrementResponse | { status: string; message: string },
  unknown
>("/api/decrement", async (_req, res): Promise<void> => {
  const context = getContext();
  const postId = context.postId;
  if (!postId) {
    res.status(400).json({
      status: "error",
      message: "postId is required",
    });
    return;
  }

  res.json({
    count: await context.redis.incrBy("count", -1),
    postId,
    type: "decrement",
  });
});

// Use router middleware
app.use(router);

const server = createServer(app);
server.on("error", (err) => console.error(`server error; ${err.stack}`));
server.startDevvitServer(() => {
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
  console.error('...the hell is it doing?');
});
