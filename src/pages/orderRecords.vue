<template>
  <div flex="dir:top">
    <app-nav flex-box="0">我的订单</app-nav>
    <article flex-box="1">
      <app-record-list :cfg='cfg' v-model='recordList' >
      <div class="record-box" v-for='record in recordList' :key='record.tradeNo'>
        <div flex-box='1'>
          <p class="subject">交易类型：{{record.subject}}</p>
          <p class="type">{{record.payType|payType}}</p>
          <p class="time">交易时间：{{record.createTime|timeFilter}}</p>
          <p class="trade-no">订单号：{{record.tradeNo}}</p>
        </div>
        <p class="status">{{record.statusRemark}}</p>
        <p class="money">{{record.fee|moneyFilter}}</p>
      </div>
    </app-record-list>
  </article>
</div>
</template>

<script>
  export default {
    data() {
      return {
        recordList:[],
      }
    },
    filters:{
      payType(v){
        let type
        switch(v){
          case 'ACCOUNT_BALANCE': type='余额支付';break;
          case 'HELIPAY_CC': type='信用卡支付';break;
          case 'ACCOUNT_JF': type='免费福利';break;
          case 'UNSPAY': type='储蓄卡支付';break;
        }
        return  type
      },
    },
    computed:{
      cfg(){
        return {
          url: 'order/records',
          params: {
          // cardId: this.$route.query.cardId,
          limit: 8,
          // productId
          // status
        },
      }
    },
  },
  methods:{},
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
  .record-box{
    border:0px solid #999999;
    border-top-width: 1px;
    background: #fff;
    margin-left: 0.15rem;
    position: relative;
    padding:0.1rem 0;
    display: flex;
    justify-content:center;
    align-items:center;
    position: relative;
    color:#666666;
    .subject{
      font-size: 0.16rem;
      font-weight:600;
      color:#64a6f8;
    }
    .status{
      color:#F5AF00;
      position: absolute;
      font-size: 0.12rem;
      top: 0.35rem;right: 0.1rem;
    }
    .trade-no{
      font-size: 0.1rem;
      color:#999999;
    }
    .money{
      color:#F5AF00;
      position: absolute;
      font-size: 0.18rem;
      top: 0.1rem;right: 0.1rem;
    }
    .time{
      color:#999999;
      font-size: 0.12rem;
    }
    .type{
      font-size: 0.14rem;
    }
  }

</style>
