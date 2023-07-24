import { useEffect, useState } from "react"
import { fetchFolders } from "../lib/fetchUtilities"
import Gallery from "../components/Gallery"

export default function Index() {
  const [bgColor, setBgColor] = useState("rgba(0,0,0,0)")
  const [bgImage, setBgImage] = useState("none")
  const [loadingMessage, setLoadingMessage] = useState("Loading...")
  const [errorMessage, setErrorMessage] = useState(null)
  const [imageFolders, setImageFolders] = useState(null)
  const [musicFolders, setMusicFolders] = useState(null)
  const [currentFolder, setCurrentFolder] = useState(null)
  const [preloadedImages, setPreloadedImages] = useState([])

  useEffect(() => {
    const randomizeBackgroundColor = function() {
      const red = Math.floor(Math.random() * 256)
      const green = Math.floor(Math.random() * 256)
      const blue = Math.floor(Math.random() * 256)
      const alpha = Math.random()
      const rgba = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")"
      setBgColor(rgba)
      console.log(rgba)
    }

    // Run the function twice to start the transition effect as soon as the page loads, then run every 9 seconds
    setInterval(randomizeBackgroundColor, 9000)
    setTimeout(randomizeBackgroundColor, 1000)
    randomizeBackgroundColor()

    const setBackgroundImage = function(backgroundImageUrl, data) {
      setBgImage(backgroundImageUrl)
      console.log(backgroundImageUrl)
      setTimeout(randomizeBackgroundImage, 9000, data)
    }

    const randomizeBackgroundImage = async function(data) {
      const randomFileIndex = Math.floor(Math.random() * data[0].files.length)
      const image = data[0].files[randomFileIndex]
      const imageUrl = "https://storage.googleapis.com/personal-portfolio-media/" + image.filename
      const backgroundImageUrl = "url(" + imageUrl + ")"

      // If the background image has already been set, then preload the next image to prevent flickering
      if (bgImage && !preloadedImages.includes(backgroundImageUrl) && document.getElementById("hiddenDiv")) {
        const newImage = document.createElement("img")
        newImage.src = imageUrl
        newImage.onload = function() { setBackgroundImage(backgroundImageUrl, data) }
        document.getElementById("hiddenDiv").appendChild(newImage)
      } else {
        setBackgroundImage(backgroundImageUrl, data)
      }
    }

    // Save all folders from the API
    fetchFolders().then(([data, error]) => {
      if (data) {
        const imageData = []
        const musicData = []

        data.forEach(folder => {
          // Skip empty folders
          if (folder.files.length === 0) {
            return
          }

          // Separate music from images/videos
          if (folder.files[0].filename.endsWith(".mp3")) {
            musicData.push(folder)
          } else {
            imageData.push(folder)
          }
        });

        const randomFolderIndex = Math.floor(Math.random() * imageData.length)
        setCurrentFolder(imageData[randomFolderIndex])
        setImageFolders(imageData)
        setMusicFolders(musicData)
        randomizeBackgroundImage(imageData)
      } else {
        setErrorMessage(error)
      }
      setLoadingMessage(null)
    })
  }, [])

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
            <h1><a href="/">Aidan's Personal Portfolio Profile Page</a></h1>
          </header>
          <nav>
            <ul>
              {imageFolders && imageFolders.map((folder) => (
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
            <div id="hiddenDiv" className="hidden">
            </div>
          </main>
          <footer>
            <h3>
              <p><a href = "mailto:a.k.zamboni@gmail.com">a.k.zamboni@gmail.com</a></p>
            </h3>
          </footer>
        </div>
      }
    </div>
  )
}
