<template>
  <div class="editPwd hgj-container" flex="dir:top">
    <app-nav flex-box="0">修改密码</app-nav>
    <article flex-box="1">
      <app-formitem label="输入原来的密码" :first="true"></app-formitem>
      <app-formitem label="输入新密码" :last="true"></app-formitem>
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
  .editPwd {
    article {
      .mybutton {
        margin-top:1.25rem;
        padding:0 0.2rem;
      }
    }
  }
</style>