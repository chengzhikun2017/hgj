<template>
  <div class="bluecard">
    <div class="card">
      <div class="floor" flex="main:justify">
        <div class="logo"></div>
        <span class="btn1" v-show="value.type === 'build'">查看明细</span>
        <span class="btn1" v-show="value.type === 'change'">换一张卡</span>
      </div>
      <div class="floor floor2" flex="main:justify">
        <div class="left">
          <span>{{value.name}}</span>
          <span class="liner">|</span>
          <span>卡片尾号：{{value.lastNo}}</span>
        </div>
        <span class="btn2" v-show="value.type === 'build'">建立还款计划</span>
      </div>
      <div class="floor">
        <span>账单日：每月{{value.billDate}}号 <span class="liner">|</span> 还款日：每月{{value.payDate}}号</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Object,
        default: (function () {
          return {
            type: 'build',
            name: '韩**',
            lastNo: '3638',
            billDate: 3,
            payDate: 13
          }
        })()
      }
    },
    data () {
      return {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .card {
    box-sizing: border-box;
    width: 100%;
    height: 1.68rem;
    padding: 0.2rem 0.15rem;
    border-radius: 0.08rem;
    background-image: linear-gradient(to right, #64a6f8, #6767e8);
    box-shadow: 0px 26px 78px 0 rgba(13, 13, 13, 0.56);
    .floor {
      font-size: 0.13rem;
      color: white;
      .liner {
        padding:0 0.06rem;
      }
      &.floor2 {
        padding-top: 0.265rem;
        padding-bottom: 0.15rem;
        border-bottom: 1px dashed white;
        margin-bottom: 0.15rem;
      }
    }
    .btn1 {
      display: block;
      width: 0.78rem;
      height: 0.25rem;
      border-radius: 0.125rem;
      background-color: #ffffff;
      box-shadow: 0px 0.015rem 0.065rem 0 rgba(13, 13, 13, 0.26);
      text-align: center;
      line-height: 0.25rem;
      font-size: 0.13rem;
      color: #676dea;
    }
    .btn2 {
      display: inline-block;
      border:0.005rem solid white;
      padding:0.025rem 0.16rem;
      border-radius: 0.125rem;
      background: transparent;
      color: white;
    }
  }
</style>