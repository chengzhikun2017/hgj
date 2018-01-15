<template>
  <div class="app-loading" v-if='isLoading>0' >
    <div class="loading-container">
      <div class="loading">
        <div class="loading-icon"></div>
        <p class="loading-msg">{{loadingText}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed:{
    loadingText(){
      return this.$store.state.reminder.loadingText
    },
    isLoading(){
      return this.$store.state.reminder.isLoading
    },
  },
  methods:{
    ...mapMutations({
      reminder_hideLoading:'reminder_hideLoading',
      reminder_showLoading:'reminder_showLoading',

    }),
   
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
@keyframs rotate-loading{
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
}
@-webkit-keyframes rotate-loading{
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
}
.loading-icon{
  transform:rotate(45deg);
  animation:rotate-loading 1s linear infinite;
}
.loading-icon{
  width: 0.3rem;
  height: 0.3rem;
  border:2px solid white;
  border-radius: 50%;
  border-left-width: 0;
  border-top-width: 0;
  margin: 0 auto;
  margin-top: 0.3rem;
}
.loading-msg{
  color: #fff;
  font-size: 0.14rem;
  margin-top: 0.15rem;
  text-align: center;
}
.app-loading{
  position: fixed;
  top: 0.5rem;bottom: 0;
  right:0;left:0;
  background: rgba(0,0,0,0);
}
.loading-container{
  /*border:1px solid red;*/
  width: 1.2rem;
  height: 1.7rem;
  position: absolute;
  left: 0;top: 0;bottom: 0;right: 0;
  margin: auto;
  padding-bottom: 0.5rem;
}

.loading{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  border-radius: 0.06rem;
  border:1px solid transparent;
}
</style>
<style type="text/css">

</style>
