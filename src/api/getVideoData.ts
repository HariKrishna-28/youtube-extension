import axios from "axios"

const baseURL = "https://youtube-transcript-api.cyclic.app"

export const getVideoData = (videoId: string) => {
  const config = {
    method: "get",
    url: `${baseURL}/${videoId}`
  }
  console.log(config)
  return axios(config)
}
