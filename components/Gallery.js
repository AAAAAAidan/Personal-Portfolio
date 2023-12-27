import styles from "../styles/Gallery.module.css"
import { useEffect, useState } from "react"
import { storageUrl } from "../conf/settings"
import { randomIndex, previousIndex, nextIndex } from "../lib/mathUtilities"

export default function Gallery(props) {

  const files = props.files
  const [fileIndex, setFileIndex] = useState(0)

  useEffect(() =>  setFileIndex(randomIndex(files)), [files])

  return (
    <div>
      {files[fileIndex] &&
        <div>
          <div className={styles.gallery}>
            <button onClick={() => setFileIndex(previousIndex(files, fileIndex))}>Previous</button>
            {files[fileIndex].filename.includes(".mp4") &&
              <video className={styles.video} src={storageUrl + files[fileIndex].filename} controls>
                <source type="video/mp4" />
              </video>
            }
            {!files[fileIndex].filename.includes(".mp4") &&
              <img className={styles.image} src={storageUrl + files[fileIndex].filename} />
            }
            <button onClick={() => setFileIndex(nextIndex(files, fileIndex))}>Next</button>
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
