import Head from "next/head"
import "../styles/global.css"

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
