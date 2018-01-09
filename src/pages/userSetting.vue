<template>
  <div>
    <app-nav flex-box="0">用户设置</app-nav>

    <div @click='logout'>登出</div>
    <div @click='goModifyPwd'>修改密码</div>
    <div>实名认证</div>
    <hr>
    我的分享二维码：
    <img :src="qrSrc">
  </div>
</template>

<script>
import helper from '../utils/helper.js'
import {mapMutations,mapActions} from 'vuex'
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
    goModifyPwd(){
      helper.goPage('/editPwd')
    },
    logout(){
      this.account_logout()
    },
    ...mapActions([
      'account_logout',
      ])
  },
  computed:{
    qrSrc(){
      return this.$store.state.account.qrcodeUrl
    },
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>

</style>
