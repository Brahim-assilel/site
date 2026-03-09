import { Client } from "@notionhq/client";

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN,
});

const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

export async function getPosts() {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Title?.title?.[0]?.plain_text || "",
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || "",
    description: page.properties.Description?.rich_text?.[0]?.plain_text || "",
    date: page.properties.Date?.date?.start || "",
    readingTime: page.properties.ReadingTime?.number || 5,
    category: page.properties.Category?.select?.name || "Général",
  }));
}
