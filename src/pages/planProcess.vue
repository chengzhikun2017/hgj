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
       
      }
    },
    components:{
      'app-process':processPlan,
    },
    methods:{
      getProcess(){
        this.plan_process(this.planInfo.planId).then(res=>{
          this.processList=res
        })
      },
      ...mapActions([
        'plan_process',
        ])
    },
    mounted(){
      this.getProcess()
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