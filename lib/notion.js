import { Client } from "@notionhq/client";


const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_KEY });
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

export const getPosts = async (dbId) => {
  const posts = await notion.databases.query({
    database_id: dbId,
  });
  return (posts);
}

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};



export const getPageData = async (pageId) => {

  const response = await notion.blocks.children.list({
    block_id: pageId,
  });

}



export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};



