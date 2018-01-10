<template>
  <div class="test1">
    <h1>标题</h1>
    <app-record-list :cfg='cfg' style='border:1px solid red;' v-model='list'>
      <div class="recorditem" v-for='process in list'>
        <app-process :process="process" ></app-process>
      </div>
    </app-record-list>
  </div>
</template>

<script>
  import processPlan from '../../components/containers/process_plan.vue'

export default {
  data() {
    return {
      cfg:{
        url:'plan/processList',//这个接口不能用，没有分页
        params:{
          planId:11,
          limit:10,
        },
      },
      list:[],
      // plan/processList?planId=11
    }
  },
  methods:{},
  events: {},
  components:{
    'app-process':processPlan,
  },
}
</script>

<style lang='scss' scoped>
.test1{
  /*border:1px solid red;*/
  /*height: 6rem*/
}

</style>
