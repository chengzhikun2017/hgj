import axios from 'axios'
// 引入store 可以对基础的信息进行配置
import store from '@/store'

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // 超时时间设置
      timeout: 6000,
      // 请求的host设置
      baseURL: '',
      // 通过cookies进行认证
      withCredentials: true
    })
    instance(options).then(response => {
        // status必然是200
        const res = response.data
          // 根据陶雨的基本标准，做error的错误封装
          // if (res.error === 0) {
          // resolve(res.data)
          // } else {
          // reject(res.meg)
          // }
      })
      .catch(err => {
        // 加载失败：超时，无响应，无对应资源
        // 通过store数据驱动，做错误提示
        // store.dispatch('error', err)
      })
  })
}