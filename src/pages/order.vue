<template>
  <div class="order">
    <app-nav title="支付订单"></app-nav>
    <article>
      <div class="banner">
        <app-creditcard v-model="card1"></app-creditcard>
        <div class="plan">
          <div class="note">
            养成计划：
          </div>
          <p>10天 / 5%保证金</p>
        </div>
      </div>
      <div class="order-content">
        <app-formitem3 title="了解养成计划" note="详细了解养成计划">
          <div class="header" slot="icon">
          </div>
          <div class="content" slot="action">
          </div>
        </app-formitem3>
        <div class="mybutton">
          <app-button>确认支付</app-button>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        card1: {
          type: 'none',
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
  .order {
    width: 100%;
    height: 100%;
    article {
      background: #f3f3f3;
      overflow: auto;
      .mybutton {
        padding: 0.4rem 0.2rem;
      }
    }
  }
</style>