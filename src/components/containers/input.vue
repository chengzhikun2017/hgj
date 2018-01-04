<template>
  <div class="app-input">
   <input :type="type" ref="input" :value="value" :maxlength="maxlength"  :disabled="disabled" @input="onInput" :placeholder="placeholder" class="input__" @keyup.enter="onEnter($event)">
   <div class="border"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{
    type:{
      default:'text',
    },
    maxlength: {
      type: Number,
      default: 50
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
      default:null,
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
    focus(){
      this.$refs.input.focus.call()
    },
    onEnter(e){
      // console.log('this.onSubmit',this.onSubmit)
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
  input[disabled='disabled']{
    color: #666;
  }
}


</style>
