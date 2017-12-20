<template>
  <div class="cardDetail" flex="dir:top">
    <app-nav title="信用卡详情" flex-box="0"></app-nav>
    <article flex-box="1">
      <div class="banner">
        <app-bluecard v-model="card1"></app-bluecard>
      </div>
      <div class="content">
        <div class="planbox">
          <header flex="cross:center">
            <span class="icon" flex="main:center cross:center" flex-box="0">
              <span class="icon-plan"></span>
            </span>
            <div class="title" flex="dir:top main:center" flex-box="1">
              <h2>计划执行记录</h2>
              <p>当前计划</p>
            </div>
          </header>
          <div class="planbox-content">
            <div class="liner"></div>
            <app-formitem2 label="计划还款：">
              <span class="msg">2000.00元</span>
            </app-formitem2>
             <app-formitem2 label="计划时间：">
              <span class="msg">8天</span>
            </app-formitem2>
            <app-formitem2 label="保证金：">
              <span class="msg">20%</span>
            </app-formitem2>
            <app-formitem2 label="每期费用：">
              <span class="msg">85.00元</span>
            </app-formitem2>
          </div>
          <div class="footer">
            <app-button>开启还款计划</app-button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import '@/css/components.scss'
  export default  {
    data () {
      return {
        card1: {
          type: 'edit',
          name: '韩**',
          lastNo: '3638',
          billDate: 3,
          payDate: 13
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .cardDetail  {
    width: 100%;
    height: 100%;
    article {
      background: #f3f3f3;
      overflow: auto;
      .banner {
        padding: 0.15rem 0.2rem;
        background-image: linear-gradient(to top, #2c2c33, #3d404b);
      }
      .content {
        padding: 0.2rem;
      }
    }
  }
</style>