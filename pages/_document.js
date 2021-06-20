import Document, { Html, Head, Main, NextScript } from "next/document";

import Navbar from "../components/navbar.js";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
            
        </Head>

        <body>
          <Navbar />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
