export type InitResponse = ErrorResponse | {
  type: "init";
  postId: string;
  count: number;
};

export type IncrementResponse = ErrorResponse | {
  type: "increment";
  postId: string;
  count: number;
};

export type DecrementResponse = ErrorResponse | {
  type: "decrement";
  postId: string;
  count: number;
};

export type ErrorResponse = {
  status: "error";
  message: string;
};
