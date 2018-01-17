<template>
  <div class="promotion" flex="dir:top">
    <app-nav flex-box="0" :showBack='false'>推广</app-nav>
    <article flex-box="1">
      <div class="banner">
        <div class="circle" flex="main:center cross:bottom">
          <div class="bannercontent">
            <div class="title" flex="main:center cross:center">
              <div class="rank">
                <img src="/static/img/rank.png" alt="">
              </div>
              <div class="level">
                <div class="msg">当前级别：{{crrtLvText}}</div>
                <p class="note"  v-if='!nextLvText'>您目前已经是最高级别！</p>
                <p class="note" v-if='nextLvText'>下一级别：{{nextLvText}}</p>
              </div>
            </div>
            <div class="content">
              <div class="bar" flex="main:center cross:center">
                <div class="liner" flex-box="1"></div>
                <div class="star" flex-box="0">
                  <span class="icon-star"></span>
                </div>
                <div class="note" flex-box="0">{{nextLvText?'马上升级获取更多权益吧':'传奇属于您'}}</div>
                <div class="star" flex-box="0">
                  <span class="icon-star"></span>
                </div>
                <div class="liner" flex-box="1"></div>
              </div>
              
              <div class="point"  v-if='!nextLvText'>
                恭喜您！ 您已升至最高级别
              </div>
              <p  v-if='!nextLvText'>请尽情享受您的权益吧！</p>
            </div>
          </div>
          <div class="incircle">
            <div class="active-box" v-if='nextLvText'>
              <app-button @click.native='upgradePay' style='margin:0 0.15rem'>升级</app-button>
              <app-button @click.native='upgradeFree' style='margin:0 0.15rem'>免费升级</app-button>
            </div>
          </div>
        </div>
      </div>
      <div class="accountUpdateContent">
        <div class="topbar" flex="cross:center">
          <app-cricleicon icon="icon-star" flex-box="0" circle="small" bgcolor="bg-blue" size="0.28rem"></app-cricleicon>
          <h3 flex-box="1" class="title">下一级别权益</h3>
          <span class="btn" flex-box="0" >了解规则</span>
        </div>
        <div class="cutliner">
        </div>
       <!--  <p>1. 享受25%的激活码购买折扣，祝您邀请更多的同道好友！</p>
        <p>2. 享受最高达35%的巨大分润！</p>
        <p>3. 享受多至2成的再次分润！</p> -->
        <p v-if='crrtLv==0'>1、享受35%的收益；</p>
        <p v-if='crrtLv==4'>1、享受45%的收益；</p>
        <p v-if='crrtLv==4'>2、享受大众多余的10%收益。</p>
        <p v-if='crrtLv==3'>1、享受60%的收益；</p>
        <p v-if='crrtLv==3'>2、享受大众多余的25%收益；</p>
        <p v-if='crrtLv==3'>3、享受保时捷多余的15%收益；</p>
        <p v-if='crrtLv==3'>4、享受同级别推广的3%奖励。</p>

      </div>
   
      <div class="accountUpdateContent">
        <h3 class="topbar" flex="cross:center">
          <app-cricleicon icon="icon-star" flex-box="0" circle="small" bgcolor="bg-blue" size="0.28rem"></app-cricleicon>
          <h3 flex-box="1" class="title">概览</h3>
          <span class="btn">更多详情</span>
        </h3>
        <div class="cutliner">
        </div>
        <div class="share-breif">
          <p class="share-detail">推广总人数：<span>10人</span></p>
          <p class="share-detail">推广总收入：<span>2371.92元</span></p>
        </div>
      </div>
    </article>
    <div class="mybutton" flex-box="0">
      <app-button @click.native='showShare'>邀请好友赚分润</app-button>
    </div>
<!--     <div class="lv-box">
      <p class="crrt-lv">当前级别：{{crrtLvText}}</p>
      <p class="next-lv" v-if='nextLvText'>下一级别：{{nextLvText}}</p>
    </div> -->
    <!-- <div class="lv-treatment">
      <h3 class="sub-title">
        当前等级权益
      </h3>
      <p class="treatment-detail">1.享受25%的激活码购买折扣，助您邀请更多同道中人。</p>
      <p class="treatment-detail">2.享受最高达35%的分润。</p>
      <p class="treatment-detail">3.享受多至两级的再次分润。</p>
    </div> -->
    <!-- <h2 class="slogan" style="padding:0 0.15rem">马上升级获取更多权益</h2> -->

    
    <!-- <app-button @click.native='share' style='width:80%;margin: 0 auto;'>分享有礼</app-button> -->
    <!-- <app-button @click.native='goJihuo' style='width:80%;margin: 0 auto;'>马上激活</app-button> -->

  </div>
</template>

