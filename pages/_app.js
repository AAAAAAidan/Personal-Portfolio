import "../styles/global.css"
import Head from "next/head"

export default function PersonalPortfolio({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Random is funny!!!!" />
        <title>Aidan's Personal Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
