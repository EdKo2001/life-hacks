import Layout from "../components/Layout";

import type { AppProps } from "next/app";

import "../styles/style.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
