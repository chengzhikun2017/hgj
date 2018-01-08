<template>
  <div class="planrecords" flex="dir:top">
    <app-nav flex-box="0">计划执行记录</app-nav>
    <article flex-box="1">
      <ul class="processList">
        <li class="recorditem" v-for='process in processList'>
          <app-process :process="process" :planInfo='planInfo'></app-process>
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
  import processPlan from '../components/containers/process_plan.vue'
  export default {
    data () {
      return {
        processList:[],
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
    components:{
      'app-process':processPlan,
    },
    methods:{
      getRecords(){
        this.plan_list(this.planInfo.planId).then(res=>{
          this.processList=res
        })
      },
      ...mapActions([
        'plan_list',
        ])
    },
    created(){
      this.getRecords()
    },
    computed:{
      planInfo(){
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
      .processList {
        .recorditem {
          display: block;
          padding-bottom: 0.1rem;
        }
      }
    }
  }
</style>