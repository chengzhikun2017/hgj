<template>
  <div class="app-input" :class='{"disabled":disabled,"enabled":!disabled}' :style="{background:background}">
    <span class='text' :style="{color:color}">
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
      default:'linear-gradient(to right, #f86b4b 1%, #f84b4b)'
    },
    color:{
      default:'#fff'
    },
  },
  methods:{

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
  box-shadow: 0 13/200rem 32/200rem 0 rgba(248, 77, 75, 0.36);
  .text{
    font-size: 0.18rem;
    line-height: 0.44rem;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
