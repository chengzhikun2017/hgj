<template>
  <div class="cards" flex="dir:top">
    <nav flex="cross:center" flex-box="0">
      <span flex-box="0">返回</span>
      <div class="tabs" flex-box="1" flex="main:center">
        <span :class="{'active': choose == 0}" @click="choose=0">我的信用卡(3)</span>
        <span :class="{'active': choose == 1}" @click="choose=1">我的储蓄卡(0)</span>
      </div>
      <span flex-box="0">...</span>
    </nav>
    <article v-if="choose == 0" flex-box="1">
      <app-creditcard v-model="card1"></app-creditcard>
      <app-creditcard v-model="card2"></app-creditcard>
      <div class="mybutton">
        <button>添加银行卡</button>
      </div>
    </article>
    <article v-if="choose == 1" flex-box="1">
      <app-bankcard v-model="card3"></app-bankcard>
      <app-bankcard v-model="card4"></app-bankcard>
      <div class="mybutton">
        <button>添加银行卡</button>
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        choose: 0,
        card1: {
          type: 'build',
          name: '韩**',
          lastNo: '3638',
          billDate: 3,
          payDate: 13
        },
        card2: {
          type: 'change',
          name: '韩**',
          lastNo: '3638',
          billDate: 3,
          payDate: 13
        },
        card3: {
          type: 'bank',
          name: '韩**',
          lastNo: '3638',
        },
        card4: {
          type: 'bank',
          name: '韩**',
          lastNo: '3638',
        }
      }
    },
    created(){
      
    },
    methods:{

    },
    events: {},
    components: {}
  }
</script>

<style lang='scss' scoped>
  .cards {
    width:100%;
    height: 100%;
    nav {
      height: 0.44rem;
      background: #f3f3f3;
      h1 {
        text-align: center;
        font-size: 0.18rem;
      }
      span {
        font-size: 0.15rem;
      }
      .tabs {
        span {
          box-sizing: border-box;
          height: 0.44rem;
          display: inline-block;
          margin:0 0.225rem;
          line-height: 0.44rem;
          font-weight: 700;
        }
        .active {
          color: #f84c4b;
          border-bottom: 3px solid #f84c4b;
        }
      }
    }
    article {
      padding: 0.2rem;
      background: linear-gradient(to top, #2c2c33, #3d404b);
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
    }
  }
</style>
