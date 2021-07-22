import { React, useEffect, useState } from "react";
import { Client } from "@notionhq/client";
import { any } from "micromatch";

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_KEY });
const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

export async function getStaticProps(context) {
  async function getPosts() {

    const posts = await notion.databases.query({
      database_id: databaseId,
    });
    return(posts);
  }
  const posts = await getPosts();
  console.log(posts);

  return({
    props: { posts },
  });
}

export default function Blog({ posts }) {
    const [postTitles,setPostTitles] = useState();

    const titoliPosts = (articoli) => {
        let titoli = [];


        // Reduce function invece di iterare con loop for 
        // USO  .reduce((accumulator, currentValue, index, array) => { ... }, initialValue)

        const titles = articoli.results.reduce((ac,p)=>[...ac, p.properties.Name.title[0].plain_text],[]);
        console.log(titles);
        return(titles);
    };

    useEffect(() => {
        console.log(posts);
        setPostTitles(titoliPosts(posts))
    }, []);

    return (
      <div className="Blog maxWidth42 mxAuto">
        <div className="content">
          <h1>Blog</h1>

          {
            (postTitles) ? 
                <ul>{postTitles.map((titolo)=>{return(<li key={titolo}>{titolo}</li>)})}</ul>
                : null  
          }
        </div>
      </div>
    );
}
