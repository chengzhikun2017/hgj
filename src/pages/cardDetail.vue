<template>
  <div class="cardDetail" flex="dir:top">
    <app-nav title="信用卡详情" flex-box="0"></app-nav>
    <article flex-box="1">
      <div class="banner">
        
      </div>
      <div class="content">
        <div class="title">
          <img src="" alt="">
          <div class="msg">
            <h2>计划执行记录</h2>
            <p>当前计划</p>
          </div>
        </div>
        <div class="detail">
          <div class="line">
            <span>计划金额：</span>
            <span>10,000.00元</span>
          </div>
          <div class="line">
            <span>计划时间：</span>
            <span>8天</span>
          </div>
          <div class="line">
            <span>保证金：</span>
            <span>20%</span>
          </div>
          <div class="line">
            <span>每期费用：</span>
            <span>85.00元</span>
          </div>
          <app-button>修改计划</app-button> 
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  export default  {
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .cardDetail  {
    width: 100%;
    height: 100%;
    article {

    }
  }
</style>