<template>
  <div class="cards" flex="dir:top">
    <nav flex="cross:center" flex-box="0">
      <span class="side" flex-box="0" @click='back'>
        <span class="icon" flex="main:center cross:center">
          <span class="icon-back"></span>
        </span>
      </span>
      <div class="tabs" flex-box="1" flex="main:center">
        <span :class="{'active': choose == 0}" @click="choose=0">我的信用卡(3)</span>
        <span :class="{'active': choose == 1}" @click="choose=1">我的储蓄卡(0)</span>
      </div>
      <span class="side" flex-box="0"></span>
    </nav>
    <article v-if="choose == 0" flex-box="1">
      <div class="cardItem">
        <app-creditcard v-model="card1"></app-creditcard>
      </div>
      <div class="cardItem">
        <app-creditcard v-model="card2" bgcolor="cardbg-lightpurple"></app-creditcard>
      </div>
      <div class="mybutton">
        <button><span class="icon-add"></span>添加银行卡</button>
      </div>
    </article>
    <article v-if="choose == 1" flex-box="1">
      <div class="cardItem">
        <app-bankcard v-model="card3"></app-bankcard>
      </div>
      <div class="cardItem">
        <app-bankcard v-model="card4" bgcolor="cardbg-lightpurple"></app-bankcard>
      </div>
      <div class="mybutton">
        <button><span class="icon-add"></span>添加银行卡</button>
        <div class="others" flex="main:justify">
          <span>什么是结算卡？</span>
          <span>点击分享</span>
        </div>
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
          type: 'check',
          name: '韩**',
          lastNo: '3638',
        },
        card4: {
          type: 'uncheck',
          name: '韩**',
          lastNo: '3638',
        }
      }
    },
    created(){
      
    },
    methods:{
      back(){//temp
        this.$router.go(-1)
      },
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
      padding:0 0.15rem;
      background: #f3f3f3;
      h1 {
        text-align: center;
        font-size: 0.18rem;
      }
      .side {
        font-size: 0.14rem;
        .icon {
          width: 0.23rem;
          height: 0.23rem;
          border-radius: 50%;
          background-color: #383838;
          font-size: 0.10rem;
          font-weight: 1000;
          color: white;
          line-height: 1;
        }
      }
      .tabs {
        span {
          box-sizing: border-box;
          height: 0.44rem;
          display: inline-block;
          margin:0 0.225rem;
          line-height: 0.44rem;
          font-size: 0.15rem;
          font-weight: 700;
        }
        .active {
          color: #f84c4b;
          border-bottom: 0.03rem solid #f84c4b;
        }
      }
    }
    article {
      padding: 0.2rem;
      background: linear-gradient(to top, #2c2c33, #3d404b);
      .cardItem {
        margin-bottom: 0.1rem;
      }
      .mybutton {
        padding: 0.2rem 0;
        button {
          width: 100%;
          height: 0.44rem;
          border-radius: 0.44rem;
          background: white;
          font-size: 0.18rem;
          color: #f84b4b;
          font-weight: 700;
          .icon-add {
            position: relative;
            top: 0.02rem;
            margin-right: 0.1rem;
          }
        }
        .others {
          padding:0.15rem 0 0;
          span {
            font-size: 0.13rem;
            color: #768bf5;
            line-height: 1;
          }
        }
      }
    }
  }
</style>
