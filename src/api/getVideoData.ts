import axios from "axios"

const baseURL = "http://localhost:5000"

export const getVideoData = (videoId: string) => {
  const config = {
    method: "get",
    url: `${baseURL}/${videoId}`
  }
  console.log(config)
  return axios(config)
}
