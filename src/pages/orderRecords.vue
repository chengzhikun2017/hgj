<template>
  <div flex="dir:top">
    <app-nav flex-box="0">我的</app-nav>
    <article flex-box="1">
      <app-record-list :cfg='cfg' v-model='recordList'>
        <div class="order-record" v-for='record in recordList'>
          <p>{{record.subject}}</p>
          <p>{{record.statusRemark}}</p>
          <p>{{record.tradeNo}}</p>
          <p>{{record.createTime}}</p>
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
  computed:{
    cfg(){
      return {
        url: 'order/records',
        params: {
          // cardId: this.$route.query.cardId,
          limit: 5,
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
.order-record{
  background: #fff;
  border:1px solid red;
  padding:0.1rem;
}
</style>
