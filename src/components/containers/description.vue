<template>
  <div class="dscrp">
    <i class="icon " :class='iconName'></i>
    <p class="dscrp-text">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  props:{
    iconName:{
      default:'icon-alert',
      type:String,
    },
  },
  methods:{},
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.dscrp{
  display: flex;
  /*padding:0.3rem 0.15rem;*/
  .icon{
    font-size: 0.15rem;
    color:#a4a4a4;
    line-height: 1.2;
  }
  .dscrp-text{
    color:#a4a4a4;
    font-size: 0.14rem;
    line-height: 1.5;
    margin-left: 0.1rem;
    letter-spacing: -0.1px;
    text-align: justify;
    /*.refresh{
      font-size: 0.15rem;
      color:#4ba8f8;
    }*/
  }

}
</style>
