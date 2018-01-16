<template>
  <div>
    <app-nav flex-box="0">用户设置</app-nav>
    
    <app-formitem :label='"修改密码"' @click.native='goModifyPwd'>
      <i class="icon-go"></i>
    </app-formitem>
    <app-formitem :label='"实名认证"' >
      <span class='real-name-right'>
        <span class="item-right">{{isRealNamed?'已实名':'未实名'}}</span>
        <i class="icon-go" v-if='!isRealNamed'></i>
      </span>
    </app-formitem>
    <app-formitem :label='"账户激活"' @click.native='goActive'>
      <span class='real-name-right'>
        <span class="item-right">{{accountActived?'已激活':'未激活'}}</span>
        <i class="icon-go" v-if='!accountActived'></i>
      </span>
    </app-formitem>
    <app-formitem :label='"我的分享二维码"' @click.native='showQR'>
      <span >
        <i class="icon-qrcode"></i><i class="icon-go"></i>
      </span>
    </app-formitem>
    <div class='logout-bttn'>
      <app-button @click.native='logout' >退出登录</app-button>
    </div>
    <!-- <app-formitem :label='"登出"' @click.native='logout'>
      <i class="icon-go" ></i>
    </app-formitem> -->
    <!-- <hr> -->
    <!-- 我的分享二维码： -->
    <div class="qrcode-box" v-if='QRisShow' @click='hideQR'>
      <i class="icon-cancel close" @click='hideQR'></i>
      <img :src="qrSrc" @click.stop=''>
    </div>
  </div>
</template>

<script>
import helper from '../utils/helper.js'
import {mapMutations,mapActions} from 'vuex'
export default {
  data() {
    return {
      QRisShow:false,
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{
    goActive(){
      if(this.accountActived){
        return
      }else{
        helper.goPage('/activeaccount')
      }
    },
    showQR(){
      this.QRisShow=true
    },
    hideQR(){
      this.QRisShow=false
    },
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
    isRealNamed(){
      return this.userInfo.isRealNamed
    },
    accountActived(){
      return this.userInfo.isActive
    },
    userInfo(){
      return this.$store.state.account
    },
    qrSrc(){
      return this.userInfo.qrcodeUrl
    },
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
  .icon-go{
    font-size: 0.16rem;
    color:#ccc;
  }
  .real-name-right{
    display: flex;
    align-items:center;
  }
  .icon-qrcode,{
    font-size: 0.16rem;
    color:#ccc;
    margin-right: 0.1rem;
  }
  .item-right{
    font-size: 0.14rem;
    color:#aaa;
  }
  .qrcode-box{
    position: fixed;
    top: 0;right: 0;
    width: 100%;
    height: 100%;
    background: #222;
    display: flex;
    align-items:center;
    justify-content:center;
    img{
      width: 90%;
    }
    .close{
      position: absolute;
      right: 0;top: 0;
      padding: 0.1rem;
      color:rgba(255,255,255,0.6);
      font-size: 0.32rem;
    }
  }
  .logout-bttn{
    width: 80%;
    margin: 0.15rem auto;
  }
</style>
