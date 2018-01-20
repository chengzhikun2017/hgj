import axios from 'axios'
// 引入store 可以对基础的信息进行配置
import store from '@/store'
import {HGJ_VUE} from '../main.js'
import helper from '../utils/helper.js'
import commonRemind from './commonRemind.js'
// const apiUrl='https://hgj.wd577.cn/api'
const apiUrl='/api'
function handleUnlogin(res){
  console.log('%c handleUnlogin','color:red',)
  if(!HGJ_VUE.$store.state.account.userId){
    return
  }
  commonRemind.unloginRemind()
 
}
function handleWrongCode(res){
  // HGJ_VUE.hgjToast({
  //   content:res.message,
  //   type:'error',
  // })
  HGJ_VUE.hgjAlert(res.message)
}
// console.log('process',process)
export default function fetch(options,showloading=1) {
  var fetchPromis=new Promise((resolve, reject) => {
    if(showloading&&HGJ_VUE){
      HGJ_VUE.hgjShowLoading()
    }
    const instance = axios.create({
      // 超时时间设置
      timeout: 30000,
      // 请求的host设置
      baseURL: apiUrl,
      // 通过cookies进行认证
      withCredentials: true,
      // headers: {'Access-Control-Allow-Origin': "*"},
    })

    instance(options).then(response => {
        // status必然是200
        if(showloading&&HGJ_VUE){
          HGJ_VUE.hgjHideLoading()
        }
        console.log('responese to>>>%c'+options.url,'color:green','<<<',response)
        const res = response.data
          // 根据陶雨的基本标准，做error的错误封装
        if (res.error === 0) {
          resolve(res.data)
        } else {
          // let code=res.error
          switch(res.error){
            case 20006:handleUnlogin(res);break;
            // case 20040:resolve(res);break;
            // case 20011:handleWrongCode(res);break;
            // case 20012:handleWrongCode(res);break;
            // case 20006:console.log('code 20006');break;
            default: handleWrongCode(res)
          }
          
        }
      })
      .catch(err => {
        if(showloading&&HGJ_VUE){
          HGJ_VUE.hgjHideLoading()
        }
        // 加载失败：超时，无响应，无对应资源
        // 通过store数据驱动，做错误提示
        // store.dispatch('error', err)
      })
  })
  fetchPromis.then(res=>{},err=>{

    console.log('error fetch',err)
  })
  return fetchPromis
}
function simpleFetch(options) {
    console.log('------------simpleFetch')
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // 超时时间设置
      timeout: 6000,
      // 请求的host设置
      baseURL: apiUrl,
      // 通过cookies进行认证
      withCredentials: true,
      // headers: {'Access-Control-Allow-Origin': "*"},
    })
    instance(options).then(response => {
        // status必然是200
        console.log('simpleFetch responese to>>>%c'+options.url,'color:blue','<<<',response)
        const res = response
          // 根据陶雨的基本标准，做error的错误封
        if(res.data.error==0){
          resolve(res)
        }else{
          console.log('options',options)
          HGJ_VUE.hgjAlert(res.message)
          reject(res.message)
        }
      })
      .catch(err => {
        // 加载失败：超时，无响应，无对应资源
        // 通过store数据驱动，做错误提示
        // store.dispatch('error', err)
      })
  })
}
export {simpleFetch}