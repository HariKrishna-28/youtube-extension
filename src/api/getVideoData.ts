import axios from "axios"

const baseURL = "http://localhost:8181"

export const getVideoData = (videoId: string) => {
  const config = {
    method: "get",
    url: `${baseURL}/${videoId}`
  }
  console.log(config)
  return axios(config)
}
