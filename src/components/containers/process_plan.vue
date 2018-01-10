<template>
  <div class="record">
    <!-- <div class="cardtitle" flex="main:justify cross:center">
      <img src="" alt="">
      <span class="lastno">尾号：{{planInfo.cardNoAfter4}}</span>
    </div> -->
    <!-- <div class="liner"> -->
      
    <!-- </div> -->
    <div class="record-content" flex="main:justify">
      <div class="left">
        <div class="money">
          金额：{{process.fee|moneyFilter}} 
        </div>
        <div class="time">
          {{process.planTime|timePlanRecordFilter}}
        </div>
      </div>
      <div class="right">
        <p style="font-size: 0.12rem">类型：{{process.type}}</p>
        <button v-if="process.status === 'SUCCESS'">执行成功</button>
        <button v-if="process.status === 'DOING'">执行中</button>
        <button v-if="process.status === 'FAILED'">执行失败</button>
        <button v-if="process.status === 'CREATE'">等待执行</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      process: {
        type: Object,
        default: {},
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
    padding: 0.15rem 0.2rem;
    .cardtitle {
      .lastno {
        font-size: 0.16rem;
        color:#383838;
      }
    }
    .liner {
      height: 1px;
      border: 1px dashed #d3d3d3;
      margin:0.15rem 0;
    }
    .record-content {
      .left {
        .money {
          font-size: 0.16rem;
          color: #f84b4b;
          line-height: 1;
        }
        .time {
          padding-top: 0.1rem;
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