import { React, useEffect, useState, Fragment } from "react";
import Head from 'next/head';
// import { useRouter } from "next/router" 

import * as notion from "../../lib/notion";
import { extractId, formatDate, formatPostsToIds, } from "../../lib/utils"
import { TextBlock } from "../../components/TextBlock";
import { renderBlock } from "../../lib/renderBlock"


export default function Post({ post, blocks }) {

    // Da usare quando fallback: true in getStaticPaths 
    // router.isFallback evita che venga mostrata la pagina senza props
    // const router = useRouter()
    // if (router.isFallback) {
    //     return <div className="grid center fullHeight">Loading...</div>
    // }


    // console.log(blocks);

    return (

        <div className="Post maxWidth42 mxAuto">
            <Head>
                <title>NDRT - {post.properties.Name.title[0].plain_text}</title>
            </Head>
            <div className="content wrapWord">
                <h1>{post.properties.Name.title[0].plain_text}</h1>
                <span>{formatDate(post.last_edited_time)}</span>
                {blocks.map((block) => (<Fragment key={block.id}>{renderBlock(block)}</Fragment>))}
            </div>
        </div>
    )
}


export async function getStaticProps({ params: { id } }) { //id corrisponde a slug ma next.js accusi o vo'
    let postId = extractId(id);
    const post = await notion.getPage(postId);
    const blocks = await notion.getPageData(postId);

    if (!post) return { notFound: true }

    return {
        props: { post, blocks },
        revalidate: 1800,
    }
}

export async function getStaticPaths() {
    const posts = formatPostsToIds(await notion.getPosts(notion.databaseId));

    return ({
        paths: posts.map((post) => ({ params: { id: post.id } })),
        fallback: "blocking",
    });
}




