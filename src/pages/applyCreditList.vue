<template>
  <div class="applycreditlist" flex="dir:top">
    <!-- <app-nav flex-box="0">信用卡通道</app-nav> -->
    <article flex-box="1">
      <div class="banner">
        <swiper class="swiper" :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
          <!-- slides -->
          <swiper-slide flex="dir:top main:center cross:center">
            <img src="@/assets/ad1.jpg" alt="">
          </swiper-slide>
          <swiper-slide flex="dir:top main:center cross:center">
            <img src="/static/img/ad2.jpg" alt="">
          </swiper-slide>
          <swiper-slide flex="dir:top main:center cross:center">
            <img src="/static/img/ad3.jpg" alt="">
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
      <ul class="list">
        <li v-for="cc in cc_list">
          <app-bankitem 
            :code="cc.code" 
            :title="cc.name" 
            :applyNum="cc.applyNum + '人'" 
            :feature="cc.feature" 
            :signs="JSON.parse(cc.tags)" 
            @banka="jumpgo(cc.id, cc.url)">
              
            </app-bankitem>
        </li>
      </ul>
    </article>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {mapMutations,mapActions,mapGetters} from 'vuex'
  import helper from '@/utils/helper.js'
  import commonRemind from '@/utils/commonRemind.js'
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
      this.cc_cardList({
        page: 1,
        limit: 10
      }).then(res => {
        
      });
    },
    mounted () {
      console.log(this.cc_list)
    },
    computed: {
      ...mapGetters([
        'cc_list'
      ]),
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      jumpgo (id, url) {
        // 需要做一个实现申请
        if (!this.$store.state.account.isLoged) {
          commonRemind.unloginRemind()
          return;
        }
        this.cc_applyCard(id);
        window.location.href = url;
      },
      callback () {
        return "hello world"
      },
      ...mapActions([
        'cc_cardList',
        'cc_applyCard'
      ]),
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
  .applycreditlist {
    width: 100%;
    height: 100%;
    article {
      overflow: auto;
      padding-bottom: 0.44rem;
      background: #F0F0F0;
      .banner {
        height: 1.78rem;
        background: white;
        .swiper {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>