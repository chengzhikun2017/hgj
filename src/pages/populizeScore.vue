<template>
  <div class="populizeScore hgj-container" flex="dir:top">
    <app-nav flex-box="0">推广页面</app-nav>
    <article flex-box="1">
      <div class="banner">
        <swiper class="swiper" :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
          <!-- slides -->
          <swiper-slide flex="dir:top main:center cross:center">
            <div class="people">
              <span class="icon-person"></span>
              <span class="number">{{share_todayNumber}}</span>
            </div>
            <div class="note" flex="cross:center">
              <div class="linerleft" flex-box="1"></div>
              <div class="msg">今日新增推广人数</div>
              <div class="linerright" flex-box="1"></div>
            </div>
          </swiper-slide>
          <swiper-slide flex="dir:top main:center cross:center">
            <div class="people">
              <span class="icon-person"></span>
              <span class="number">{{share_totalNumber}}</span>
            </div>
            <div class="note" flex="cross:center">
              <div class="linerleft" flex-box="1"></div>
              <div class="msg">总推广人数</div>
              <div class="linerright" flex-box="1"></div>
            </div>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="my-button-prev" slot="button-prev">
            <span class="icon-back"></span>
          </div>
          <div class="my-button-next" slot="button-next">
            <span class="icon-go"></span>
          </div>
        </swiper>
      </div>
      <div class="populizeScore-content">
        <div class="title" flex="cross:center">
          <app-cricleicon bgcolor="bg-red" icon="" flex-box="0"></app-cricleicon>
          <h2 flex-box="1">推广记录</h2>
          <button flex-box="0">详情</button>
        </div>
        <div class="liner"></div>
        <div class="points">
          <div class="pointItem" flex="main:justify">
            <span>一级推广人数: <span class="data">{{share_totalagentLv1Number}}人</span></span>
            <span class="point">+{{share_totalagentLv1Fee | money}}元</span>
          </div>
          <div class="pointItem" flex="main:justify">
            <span>二级推广人数: <span class="data">{{share_totalagentLv2Number}}人</span></span>
            <span class="point">+{{share_totalagentLv2Fee | money}}元</span>
          </div>
          <div class="pointItem" flex="main:justify">
            <span>三级推广人数: <span class="data">{{share_totalagentLv3Number}}人</span></span>
            <span class="point">+{{share_totalagentLv3Fee | money}}元</span>
          </div>
          <div class="pointItem" flex="main:justify" v-if="account_userInfo.level === 4">
            <span>三级以上推广人数: <span class="data">{{share_totalagentLv3plusNumber}}人</span></span>
            <span class="point">+{{share_totalagentLv3plusFee | money}}元</span>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: '.my-button-next',
            prevEl: '.my-button-prev',
            hideOnClick: true,
            hiddenClass: 'my-button-hidden',
          },
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...

        }
      }
    },
    created () {
    },
    computed: {
      ...mapGetters([
        'account_userInfo',
        'share_todayNumber',
        'share_totalagentLv1Number',
        'share_totalagentLv2Number',
        'share_totalagentLv3Number',
        'share_totalagentLv3plusNumber',
        'share_totalNumber',
        'share_totalagentLv1Fee',
        'share_totalagentLv2Fee',
        'share_totalagentLv3Fee',
        'share_totalagentLv3plusFee',
        ]),
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    filters: {
      money (val) {
        if(!val) return 0
        else return (val / 100).toFixed(2)
      }
    },
    methods: {
      callback () {
        return "hello world"
      }
    },
    mounted() {
      console.log('hello')
      console.log(this.share_countReport)
      console.log(this.account_userInfo)
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      // this.swiper.slideTo(3, 1000, false)
    }
  }
</script>
<style lang="scss">
  .my-button-prev, .my-button-next {
    position: absolute;
    top: 50%;
    width: 0.2rem;
    height: 0.2rem;
    margin-top: -0.1rem;
    z-index: 10;
    cursor: pointer;
    color: white;
    &.swiper-button-disabled {
      opacity: 0;
    }
  }
  .my-button-prev {
    left: 0.05rem;
    right: auto;
  }
  .my-button-next {
    left: auto;
    right: 0.05rem;
  }
  .swiper-pagination-bullet {
    opacity: 0.38;
    background-color: #032023;
  }
  .swiper-pagination-bullet-active {
    background: white;
    opacity: 1;
  }
  
</style>
<style lang="scss" scoped>
  .populizeScore {
    .banner {
      height: 1.78rem;
      background: white;
      .swiper {
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to top, #1ca3b1, #35b4c1);
        .people {
          .icon-person {
            font-size: 0.16rem;
            color: white;
          }
          .number {
            font-size: 0.34rem;
            color: white;
          }
        }
        .note {
          /*width: 2.28rem;*/
          .linerleft {
            width: 0;
            height: 0;
            border-top: 0.01rem solid transparent;
            border-bottom: 0.01em solid transparent;
            border-right: 0.655rem solid #cbf6fa;
          }
          .linerright {
            width: 0;
            height: 0;
            border-top: 0.01rem solid transparent;
            border-bottom: 0.01em solid transparent;
            border-left: 0.655rem solid #cbf6fa;
          } 
          .msg {
            font-size: 0.13rem;
            color: #cbf6fa;
            line-height: 1;
            padding: 0 0.1rem;
          }
        }
      }
    }
    .populizeScore-content {
      margin-top: 0.1rem;
      padding: 0 0.2rem;
      background: white;
      .title {
        padding: 0.2rem 0;
        h2 {
          padding-left: 0.1rem;
        }
        button {
          padding: 0.05rem 0.12rem;
          border-radius: 0.03rem;
          border: none;
          outline: none;
          font-size: 0.13rem;
          line-height: 1;
          color: white;
          background-color: #53d769;
        }
      }
      .liner {
        border:1px dashed #d3d3d3;
        height: 1px;
        transform: scaleY(.5);
      }
      .points {
        padding-top: 0.125rem;
        padding-bottom: 0.175rem;
        .pointItem {
          padding: 0.075rem 0;
          font-size: 0.14rem;
          color: #a4a4a4;
          .data {
            color: #383838;
          }
          .point {
            color: #f15151;
          }
        }
      }
    }
  }
</style>