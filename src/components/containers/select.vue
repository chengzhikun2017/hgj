<template>
  <div class="app-select">
    <div class="select-value " :style="value?{}:{'color':placeholderColor}" :class="{'__disabled':disabled}" >
      <p class="text">
        {{parsedValue||placeholder}}
      </p>
    </div>
    <select class="select__" ref='select'  :disabled='disabled' @change='handleValueChange($event)' @select='testSelect($event)' >
      <option disabled selected value>-请选择-</option>
      <option v-for='item in options' :value="item.value" :key='item.value'>{{item.value}}</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{
    value:{},//v-model  directive binding.value
    options:{},
    disabled:{
      default:false,
    },
    placeholder:{
      default:'请选择'
    },
    placeholderColor:{
      default:'#a4a4a4'
    },
    filter:{
      default :false,
    },
    cb:{
      default:null
    },
  },
  computed:{
    parsedValue(){
      if(!this.value){
        return null
      }
      if(this.filter){
        return this.filter(this.value)
      }else{
        return this.value
      }
    },
  },
  methods:{
   
    handleValueChange(e){
      // this.$emit('select',e.target.value)
      this.$emit('input',e.target.value) // v-model used on this component will register $on event listenr for parent component
      // this.$emit('change',e.target.value)
      if(this.cb){
        this.cb()
      }
    },
  },
  created(){
    // console.log('value',this.value)
  },
}
</script>

<style lang='scss' scoped>
.app-select{
  /*border:1px solid red;*/
  height: 100%;
  width:100%;
  height: 100%;
  position: relative;
  .select__{
    position: absolute;
    top: 0;left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    height: 100%;
  }
  .select-value{
    /*font-size: $inputSize;*/
    display:block;
    text-align: inherit;
    padding: 0rem;
    line-height: 0.24rem;
    /*color:$mainColor;*/
    height:100%;
    position: relative;
    .text{
      font-size: 0.13rem;
      text-align: right;
     /* position: relative;
      top:50%;
      transform: translateY(-50%);*/
    }
  }
  .__disabled{
    /*color:$disabledColor;*/
    height:100%;
  }
}

</style>
