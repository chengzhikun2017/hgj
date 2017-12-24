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
        <app-formitem3 title="信用卡付款" note="激活使用信用卡，付款99折，无需网银！" :first="true" :notePoint="true">
          <div class="header" slot="icon">
            <span class="icon icon-creditcard red"></span>
          </div>
          <div class="content" slot="action">
          </div>
        </app-formitem3>
        <app-formitem3 title="微信支付" note="需要微信客户端打开">
          <div class="header" slot="icon">
            <span class="icon icon-wechat green"></span>
          </div>
          <div class="content" slot="action">
          </div>
        </app-formitem3>
        <app-formitem3 title="余额支付" note="充值送充气娃娃！">
          <div class="header" slot="icon">
            <span class="icon icon-money orange"></span>
          </div>
          <div class="content" slot="action">
          </div>
        </app-formitem3>
        <app-formitem3 title="储蓄卡快捷支付" note="绑卡就送苍老师限量版资源" :last="true">
          <div class="header" slot="icon">
            <span class="icon icon-bankcard blue"></span>
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
      .banner {
        padding: 0.15rem 0.2rem;
        background-image: -webkit-gradient(linear, left bottom, left top, from(#2c2c33), to(#3d404b));
        background-image: linear-gradient(to top, #2c2c33, #3d404b); 
        .plan {
          text-align: center;
          padding-top: 0.2rem;
          .note {
            font-size: 0.13rem;
            color: white;
            line-height: 1;
            padding-bottom: 0.1rem;
          }
          p {
            color: #f84f4b;
            font-size: 0.18rem;
            line-height: 1;
          }
        }
      }
      .order-content {
        padding-top: 0.2rem;
        .header {
          .icon {
            display: inline-block;
            width: 0.38rem;
            font-size: 0.24rem;
          }
        }
      }
      .mybutton {
        padding: 0.4rem 0.2rem;
      }
    }
  }
  .red {
    color: #f84f4b;
  }
  .green {
    color: #33d656;
  }
  .orange {
    color: #ed7d4c;
  }
  .blue {
    color: #4c89ed;
  }

</style>