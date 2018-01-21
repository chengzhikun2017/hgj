<template>
  <div class="populizeShare hgj-container" flex="dir:top">
    <app-nav flex-box="0">推广统计页面</app-nav>
    <article flex-box="1">
      <div class="banner" flex="dir:top main:center cross:center">
        <div class="people">
          <span class="icon-money"></span>
          <span class="number">{{(share_totalFee / 100).toFixed(2)}}</span>
        </div>
        <div class="note" flex="cross:center">
          <div class="linerleft" flex-box="1"></div>
          <div class="msg">我当前的分润</div>
          <div class="linerright" flex-box="1"></div>
        </div>
      </div>
      <div class="populizeShare-content">
        <div class="title" flex="cross:center">
          <app-cricleicon bgcolor="bg-red" icon="" flex-box="0"></app-cricleicon>
          <h2 flex-box="1">分润记录</h2>
          <button flex-box="0">提现</button>
        </div>
        <div class="liner"></div>
        <div class="points">
          <p>账号激活分润: <span class="point">+{{share_accountActiveFee | money}}元</span></p>
          <p>代理升级分润: <span class="point">+{{share_repaymentPlanFee | money}}元</span></p>
          <p>智能还卡计划分润: <span class="point">+{{share_levelUpFee | money}}元</span></p>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {

      }
    },
    filters: {
      money (val) {
        if(!val) return 0
        else return (val / 100).toFixed(2)
      }
    },
    computed: {
      ...mapGetters([
        'share_accountActiveFee',
        'share_repaymentPlanFee',
        'share_levelUpFee',
        'share_totalFee'
        ])
    }
  }
</script>
<style lang="scss" scoped>
  .populizeShare {
    .banner {
      height: 1.78rem;
      background-image: linear-gradient(to top, #1ca3b1, #35b4c1);
      .people {
        .icon-money {
          font-size: 0.16rem;
          color: white;
        }
        .number {
          font-size: 0.34rem;
          color: white;
        }
      }
      .note {
        /*width: 2.28rem;*/
        .linerleft {
          width: 0;
          height: 0;
          border-top: 0.01rem solid transparent;
          border-bottom: 0.01em solid transparent;
          border-right: 0.655rem solid #cbf6fa;
        }
        .linerright {
          width: 0;
          height: 0;
          border-top: 0.01rem solid transparent;
          border-bottom: 0.01em solid transparent;
          border-left: 0.655rem solid #cbf6fa;
        } 
        .msg {
          font-size: 0.13rem;
          color: #cbf6fa;
          line-height: 1;
          padding: 0 0.1rem;
        }
      }
    }
    .populizeShare-content {
      margin-top: 0.1rem;
      padding: 0 0.2rem;
      background: white;
      .title {
        padding: 0.2rem 0;
        h2 {
          padding-left: 0.1rem;
        }
        button {
          padding: 0.05rem 0.25rem;
          border-radius: 0.03rem;
          border: none;
          outline: none;
          font-size: 0.13rem;
          line-height: 1;
          color: white;
          background-color: #53d769;
        }
      }
      .liner {
        border:1px dashed #d3d3d3;
        height: 1px;
        transform: scaleY(.5);
      }
      .points {
        padding-top: 0.125rem;
        padding-bottom: 0.175rem;
        font-size: 0.14rem;
        color: #a4a4a4;
        line-height: 1;
        p {
          padding: 0.075rem 0;
        }
        .point {
          color: #f15151;
        }        
      }
    }
  }
</style>