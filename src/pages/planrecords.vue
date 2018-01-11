<template>
  <div class="planrecords" flex="dir:top">
    <app-nav flex-box="0">智能还卡记录</app-nav>
    <article flex-box="1">
      <app-record-list :cfg='cfg' v-model='recordList'>
        <app-record :record="record" @click.native='viewPlanDetail(record)' v-for='record in recordList' :key='record.planId' class="recorditem"></app-record>
      </app-record-list>
    </article>
  </div>
</template>   
<script>
  import {mapActions} from 'vuex'
  import helper from '../utils/helper.js'
  export default {
    data () {
      return {
        recordList:[],
      }
    },
    methods:{
      // getRecords(){
      //   this.plan_review(this.cardInfo.cardId).then(res=>{
      //     this.recordList=res
      //   })
      // },
      viewPlanDetail(record){
        let url=helper.urlConcat('/planprocess',record)
        helper.goPage(url)
      }, 
      // ...mapActions([
      //   'plan_review',
      //   ])
    },
    created(){
      // this.getRecords()
    },
    computed:{
      cfg() {
        return {
          url: 'plan/review',
          params: {
            cardId: this.$route.query.cardId,
            limit: 5,
          },
        }
      },
      // cardId(){
      //   return this.$route.query.cardId||null
      // },
    },
  }
</script>
<style lang="scss" scoped>
  .planrecords {
    width: 100%;
    height: 100%;
    article {
      overflow: auto;
      background: #f3f3f3;
      .recorditem {
        display: block;
        margin-bottom: 0.1rem;
      }
    }
  }
</style>