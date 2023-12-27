import { useEffect, useState } from "react"
import { storageUrl } from "../conf/settings"
import { randomIndex, previousIndex, nextIndex } from "../lib/mathUtilities"

export default function MusicPlayer(props) {

  const files = props.files
  const [fileIndex, setFileIndex] = useState(0)

  useEffect(() => setFileIndex(randomIndex(files)), [files])

  return (
    <div>
      {files[fileIndex] &&
        <div>
          <button onClick={() => setFileIndex(previousIndex(files, fileIndex))}>|&lt;&lt;</button>
          <b>{files[fileIndex].title}</b>
          <button onClick={() => setFileIndex(nextIndex(files, fileIndex))}>&gt;&gt;|</button>
          <br />
          <audio controls src={storageUrl + files[fileIndex].filename}></audio>
        </div>
      }
      {!files[fileIndex] &&
        <p>{fileIndex}</p>
      }
    </div>
  )
}
