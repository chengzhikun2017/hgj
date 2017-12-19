<template>
  <div class="app-input">
    <div class="container" @click='onClick'>
      <div class="outer-line" @click='onClick'>
        <div class="inner-circle" v-if='value'></div>
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
    // value:{},//v-model  directive binding.value
    // disabled:{
    //   default:false,
    // },
    // placeholder:{
    //   default:'请输入',
    // },
    // filter:{
    //   default :null,
    // },
    // onSubmit:{
    //   default:null
    // },
  },
  computed:{
    // parsedValue(){
    //   if(this.filter){
    //     return this.filter(this.value)
    //   }else{
    //     return this.value
    //   }
    // },
  },
  methods:{
    onClick(e){
      console.log('onClick',!this.checked)
      // this.$emit('select',e.target.value)
      this.$emit('input',!this.value) // v-model used on this component will register $on event listenr for parent component
      // this.$emit('change',e.target.value)
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
  display: inline-block;
  height: 0.2rem;
}
.check{
  width:0.2rem;
  height: 0.2rem;
}
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
