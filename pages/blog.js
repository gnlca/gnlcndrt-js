import { React, useEffect, useState } from "react";
import Link from 'next/link'
import { Client } from "@notionhq/client";

// import { databaseId, getPosts } from "../lib/notion";          
import * as notion from "../lib/notion"

export async function getStaticProps() {
  const properties = await notion.getDatabase(notion.databaseId);
  const posts = await notion.getPosts(notion.databaseId);
  console.log(properties);
  console.log(posts);
  
  return ({
    props: {properties, posts},
    revalidate: 10,
  });
}

export default function Blog({ properties, posts }) {
  const [postTitles, setPostTitles] = useState();


  useEffect(() => {
    console.log(posts);
    console.log(properties);
    setPostTitles(notion.formatPostsToIds(posts))
  }, [posts]);

  return (
    <div className="Blog maxWidth42 mxAuto">
      <div className="content">
        <h1>Blog</h1>

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
