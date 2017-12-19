<template>
  <div class="protocol">
    <div class="point">
      <app-check v-model="check"></app-check>
    </div>
    <span class="note">我同意并已阅读软件<span class="service">服务条款及协议</span></span>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.check = this.value
    },
    data () {
      return {
        check: false
      }
    },
    watch: {
      check (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .protocol {
    margin:0 auto;
    text-align: center;
    .point {
      display: inline-block;
    }
    .note {
      display: inline-block;
      font-size: 0.13rem;
      color: #a4a4a4;
      .service {
        color: #768bf5;
      }
    }
  }
</style>  