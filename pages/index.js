import { useEffect, useState } from "react"
import { storageUrl } from "../conf/settings"
import { fetchFolders } from "../lib/fetchUtilities"
import { randomIndex } from "../lib/mathUtilities"
import Gallery from "../components/Gallery"
import MusicPlayer from "../components/MusicPlayer"
import TextRandomizer from "../components/TextRandomizer"

export default function Index() {
  const [bgColor, setBgColor] = useState("rgba(0,0,0,0)")
  const [bgImage, setBgImage] = useState("none")
  const [loadingMessage, setLoadingMessage] = useState("Loading...")
  const [errorMessage, setErrorMessage] = useState(null)
  const [imageFolders, setImageFolders] = useState(null)
  const [currentImageFolder, setCurrentImageFolder] = useState(null)
  const [niceQualityMusicFolder, setNiceQualityMusicFolder] = useState(null)
  const [highQualityMusicFolder, setHighQualityMusicFolder] = useState(null)
  const [currentMusicFolder, setCurrentMusicFolder] = useState(null)
  const [preloadedImages, setPreloadedImages] = useState([])

  const randomizeBackgroundColor = function() {
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    const alpha = Math.random()
    const rgba = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")"
    setBgColor(rgba)
  }

  const setBackgroundImage = function(backgroundImageUrl, data) {
    setBgImage(backgroundImageUrl)
    setTimeout(randomizeBackgroundImage, 9000, data)
  }

  const randomizeBackgroundImage = async function(data) {
    // Find a random image in the photos folder
    const photosFolderIndex = data.findIndex(folder => folder.title = "Photos")
    const randomFileIndex = randomIndex(data[photosFolderIndex].files)
    const image = data[photosFolderIndex].files[randomFileIndex]
    const imageUrl = storageUrl + image.filename
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

  // Switch from normal mix to high quality mix or vice versa
  const swapMusicMix = function() {
    setCurrentMusicFolder(oldFolder => {
      if (oldFolder.title === "Nice Quality Mix") {
        return highQualityMusicFolder
      } else {
        return niceQualityMusicFolder
      }
    })
  }

  useEffect(() => {
    // Run the function twice to start the transition effect as soon as the page loads, then run every 9 seconds
    setInterval(randomizeBackgroundColor, 9000)
    setTimeout(randomizeBackgroundColor, 1000)
    randomizeBackgroundColor()

    // Save all folders from the API
    fetchFolders().then(([data, error]) => {
      if (data) {
        const imageData = []

        data.forEach(folder => {
          // Skip empty folders
          if (folder.files.length === 0) {
            return
          }

          // Separate music from images/videos
          if (folder.title === "Nice Quality Mix") {
            setNiceQualityMusicFolder(folder)
            setCurrentMusicFolder(folder)
          } else if (folder.title === "High Quality Mix") {
            setHighQualityMusicFolder(folder)
          } else {
            imageData.push(folder)
          }
        });

        const randomFolderIndex = randomIndex(imageData)
        setImageFolders(imageData)
        setCurrentImageFolder(imageData[randomFolderIndex])
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
        <h1>{loadingMessage}<img src="/cat.gif" alt="A cat swaying its head" /></h1>
      }
      {errorMessage &&
        <h1>{errorMessage}</h1>
      }
      {!loadingMessage && !errorMessage &&
        <div id="contentDiv" style={{backgroundColor: bgColor}}>
          <header>
            <h1>
              <button onClick={() => swapMusicMix()}>Aidan's Personal Portfolio Profile Page</button>
            </h1>
          </header>
          <nav>
            <hr />
            <ul>
              {imageFolders && imageFolders.map((folder) => (
                <li key={folder.title}>
                  <button onClick={() => setCurrentImageFolder(folder)}>{folder.title}</button>
                </li>
              ))}
            </ul>
            <hr />
          </nav>
          <main>
            <div>
              <h2>{currentImageFolder.description}</h2>
              <Gallery files={currentImageFolder.files} />
            </div>
            <div id="hiddenDiv" className="hidden">
            </div>
          </main>
          <footer>
            <hr />
            <h3>
              <TextRandomizer />
            </h3>
            <hr />
            <div>
              <MusicPlayer files={currentMusicFolder.files} />
            </div>
          </footer>
        </div>
      }
    </div>
  )
}
