<template>
  <div class="homepage" flex="dir:top">
    <article flex-box="1">
      <div class="banner" flex>
        <div class="box left" flex-box="1" flex="dir:top cross:center">
          <span class="circle bgred" flex="main:center cross:center">
            <span class="icon-creditcard"></span>
          </span>
          <span class="note">申请办卡</span>
        </div>
        <div class="box" flex-box="1" flex="dir:top cross:center">
          <span class="circle bgblue" flex="main:center cross:center">
            <span class="icon-truck"></span>
          </span>
          <span class="note">办卡进度</span>
        </div>
      </div>

      <div class="content">
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
      </div>
    </article>
  </div>
</template>
<script>
  import {mapMutations,mapActions,mapGetters} from 'vuex'
  import helper from '@/utils/helper.js'
  import commonRemind from '@/utils/commonRemind.js'
  export default {
    data () {
      return {

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
      ])
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
      ...mapActions([
        'cc_cardList',
        'cc_applyCard'
      ]),
    }
  }
</script>
<style lang="scss" scoped>
  .homepage {
    width: 100%;
    height: 100%;
    article {
      background: #F0F0F0;
      overflow: auto;
      .banner {
        .box {
          text-align: center;
          padding-bottom: 0.1rem;
          border-bottom: 0.01rem solid #ccc;
          background: white;
          &.left {
            border-right: 1px solid #ccc;
          }
          .circle {
            width: 0.4rem;
            height: 0.4rem;
            margin: 0.1rem 0;
            color:white;
            font-size: 0.24rem;
            border-radius: 50%;
            &.bgred {
              background: #f1518d;
            }
            &.bgblue {
              background: #6767e8;
            }
          }
          .note {
            font-size: 0.13rem;
            color: #333;
          }
        }
      }
      .content {
        padding: 0.1rem 0 0.4rem;
        .list {
          list-style: none;
        }
      }
    }
  }
</style>