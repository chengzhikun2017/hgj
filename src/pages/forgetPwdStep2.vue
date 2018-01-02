<template>
  <div class="forgetPwdStep2 hgj-container" flex="dir:top">
    <app-nav flex-box="0">忘记密码</app-nav>
    <article flex-box="1">
      <div class="logo"></div>
      <div class="form">
        <div class="label">
          <span class="icon-safe"></span>
          <span class="label-name">验证码</span>
        </div>
        <div class="input">
        </div>
        <div class="label">
          <span class="icon-password"></span>
          <span class="label-name">密码</span>
        </div>
        <div class="input">
        </div>
      </div>
      <div class="mybutton">
        <app-button>确认修改</app-button>
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .forgetPwdStep2 {
    article {
      padding:0 0.2rem;
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