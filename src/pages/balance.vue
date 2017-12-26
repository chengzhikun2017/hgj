<template>
  <div class="balance hgj-container" flex="dir:top">
    <app-nav flex-box="0">余额提现</app-nav>
    <article flex-box="1">
      <div class="banner">
        <app-creditcard v-if="isEmpty" v-model="card1"></app-creditcard>
        <div class="emptyCard" v-if="!isEmpty" flex="dir:top main:center cross:center">
          <div class="note" flex="cross:center">
            <span class="icon-alert"></span>
            <p>请选择您要提现的银行卡</p>
          </div>
          <div class="btn3">选择银行卡</div>
        </div>
      </div>
      <div class="balance-content">
        <app-formitem label="提现金额" :first="true"></app-formitem>
        <app-formitem label="联系手机号" :last="true"></app-formitem>
      </div>
      <div class="mybutton">
        <app-button>提交修改</app-button>
      </div>
      <div class="popView" v-show="popFlag">
        <div class="popcontent">
          <div class="planbox">
            <header flex="cross:center">
              <div class="myicon">
                <app-cricleicon icon="icon-bankcard" bgcolor="bg-red"></app-cricleicon>
              </div>
              <div class="title" flex="dir:top main:center" flex-box="1">
                <h2>选择提现银行卡</h2>
                <p></p>
              </div>
              <span flex-box="0" @click="popFlag=false">关闭</span>
            </header>
            <div class="planbox-content">
              <div class="liner"></div>
              <app-formitem3 title="工商银行" note="(尾号：3836)" :last="true">
                <div slot="icon">
                  <span class="icon-plan"></span>
                </div>
              </app-formitem3>
              <app-formitem3 title="招商银行" note="(尾号：3318)" :last="true">
                <div slot="icon">
                  <span class="icon-plan"></span>
                </div>
              </app-formitem3>
              <app-formitem3 title="光大银行" note="(尾号：5658)" :last="true">
                <div slot="icon">
                  <span class="icon-plan"></span>
                </div>
              </app-formitem3>
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
        card1: {
          type: 'choose',
          name: '韩**',
          lastNo: '3638',
          billDate: 3,
          payDate: 13
        },
        popFlag: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  article {
    position: relative;
    .banner {
      padding: 0.15rem 0.2rem;
      background-image: linear-gradient(to top, #2c2c33, #3d404b);
    }
    .mybutton {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0.3rem 0.2rem;
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
      }
    }
    .emptyCard {
      width: 100%;
      height: 1.68rem;
      border: 1px dashed white;
      border-radius: 0.08rem;
      .note {
        padding-bottom: 0.1rem;
        color: #a4a4a4;
        font-size: 0.14rem;
        .icon-alert {
          margin-right: 0.085rem;
        }
        p {
          display: inline-block;
          font-size: 0.12rem;
          color: #a4a4a4;
        }
      }
      .btn3 {
        width: 1.94rem;
        height: 0.25rem;
        border-radius: 0.125rem;
        background: white;
        font-size: 0.13rem;
        line-height: 0.25rem;
        text-align: center;
        color: #f84c4b;
      }
    }
  }
</style>