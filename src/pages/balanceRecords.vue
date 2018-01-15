<template>
  <div flex="dir:top">
    <app-nav flex-box="0">提现记录</app-nav>
    <article flex-box="1">
      <app-record-list :cfg='cfg' v-model='recordList'>
        <div  class='record-box' v-for='record in recordList' :key='record.planId' >
          <p>{{record.statusRemark}}</p>
          <p>{{record.status|status}}</p>
          <p>{{record.moneyType|moneyType}}</p>
          <p>{{record.fee|moneyFilter}}</p>
          <p>{{record.createTime|timePlanRecordFilter}}</p>
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
    moneyType(v){
      switch(v){
        case 'UNFREEZE_MONEY':return '保证金提现';break;
        case 'MONEY':return '余额提现';break;
        default:return '未知'
      }
    },
    status(v){
      switch(v){
        case 'CANCEL':return '取消';break;
        case 'SUCCESS':return '提现成功';break;
        case 'FAILED':return '申请失败';break;
        case 'DOING':return '进行中';break;
        case 'CREATE':return '进行中';break;
        default:return '进行中';break;
      }
    },
  },
  computed:{
    cfg() {
      return {
        url:'cash/records',
        params:{
          // moneyType:moneyType,
          // page:1,
          limit:2,
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
  border:1px solid red;
  background: #fff;
}

</style>
