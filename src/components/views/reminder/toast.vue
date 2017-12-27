<template>
  <div class="toastVue">
    <transition name="slide"  v-on:after-leave="afterLeave" v-on:afterEnter='afterEnter'>

      <div class="toast" v-if='isShow' :style="{background:bgcolor}">
      <!-- <div class="toast"  v-if='true'> -->
        <p class="toast-title">{{content}}</p>
      </div>

    </transition>
    <div class="cover"   v-if='isShow'  >

    </div>
  </div>
</template>

<script>
/**
 * 暂未考虑toast队列·
 */
import {mapMutations,mapState} from 'vuex'
export default {
  data() {
    return {
    }
  },
  created(){
    setTimeout(()=> {
      // bus.remindSimple.isShow=false
      // this.$store.commit('reminder_hideToast')
      this.reminder_hideToast()
    }, 1200);
  },
  computed:{
    bgcolor(){
      let type=this.toast.type
      let color
      switch(type){
        case 0: color='#0090f6';break;
        case 'normal': color='#0090f6';break;
        case 1: color='#FFC000';break;
        case 'warning': color='#FFC000';break;
        case 2: color='red';break;
        case 'error': color='red';break;
      } 
      return color
    },
    toast(){
      return this.$store.state.reminder.toast
    },
    content(){
      return this.toast.content
    },
    isShow(){
      return this.toast.isShow
      // return bus.remindSimple.isShow
    },
    type(){
      return this.toast.type||'normal'
    },
    cbLeaved() {
        let nullFunc = () => {
          // console.log('callback leave')
        }

        // return nullFunc
        return this.toast.cbLeaved || nullFunc
      },
      cbEntered() {
        let nullFunc = () => {
            // console.log('callback enter')
          }
          // return nullFunc
        return this.toast.cbEntered || nullFunc
      },
  },
  methods:{
    afterLeave(){
      this.cbLeaved()
    },
    afterEnter(){
      setTimeout(()=> {
        this.cbEntered()
      }, 200);
      setTimeout(()=>{
        this.reminder_hideToast()
      },500)
    },
    ...mapMutations({
      reminder_hideToast:'reminder_hideToast',
    })
  },

  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.cover{
  position: fixed;
  background:transparent;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 99999;
}
.toast{
  position: fixed;
  top: 0.44rem;
  width: 100%;
  z-index: 99999;
  /*transform: scaleY(1);*/
  transform-origin: top;
  transition: 1s linear;
  text-align: center;
  background: #0090f6;
}
.toast-title{
  /*background: #0090f6;*/
  color:#fff;
  text-align: center;
  display: inline-block;
  font-size: 0.16rem;
  line-height: 0.2rem;
  padding:0.05rem 0.1rem;
  border-radius: 0.05rem;
}

.slide-enter-to{
  transform:  scaleY(1);
}
.slide-enter{
  transform:scaleY(0);
}
.slide-leave-active{
  transition: 0.2s cubic-bezier(0.24, 1.13, 1, 1);
}
.slide-enter-active{
  transition: 0.2s cubic-bezier(0.24, 1.13, 1, 1);
}
.slide-leave-to {
  transform: scaleY(0);
}
</style>