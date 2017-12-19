<template>
  <div class="login">
    <app-nav title="注册页"></app-nav>
    <article>
      <div class="logo"></div>
      <div class="form">
        <label for="phone">验证码</label>
        <br>
        <input class="input" name="phone" type="text">
        <span class="resend">重新发送</span>
        <br>
        <label for="password">密码</label>
        <br>
        <input class="input" name="password" type="password">
        <br>
        <button>登录</button>
      </div>
      <app-protocol v-model="check"></app-protocol>
    </article>
  </div>
</template>
<script>
  import '@/css/flex.css'
  export default {
    data () {
      return {
        check: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .login {
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
      .input {
        outline: none;
        padding:0 0 0.15rem;
        border: none;
        border-bottom: 0.01rem solid #d3d3d3;
        font-size: 0.19rem
      }
      label {
        font-size: 0.14rem;
      }
      .resend {
        font-size: 0.14rem;
        color: #383838;
      }
      button {
        margin-top: 1.68rem;
        width: 100%;
        height: 0.44rem;
        font-size: 0.18rem;
        border:none;
        color: white;
        border-radius: 0.22rem;
        background-image: linear-gradient(to right, #f86b4b 1%, #f84b4b);
        box-shadow: 0 0.065rem 0.16rem 0 rgba(248, 81, 75, 0.36);
        
      }
    }
    .note {
      padding-top: 0.2rem;
      .radio {
        width: 0.15rem;
        height: 0.15rem;
        border-radius: 50%;
        background: #ffffff;
        border: 0.01rem solid #999999;
      }
      p {
        padding-left: 0.05rem;
        font-size: 0.15rem;
        color: #999999;
      }
    }
  } 
</style>