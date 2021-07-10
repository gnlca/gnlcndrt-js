import React from "react";
import Image from "next/image";

import Link from "next/link";

import Logo from "../public/logo.svg";

export default function Navbar() {
  return (
    <nav className="Navbar sticky ">
      <div className="flex spaceBetween alignCenter mxAuto ">
        <Link href="/">
          <a className="noLink flex alignCenter">
            <Logo className="" fill="var(--Bianco)" width={100} />
          </a>
        </Link>
        <ul className="inlineGrid center col4auto colGap07 noList inline noMarginPadding">
          <li>
            <Link href="/about">
              <a className="noLink">about</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a className="noLink">blog</a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a className="noLink ">projects</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className="noLink">contact</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
