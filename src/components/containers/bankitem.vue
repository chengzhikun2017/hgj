<template>
  <div class="bankitem" flex="dir:top">
    <div class="main" flex>
      <div class="left">
        <img src="/static/img/logo/ABC.png" alt="">
      </div>
      <div class="right">
        <div class="title">
          {{title}}
        </div>
        <div class="record">
          {{record}}
        </div>
        <div class="signs" flex>
          <span v-for="sg in signs" class="btn" :class="sg.color">
            {{sg.name}}
          </span>
        </div>
      </div>
    </div>
    <div class="footer">
      {{note}}
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '农业银行'
      },
      record: {
        type: String,
        default: '17人申请'
      },
      note: {
        type: String,
        default: '3天审核，一星期放卡'
      },
      signs: {
        type: Array,
        default: [
          {
            name: '无需房产',
            color: 'yellow'
          },
          {
            name: '免费申请',
            color: 'red'
          }
        ]
      }
    },
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .bankitem {
    border-top: 0.05rem solid #FBEC88;
    background: white;
    .main {
      position: relative;
      padding: 0.05rem 0.2rem;
      .left {
        padding-right: 0.15rem;
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      .right {
        .title {
          font-size: 0.16rem;
          color: #333;
        }
        .record {
          font-size: 0.12rem;
          color: #999;
        }
        .signs .btn {
          display: block;
          width: 0.6rem;
          height: 0.2rem;
          border-radius: 0.2rem;
          border:1px solid #888;
          background: #e8e8e8;
          font-size: 0.12rem;
          line-height: 0.2rem;
          text-align: center;
          color: #888;
          margin-right: 0.1rem;
        }
      }
      &:after {
        position: absolute;
        bottom:0;
        left: 0;
        right: 0;
        height: 0.01rem;
        content:' ';
        transform: scaleY(.5);
        background: #ccc;
      }
    }
    .footer {
      color: #999;
      font-size: 0.12rem;
      line-height: 1;
      padding: 0.1rem 0.2rem;
    }
  }
</style>