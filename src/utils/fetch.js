import axios from 'axios'
// 引入store 可以对基础的信息进行配置
import store from '@/store'
import {HGJ_VUE} from '../main.js'
import Router from '@/router'

function handleUnlogin(res){
  HGJ_VUE.hgjAlert({
    content:res.message,
    options:[
      { text:'取消',color:'#ccc'},
      { text:'登录',callback:()=>{
        Router.push('/login')
      }},
    ]
  })
}
function handleWrongCode(res){
  // HGJ_VUE.hgjToast({
  //   content:res.message,
  //   type:'error',
  // })
  HGJ_VUE.hgjAlert(res.message)
}

export default function fetch(options,showloading=1) {
  var fetchPromis=new Promise((resolve, reject) => {
    const instance = axios.create({
      // 超时时间设置
      timeout: 6000,
      // 请求的host设置
      // baseURL: 'http://106.14.119.213:9009/api/',
      baseURL: '/api',
      // 通过cookies进行认证
      withCredentials: true,
      // headers: {'Access-Control-Allow-Origin': "*"},
    })
    HGJ_VUE.hgjShowLoading()
    instance(options).then(response => {
        // status必然是200
        HGJ_VUE.hgjHideLoading()
        console.log('responese',response)
        const res = response.data
          // 根据陶雨的基本标准，做error的错误封装
        if (res.error === 0) {
          resolve(res.data)
        } else {
          // let code=res.error
          switch(res.error){
            case 20006:handleUnlogin(res);break;
            // case 20011:handleWrongCode(res);break;
            // case 20012:handleWrongCode(res);break;
            // case 20006:console.log('code 20006');break;
            default: handleWrongCode(res)
          }
          
        }
      })
      .catch(err => {
        HGJ_VUE.hgjHideLoading()
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
export function simpleFetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // 超时时间设置
      timeout: 6000,
      // 请求的host设置
      // baseURL: 'http://106.14.119.213:9009/api/',
      baseURL: '/api',
      // 通过cookies进行认证
      withCredentials: true,
      // headers: {'Access-Control-Allow-Origin': "*"},
    })
    instance(options).then(response => {
        // status必然是200
        console.log('simpleFetch responese',response)
        const res = response
          // 根据陶雨的基本标准，做error的错误封
        if(res.status==200){
          resolve(res)
        }else{
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