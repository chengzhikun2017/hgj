<template>
  <div class="login" flex="dir:top">
    <app-nav flex-box="0">登录页</app-nav>
    <article>
      <div class="logo"></div>
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
        <p>新用户注册</p>
        <p>忘记密码？</p>
      </div>
    </article>
  </div>
</template>
<script>
  import '@/css/flex.css'
  import '@/css/font.css'
  import Regs from '../utils/reg.js'
  import CR from '../utils/commonRemind.js'
  import {mapActions} from 'vuex'
  import helper from '../utils/helper.js'
  export default {
    data () {
      return {
        phone:'13816938525',
        pwd:'12345678',
        pwdInputType:"password",
      }
    },
    computed:{
      phoneValid(){
        return Regs.phone(this.phone)
      },
    },
    methods:{
      checkValid() {
        if (!this.phoneValid) {
          CR.inputWarn(this,'请输入正确的手机号','phoneInput')
          // this.hgjToast({
          //   content: '请输入正确的手机号',
          //   cbEntered: () => {
          //     this.$refs.phoneInput.focus()
          //   }
          // })
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
                helper.goPage(-1)
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
        this.$refs.pwdInput.focus()
      },
      ...mapActions([
        'account_login'
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
    .logo {
      width: 100%;
      height: 1.22rem;
    }
    article {
      padding: 0 0.2rem;
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
      margin-top: 1.68rem;
    }
    .input{
      position: relative;
    }

  } 
</style>