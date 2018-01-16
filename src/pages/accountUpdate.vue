<template>
  <div class="accountUpdate" flex="dir:top">
    <app-nav flex-box="0">账户升级</app-nav>
    <article flex-box="1">
      <div class="banner">
        <div class="circle" flex="main:center cross:bottom">
          <div class="bannercontent">
            <div class="title" flex="main:center cross:center">
              <div class="rank">
                <img src="/static/img/rank.png" alt="">
              </div>
              <div class="level">
                <div class="msg">当前级别：亢龙有悔</div>
                <p class="note">您目前已经是最高级别！</p>
              </div>
            </div>
            <div class="content">
              <div class="bar" flex="main:center cross:center">
                <div class="liner" flex-box="1"></div>
                <div class="star" flex-box="0">
                  <span class="icon-star"></span>
                </div>
                <div class="note" flex-box="0">传奇属于您</div>
                <div class="star" flex-box="0">
                  <span class="icon-star"></span>
                </div>
                <div class="liner" flex-box="1"></div>
              </div>
              <div class="point">
                恭喜您！ 您已升至最高级别
              </div>
              <p>请尽情享受您的权益吧！</p>
            </div>
          </div>
          <div class="incircle"></div>
        </div>
      </div>
      <div class="accountUpdateContent">
        <div class="topbar" flex="cross:center">
          <app-cricleicon icon="icon-star" flex-box="0" circle="small" bgcolor="bg-blue" size="0.28rem"></app-cricleicon>
          <h3 flex-box="1" class="title">当前等级权益</h3>
          <span class="btn" flex-box="0" >了解规则</span>
        </div>
        <div class="cutliner">
        </div>
        <p>1. 享受25%的激活码购买折扣，祝您邀请更多的同道好友！</p>
        <p>2. 享受最高达35%的巨大分润！</p>
        <p>3. 享受多至2成的再次分润！</p>
        <div class="mybutton">
          <app-button>邀请更多道友</app-button>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .accountUpdate {
    width: 100%;
    height: 100%;
    article {
      background: white;
      overflow: auto;
      .banner {
        position: relative;
        height: 2.39rem;
        overflow: hidden;
        width: 100%;
        .circle {
          position: absolute;
          top: -8.91rem;
          left: 50%;
          margin-left: -5.65rem;
          width: 11.3rem;
          height: 11.3rem;
          border-radius: 50%;
          background: #323232;
          overflow: hidden;
          .incircle {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            border-radius: 50%;
            box-shadow:0 0 0.5rem #999 inset;
          }
          .bannercontent {
            width: 3.35rem;
            height: 2.39rem;
            .title {
              height: 1.02rem;
              .rank {
                img {
                  width: 0.4rem;
                  display: block;
                }
              }
              .level {
                margin-left: 0.15rem;
                .msg {
                  margin-bottom: 0.09rem;
                  font-size: 0.15rem;
                  color: #f8d444;
                  line-height: 1;
                }
                .note {
                  font-size: 0.12rem;
                  color: rgba(255, 255, 255, 0.56);
                  line-height: 1;
                }
              }
            }
            .content {
              width: 100%;
              height: 1.37rem;
              box-sizing: border-box;
              padding:0.15rem 0.15rem 0;
              border-radius: 0.1rem;
              background: white;
              .bar {
                .liner {
                  height: 1px;
                  background: #d3d3d3;
                  transform: scaleY(.5);
                }
                .note {
                  color: #383838;
                  font-size: 0.13rem;
                  line-height: 1;
                }
                .star {
                  color: #d3d3d3;
                  font-size: 0.12rem;
                  line-height: 1;
                  padding:0 0.15rem;
                }
              }
              .point {
                margin-top: 0.3rem;
                font-size: 0.2rem;
                font-weight: 900;
                line-height: 1;
                color: #383838;
                text-align: center;
              }
              p {
                margin-top: 0.15rem;
                font-size: 0.13rem;
                color: #a4a4a4;
                line-height: 1;
                text-align: center;
              }
            }
          }
        }
      }
      .accountUpdateContent {
        padding:0.2rem 0.2rem 0;
        .topbar {
          .title {
            margin-left: 0.1rem;
            font-size: 0.19rem;
            color: #383838;
            line-height: 1;
            font-weight: 600;
          }
          .btn {
            padding: 0.05rem 0.14rem;
            border-radius: 0.03rem;
            font-size: 0.13rem;
            color: white;
            line-height: 1;
            background: #53d769;
          }
        }
        .cutliner {
          margin:0.2rem 0;
          height: 1px;
          border: 1px dashed #d3d3d3;
          transform: scaleY(.5);
        }
        p {
          font-size: 0.14rem;
          color: #383838;
          line-height: 1.5;
          margin-bottom: 0.15rem;
        }
        .mybutton {
          margin-top: 0.36rem;
        }
      }
    }
  }
</style>