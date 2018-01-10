<template>
  <div class="cricleicon" :class="[bgcolor, circle]"  flex="main:center cross:center">
    <span :class="icon" class="icon" :style="'font-size: ' + size + ';'"></span>
  </div>
</template>
<script>
  export default {
    props: {
      icon: {
        type: String,
        default: 'icon-plan'
      },
      bgcolor: {
        type: String,
        default: 'bg-red'
      },
      size: {
        type: String,
        default: '0.23rem'
      },
      circle: {
        type: String,
        default: 'normal' // small big
      }
    },
    data () {
      return {
      }
    },
  }
</script>
<style lang="scss" scoped>
  .cricleicon {
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
    &.small {
      width: 0.4rem;
      height: 0.4rem;
    }
    .icon {
      color: white;
    }
  }
</style>