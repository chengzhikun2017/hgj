<template>
  <div class="activeaccount" flex="dir:top">
    <app-nav flex-box="0">激活账户</app-nav>
    <article flex-box="1">
      <div class="banner">
        
      </div>
      <div class="activeaccount-content">
        <p class="info">完成下面任务，更轻松完成（感觉怪怪的）</p>
        <app-formitem3 title="分享" note="已被浏览10次" :first="true">
          <div class="header" slot="icon">
            <app-cricleicon></app-cricleicon>
          </div>
          <div class="content" slot="action">
            去分享>
          </div>
        </app-formitem3>
        <app-formitem3 title="了解养成计划" note="详细了解养成计划">
          <div class="header" slot="icon">
            <app-cricleicon></app-cricleicon>
          </div>
          <div class="content" slot="action">
            未完成>
          </div>
        </app-formitem3>
        <app-formitem3 title="实名计划" note="请完成您的实名认证" :last="true">
          <div class="header" slot="icon">
            <app-cricleicon></app-cricleicon>
          </div>
          <div class="content" slot="action">
            未完成>
          </div>
        </app-formitem3>
      </div>
      <div class="popView" v-show="popFlag">
        <div class="popcontent">
          <div class="planbox">
            <header flex="cross:center">
              <div class="myicon">
                <app-cricleicon icon="icon-share" bgcolor="bg-red"></app-cricleicon>
              </div>
              <div class="title" flex="dir:top main:center" flex-box="1">
                <h2>分享</h2>
                <p></p>
              </div>
              <span flex-box="0" @click="popFlag=false">关闭</span>
            </header>
            <div class="planbox-content">
              <div class="liner"></div>
              <div class="waysItem" flex>
                <div class="waybox">
                  <div class="icon-message"></div>
                  <p>短信分享</p>
                </div>
                <div class="waybox">
                  <div class="icon-wechat"></div>
                  <p>微信分享</p>
                </div>
                <div class="waybox">
                  <div class="icon-wechat-cicle"></div>
                  <p>朋友圈分享</p>
                </div>
              </div>
              <div class="waysItem" flex>
                <div class="waybox">
                  <div class="icon-qq"></div>
                  <p>QQ分享</p>
                </div>
                <div class="waybox">
                  <div class="icon-link"></div>
                  <p>通过链接分享</p>
                </div>
                <div class="waybox">
                  <div class="icon-qrcode"></div>
                  <p>二维码分享</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        popFlag: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .activeaccount {
    width: 100%;
    height: 100%;
    article {
      overflow: auto;
      background: #f3f3f3;
      .banner {
        width: 100%;
        height: 1.78rem;
        background: white;
      }
      .activeaccount-content {
        padding-top: 0.2rem;
        .info {
          border-top: 1px solid #d3d3d3;
          font-size: 0.14rem;
          color: #a4a4a4;
          padding:0.13rem 0.2rem;
          background: white;
        }
        .header {
          padding-right: 0.15rem;
        }
        .content {
          font-size: 0.13rem;
          color: #a4a4a4;
        }
      }
    }
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
          .ways {
            li {
              width: 33%;
            }
            p {
              font-size: 0.14rem;
              color: #7d7d7d;
            }
          }
        }
      }
    }
  }
</style>