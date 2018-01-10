<template>
  <div id='test3'>
    <!-- <bttn-code></bttn-code> -->
    <app-radio label='00000' v-model='radio'>
      <app-check :value="radio==='00000'"></app-check>
      00000
    </app-radio>
    <app-radio label='11111' v-model='radio'>
      11111
      <app-check :value="radio==='11111'"></app-check>
    </app-radio>
    <app-radio label='11111' v-model='radio2'></app-radio>
    <div class="box" >
    <img src="/static/img/zhlogo.png" height="66" width="66">
    <div v-inner-scroll>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
    </div>
    </div> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '00000',
      radio2: '232',
    }
  },
  methods:{},
  events: {},
  components: {},
  mounted(){
  },
  components:{
  },
}
</script>

<style>
#test3{
  padding-top: 1rem;
}
.box{
  height: 2rem;
  border:1px solid red;
  overflow: scroll;
}
</style>
