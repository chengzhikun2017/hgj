<template>
  <div>
    <app-nav flex-box="0">我的钱包</app-nav>
    <button @click='balanceWidthdraw'>提现</button>
    <button @click='securityWidthDraw'>保证金提现</button>
    <button @click=''>提现记录</button>
  </div>
</template>

<script>
import helper from '../utils/helper.js'
export default {
  data() {
    return {
    }
  },
  methods:{
    balanceWidthdraw(){
      helper.goPage('/balance')
    },
    securityWidthDraw(){
      
    },
  },
  events: {},
  components: {}
}
</script>

<style>

</style>
