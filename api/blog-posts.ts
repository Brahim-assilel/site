import { listPublishedBlogPosts } from "./blog-db.js";

type ApiRequest = {
  method?: string;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => unknown;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const posts = await listPublishedBlogPosts(process.env);
    return res.status(200).json({ posts });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Impossible de charger le blog.";
    return res.status(500).json({ error: message });
  }
}
