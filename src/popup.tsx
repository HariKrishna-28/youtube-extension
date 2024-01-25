import { useEffect, useState } from "react"
import "~/style.css"
import { getVideoData } from "~api/getVideoData"
import CaptionRenderer from "~components/CaptionRenderer"
import type { CaptionType } from "~types/CaptionType"

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState("")
  const [prevUrl, setPrevUrl] = useState<String>(null)
  const [isYoutube, setIsYoutube] = useState(false)
  const [queryParam, setQueryParam] = useState("")
  const [captions, setCaptions] = useState<CaptionType[] | null>(null)


  // should only be displayed in youtube video tabs
  const youtubeURL = "https://www.youtube.com/watch"

  const getCurrentUrl = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab?.url) {
      const urlSearchParams = new URLSearchParams(new URL(tab.url).search);
      const videoId = urlSearchParams.get("v");
      setCurrentUrl(tab.url)
      // set thte first query param that is v in this case
      setQueryParam(videoId)
      setIsYoutube(tab.url.includes(youtubeURL))
    }
  }


  const getTranscripts = async () => {
    try {
      const res = await getVideoData(queryParam)
      setCaptions(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (currentUrl == prevUrl) {
      console.log("Value already there")
    }
    setPrevUrl(currentUrl)
    getCurrentUrl()
  }, [currentUrl])

  useEffect(() => {
    if (!isYoutube) return
    getTranscripts()
  }, [isYoutube])



  return (
    <div id="root">
      {
        isYoutube ?
          <div>
            <div style={{ padding: '10px', marginTop: '40px' }}>
              <h2>Hello!</h2>
              <input type="text" placeholder="check text" />
            </div>
            <CaptionRenderer captions={captions} />
          </div>
          :
          <div>
            <h2>
              This extension only works in youtube videos.
            </h2>
          </div>
      }
    </div>
  )
}

export default IndexPopup