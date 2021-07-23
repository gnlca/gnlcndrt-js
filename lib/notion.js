import { Client } from "@notionhq/client";


const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_KEY });
const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

export const getPosts = async () => {
  const posts = await notion.databases.query({
    database_id: databaseId,
  });
  return (posts);
}


