import Head from "next/head"
import styles from "../styles/Enjoyment.module.css"

const Enjoyment = () => {
  return (
    <>
      <Head>
        <title>Aidan's Personal Playground</title>
        <link rel="shortcut icon" type="image/x-icon" href="images/favicons/favicon.ico"/>
        <link rel="stylesheet" type="text/css" href="styles/enjoyment.css" />
        <script src="scripts/enjoyment.js"></script>
      </Head>
      <div onload="onLoad()">
        <header>
          <h1><a href="portfolio">Aidan's Personal Portfolio Profile Page</a></h1>
        </header>
        <nav>
          <ul>
            <li><button onclick="buildMainContent('projects')">Projects</button></li>
            <li><button onclick="buildMainContent('photos')">Photos</button></li>
            <li><button onclick="buildMainContent('videos')">Videos</button></li>
            <li><button onclick="buildMainContent('fun')">Fun</button></li>
          </ul>
        </nav>
        <main>
          <div id="mainContent"></div>
        </main>
        <footer>
          <h3 id="footerContent"></h3>
        </footer>
      </div>
    </>
  )
}

export default Enjoyment
