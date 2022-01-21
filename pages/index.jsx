import { React, useEffect, useState } from "react";
import Head from 'next/head';
import Image from 'next/image';

import { getPosts } from "../lib/notion"
import ThemeToggle from "../components/ThemeToggle"


export default function Home() {

  return (
    <div >
      <Head>
        <title>gnlcndrt</title>
        <meta name="description" content="Gianluca Andretta" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <main>
        <div className="grid center fullHeight">
          <p>ciccio</p>
        </div>
      </main>
      <footer>
      </footer>
    </div>
  )
}
