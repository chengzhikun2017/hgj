<template>
  <div class="addCard">
    <hgj-nav title="添加信用卡" flex-box="0"></hgj-nav>
    <article flex-box="1">
      <div class="form">
        <div class="input">
          <label for="">信用卡有效期</label>
          <input type="text" placeholder="">
        </div>
        <div class="input">
          <label for="">卡背后三位数字</label>
          <input type="text" placeholder="请输入">
        </div>
        <div class="input">
          <label for="">账单日</label>
          <input type="text" placeholder="请选择账单日">
        </div>
        <div class="input">
          <label for="">还款日</label>
          <input type="text" placeholder="请选择还款日">
        </div>
        <div class="input">
          <label for="">手机号</label>
          <input type="text" placeholder="请输入银行预留的手机号">
        </div>
        <div class="input">
          <label for="">验证码</label>
          <input type="text" placeholder="请输入验证码">| <span>重新发送</span>
        </div>
        <p>请务必输入正确的账单日和还款日，否则执行的还款计划会导致自动还款任务未完成的情况下已到还款日</p>
        <button>确认添加</b1utton>
      </div>
    </article>
  </div>
</template>
<script>
  import '@/css/flex.css'
  import nav from '@/pages/nav.vue'
  export default {
    components: {
      'hgj-nav': nav
    },
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .addCard {
    width:100%;
    height: 100%;
    article {
      
    }
  } 
</style>