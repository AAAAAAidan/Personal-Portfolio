import { useEffect, useState } from "react"

export default function MusicPlayer(props) {

  const [folderIndex, setFolderIndex] = useState(0)
  const files = props.folders[folderIndex].files
  const [fileIndex, setFileIndex] = useState(0)
  const storageUrl = "https://storage.googleapis.com/personal-portfolio-media/"

  useEffect(() => {
    // Randomize the folder and file indexes
    setFolderIndex(Math.floor(Math.random() * props.folders.length))
    setFileIndex(Math.floor(Math.random() * files.length))
  }, [])

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
          <button onClick={() => previous()}>|&lt;&lt;</button>
          <b>{files[fileIndex].title}</b>
          <button onClick={() => next()}>&gt;&gt;|</button>
          <br />
          <audio controls key={files[fileIndex].filename}>
            <source type="audio/mpeg" src={storageUrl + files[fileIndex].filename} />
            Your browser does not support the audio element.
          </audio>
        </div>
      }
      {!files[fileIndex] &&
        <p>{fileIndex}</p>
      }
    </div>
  )
}
