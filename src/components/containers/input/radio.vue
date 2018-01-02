<template>
<!--   <div class="input-radio">
    <div class="box-radio__" v-for='(item,index) in temp' >
      <input type="radio" :value="item.value" class="radio__" :name="name" :id="name+'_'+item.value">
      <label :for="name+'_'+item.value" class="content-radio__">
        <slot>
        </slot>
      </label>
    </div>
  </div> -->
  <div class="box-radio__" ref='container'>
    <input type="radio" ref='radio' :checked='value===label' :value="'test_value'" class="radio__" :name="name" :id="id"  @change='onChange'>
    <label :for="id" class="content-radio__">
      
      <slot>
      </slot>
    </label>
  </div>
</template>

<script>
//name = this.id+radio || v-model
export default {
  data() {
    return {
      temp:[
        {value:1,},
        {value:2,},
        {value:3,},
      ],
      label:null,
      name:null,
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  props:{
    value:{}
  },
  created(){

  },
  mounted(){
    console.log('context',this.$vnode.data.model.expression)
    // console.log('this.$refs.container',this.$refs.container)
    // console.log('this.$refs.container lable',this.$refs.container.getAttribute('label'))
    this.label=this.$refs.container.getAttribute('label')
    this.name=this.$vnode.data.model.expression
    //inspect change by click event
    //emit input value
  },
  computed:{
    id(){
      return 'radio_hgj_'+this._uid
    },
    label__(){
      // console.log('this.$refs.container',this.$refs.container,this.$refs.container.$el)
      if(this.$refs.container){
        return this.$refs.container.getAttribute('label')
      }
      return null
    },
  },  
  methods:{
    onChange(){
      // console.log('changed',this.$refs.radio.checked)
      this.$emit('input',this.label)
    },
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.radio__{
  display: block;
  font-size: 0.2rem;
  border:1px solid red;
  height: 0.2rem;
  width: 0.2rem;
  position: absolute;
  top: 0;
  opacity: 0;
  right: 0;
}
.box-radio__{
  /*border:1px solid red;*/
  position: relative;
  min-height: 0.1rem;
  height: 100%;
}

.content-radio__{
  /*border:2px solid yellow;*/
  position: relative;  
  width: 100%;
  height: 100%;
  display: block;
  min-height: 0.1rem;

}
</style>
