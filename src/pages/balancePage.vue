<template>
  <div>
    <app-nav flex-box="0">我的钱包</app-nav>
    <button @click='balanceWidthdraw'>提现</button>
  </div>
</template>

<script>
import helper from '../utils/helper.js'
export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{
    balanceWidthdraw(){
      helper.goPage('/balance')
    },
  },
  events: {},
  components: {}
}
</script>

<style>

</style>
