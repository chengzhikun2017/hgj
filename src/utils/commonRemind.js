import {HGJ_VUE} from '../main.js'
class commonRemind {
  static inputWarn(vm, content, refName) {
    vm.hgjToast({
      content: content,
      cbEntered: () => {
        // console.log('vm.$refs[refName]',vm.$refs[refName])
        vm.$refs[refName].$refs.input.focus()
        // vm.$refs[refName].focus()
      },
      type:'normal',
    })
  }
  static unloginRemind(){
    HGJ_VUE.hgjAlert({
      title:'请登录',
      options:[
        { text:'取消',color:'#ccc'},
        { text:'登录',callback:()=>{
          helper.goPage('/login')
        }},
      ]
    })
  }
}
export default commonRemind