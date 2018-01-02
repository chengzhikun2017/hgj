<template>
  <div class="cricleicon" :class="bgcolor" flex="main:center cross:center">
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
      }
    },
    data () {
      return {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .cricleicon {
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
    .icon {
      color: white;
    }
  }
</style>