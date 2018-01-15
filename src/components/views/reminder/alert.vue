<template>
  <!---->
  <div class="___alert-cover"   v-if='alert.isShow'  >
    <div class="alert" :class="{'alert-higher':alert.content}">
      <div class="alert-msg">{{alert.title}}</div>
      <div class="alert-msg-description" v-if='alert.content'>{{alert.content}}</div>
      <div class="ctrl-box" >
        <div  class="ctrl-btn" :style='{color:item.color}' v-for='item in alert.options'  @click.once='close(item.callback)'>{{item.text}}
          <a  class="href" v-show='item.href' :href="item.href"  @click.once='close(item.callback)'>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import bus from '../../bus.js'
  // import publicFun from '../../js/public.js'
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        bus:{},
      }

    },
    props:{
      // alert:{
      // default () {
      //   return {
      //     isShow: true,
      //     title: 'alert',
      //     options: [{
      //       text: '确定',
      //     }, ],
      //   }
      // }
      // },

    },
    computed:{
      alert(){
        return this.$store.state.reminder.alert
      },
    },
    methods: {
      close(callback) {
        this.closeAlert()
        // console.log('callback from alert',.callback)
        // this.canNavigate()
        if (callback !== undefined && callback instanceof Function) {
          callback()
        }
      },
      ...mapMutations({
        closeAlert:'reminder_closeAlert',
      }),
    },
    created(){
      // this.bus=bus
      // console.log('bus',bus)
    },
    events: {},
    components: {}
  }
</script>

<style lang='scss' scoped>

  .___alert-cover{
    position: fixed;
    background: rgba(0,0,0,0.6);
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 99999;
    text-align: center;
    .alert{
      /*height: 1.05rem;*/
      width: 2.7rem;
      background: #f8f8f8;
      position: relative;
      margin:auto;
      top:50%;
      transform: translateY(-50%);
      border:1px solid transparent;
      /*left: 0;right: 0;*/
      /*top: 0;bottom: 0;*/
      border-radius: 0.15rem;
      .alert-msg{
        width: 100%;
        /*height: 0.64rem;*/
        line-height: 1.4;
        font-size: 0.18rem; 
        margin-top:0.2rem;
        padding:0 0.05rem;
        color:#010101;
        /*font-weight: bold;*/
        
      }
      .alert-msg-description{
        width: 100%;
        margin-top:0.08rem;
        /*height: 0.64rem;*/
        line-height: 1.4;
        font-size: 0.14rem; 
        color:#010101;
        padding:0 0.05rem;
      }

      .ctrl-box{
        display: flex;
        position: relative;
        bottom: 0;
        margin-top:0.15rem;
        width: 100%;
        .ctrl-btn{
          text-decoration: none;
          /*width: 100%;*/
          flex-grow:1;
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.16rem;
          border: 0px solid #d2d2d2 ;
          border-right-width: 1px;
          border-top-width: 1px;
          color:#0081ff;
          position: relative;
          .href{
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            top: 0;
          }
        }
        .ctrl-btn:last-child{
          border-right-width: 0px;
        }
      }
    }
    .alert-higher{
      }
  }
      
</style>
