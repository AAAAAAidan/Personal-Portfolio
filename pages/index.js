import Gallery from "../components/Gallery.js"
import { useEffect, useState } from "react"
import { fetchJson } from "../lib/fetchUtilities.js"

export default function Index() {

  const [bgImage, setBgImage] = useState("none")
  const [bgColor, setBgColor] = useState("rgba(1, 1, 1, 0.3)")
  const [currentPage, setCurrentPage] = useState(null)
  const [folders, setFolders] = useState(null)

  const url = "http://localhost:3000"

  fetchJson(url + "/api/folders")
  .then((response) => {
    // TODO - Add files to the folders
    setFolders(response.data)
  })

  useEffect(() => {
    // TODO - Randomize the background image
    // const fileIndex = Math.floor(Math.random() * folders["Photos"].length)
    // const photo = folders["Photos"][fileIndex]
    // const bgUrl = "url(https://storage.googleapis.com/personal-portfolio-media/" + photo.filename + ")"
    // setBgImage(bgUrl)

    // Randomize the background color and opacity
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    const alpha = Math.random()
    const rgba = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")"
    setBgColor(rgba)
  }, [currentPage])

  return (
    <div id="pageDiv" onLoad={() => buildMainContent()} style={{backgroundImage: bgImage}}>
      <div id="contentDiv" style={{backgroundColor: bgColor}}>
        <header>
          <h1><a href="api">Aidan's Personal Portfolio Profile Page</a></h1>
        </header>
        <nav>
          <ul>
            {folders && folders.map((folder) => (
              <li key={folder.title}><button onClick={() => setCurrentPage(folder.title)}>{folder.title}</button></li>
            ))}
          </ul>
        </nav>
        <main>
          <div id="mainContent">
            <Gallery />
          </div>
        </main>
        <footer>
          <h3 id="footerContent">I made this site for fun!</h3>
        </footer>
      </div>
    </div>
  )
}
