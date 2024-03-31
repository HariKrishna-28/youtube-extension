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
  const [transcriptData, setTranscriptData] = useState<CaptionType[] | null>(captions)
  const [loading, setLoading] = useState(true)


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
    startLoad()
    try {
      const res = await getVideoData(queryParam)
      setCaptions(res.data)
      setTranscriptData(res.data)
    } catch (error) {
      console.log(error.message)
    }
    stopLoad()
  }

  const startLoad = () => setLoading(true)
  const stopLoad = () => setLoading(false)

  const filterData = (inputValue: String) => {
    if (inputValue == null) return captions
    const lowercasedInput = inputValue.toLowerCase();

    const filteredData = captions.filter(item => {
      return item.text.toLowerCase().includes(lowercasedInput);
    });

    return filteredData
  };

  const handleInput = (e: String) => {
    if (loading) return
    setTranscriptData(filterData(e))
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
          !loading ?
            <div>
              <div style={{ padding: '10px', marginTop: '40px' }}>
                <input
                  onChange={(e) => handleInput(e.target.value)}
                  type="text"
                  placeholder="Enter keyword"
                />
              </div>
              <CaptionRenderer captions={transcriptData} />
            </div>
            :
            <div>
              <h2>
                Loading
              </h2>
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