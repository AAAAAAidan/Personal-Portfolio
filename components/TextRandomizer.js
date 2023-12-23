import { useEffect, useState } from "react"

export default function TextRandomizer(props) {

  const [content, setContent] = useState(null)

  // The footer will build a randomized sentence using words from this variable.
  const footerWords = [
    ["Blithering buffoon", "Uncouth cretin", "Sad sop", "Cheerful child"], // subject descriptor
    ["Billy", "Bob", "Sandy", "Tim"], // subject
    ["loves to", "hates to", "continues to", "never stops to"], // action descriptor
    ["eat lots of", "drink all of the", "kick a lot of", "smell the"], // action
    ["soup", "water", "rocks", "dirt"], // object
    [".", "!", "?"] // punctuation
  ]

  // Randomize the footer content
  useEffect(() => {
    let contentString = ""

    for (let wordsIndex = 0; wordsIndex < footerWords.length; wordsIndex++) {
      const word = footerWords[wordsIndex]
      const wordIndex = Math.floor(Math.random() * word.length)
      contentString += " " + word[wordIndex]
    }

    const length = contentString.length
    contentString = contentString.slice(0, length - 2) + contentString.slice(length - 1)
    setContent(contentString)
  }, [])

  return (
    <div>
      <p>{content}</p>
    </div>
  )
}
