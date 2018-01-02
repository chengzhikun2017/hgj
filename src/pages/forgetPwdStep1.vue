<template>
  <div class="forgetPwdStep1 hgj-container" flex="dir:top">
    <app-nav flex-box="0">忘记密码</app-nav>
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
      </div>
      <div class="mybutton">
        <app-button>获取验证码</app-button>
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        phone: ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  .forgetPwdStep1 {
    article {
      padding: 0 0.2rem;
      background: white;
      .logo {
        width: 100%;
        height: 1.22rem;
        background: white;
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
        position: absolute;
        left: 0.2rem;
        right: 0.2rem;
        bottom: 0.945rem;
      }
    }
  }
</style>