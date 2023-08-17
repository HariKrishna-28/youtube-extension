import { useEffect, useState } from "react"
import "~/style.css"

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState("")
  const [isYoutube, setIsYoutube] = useState(false)
  const youtubeURL = "https://www.youtube.com"

  const getCurrentUrl = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab?.url) {
      setCurrentUrl(tab.url)
      setIsYoutube(tab.url.includes(youtubeURL))
    }
  }

  useEffect(() => {
    getCurrentUrl()
  }, [currentUrl])


  return (
    <div id="root">
      {
        isYoutube ?
          <div>
            You are currently in youtube
          </div>
          :
          <div>
            <h2>
              This extension only works in youtube
            </h2>
          </div>
      }
    </div>
  )
}

export default IndexPopup