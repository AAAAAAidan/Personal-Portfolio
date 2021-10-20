import styles from "../styles/Gallery.module.css"
import { useEffect, useState } from "react"

export default function Gallery(props) {

  const files = props.files
  const [fileIndex, setFileIndex] = useState(0)
  const storageUrl = "https://storage.googleapis.com/personal-portfolio-media/"

  useEffect(() => {
    // Randomize the file index
    const randomFileIndex = Math.floor(Math.random() * files.length)
    setFileIndex(randomFileIndex)
  }, [files])

  // Go to previous file index
  function previous() {
    if (fileIndex - 1 < 0) {
      setFileIndex(files.length - 1)
    } else {
      setFileIndex(fileIndex - 1)
    }
  }

  // Go to next file index
  function next() {
    if (fileIndex + 1 >= files.length) {
      setFileIndex(0)
    } else {
      setFileIndex(fileIndex + 1)
    }
  }

  return (
    <div>
      {files[fileIndex] &&
        <div>
          <div className={styles.gallery}>
            <button onClick={() => previous()}>Previous</button>
            {files[fileIndex].filename.includes(".mp4") &&
              <video className={styles.video} src={storageUrl + files[fileIndex].filename} controls>
                <source type="video/mp4" />
              </video>
            }
            {!files[fileIndex].filename.includes(".mp4") &&
              <img className={styles.image} src={storageUrl + files[fileIndex].filename} />
            }
            <button onClick={() => next()}>Next</button>
          </div>
          <h3>{files[fileIndex].title}</h3>
          <h4>{files[fileIndex].description}</h4>
        </div>
      }
      {!files[fileIndex] &&
        <p>{fileIndex}</p>
      }
    </div>
  )
}
