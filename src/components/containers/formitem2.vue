<template>
  <div class="formitem2">
    <div class="item" flex="cross:bottom main:justify">
      <span class="label" flex-box="0">{{label}}</span>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: '标题'
      }
    },
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .formitem2 {
    width: 100%;
    padding: 0.05rem 0;
    .label {
      font-size: 0.14rem;
      color: #a4a4a4;
    }
  }
</style>