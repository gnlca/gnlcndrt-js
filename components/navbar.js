import React from "react";
import Image from "next/image";

import Logo from "../public/logo.svg";

export default function Navbar() {
  return (
    <nav className="inlineGrid alignCenter col2auto sticky">
      <Logo fill="var(--Bianco)" width={100} />
      <ul className="inlineGrid col3auto colGap05 noList inline noMarginPadding">
        <li><a>blog</a></li>
        <li><a>projects</a></li>
        <li><a>projects</a></li>
      </ul>
    </nav>
  );
}
