<template>
  <div class="record">
    <div class="cardtitle" flex="main:justify cross:center">
      <img class="logo" :src="'https://apimg.alipay.com/combo.png?d=cashier&t=' + record.cardCode + ''" alt="">
      <!-- <span>{{record.cardCode}}</span> -->
      <span class="lastno">尾号：{{record.cardNoAfter4}}</span>
    </div>
    <div class="liner">
      
    </div>
    <div class="record-content" flex="main:justify">
      <div class="left">
        <div class="money" flex="cross:center">
          <span class="icon-cricle-yuan"></span>
          金额：{{record.taskFee|moneyFilter}} 
        </div>
        <div class="time">
          {{record.planTime|timePlanRecordFilter}}
        </div>
      </div>
      <div class="right" flex="cross:center">
        <button v-if="record.status === 'SUCCESS'">执行成功</button>
        <button v-if="record.status === 'DOING'">执行中</button>
        <button v-if="record.status === 'FAILED'">执行失败</button>
        <button v-if="record.status === 'CREATE'">等待执行</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      record: {
        type: Object,
        default: {
          // lastNo: '8888',
          money: 98.4,
          time: '2017-12-19 / 21:42',
          status: 'success' // doing, success
        }
      }
    },
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .record {
    background: white;
    padding: 0.1rem 0.2rem 0.15rem;
    .cardtitle {
      .lastno {
        font-size: 0.16rem;
        color:#383838;
      }
      .logo {
      }
    }
    .liner {
      height: 1px;
      border: 1px dashed #d3d3d3;
      margin:0.1rem 0 0.15rem;
      transform: scaleY(.5);
    }
    .record-content {
      .left {
        .money {
          font-size: 0.16rem;
          color: #f84b4b;
          line-height: 1;
          .icon-cricle-yuan {
            font-size: 0.24rem;
            display: inline-block;
            margin-right: 0.06rem;
          }
        }
        .time {
          padding-top: 0.06rem;
          font-size: 0.12rem;
          color: #a4a4a4;
          line-height: 1;
        }
      }
      .right {
        button {
          width: 0.78rem;
          height: 0.23rem;
          line-height: 0.23rem;
          font-size: 0.13rem;
          border-radius: 0.03rem;
          border: none;
          outline: none;
          color: white;
          background: #53d769;
          text-align: center;
        }
      }
    }
  }
</style>