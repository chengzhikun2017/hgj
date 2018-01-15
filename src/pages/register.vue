<template>
  <div class="register hgj-container" flex="dir:top">
    <app-nav flex-box="0">{{title}}</app-nav>
    <article flex-box="1">
      <div class="logo"></div>
      <div class="form">
        <div class="label">
          <span class="icon-account"></span>
          <span class="label-name">手机号</span>
        </div>
        <div class="input">
          <app-input v-model='phone' ref='phoneInput' class='login-input' :placeholder='"请输入手机号"'></app-input>
        </div>
        <div class="mybutton">
          <app-button @click.native='nextStep'>下一步</app-button>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import Regs from '../utils/reg.js'
  import {mapActions} from 'vuex'
  import helper from './../utils/helper.js'
  // import API from '../api'
  // import accountAPI from '../api/account.js'

  export default {
    data () {
      return {
        phone:'',
      }
    },
    methods:{
      nextStep(){
        if(this.pageType==='findPwd'){
          this.goFindPwd()
        }
        if(this.pageType==='signup'){
          this.goSignUp()
        }
      },
      goSignUp(){
        this.isPhoneRegisted(this.phone).then(res=>{
          // console.log('res,account_isPhoneRegister',res)
          if(res.status===1){
            this.hgjAlert({
              title:'已有账号',
              // todo
              // options:[

              // ],
            })
          }else{
            helper.goPage('/signup')
          }
        })
      },
      goFindPwd(){
        this.isPhoneRegisted(this.phone).then(res=>{
          console.log('res,account_isPhoneRegister',res)
          if(res.status===0){
            this.hgjAlert({
              title:'账号不存在，是否前往注册',
              // todo
              options:[
                {
                  text:'注册',callback:()=>{
                    helper.goPage('/register')
                }},{
                  text:'取消',callback:()=>{
                }},
              ],
            })
          }else{
            helper.goPage('/forgetPwdStep2')
          }
        })
      },
      ...mapActions({
        isPhoneRegisted:'account_isPhoneRegister'
      })
    },
    computed:{
      pageType(){
        if(/forgetPwdStep/.test(this.$route.path)){
          return 'findPwd'
        }else{
          return 'signup'
        }
      },
      title(){
        // console.log('this.$route',this.$route)
        if(this.pageType==='findPwd'){
          return '忘记密码'
        }
        return '注册页'
      },
      phoneValid(){
        // this.$store.commit('account_setPhone',this.phone)
        return Regs.phone(this.phone)
      },
    },
    created(){
      if(this.$store.state.account.phone){
        this.phone=this.$store.state.account.phone
      }
    },
    watch:{
      phoneValid(v){
        if(v){
          this.$store.commit('account_setPhone',this.phone)
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .register {
    
    article {
      background: white;
      padding: 0 0.2rem;
      .logo {
        width: 100%;
        height: 1.22rem;
      }
    }
    .form {
      .label {
        padding-top: 0.1rem;
        font-size: 0.14rem;
        color: #a4a4a4;
        .label-name {
          padding-left: 0.05rem;
        }
      }
      .input {
        width: 100%;
      }
    }
    .mybutton {
      margin-top: 0.36rem;
    }
  } 
</style>