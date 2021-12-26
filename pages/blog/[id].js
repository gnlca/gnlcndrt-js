import { React, useEffect, useState, Fragment } from "react";
import { databaseId, getPosts, getPage, getPageData, getBlocks } from "../../lib/notion";

import { TextBlock } from "../../components/TextBlock";
import { renderBlock } from "../../components/renderBlock"

export default function Post({ post, blocks }) {
    console.log(post);
    console.log(blocks);

    return(
        <div className="Post maxWidth42 mxAuto">
            <div className="content">
                <h1><TextBlock nodes={post.properties.Name.title} /></h1>
                {blocks.map((block) => (<div key={block.id}>{renderBlock(block)}</div>))}
            </div>
        </div>
    )
}


export async function getStaticProps({ params: { id } }) {
    const post = await getPage(id);
    const blocks = await getPageData(id);

    return {
        props: { post, blocks },
        revalidate: 1800,
    }
}

export async function getStaticPaths() {
    const posts = await getPosts(databaseId);
    
    return ({
        paths: posts.map((post) => ({ params: { id: post.id } })),
        fallback: "blocking",
    });
}




