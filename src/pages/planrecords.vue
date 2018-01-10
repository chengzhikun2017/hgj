<template>
  <div class="planrecords" flex="dir:top">
    <app-nav flex-box="0">智能还卡记录</app-nav>
    <article flex-box="1">
      <ul class="recordlist">
        <li class="recorditem" v-for='record in recordList'>
          <app-record :record="record" @click.native='viewPlanDetail(record)'></app-record>
        </li>
        <!-- <li class="recorditem">
          <app-record :record="record2"></app-record>
        </li> -->
      </ul>
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
        record1: {
          lastNo: '8888',
          money: 98.4,
          time: '2017-12-19 / 21:42',
          btnType: 'success' // doing, success
        },
        record2: {
          lastNo: '8848',
          money: 98.43,
          time: '2017-11-19 / 21:42',
          btnType: 'doing' // doing, success
        }
      }
    },
    methods:{
      getRecords(){
        this.plan_review(this.cardInfo.cardId).then(res=>{
          this.recordList=res
        })
      },
      viewPlanDetail(record){
        let url=helper.urlConcat('/planprocess',record)
        helper.goPage(url)
      }, 
      ...mapActions([
        'plan_review',
        ])
    },
    created(){
      this.getRecords()
    },
    computed:{
      cardInfo(){
        return this.$route.query
      },
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
      .recordlist {
        .recorditem {
          display: block;
          padding-bottom: 0.1rem;
        }
      }
    }
  }
</style>