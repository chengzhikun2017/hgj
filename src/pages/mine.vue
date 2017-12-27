<template>
  <div class="mine hgj-container" flex="dir:top">
    <app-nav title="我的" flex-box="0"></app-nav>
    <article flex-box="1">
      <div class="myInfo">
        <div class="portraiture" @click='goSignIn'>
          <img src="" alt="">
        </div>
        <div class="name">韩鑫波</div>
        <div class="phone">187-3512-3489</div>
        <div class="liner"></div>
        <div class="info" flex="main:center cross:center">
          <div class="item">
            <p>3638.00 <span class="yuan">元</span></p>
            <div class="label">余额</div>
          </div>
          <div class="item">
            <p>568</p>
            <div class="label">积分</div>
          </div>
          <div class="item">
            <p>500.00<span class="yuan">元</span></p>
            <div class="label">已冻结保证金</div>
          </div>
        </div>
      </div>
      <div class="mine-content">
        <app-formitem3 title="计划执行记录" note="" :first="true">
          <div class="header" slot="icon">
            <app-cricleicon bgcolor="bg-red" icon="icon-date"></app-cricleicon>
          </div>
          <div class="content" slot="action">
            <span class="icon-go"></span>
          </div>
        </app-formitem3>
        <app-formitem3 title="联系我们" note="">
          <div class="header" slot="icon">
            <app-cricleicon bgcolor="bg-lightblue" icon="icon-contact"></app-cricleicon>
          </div>
          <div class="content" slot="action">
            <span class="icon-go"></span>
          </div>
        </app-formitem3>
        <app-formitem3 title="关于我们" note="">
          <div class="header" slot="icon">
            <app-cricleicon bgcolor="bg-purple" icon="icon-aboutus"></app-cricleicon>
          </div>
          <div class="content" slot="action">
            <span class="icon-go"></span>
          </div>
        </app-formitem3>
        <app-formitem3 title="常见问题" note="" :last="true">
          <div class="header" slot="icon">
            <app-cricleicon bgcolor="bg-orange" icon="icon-question"></app-cricleicon>
          </div>
          <div class="content" slot="action">
            <span class="icon-go"></span>
          </div>
        </app-formitem3>
      </div>
    </article>
  </div>
</template>

<script>
import helper from '../utils/helper.js'
export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{
    goSignIn(){
      helper.goPage('/login')
    },
  },
  events: {},
  components: {}
}
</script>
<style lang="scss" scoped>
  .mine {
    article {
      .myInfo {
        background: #0E2A53;
        text-align: center;
        padding: 0.2rem;
        .portraiture {
          width: 0.78rem;
          height: 0.78rem;
          margin:0 auto;
          border-radius: 50%;
          background: white;
          margin-bottom: 0.1rem;
        }
        .name {
          font-size: 0.16rem;
          color: white;
          line-height: 1;
          padding-bottom: 0.08rem;
        }
        .phone {
          font-size: 0.13rem;
          color: white;
          line-height: 1;
          padding-bottom: 0.15rem;
        }
        .liner {
          border: 1px dashed #d3d3d3;
          height: 1px;
          transform: scaleY(.5);
        }
        .info {
          padding: 0.23rem 0 0.025rem;
          .item {
            text-align: center;
            width: 33%;
            p {
              font-size: 0.18rem;
              color: #f84f4b;
              .yuan {
                font-size: 0.12rem;
              }
            }
            .label {
              font-size: 0.12rem;
              color: rgba(255, 255, 255, 0.46);
            }
          }
        }
      }
    }
    .mine-content {
      padding-top: 0.2rem;
      .header {
        margin-right: 0.15rem;
      }
      .content {
        color: #c3c3c3;
        font-size: 0.16rem;
      }
    }
  }
</style>
