<template>
  <div class="app-input">
    <input type="radio" :value='test'>

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
    type:{
      default:'text',
    },
    value:{},//v-model  directive binding.value
    disabled:{
      default:false,
    },
    placeholder:{
      default:'请输入',
    },
    filter:{
      default :null,
    },
    onSubmit:{
      default:null
    },
  },
  computed:{
    parsedValue(){
      if(this.filter){
        return this.filter(this.value)
      }else{
        return this.value
      }
    },
  },
  methods:{
    onInput(e){
      // this.$emit('select',e.target.value)
      this.$emit('input',e.target.value) // v-model used on this component will register $on event listenr for parent component
      // this.$emit('change',e.target.value)
    },
    onEnter(e){
      if(this.onSubmit){
        this.onSubmit()
      }
    }
  },
  created(){
    // console.log('value',this.value)
  },
}
</script>

<style lang='scss' scoped>
.app-input{
  height: 100%;
  width:100%;
  .input__{
    border-style:none;
    outline:none;
    width: 100%;
    height: 100%;
    font-size: inherit;
    display: inline-block;
    color: inherit;
  }
}


</style>
