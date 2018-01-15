<template>
  <!-- <div class="bttn-code input"> -->
    <div class="code-bttn " :class="{'code-bttn-disabled':countdownTimer!==null}" @click='onClick' >{{bttnText}}</div>
  <!-- </div> -->
</template>

<script>
//外部先判断
//外部发起获取code
//回调内部开始计时
export default {
  data() {
    return {
      bttnText:'获取验证码',
      countdownTimer:null,
    }
  },
  props:{
    validateMethod:{
      required:true
    },
    getCodeMethod:{
      required:true
    },
  },
  methods:{
    onClick(){
      if(!this.validateMethod()){
        return
      }

      if(this.countdownTimer){
        return
      }
      this.getCodeMethod(this.countdown)
      // .then(res=>{
      //   this.countdown()
      // })
      // this.countdown()
    },
    countdown(){
      // this.getCodeRecently=true
      let remainSec=60
      this.bttnText=remainSec+'s后获取'
      remainSec--
      let timer=setInterval(()=>{
        if(remainSec==0){
          this.bttnText='重新获取'
          clearInterval(timer)
          this.countdownTimer=null
          return
        }
        this.bttnText=remainSec+'s后获取'
        remainSec--
      },1000)
      this.countdownTimer=timer
      return timer
    },
  },
  beforeDestroy(){
    clearInterval(this.countdownTimer)
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
  .code-bttn{
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      display: flex;
      align-items:center;
      justify-content: center;
      margin:auto 0;
      height: 0.28rem;
      width: 0.85rem;
      font-size: 0.14rem;
      border:0px solid #d3d3d3;
      border-left-width: 1px;
      line-height: 1.86;
      text-align: center;
      color: #383838;
  }
  .code-bttn-disabled{
    color:#f84f4b;
  }


</style>
