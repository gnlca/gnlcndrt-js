import { React, useEffect, useState, Fragment } from "react";
import * as notion from "../../lib/notion";
// import { useRouter } from "next/router" 

import { TextBlock } from "../../components/TextBlock";
import { renderBlock } from "../../lib/renderBlock"

export default function Post({ post, blocks }) {

    // Da usare quando fallback: true in getStaticPaths 
    // router.isFallback evita che venga mostrata la pagina senza props
    // const router = useRouter()
    // if (router.isFallback) {
    //     return <div className="grid center fullHeight">Loading...</div>
    // }


    return(
        <div className="Post maxWidth42 mxAuto">
            <div className="content">
                <h1><TextBlock nodes={post.properties.Name.title} /></h1>
                <span>Last edit: {post.last_edited_time.split('T')[0]}</span>
                {blocks.map((block) => (<Fragment key={block.id}>{renderBlock(block)}</Fragment>))}
            </div>
        </div>
    )
}


export async function getStaticProps({ params: { id } }) {
    const post = await notion.getPage(id);    
    const blocks = await notion.getPageData(id);

    if (!post) return { notFound: true }

    return {
        props: { post, blocks },
        revalidate: 1800,
    }
}

export async function getStaticPaths() {
    const posts = await notion.getPosts(notion.databaseId);
    
    return ({
        paths: posts.map((post) => ({ params: { id: post.id } })),
        fallback: "blocking",
    });
}



