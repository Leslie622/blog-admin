import axios from "axios"

export function request(config) {
  const instance = axios.create({
    baseURL: "https://4xiaer.com:8001/land",
    timeout: 3000,
    withCredentials: true,
  })
  return instance(config)
}

  //拦截器

  // //请求拦截
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   // 作用：
  //   // 1.比如config中的一些信息不符合服务器的要求
  //   // 2.比如每次发送网络请求时，希望在界面中显示一些图标
  //   // 3.某些网络请求必须携带一些特殊的信息，比如登录的token
  //   return config
  // }, err => {
  //   console.log(err);
  // })

  // //响应拦截
  // instance.interceptors.response.use(res => {
  //   console.log(res);
  //   return res //注意操作完数据之后需要返回，否则拿不到数据
  // }, err => {
  //   console.log(err);
  // })



