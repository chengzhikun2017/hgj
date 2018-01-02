<template>
  <div class="app-input">
    <div class="container" @click='onClick'>
      <div class="outer-line" @click='onClick' v-if='type==0'>
        <div class="inner-circle" v-if='value'></div>
      </div>
      <div class="outer-line outer-line2" :class="{'outer-line2-active':value}" @click='onClick' v-if='type==1'>
        <i class="icon-check icon-down"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{
    value:{},
    type:{
      default:0,
    },
  },
  computed:{
    // checkType(){
    //   if(!this.type){
    //     return 'circle'
    //   }else
    // },
  },
  methods:{
    onClick(e){
      this.$emit('input',!this.value) 
    },
  },
  mounted(){

  },
  created(){
    // console.log('value',this.value)
  },
}
</script>

<style lang='scss' scoped>
.app-input{
  display: block;
  height: 0.2rem;
  width:0.2rem;
  font-size: 0px;
}
/*.check{
  width:0.2rem;
  height: 0.2rem;
}
*/
.container{
  padding:0.03rem;
  border-radius: 50%;
  /*width: 0.14rem;*/
  /*height: 0.14rem;*/
  display: inline-block;
}
.outer-line{
  width: 0.14rem;
  height: 0.14rem;
  /*background-color: #999999;*/
  border: solid 1px #999999;
  border-radius: 50%;
  position: relative;
}

.outer-line2{
  background: #fff;
  width: 0.23rem;
  height: 0.23rem;
  .icon-check{
    font-size: 0.23rem;
    color:#fff;
  }
}
.outer-line2-active{
  background: #3fe0a9;
  border: 0;
}
.inner-circle{
  position: absolute;
  background: #999999;
  top: 0;left: 0;bottom: 0;right: 0;
  margin: auto;
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
}

</style>
