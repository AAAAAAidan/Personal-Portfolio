import { useEffect, useState } from "react"
import { randomIndex, randomIndexValue } from "../lib/mathUtilities"

export default function TextRandomizer(props) {

  const [footerWords, setFooterWords] = useState([])

  // The footer will build a randomized sentence using words from this variable.
  const words = [
    ["Blithering buffoon", "Uncouth cretin", "Sad sop", "Cheerful child"], // subject descriptor
    [" Billy", " Bob", " Sandy", " Tim"], // subject
    [" loves to", " hates to", " continues to", " never stops to"], // action descriptor
    [" eat lots of", " drink all of the", " kick a lot of", " smell the"], // action
    [" soup", " water", " rocks", " dirt"], // object
    [".", "!", "?"] // punctuation
  ]

  const randomizeWordInFooter = function() {
    setFooterWords(oldFooterWords => {
      const indexToUpdate = randomIndex(words)
      let updatedFooterWords = oldFooterWords.slice()
      updatedFooterWords[indexToUpdate] = randomIndexValue(words[indexToUpdate])
      return updatedFooterWords
    });
  }

  // Randomize the footer content
  useEffect(() => {
    setFooterWords(words.map(wordArray => randomIndexValue(wordArray)))
    setInterval(randomizeWordInFooter, 6000)
  }, [])

  return (
    <div>
      <p>{footerWords.join("")}</p>
    </div>
  )
}
