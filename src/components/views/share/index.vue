<template>
  <div class="popView" v-show="value">
    <div class="popcontent">
      <div class="planbox">
        <header flex="cross:center">
          <div class="myicon">
            <app-cricleicon icon="icon-share" bgcolor="bg-red" size="0.25rem"></app-cricleicon>
          </div>
          <div class="title" flex="dir:top main:center" flex-box="1">
            <h2>分享</h2>
            <p></p>
          </div>
          <span flex-box="0" @click="close">关闭</span>
        </header>
        <div class="planbox-content">
          <div class="liner"></div>
          <div class="waysItem" flex>
            <div class="waybox">
              <div class="icon-message bluegreen"></div>
              <p>短信分享</p>
            </div>
            <div class="waybox">
              <div class="icon-wechat green"></div>
              <p>微信分享</p>
            </div>
            <div class="waybox">
              <div class="icon-wechat darkred"></div>
              <p>朋友圈分享</p>
            </div>
          </div>
          <div class="waysItem" flex>
            <div class="waybox">
              <div class="icon-qq blue"></div>
              <p>QQ分享</p>
            </div>
            <div class="waybox">
              <div class="icon-link purple"></div>
              <p>通过链接分享</p>
            </div>
            <div class="waybox">
              <div class="icon-qrcode black"></div>
              <p>二维码分享</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: 'http://www.google.com'
      }
    },
    data () {
      return {

      }
    },
    methods: {
      close () {
        this.$emit('input', false)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .popView {
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .8);
    .popcontent {
      position: absolute;
      left: 0.2rem;
      right: 0.2rem;
      bottom: 0.2rem;
      .planbox-content {
        .waysItem {
          .waybox {
            width: 33%;
            text-align: center;
            padding: 0.15rem 0;
            div {
              font-size: 0.32rem;
              padding-bottom: 0.1rem;
            }
            p {
              font-size: 0.14rem;
              color: #7d7d7d;
              line-height: 1;
            }
          }
        }
      }
    }
    .bluegreen {
      color: #51d59c;
    }
    .green {
      color: #61cb41;
    }
    .darkred {
      color: #cb4141;
    }
    .blue {
      color: #5186d5;
    }
     .purple {
      color: #bb51d5;
    }
    .black {
      color: #393939;
    }
  }
</style>