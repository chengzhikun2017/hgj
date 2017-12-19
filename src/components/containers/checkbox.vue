<template>
  <div class="app-input">
    <div class="check" @click='onClick'></div>
    <input type="checkbox" :value='checked' id='checkbox' @change="$emit('input', $event.target.value)">
    <div>label</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test:false,
    }
  },
  props:{
    checked:{
      default:false,
    },
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
      this.$emit('checked',!this.checked?1:0) // v-model used on this component will register $on event listenr for parent component
      // this.$emit('change',e.target.value)
    },
  },
  mounted(){
    var checkbox=document.querySelector('#checkbox')
      console.log('checkbox',checkbox)
      console.log('checkbox',checkbox.value)
  },
  created(){
    // console.log('value',this.value)
  },
}
</script>

<style lang='scss' scoped>
.app-input{
  
}
.check{
  width:0.2rem;
  height: 0.2rem;
  border:1px solid red;
}

</style>
