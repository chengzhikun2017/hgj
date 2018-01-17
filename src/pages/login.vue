<template>
  <div class="login" flex="dir:top">
    <app-nav flex-box="0">登录页</app-nav>
    <article>
      <div class="logo" flex="main:center cross:center">
        <img src="/static/img/logo.jpg" alt="">
      </div>
      <div class="form">
        <div class="label">
          <span class="icon-account"></span>
          <span class="label-name">手机号</span>
        </div>
        <div class="input">
          <app-input v-model='phone' ref='phoneInput' class='login-input' :placeholder='"请输入手机号"'></app-input>
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
          <app-button @click.native='login'>登录</app-button>
        </div>
      </div>
      <div class="note" flex="main:justify">
        <p @click='goSignUp'>新用户注册</p>
        <p @click='goForgetPwd'>忘记密码？</p>
      </div>
    </article>
  </div>
</template>
<script>
  import '@/css/flex.css'
  import '@/css/font.css'
  import Regs from '../utils/reg.js'
  import CR from '../utils/commonRemind.js'
  import {mapActions,mapMutations} from 'vuex'
  import helper from '../utils/helper.js'
  export default {
    data () {
      return {
        phone:'',
        pwd:'',
        pwdInputType:"password",
      }
    },
    computed:{
      phoneValid () {
        if (!Regs.phone(this.phone)) {
          CR.inputWarn(this,'请输入正确的手机号','phoneInput')
          return false
        }
        return true
      },
      passwordValid () {
        if (this.pwd.length < 6) {
          CR.inputWarn(this,'密码不能小于6位','pwdInput')
          return false
        }
        return true
      }
    },
    methods:{
      goForgetPwd(){
        helper.goPage('/forgetPwdStep1')
      },
      goSignUp(){
        helper.goPage('/register')
      },
      checkValid() {
        if (!Regs.phone(this.phone)) {
          CR.inputWarn(this,'请输入正确的手机号','phoneInput')
          return false
        }
        if (this.pwd.length < 6) {
          CR.inputWarn(this,'密码不能小于6位','pwdInput')
          return false
        }
        return true
      },
      login() {
        if (this.checkValid()) {
          //login
          this.account_login({phone:this.phone,pwd:this.pwd})
          .then(res=>{
            this.hgjToast({
              content:'登录成功',
              cbEntered:()=>{
                console.log('cbEntered')
                this.router_willBackToIndex()
                this.$router.go(-1)
                // helper.goPage(-1)
                //todo: 跳转
                
              }
            })
            console.log('res login', res)
          })
        }
      },
      togglePwdType() {
        if (this.pwdInputType === 'text') {
          this.pwdInputType = "password"
        } else {
          this.pwdInputType = "text"
        }
        this.$refs.pwdInput.$refs.input.focus()
      },
      ...mapActions([
        'account_login'
        ]),
      ...mapMutations([
        'router_willBackToIndex',

        ])
  },
  created() {

  },
  }
</script>
<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    article {
      padding: 0 0.2rem;
      overflow: auto;
      .logo {
        width: 100%;
        height: 1.22rem;
        img {
          width: 1rem;
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
      .note {
        padding-top: 0.2rem;
        p {
          font-size: 0.15rem;
          color: #999999;
        }
      }
      .mybutton {
        margin-top: 0.36rem;
      }
      .input{
        position: relative;
      }
    }
  } 
</style>