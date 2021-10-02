import Head from "next/head"
import Link from "next/link"

const Home = () => {
  return (
    <>
      <Head>
        <title>Aidan's Personal Portfolio</title>
        <link rel="shortcut icon" type="image/x-icon" href="images/favicons/favicon.ico"/>
      </Head>
      <div>
        <p>This page will undergo a complete redesign!</p>
        <Link href="/enjoyment"><a>Get enjoyment</a></Link>
      </div>
    </>
  )
}

export default Home
