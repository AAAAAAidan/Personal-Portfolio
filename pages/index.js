export default function Index() {
  return (
    <div onload="onLoad()">
      <header>
        <h1><a href="api">Aidan's Personal Portfolio Profile Page</a></h1>
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
  )
}
