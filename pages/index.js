import { useEffect, useState } from "react"
import { fetchFolders } from "../lib/fetchUtilities"
import Gallery from "../components/Gallery"

export default function Index() {

  const [bgColor, setBgColor] = useState("rgba(0,0,0,0)")
  const [bgImage, setBgImage] = useState("none")
  const [loadingMessage, setLoadingMessage] = useState("Loading...")
  const [errorMessage, setErrorMessage] = useState(null)
  const [folders, setFolders] = useState(null)
  const [currentFolder, setCurrentFolder] = useState(null)

  useEffect(() => {
    if (currentFolder) {
      // Randomize the background image
      const randomFileIndex = Math.floor(Math.random() * folders[0].files.length)
      const photo = folders[0].files[randomFileIndex]
      const bgUrl = "url(https://storage.googleapis.com/personal-portfolio-media/" + photo.filename + ")"
      setBgImage(bgUrl)

      // Randomize the background color and opacity
      const red = Math.floor(Math.random() * 256)
      const green = Math.floor(Math.random() * 256)
      const blue = Math.floor(Math.random() * 256)
      const alpha = Math.random()
      const rgba = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")"
      setBgColor(rgba)
    } else {
      // Save all folders from the API
      fetchFolders()
      .then(([data, error]) => {
        if (data) {
          setFolders(data)
          const randomFolderIndex = Math.floor(Math.random() * data.length)
          setCurrentFolder(data[randomFolderIndex])
        } else {
          setErrorMessage(error)
        }
        setLoadingMessage(null)
      })
    }
  }, [currentFolder])

  return (
    <div id="pageDiv" style={{backgroundImage: bgImage}}>
      {loadingMessage &&
        <h1>{loadingMessage}</h1>
      }
      {errorMessage &&
        <h1>{errorMessage}</h1>
      }
      {!loadingMessage && !errorMessage &&
        <div id="contentDiv" style={{backgroundColor: bgColor}}>
          <header>
            <h1><a href="/api/files">Aidan's Personal Portfolio Profile Page</a></h1>
          </header>
          <nav>
            <ul>
              {folders && folders.map((folder) => (
                <li key={folder.title}>
                  <button onClick={() => setCurrentFolder(folder)}>{folder.title}</button>
                </li>
              ))}
            </ul>
          </nav>
          <main>
            <div>
              <h2>{currentFolder.description}</h2>
              <Gallery files={currentFolder.files} />
            </div>
          </main>
          <footer>
            <h3>
              <p>Content retrieved from <a href="https://aidan.contact/api">aidan.contact/api</a></p>
              <p>Contact me at <a href = "mailto:a.k.zamboni@gmail.com">a.k.zamboni@gmail.com</a></p>
            </h3>
          </footer>
        </div>
      }
    </div>
  )
}
