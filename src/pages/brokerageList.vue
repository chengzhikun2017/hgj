<template>
  <div flex="dir:top">
    <app-nav flex-box="0">佣金获取记录</app-nav>
    <article flex-box="1">
      <app-record-list :cfg='cfg' v-model='recordList'>
        <div  class='record-box' v-for='record in recordList' :key='record.planId' flex>
          <div>购买服务：{{record.productId|product}}</div>
          <div>{{record.fee}}</div>
          <!-- <i class="icon icon-money"  v-if='record.moneyType=="UNFREEZE_MONEY"' flex-box='0'></i>
          <i class="icon icon-yuan"  v-if='record.moneyType=="MONEY"' flex-box='0'></i>
          <div flex-box='1'>
            <p class="type">{{record.moneyType|moneyType}}</p>
            <p class="status">{{record.status|status}}</p>
            <p class="time">{{record.createTime|timePlanRecordFilter}}</p>
          </div>
          <p class="money">{{record.fee|moneyFilter}}</p> -->
        </div>
      </app-record-list>
    </article>
  </div>
</template>

<script>
import helper from '../utils/helper.js'
export default {
  data() {
    return {
      recordList:[],
    }
  },
  filters:{
    product(v){
      let name = helper.getProductInfo(v).name
      let dscrp=name
      if(v<=20003&&v>=20001){
        dscrp=`升级【${name}】`
      }
      return dscrp
    },
    // moneyType(v){
    //   switch(v){
    //     case 'UNFREEZE_MONEY':return '保证金提现';break;
    //     case 'MONEY':return '余额提现';break;
    //     default:return '未知'
    //   }
    // },
    // status(v){
    //   switch(v){
    //     case 'CANCEL':return '取消';break;
    //     case 'SUCCESS':return '提现成功';break;
    //     case 'FAILED':return '申请失败';break;
    //     case 'DOING':return '进行中';break;
    //     case 'CREATE':return '进行中';break;
    //     default:return '进行中';break;
    //   }
    // },
  },
  computed:{
    cfg() {
      return {
        url:'report/brokerageGetList',
        params:{
          // moneyType:moneyType,
          // page:1,
          limit:8,
        },
      }
    },
    // cardId(){
    //   return this.$route.query.cardId||null
    // },
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
}
.record-box:first-child{
  border-top-width: 0px;
}
.record-box{

  padding:0.1rem 0;
  display: flex;
  justify-content:center;
  align-items:center;
  position: relative;
  .icon{
    font-size: 0.25rem;
    color:#fff;
    background: #F5AF00;
    border-radius: 50%;
    padding:0.1rem;
    margin:0.1rem;
  }
  .money{
    color:#F5AF00;
    position: absolute;
    font-size: 0.18rem;
    top: 0.1rem;right: 0.1rem;
  }
  .type{
    font-size: 0.16rem;
    color:#666666;
  }
  .status{
    font-size: 0.14rem;
    color:#666666;
  }
  .time{
    font-size: 0.12rem;
    color:#666666;
  }
}
</style>
