<template>
  <div class="bttn-choose" :class="{'deactived':!actived}" >

    <slot></slot>
  </div>
</template>

<script>
//todo: 整合成 radio
  export default {
    data() {
      return {

      }
    },
    props:{
      actived:{
        type:Boolean,
        default:false,
      },
    },
    methods:{},
    events: {},
    components: {}
  }
</script>

<style lang='scss' scoped>
  .bttn-choose{
    width: 0.78rem;
    height: 0.3rem;
    border-radius: 4px;
    background: linear-gradient(to right, #f86b4b 1%, #f84b4b);
    box-shadow: 0 4px 0.1rem 0 rgba(248, 81, 75, 0.36);
    font-size: 0.14rem;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    line-height: 0.3rem;
  }
  .deactived{
    background: transparent;
    box-shadow: 0 4px 10px 0 transparent;
    border: solid 1px #a4a4a4;
    color: #a4a4a4;
  }
</style>
