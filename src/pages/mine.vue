<template>
  <div class="mine hgj-container" flex="dir:top">
    <app-nav flex-box="0">我的</app-nav>
    <article flex-box="1">
      <div class="myInfo">
        <div class="portraiture" @click='onClickAvatar'>
          <img src="" alt="">
        </div>
        <div class="name" v-if='!userInfo.isLoged'>{{'未登录'}}</div>
        <div class="name" v-if='userInfo.isLoged'>{{userInfo.name||'未实名'}}</div>
        <!-- <div class="phone">{{userInfo.phone||''}}</div> -->
        <!-- <div class="phone">{{phone}}</div> -->
        <div class="liner"></div>
        <div class="info" flex="main:center cross:center">
          <div class="item" @click='viewBalance'>
            <p>{{balance}}<span class="yuan">元</span></p>
            <div class="label">余额</div>
          </div>
          <div class="item">
            <p>{{jifen}}</p>
            <div class="label">积分</div>
          </div>
          <div class="item" @click='viewBalance'>
            <p>{{securityFee}}<span class="yuan">元</span></p>
            <div class="label">保证金</div>
          </div>
        </div>
        <div v-if='userInfo.isLoged' @click='goSetting'style="position:absolute;top:0.55rem;right:0.1rem;font-size: 0.12rem;color:#ccc;text-decoration: underline">
          用户设置
        </div>
      </div>
      <div class="mine-content">
        <app-formitem3 title="我的计划" note="" @click.native='viewPlanRecords' :first="true">
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
        <app-formitem3 title="我的订单" note="" @click.native='goOrderList'>
          <div class="header" slot="icon">
            <app-cricleicon bgcolor="bg-lightblue" icon="icon-cricle-yuan"></app-cricleicon>
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
    goOrderList(){
      helper.goPage('/orderRecords')
    },
    viewBalance(){
      helper.goPage('/balance_page')
    },
    goSignIn(){
      helper.goPage('/login')
    },
    onClickAvatar(){
      if(this.userInfo){

      }else{
        helper.goPage('/login')
      }
      helper.goPage('/login')
      
    },
    goSetting(){
        helper.goPage('/user_setting')
    },
    viewPlanRecords(){
      helper.goPage('/planrecords')
    },
  },
  computed:{
    balance() {
      let fee = this.userInfo.money / 100
      return fee.toFixed(2)
    },
    jifen(){
      return this.userInfo.jf
    },
    securityFee(){
      let fee=(this.userInfo.unfreezeMoney+this.userInfo.freezeMoney)/100
      return fee.toFixed(2)
    },
    userInfo(){
      return this.$store.state.account
    },
    phone(){
      return this.userInfo.phone
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
