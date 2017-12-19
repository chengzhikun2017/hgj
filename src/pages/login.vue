<template>
  <div class="login">
    <app-nav title="登录页"></app-nav>
    <article>
      <div class="logo"></div>
      <div class="form">
        <label for="phone">手机号</label>
        <br>
        <input class="input" name="phone" type="text">
        <br>
        <label for="password">密码</label>
        <br>
        <input class="input" name="password" type="password">
        <br>
        <button>登录</button>
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
  export default {
    data () {
      return {

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
      p {
        font-size: 0.15rem;
        color: #999999;
      }
    }
  } 
</style>