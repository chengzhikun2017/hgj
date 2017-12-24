<template>
  <div class="cricleicon" :class="bgcolor" flex="main:center cross:center">
    <span :class="icon" class="icon"></span>
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
        default: 'red'
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
      font-size: 0.23rem;
    }
  }
  .red {
    background-image: linear-gradient(to right, #f1518d, #f15151);
  }
</style>