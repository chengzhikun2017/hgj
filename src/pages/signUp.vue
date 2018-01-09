<template>
  <div class="login">
    <app-nav >{{title}}</app-nav>
    <article>
      <div class="logo"></div>
      <div class="form">
        <div class="label">
          <span class="icon-qrcode"></span>
          <span class="label-name">图片验证码</span>
        </div>
        <div class="input">
          <app-input v-model='captcha' class='login-input' :placeholder='"请输入四位图片验证码"'></app-input>
          <div class="code-bttn " @click='getCaptcha' >
          <!-- 此行修改之后，code-bttn class可以取消 -->
            <img :src="captchaSrc" alt="获取图片码" @click='getCaptcha'>
          </div>
        </div>
        <div class="label">
          <span class="icon-qrcode"></span>
          <span class="label-name">验证码</span>
        </div>
        <div class="input">
          <app-input v-model='verifyCode' class='login-input' :placeholder='"请输入验证码"'></app-input>
          <bttn-code :validateMethod='canGetVerifyCode' :getCodeMethod='getVerifyCodePromise'></bttn-code>
        </div>
        <div class="label">
          <span class="icon-password"></span>
          <span class="label-name">密码</span>
        </div>
        <div class="input">
          <app-input v-model='pwd' ref='pwdInput' class='login-input' :placeholder='"请输入密码"' :type='pwdInputType'></app-input>
          <span class="icon-eye icon-pwd-type" @click='togglePwdType' :class='{"icon-pwd-hide":pwdInputType=="password"}'></span>
        </div>
        <div class="mybutton">
          <app-button @click.native='signUp' v-if='pageType==="signup"'>注册并登录</app-button>
          <app-button @click.native='findPwd' v-if='pageType==="findPwd"'>提交修改</app-button>
        </div>
      </div>
      <div class="protocol">
        <app-protocol v-model="check"></app-protocol>
      </div>
    </article>
  </div>
</template>
<script>
  import '@/css/flex.css'
  import {mapActions,mapMutations} from 'vuex'
  import helper from '../utils/helper.js'
  import Regs from '../utils/reg.js'
  import router from '../router'
  // import config from './config.js'
  export default {
    data () {
      return {
        check: true,
        verifyCode:'000000',
        pwd:'',
        pwdInputType:"password",
        codeBttnMsg:'获取验证码',
        // countdownTimer:null,
        captcha:null,
        captchaSrc:'#',
        // getCodeRecently:false,
      }
      
    },
    // beforeDestroy(){
    //   clearInterval(this.countdownTimer)
    // },
    computed:{
      pageType(){
        if(/forgetPwdStep/.test(this.$route.path)){
          return 'findPwd'
        }else{
          return 'signup'
        }
      },
      captchaValid(){
        return this.captcha&&this.captcha.length===4
      },
      pwdValid(){
        return Regs.pwd(this.pwd)
      },
      verifyCodeValid(){
        return /\d{6}/.test(this.verifyCode)
      },
      title(){
        // console.log('this.$route',this.$route)
        if(this.pageType==='findPwd'){
          return '忘记密码'
        }
        return '注册页'
      },
      // submitText(){
      //   if(this.pageType==='findPwd'){
      //     return '提交修改密码'
      //   }
      //   return '注册并登录'
      // },
    },
    watch:{
    },
    created(){
        // console.log('this.$route',this.$route)
      this.getCaptcha()
    },
    beforeRouteEnter(to,from,next){
      // console.log('to,from,next',to,from,next,)
      // console.log('/register/.test(from.name)',/register/.test(from.name))
      let path=to.path
      if(/register/.test(from.name)&&/signup/.test(path)){
        next()
      }else if(/forgetPwdStep1/.test(from.name)&&/forgetPwdStep2/.test(path)){
        next()
      }else{
        if(/signup/.test(path)){
          helper.replaceRouter('/register')
        }else if(/forgetPwdStep2/.test(path)){
          helper.replaceRouter('/forgetPwdStep1')
        }
        
      }
    },

    methods:{
      checkValid(){
        if(!this.verifyCodeValid){
          // 使用callback 定位对应的输入框 调用 commomRemind
          this.hgjToast('请输入正确的六位验证码',1)
          return false
        }
        if(!this.pwdValid){
          // 使用callback 定位对应的输入框 commomRemind
          this.hgjToast('请按要求输入密码',1)
          return false
        }
        return true
      },
      findPwd(){
        console.log('find pwd')
        if(!this.checkValid()){
          return
        }
        this.account_findPwd({
          phone:this.$store.state.account.phone,
          code:this.verifyCode,
          password:this.pwd,
        }).then(res=>{
          console.log('res account_findPwd',res)
          
          // return

          return
          if('success'){
            this.router_willBackToIndex()
            helper.goPage(-1)
          }
        })
      },
      signUp(){
        if(!this.checkValid()){
          return
        }
        this.account_signUp({
          password:this.pwd,
          code:this.verifyCode,
        }).then(res=>{
          this.router_willBackToIndex()
          helper.goPage(-1)
        })
      },
      togglePwdType(){
        if(this.pwdInputType==='text'){
          this.pwdInputType="password"
        }else{
          this.pwdInputType="text"
        }
        this.$refs.pwdInput.$refs.input.focus()
      },

      getCaptcha(){
        //todo: 万一没有手机号
        let url=helper.urlConcat('account/captcha',{
          phone:this.$store.state.account.phone,
          v:(new Date()).getTime()
        })
        this.captchaSrc='/api'+url
      },
      canGetVerifyCode(){
        if(!this.captchaValid){
          this.hgjToast('请输入正确的图片验证码',1)
          return false
        }
        return true
      },
      getVerifyCodePromise(countdown){
        console.log('get code')
        this.account_getVerifyCode(this.captcha).then(res=>{
          console.log('res get code success',res)
          countdown()
        })
      },

      ...mapMutations([
        'account_setCaptcha',
        'account_setVerifyCode',
        'router_willBackToIndex',
        ]),
      ...mapActions([
        'account_getCaptcha',
        'account_getVerifyCode',
        'account_findPwd',
        'account_signUp',
      ])
    },
  }
</script>
<style lang="scss" scoped>
  .login {
    article {
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
        position: relative;
      }
    }
    .mybutton {
      margin-top: 1.68rem;
    }
    .protocol {
      margin-top: 0.2rem;
    }
  } 


</style>