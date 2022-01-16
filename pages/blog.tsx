import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from 'next/link';
import { Client } from "@notionhq/client";

import SearchBar from "../components/SearchBar";

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
  const [postsTitles, setPostsTitles] = useState(posts);
  const [activePosts, setActivePosts] = useState(posts);
  const [postsTags, setPostsTags] = useState(tags);
  const [activeTags, setActiveTags] = useState([]);
  const [inputText, setInputText] = useState("");


  async function handleTags(tagName) {
    if (activeTags.indexOf(tagName) == -1) {
      setActiveTags([...activeTags, tagName])
    } else {
      setActiveTags(activeTags.filter(t => (t != tagName)))
    }
  }

  // ACTIVE TAGS FILTER
  useEffect(() => {
    let tmp;
    if (activeTags.length == 0) {
      setPostsTitles(posts);
      setActivePosts(posts)
    }
    else {
      tmp = utils.formatPostsToIds(utils.mergedPostsByTags(tags, activeTags));
      setPostsTitles(tmp);
      setActivePosts(tmp)
    }
  }, [activeTags, posts, tags])


  // SEARCH FILTER
  useEffect(() => {
    setPostsTitles(activePosts.filter(p => p.name.toLowerCase().includes(inputText.toLowerCase())));
  }, [inputText, activePosts])


  // FIRST RENDER PROPS USEFFECT
  useEffect(() => {
    // console.log(posts);
    // console.log(tags);
  }, [posts, tags]);

  return (
    <div className="Blog maxWidth42 mxAuto">
      <div className="content">

        <h1>Blog</h1>

        <SearchBar handleChange={(e) => setInputText(e.target.value)}></SearchBar>

        {/* TAGS */}
        {(postsTags) ?
          <div className="tags">
            <button className={activeTags.length == 0 ? "tag hidden" : "tag"} onClick={() => { setActiveTags([]); setActivePosts(posts); }}>&#10005;</button>
            {postsTags.map((tag) => (
              <button key={tag.id} className={activeTags.indexOf(tag.name) == -1 ? "tag" : "tag tagActive"} type="button" onClick={() => handleTags(tag.name)}>{tag.name}</button>
            ))}
          </div>
          : null}

        {/* POSTS */}
        {(postsTitles) ?
          <ul>{postsTitles.map((titolo, index) => (
            <li key={index}>
              <Link key={titolo.id} href={`/blog/${titolo.name.replace(' ','-')}_${titolo.id}`} passHref>
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
