<template>
  <div class="addCreditCard2" flex="dir:top">
    <app-nav flex-box="0">添加信用卡</app-nav>
    <article flex-box="1">
      <div class="form">
        <app-formitem label="信用卡有效期" :first="true"></app-formitem>
        <app-formitem label="卡背后三位数字" ></app-formitem>
        <app-formitem label="账单日" ></app-formitem>
        <app-formitem label="还款日" ></app-formitem>
        <app-formitem label="手机号" ></app-formitem>
        <app-formitem label="验证码" :last="true"></app-formitem>
        <div class="note" flex>
          <span class="icon-alert"></span>
          <p>请务必输入正确的账单日和还款日，否则执行的还款计划会导致自动还款任务未完成的情况下已到还款日</p>
        </div>
        <div class="mybutton">
          <app-button>确认添加</app-button>
        </div>
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
  .addCreditCard2 {
    width:100%;
    height: 100%;
    article {
      overflow: auto;
      background: #f3f3f3;
      .note {
        padding: 0.16rem 0.2rem;
        font-size: 0.14rem;
        color: #a4a4a4;
        .icon-alert {
          position: relative;
          top: 0.03rem;
          padding-right: 0.1rem;
        }
      }
      .mybutton {
        margin-top: 1.05rem;
        padding:0 0.2rem;
      }
    }
  } 
</style>