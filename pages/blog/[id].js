import { React, useEffect, useState } from "react";
import { databaseId, getPosts, getPage, getPageData, getBlocks } from "@/lib/notion";

import TextBlock from "@/components/TextBlock"


const Post = ({ post, blocks }) => {



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




