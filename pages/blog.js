import { React, useEffect, useState } from "react";
import { Client } from "@notionhq/client";

import { getPosts } from "../lib/notion";


export async function getStaticProps() {

  const posts = await getPosts();
  console.log(posts);

  return ({
    props: { posts },

    revalidate: 10,
  });
}

export default function Blog({ posts }) {
  const [postTitles, setPostTitles] = useState();

  const titoliPosts = (articoli) => {
    let titoli = [];


    // Reduce function invece di iterare con loop for 
    // USO  .reduce((accumulator, currentValue, index, array) => { ... }, initialValue)
    // const titles = articoli.results.reduce((ac,p)=>[...ac, p.properties.Name.title[0].plain_text],[]);

    const titles = articoli.results.map((p) => p.properties.Name.title[0].plain_text); //oppure uso map e facc primm
    console.log(titles);
    return (titles);
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
            <ul>{postTitles.map((titolo, index) => (<li key={index}>{titolo}</li>))}</ul>
            : null
        }
      </div>
    </div>
  );
}
