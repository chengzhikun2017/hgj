<template>
  <div class="app-input" :class='{"disabled":disabled,"enabled":!disabled}' :style="{background:backgroundImg}">
    <span class='text' :class="{'text1':type==1}" :style="{color:textColor}">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{
    disabled:{
      default:false
    },
    background:{
      default:0,
    },
    color:{
      default:'#fff'
    },
    type:{
      default:0,
    },
  },
  methods:{

  },
  computed:{
    textColor(){
      switch(this.type){
        case 0:return '#fff';
        case 1:return '#f84b4b';
      }
    },
    backgroundImg(){
      switch(this.type){
        case 0:return 'linear-gradient(to right, #f86b4b 1%, #f84b4b)';
        case 1:return 'white';
      }
    },
  },
  events: {},
  components: {},
}
</script>

<style lang='scss' scoped>
.disabled{
  opacity: 0.3;
}
.enabled:active{
  opacity: 0.8;
}
.app-input{
  width: 100%;
  height: 0.44rem;
  border-radius: 0.22rem;
  background-image: linear-gradient(to right, #f86b4b 1%, #f84b4b);
  text-align: center;
  box-shadow: 0 0.065rem 0.16rem 0 rgba(248, 77, 75, 0.36);
  .text{
    font-size: 0.18rem;
    line-height: 0.44rem;
    font-weight: 500;
    color: #ffffff;
  }
  .text1{
    color:red;
  }
}
</style>
