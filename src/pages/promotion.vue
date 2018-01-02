<template>
  <div>
    推广
    <span @click='goJihuo'>马上激活</span>
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
    goJihuo(){
      helper.goPage('/activeaccount')
    },
  },
  events: {},
  components: {}
}
</script>

<style>

</style>
