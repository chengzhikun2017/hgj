<template>
  <div class="activeaccount" flex="dir:top">
    <app-nav flex-box="0">激活账户</app-nav>
    <article flex-box="1">
      <div class="banner">
        <h1 flex="cross:center">
          <app-cricleicon icon="icon-active" flex-box="0" circle="small" bgcolor="bg-lightblue" size="0.28rem"></app-cricleicon>
          <span class="title" flex-box="1">激活账户说明</span>
        </h1>
        <div class="dash-line"></div>
        <!-- <p>(1)激活后可以使用智能还卡服务</p>
        <p>(2)首次使用智能还卡免服务费</p>
        <p>(3)未激活不影响推广分享收益</p>
        <p>(4)激活费用限时5折优惠</p> -->
        <p>(1)开业酬宾免费激活</p>
        <p>(2)激活后可以使用智能还卡服务</p>
        <p>(3)未激活不影响推广分享收益</p>
      </div>

      <div class="bttn-box">
        <app-button @click.native='goActivePay' class='bttn'>付费激活</app-button>
        <app-button @click.native='goActiveFree' class='bttn'>免费激活</app-button>
      </div>
    </article>
  </div>
</template>
<script>
  import helper from '../utils/helper.js'
  import {mapActions,mapMutations} from 'vuex'
  export default {
    data () {
      return {
        popFlag: false,
      }
    },
    methods:{
      goActivePay(){
        helper.goBuy('active')
      },
      goActiveFree(){
        helper.goBuyFree('active')
      },
      ...mapActions([
        'order_createActive',
        ])
    },
  }
</script>
<style lang="scss" scoped>
  .bttn-box{
    display: flex;
    width: 100%;
    height: 1.25rem;
    padding:0.1rem;
    /*border:1px solid red;*/
    .bttn{
      flex-grow:1;
      margin:0.1rem;
    }
  }
  .activeaccount {
    position: relative;
    width: 100%;
    height: 100%;
    article {
      overflow: auto;
      background: #f3f3f3;
      .banner {
        width: 100%;
        /*height: 1.78rem;*/
        background: white;
        padding:0.25rem 0.2rem;
        h1 {
          font-size: 0.19rem;
          font-weight: 600;
          line-height: 1.53;
          text-align: left;
          color: #3b3b3b;
          .title {
            padding-left: 0.1rem;
          }
        }
        p{
          font-size: 0.14rem;
          line-height: 1;
          margin-bottom: 0.15rem;
          text-align: left;
          color: #3b3b3b;
        }
        .dash-line{
          margin:0.2rem 0;
          border:0px dashed #d2d2d2;
          border-bottom-width: 1px;
        }
      }
      .activeaccount-content {
        padding-top: 0.2rem;
        .info {
          border-top: 1px solid #d3d3d3;
          font-size: 0.14rem;
          color: #a4a4a4;
          padding:0.13rem 0.2rem;
          background: white;
        }
        .header {
          padding-right: 0.15rem;
        }
        .content {
          font-size: 0.13rem;
          color: #a4a4a4;
        }
      }
    }
    .popView {
      position: fixed;
      top:0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, .8);
      .popcontent {
        position: absolute;
        left: 0.2rem;
        right: 0.2rem;
        bottom: 0.2rem;
        .planbox-content {
          .ways {
            li {
              width: 33%;
            }
            p {
              font-size: 0.14rem;
              color: #7d7d7d;
            }
          }
        }
      }
    }
  }
</style>