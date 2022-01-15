import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from 'next/link';
import { Client } from "@notionhq/client";

import SearchBar from "../components/SearchBar";

// import { databaseId, getPosts } from "../lib/notion";          
import * as notion from "../lib/notion";
import * as utils from "../lib/utils";



export async function getStaticProps() {
  let tags = utils.formatTags(await notion.getDatabase(notion.databaseId));
  const posts = utils.formatPostsToIds(await notion.getPosts(notion.databaseId));

  for (let tag of tags) {
    tag.posts = await notion.getPosts(notion.databaseId, [tag.name]);
  }

  // example async await with map method using promise.all to resolve the array of promises
  // let ciccio = await Promise.all(tags2.map(async (tag) => {tag.posts = await notion.getPosts(notion.databaseId, [tag.name]);return tag} ));

  return ({
    props: { tags, posts },
    revalidate: 10,
  });
}


export default function Blog({ tags, posts }) {
  const [postTitles, setPostTitles] = useState(posts);
  const [activePosts, setActivePosts] = useState(posts);
  const [postTags, setPostTags] = useState(tags);
  const [activeTags, setActiveTags] = useState([]);
  const [inputText, setInputText] = useState("");



  function handleSearch() {

  }


  async function handleTags(tagName) {
    if (activeTags.indexOf(tagName) == -1) {
      setActiveTags([...activeTags, tagName])
    } else {
      setActiveTags(activeTags.filter(t => (t != tagName)))
    }
  }

  useEffect(() => {
    let temp;
    if (activeTags.length == 0) {
      setPostTitles(posts);
      setActivePosts(posts)
    }
    else {
      temp = utils.formatPostsToIds(utils.mergedPostsByTags(tags, activeTags));
      setPostTitles(temp);
      setActivePosts(temp)
    }
  }, [activeTags, posts, tags])


  useEffect(() => {

    setPostTitles(activePosts.filter(p => p.name.toLowerCase().includes(inputText.toLowerCase())));

  }, [inputText, activePosts])


  useEffect(() => {
    console.log(posts);
    console.log(tags);
  }, [posts, tags]);

  return (
    <div className="Blog maxWidth42 mxAuto">
      <div className="content">
        <h1>Blog</h1>

        <SearchBar handleChange={(e) => setInputText(e.target.value)}></SearchBar>

        {(postTags) ?
          <div className="tags">
            <button className={activeTags.length == 0 ? "tag hidden" : "tag"} onClick={() => { setActiveTags([]);  setActivePosts(posts); }}>&#10005;</button>
            {postTags.map((tag) => (
              <button key={tag.id} className={activeTags.indexOf(tag.name) == -1 ? "tag" : "tag tagActive"} type="button" onClick={() => handleTags(tag.name)}>{tag.name}</button>
            ))}
          </div>
          : null}

        {(postTitles) ?
          <ul>{postTitles.map((titolo, index) => (
            <li key={index}>
              <Link key={titolo.id} href={`/blog/${titolo.id}`} passHref>
                <a onClick={() => console.log(`apro la pagina ${titolo.name} con id ${titolo.id}`)}>{titolo.name}</a>
              </Link>
            </li>
          ))}</ul>
          : null
        }
      </div>
    </div>
  );
}
