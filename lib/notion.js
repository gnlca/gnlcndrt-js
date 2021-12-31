import { Client } from "@notionhq/client";


const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_KEY });
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;





//Requests Database Pages
// export const getPosts = async (dbId) => {
//   const posts = await notion.databases.query({
//     database_id: dbId,
//     filter: {
//       property: 'Status',
//       select: {
//         equals: "Public ✅"
//       }
//     }
//   });
//   return (posts.results);
// }



export const getPosts = async (dbId, tags) => {

  // if(!tags) return(await getPosts(databaseId));
  // var tagsFilter = []
  // for (let tag of tags) {
  //   tagsFilter.push({
  //     property: 'Tags',
  //     multi_select: {
  //       contains: tag
  //     }
  //   })
  // }

  let tagFilters = tags ? tags.map(tag => ({
    property: 'Tags',
    multi_select: {
      contains: tag
    }
  })) : null ;



  const req = {
    database_id: dbId,
    filter: {
      and: [
        {
          property: 'Status',
          select: {
            equals: "Public ✅",
          }
        },
        ...(tagFilters ? [{or: tagFilters}]: [])
        
      ]
    }
  }


  const posts = await notion.databases.query(req);
  console.log(posts);
  return(posts.results);

}











//Retrieves Database properties
export const getDatabase = async (dbId) => {
  const response = await notion.databases.retrieve({ database_id: databaseId });
  return response;
}


//Retrieves Page properties
export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};



//Asks for Page blocks
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



