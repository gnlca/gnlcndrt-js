import { Client } from "@notionhq/client";


const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_KEY });
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;


export function formatPostsToIds(articoli) {
  let titoli = [];

  // Reduce function invece di iterare con loop for 
  // USO  .reduce((accumulator, currentValue, index, array) => { ... }, initialValue)
  const titles = articoli.reduce((ac,p)=>({...ac, [p.properties.Name.title[0].plain_text]: p.id}),{});

  // const titles = articoli.map((p) => p.properties.Name.title[0].plain_text); //oppure uso map e facc primm
  console.log(titles);
  return (titles);
  
}



export const getPosts = async (dbId) => {
  const posts = await notion.databases.query({
    database_id: dbId,
  });
  return(posts.results);
}

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};



export const getPageData = async (pageId) => {
  const response = await notion.blocks.children.list({
    block_id: pageId,
  });
  return response.results
}



export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};



