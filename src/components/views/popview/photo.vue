<template>
  <div v-if="value" class="photo" flex="main:center cross:center" @click="close">
    <img :src="imgUrl" alt="">
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      imgUrl: {
        type: String,
        default: 'http://hzg.he577.com/xh/test.jpg'
      }
    },
    data () {
      return {

      }
    },
    methods: {
      close () {
        this.$emit('input', false)
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .photo {
    position: fixed;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .8);
    img {
      width: 100%;
    }
  }
</style>