import axios from "axios"

export function request(config) {
  const instance = axios.create({
    baseURL: "https://4xiaer.com:8001/land",
    timeout: 3000,
    withCredentials: true,
  })
  return instance(config)
}


