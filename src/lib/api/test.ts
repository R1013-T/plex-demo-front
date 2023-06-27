import client from "@/lib/api/client";

export const exectest = () => {
  return client.get("/hello");
};
