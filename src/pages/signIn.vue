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
          <!-- 绝对定位 可好？ -->
        </div>
        <div class="label">
          <span class="icon-password"></span>
          <span class="label-name">密码</span>
        </div>
        <div class="input">
          <app-input v-model='pwd' class='login-input' :placeholder='"请输入密码"' :type='"password"'></app-input>
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
      }
    }
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