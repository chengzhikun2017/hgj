<template>
  <div class="login">
    <app-nav title="注册页"></app-nav>
    <article>
      <div class="logo"></div>
      <div class="form">
        <div class="label">
          <span class="icon-qrcode"></span>
          <span class="label-name">验证码</span>
        </div>
        <div class="input">
          <app-input v-model='code' class='login-input' :placeholder='"请输入验证码"'></app-input>
          <div class="getcode-bttn"></div> 
          
          <div class="code-bttn " :class="{'code-bttn-disabled':countdownTimer!==null}"@click='getVerifyCode' >{{codeBttnMsg}}</div>
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
          <app-button>注册并登录</app-button>
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
  export default {
    data () {
      return {
        check: true,
        code:'',
        pwd:'',
        pwdInputType:"password",
        codeBttnMsg:'获取验证码',
        countdownTimer:null,
        // getCodeRecently:false,
      }
      
    },
    beforeDestroy(){
      clearInterval(this.countdownTimer)
    },
    methods:{
      togglePwdType(){
        if(this.pwdInputType==='text'){
          this.pwdInputType="password"
        }else{
          this.pwdInputType="text"
        }
        this.$refs.pwdInput.focus()
      },
      countdownGetCode(){
        // this.getCodeRecently=true
        let remainSec=5
        this.codeBttnMsg=remainSec+'s后获取'
        remainSec--
        let timer=setInterval(()=>{
          if(remainSec==0){
            this.codeBttnMsg='重新获取'
            clearInterval(timer)
            this.countdownTimer=null
            return
          }
          this.codeBttnMsg=remainSec+'s后获取'
          remainSec--
        },1000)
        this.countdownTimer=timer
        return timer
      },
      getVerifyCode(){
        if(this.countdownTimer){
          return
        }
        this.countdownGetCode()
        console.log('get code')
      },
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
  .code-bttn{
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      display: flex;
      align-items:center;
      justify-content: center;
      margin:auto 0;
      height: 0.28rem;
      width: 0.85rem;
      font-size: 0.14rem;
      border:0px solid #d3d3d3;
      border-left-width: 1px;
      line-height: 1.86;
      text-align: center;
      color: #383838;
  }
  .code-bttn-disabled{
    color:#f84f4b;
  }
</style>