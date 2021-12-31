// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as notion from "../../lib/notion";

export default async function notionApi(req, res) {

  const posts = await notion.getPosts(notion.databaseId,  (typeof req.query.tags == "string" &&  [ req.query.tags ] ) || req.query.tags);

  res.status(200).json(posts);
  
}
