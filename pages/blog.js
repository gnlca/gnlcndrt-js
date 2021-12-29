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
    props: { tags, posts },
    revalidate: 10,
  });
}



export default function Blog({ tags, posts }) {
  const [postTitles, setPostTitles] = useState();
  const [postTags, setPostTags] = useState();
  const [activeTags, setActiveTags] = useState([]);


  
  
  
  const filterPosts = async () => {
    let url = "/api/notionApi?"+ activeTags.map(tag=>"tags="+tag).join('&');
    console.log(`the api url is ${url}`)
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);


  }




  async function handleTags(tag) {
    let e = activeTags.indexOf(tag)
    if (e == -1) {
      await setActiveTags([...activeTags, tag])
    } else {
      await setActiveTags(activeTags.filter(t => (t != tag)))
    }
  }


  useEffect(()=>{
    filterPosts();
  },[activeTags])


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

          <div className="tags">
            <button className={activeTags.length == 0 ? "tagCleaner hidden" : "tagCleaner"} onClick={() => setActiveTags([])}>&#10005;</button>
            {postTags.map((tag) => (
              <button key={tag.id} className={activeTags.indexOf(tag.name) == -1 ? "tag" : "tag tagActive"} type="button" onClick={() => handleTags(tag.name)}>{tag.name}</button>
            ))}
          </div>
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
