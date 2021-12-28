import { React, useEffect, useState } from "react";
import Link from 'next/link';
import { Client } from "@notionhq/client";

// import { databaseId, getPosts } from "../lib/notion";          
import * as notion from "../lib/notion";
import * as utils from "../lib/utils";

export async function getStaticProps() {
  const tags = utils.formatTags(await notion.getDatabase(notion.databaseId));
  const posts = utils.formatPostsToIds(await notion.getPosts(notion.databaseId));
  
  return ({
    props: {tags, posts},
    revalidate: 10,
  });
}

export default function Blog({ tags, posts }) {
  const [postTitles, setPostTitles] = useState();
  const [postTags, setPostTags] = useState();


  useEffect(() => {
    console.log(tags);
    console.log(posts);
    setPostTags(tags);
    setPostTitles(posts);
  }, [tags, posts]);

  return (
    <div className="Blog maxWidth42 mxAuto">
      <div className="content">
        <h1>Blog</h1>
        
        {(postTags) ?

          <ul>
            {postTags.map((tag) => (
              <li key={tag.id} className="tag noList">{tag.name}</li>
            ))}
          </ul>
          : null}

        {
          (postTitles) ?
            <ul>{Object.keys(postTitles).map((titolo, index) => (
              <li key={index}>
                <Link key={index} href={`/blog/${postTitles[titolo]}`} passHref>
                  <a onClick={() => console.log(`apro la pagina ${titolo}`)}>{titolo}</a>
                </Link>
              </li>
            ))}</ul>
            : null
        }
      </div>
    </div>
  );
}
