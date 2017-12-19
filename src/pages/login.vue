<template>
  <div class="login" flex="dir:top">
    <app-nav title="登录页" flex-box="0"></app-nav>
    <article>
      <div class="logo"></div>
      <div class="form">
        <div class="label">
          <span class="icon-account"></span>
          <span class="label-name">手机号</span>
        </div>
        <div class="input">
          <app-input v-model='phone' class='login-input' :placeholder='"请输入手机号"'></app-input>
        </div>
        <div class="label">
          <span class="icon-password"></span>
          <span class="label-name">密码</span>
        </div>
        <div class="input">
          <app-input v-model='pwd' class='login-input' :placeholder='"请输入密码"' :type='"password"'></app-input>
          <span class="icon-eye"></span>
        </div>
        <div class="mybutton">
          <app-button>登录</app-button>
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
  export default {
    data () {
      return {
        phone:'',
        pwd:'',
      }
    }
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
    nav {
      height: 0.44rem;
      background: #f3f3f3;
      h1 {
        text-align: center;
        font-size: 0.18rem;
      }
      span {
        font-size: 0.15rem;
      }
    }
    article {
      padding: 0 0.2rem;
    }
    .form {
      .label {
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
    .icon-eye{
      position: absolute;
      right: 0;
      top: 0;bottom: 0;
      margin:auto 0;
      height: 0.15rem;
      color:#a4a4a4;
    }
  } 
</style>