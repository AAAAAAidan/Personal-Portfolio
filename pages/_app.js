import Head from "next/head"
import "../styles/global.css"

export default function PersonalPortfolio({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Aidan's Personal Playground</title>
        <link rel="shortcut icon" type="image/x-icon" href="images/favicons/favicon.ico"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
