import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from 'next/link';
import { Client } from "@notionhq/client";

import { useFetch } from "../components/useFetch";
import SearchBar from "../components/SearchBar";

// import { databaseId, getPosts } from "../lib/notion";          
import * as notion from "../lib/notion";
import * as utils from "../lib/utils";





export async function getStaticProps() {
  let tags = utils.formatTags(await notion.getDatabase(notion.databaseId));
  const posts = utils.formatPostsToIds(await notion.getPosts(notion.databaseId));
  // var categories = await tags.map(async (tag) =>({ [tag.name] : (await notion.getPosts(notion.databaseId,[tag.name]))}));

  for (let i = 0; i < tags.length; i++) {
    tags[i].posts = await notion.getPosts(notion.databaseId, [tags[i].name])
  }
  // tags.map( (tag,id) => console.log(tag.name) );
  let postsFromTags = utils.formatPostsToIds(tags.reduce((p, c) => [...p, ...c.posts], []))
  console.log(postsFromTags);

  return ({
    props: { tags, posts },
    revalidate: 10,
  });
}


export default function Blog({ tags, posts }) {
  const [postTitles, setPostTitles] = useState(posts);
  const [postTags, setPostTags] = useState(tags);
  const [activeTags, setActiveTags] = useState([]);
  const [inputText, setInputText] = useState("");
  // const { data } 



  function handleSearch(e) {
    setInputText(e.target.value.toLowerCase());
    setPostTitles(
      posts.filter(p => p.name.toLowerCase().includes(inputText))
    )
  }


  


  async function handleTags(tag) {
    let e = activeTags.indexOf(tag)
    if (e == -1) {
      setActiveTags([...activeTags, tag])
    } else {
      setActiveTags(activeTags.filter(t => (t != tag)))
    }
  }


  useEffect(() => {
    // utils.getFilteredPosts(activeTags).then(res => setPostTitles(res));
    if (activeTags.length == 0) { 
      setPostTitles(posts);
    }
    else {
      setPostTitles(
        utils.formatPostsToIds(
          tags.filter(tag => activeTags.includes(tag.name)).reduce((a, p) => ([...a, ...p.posts]), [])
        )
      )
    }

  }, [activeTags])



  useEffect(() => {
    console.log(posts);
    console.log(tags);
  }, [posts, tags ]);

  return (
    <div className="Blog maxWidth42 mxAuto">
      <div className="content">
        <h1>Blog</h1>

        <SearchBar handleChange={handleSearch}></SearchBar>

        {(postTags) ?
          <div className="tags">
            <button className={activeTags.length == 0 ? "tag hidden" : "tag"} onClick={() => { setActiveTags([]); setPostTitles(posts) }}>&#10005;</button>
            {postTags.map((tag) => (
              <button key={tag.id} className={activeTags.indexOf(tag.name) == -1 ? "tag" : "tag tagActive"} type="button" onClick={() => handleTags(tag.name)}>{tag.name}</button>
            ))}
          </div>
          : null}

        {(postTitles) ?
          <ul>{postTitles.map((titolo, index) => (
            <li key={index}>
              <Link key={titolo.id} href={`/blog/${postTitles[titolo.id]}`} passHref>
                <a onClick={() => console.log(`apro la pagina ${titolo.name}`)}>{titolo.name}</a>
              </Link>
            </li>
          ))}</ul>
          : null
        }
      </div>
    </div>
  );
}
