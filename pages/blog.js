import { React, useEffect, useState } from "react";
import Link from 'next/link'
import { Client } from "@notionhq/client";

// import { databaseId, getPosts } from "../lib/notion";

import * as notion from "../lib/notion"

export async function getStaticProps() {

  const posts = await notion.getPosts(notion.databaseId);
  console.log(posts);
  
  return ({
    props: { posts },

    revalidate: 10,
  });
}

export default function Blog({ posts }) {
  const [postTitles, setPostTitles] = useState();


  useEffect(() => {
    console.log(posts);
    setPostTitles(notion.formatPostsToIds(posts))
  }, []);

  return (
    <div className="Blog maxWidth42 mxAuto">
      <div className="content">
        <h1>Blog</h1>

        {
          (postTitles) ?
            <ul>{Object.keys(postTitles).map((titolo, index) => (
              <Link key={index} href={`/blog/${postTitles[titolo]}`}><li key={index}>{titolo}</li></Link>
              // <li key={index}>{titolo}</li>
            ))}</ul>
            : null
        }
      </div>
    </div>
  );
}