<script>
import helper from '../utils/helper.js'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods:{
    showShare(){
      this.$store.commit('share_show')
    },
    activePay(){
      helper.goBuy('active')
    },
    activeFree(){
      helper.goBuyFree('active')
    },
    upgradeFree(){
      helper.goBuyFree('upgrade')
    },
    upgradePay(){
      helper.goBuy('upgrade')
    },
    share(){
      
    },
    ...mapActions([
      'order_createActive',
      ])
  },
  computed:{
    crrtLv(){
      return this.$store.state.account.level
    },
    crrtLvText(){
      switch(this.crrtLv){
        case 0:return '无级别';break;
        case 1:return '股东';break;
        case 2:return '劳斯莱斯';break;
        case 3:return '保时捷';break;
        case 4:return '大众';break;
      }
    },
    nextLvText(){
      switch(this.crrtLv){
        case 0:return '大众';break;
        case 1:return null;break;
        case 2:return null;break;
        case 3:return '劳斯莱斯';break;
        case 4:return '保时捷';break;
      }
    },
  },
  events: {},
  components: {},

}
</script>

<style lang='scss' scoped>
.promotion {
  width: 100%;
  height: 100%;
  article {
    background: white;
    overflow: auto;
    .banner {
      position: relative;
      height: 2.39rem;
      overflow: hidden;
      width: 100%;
      .circle {
        position: absolute;
        top: -8.91rem;
        left: 50%;
        margin-left: -5.65rem;
        width: 11.3rem;
        height: 11.3rem;
        border-radius: 50%;
        background: #323232;
        overflow: hidden;
        .incircle {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          border-radius: 50%;
          box-shadow:0 0 0.5rem #999 inset;
        }
        .bannercontent {
          width: 3.35rem;
          height: 2.39rem;
          .title {
            height: 1.02rem;
            .rank {
              img {
                width: 0.4rem;
                display: block;
              }
            }
            .level {
              margin-left: 0.15rem;
              .msg {
                margin-bottom: 0.09rem;
                font-size: 0.15rem;
                color: #f8d444;
                line-height: 1;
              }
              .note {
                font-size: 0.12rem;
                color: rgba(255, 255, 255, 0.56);
                line-height: 1;
              }
            }
          }
          .content {
            width: 100%;
            height: 1.37rem;
            box-sizing: border-box;
            padding:0.15rem 0.15rem 0;
            border-radius: 0.1rem;
            background: white;
            .bar {
              .liner {
                height: 1px;
                background: #d3d3d3;
                transform: scaleY(.5);
              }
              .note {
                color: #383838;
                font-size: 0.13rem;
                line-height: 1;
              }
              .star {
                color: #d3d3d3;
                font-size: 0.12rem;
                line-height: 1;
                padding:0 0.15rem;
              }
            }
            .point {
              margin-top: 0.3rem;
              font-size: 0.2rem;
              font-weight: 900;
              line-height: 1;
              color: #383838;
              text-align: center;
            }
            p {
              margin-top: 0.15rem;
              font-size: 0.13rem;
              color: #a4a4a4;
              line-height: 1;
              text-align: center;
            }
          }
        }
      }
    }
    .accountUpdateContent {
      padding:0.2rem 0.2rem 0;
      .topbar {
        .title {
          margin-left: 0.1rem;
          font-size: 0.19rem;
          color: #383838;
          line-height: 1;
          font-weight: 600;
        }
        .btn {
          padding: 0.05rem 0.14rem;
          border-radius: 0.03rem;
          font-size: 0.13rem;
          color: white;
          line-height: 1;
          background: #53d769;
        }
      }
      .cutliner {
        margin:0.1rem 0;
        height: 1px;
        border: 1px dashed #d3d3d3;
        transform: scaleY(.5);
      }
      p {
        font-size: 0.14rem;
        color: #383838;
        line-height: 1.5;
        margin-bottom: 0.1rem;
      }
      
    }
  }
}
.active-box{
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;right: 0;
  width: 3rem;
  height: 1rem;
  margin: 0 auto;
  /*z-index: 2;*/
  padding:0.25rem;
}
.mybutton {
  padding: 0.1rem 0.2rem;
}
/*.lv-treatment{
  border:1px solid red;
  padding:0.15rem;
  p{
    font-size: 0.15rem;
     color:#333;
=======

  .active-box{

    display: flex;
    padding:0.25rem;
>>>>>>> 07ef829a45fd66619f11e568161492432feecacf
  }
  /*.lv-treatment{
    border:1px solid red;
    padding:0.15rem;
    p{
      font-size: 0.15rem;
       color:#333;
    }
  }*/
  .share-breif-box{
    border:1px solid red;
    padding: 0.15rem;
    .share-detail{
      font-size: 0.15rem;
      color:#333;
    }
  }
/*}*/
</style>
