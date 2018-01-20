<template>
  <div class="qrcode-box" v-if='value'>
    <img :src="imgUrl" class="img">
    <div class="remind-box">
      <p>长按下方图片保存</p>
      <i class="icon-cancel" @click='close'></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{
    value:false
  },
  methods:{
    close(){
      this.$emit('input',false)
    },
  },
  computed:{
    imgUrl(){
      return this.$store.state.account.qrcodeShareUrl
    },
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.qrcode-box{
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content:center;
  align-items:center;
  /*border:2px solid red;*/
  background: #fc4b5b;
  z-index: 999999;
  .img{
    margin: auto;
    /*margin-top: 0.5rem;*/
    width: 80%;
    border:10px solid #fff;
  }
  .remind-box{
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 0.5rem;
    /*border:1px solid red;*/
    position: absolute;
    top: 0;left: 0;
    p{
      color:#fff;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.2rem;
    }
    .icon-cancel{
      position: absolute;
      padding:0.1rem;
      font-size: 0.25rem;
      right: 0;
      top: 0;
      color:rgb(194, 194, 194);
    }
  }
}

</style>
