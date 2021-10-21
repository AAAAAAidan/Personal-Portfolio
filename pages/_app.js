import "../styles/global.css"
import Head from "next/head"

export default function PersonalPortfolio({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Aidan's Personal Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
