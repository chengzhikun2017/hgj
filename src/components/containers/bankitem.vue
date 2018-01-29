<template>
  <div class="bankitem" flex="dir:top">
    <div class="banner" flex="main:justify cross:center">
      <div class="title">
        {{title}}信用卡
      </div>
      <div class="button" @click="banka">
        办卡
      </div>
    </div>
   
    <div class="main" flex="cross:center" @click="jump(url)">
      <div class="left" flex="dir:top cross:center">
        <img :src='"/static/img/" + code + ".png"' alt="">
        <p><span class="people">{{applyNum}}</span>人已申请</p>
      </div>
      <div class="right">
        <p class="feature" v-for="ft in features">
          {{ft}}
        </p>
        <div class="signs" flex>
          <span v-for="sg in signs" class="btn">
            {{sg}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      code: {
        type: String,
        default: 'ABC'
      },
      title: {
        type: String,
        default: '农业银行'
      },
      feature: {
        type: String,
        default: '首刷送十万积分，十元观影享美食 推荐办卡奖励50元现金'
      },
      applyNum: {
        type: String,
        default: '17'
      },
      note: {
        type: String,
        default: '3天审核，一星期放卡'
      },
      signs: {
        type: Array,
        default: function () {
          return [ '无需房产', '免费申请']
        }
      }
    },
    computed: {
      features () {
        return this.feature.split('\\n')
      }
    },
    data () {
      return {

      }
    },
    methods: {
      banka() {
        // 做一个请求
        this.$emit('banka');
      }
    }
  }
</script>
<style lang="scss" scoped>
  .bankitem {
    position: relative;
    background: white;
    padding:0.2rem 0.2rem 0.15rem;
    &:after {
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      height: 0.01rem;
      content:' ';
      transform: scaleY(.5);
      background: #ccc;
    }
    .banner {
      .title {
        font-size: 0.18rem;
        color: #464646;
        line-height: 1;
        letter-spacing: 0.01rem;
        padding: 0.1rem 0;
      }
      .button {
        padding:0.05rem 0.2rem;
        border-radius: 0.05rem;
        font-size: 0.16rem;
        font-weight: 700;
        color:white;
        background: #ff7d41;
      }
    }
    .main {
      position: relative;
      padding: 0.05rem 0;
      .left {
        padding-right: 0.15rem;
        img {
          height: 0.66rem;
        }
        p {
          padding-top: 0.15rem;
          font-size: 0.12rem;
          color: #666666;
        }
        .people {
          color: #f56f60;
        }
      }
      .right {
        .feature {
          font-size: 0.14rem;
          line-height: 1.5;
          color: #797979;
          word-wrap: break-word;
        }
        .signs {
          margin-top: 0.15rem;
          .btn {
            display: block;
            padding: 0 0.06rem;
            height: 0.2rem;
            border:1px solid #10b4ff;
            font-size: 0.12rem;
            line-height: 0.2rem;
            text-align: center;
            color: #00afff;
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
</style>