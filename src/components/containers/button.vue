<template>
  <div class="app-button" :class='{"disabled":disabled,"enabled":!disabled}' :style="{background:backgroundImg,boxShadow:boxShadow}">
    <span class='text' :class="{'text1':type==1}" :style="{color:textColor} ">
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
    boxShadow(){
      switch(this.type){
        case 0:return '0 0.065rem 0.16rem 0 rgba(248, 77, 75, 0.36)';
        case 1:return '0 0.065rem 0.16rem 0 rgba(13, 13, 13, 0.56)';
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
.app-button{
  width: 100%;
  height: 0.44rem;
  border-radius: 0.22rem;
  display: flex;
  justify-content:center;
  align-items:center;
  font-size: 0.18rem;
  /*background-image: linear-gradient(to right, #f86b4b 1%, #f84b4b);*/
  text-align: center;
  /*box-shadow: 0 0.065rem 0.16rem 0 rgba(248, 77, 75, 0.36);*/
  .text{
    /*line-height: 0.44rem;*/
    font-weight: 500;
    color: #ffffff;
    font-size:inherit;
  }
  .text1{
    color:red;
  }
}
</style>
