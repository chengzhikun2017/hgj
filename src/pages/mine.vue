<template>
  <div class="mine hgj-container" flex="dir:top">
    <app-nav flex-box="0" :showBack="false">我的</app-nav>
    <article flex-box="1">
      <app-dot-bg class='banner' :type='1' :distanceOfCenter='4.5' :halfHeight='110'>
        <div class="myInfo">
          <div class="portraiture" @click='onClickAvatar'>
            <img src="/static/img/logo.jpg" alt="">
          </div>
          <div class="name" v-if='!userInfo.isLoged'>{{'未登录'}}</div>
          <div class="name" v-if='userInfo.isLoged'>{{userInfo.name||'未实名'}}</div>
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
          <div v-if='userInfo.isLoged' @click='goSetting' class="setting">
            用户设置
          </div>
        </div>
      </app-dot-bg>
      <div class="mine-content">
        <app-formitem3 title="我的计划" note="" @click.native='viewPlanRecords' :first="true">
          <div class="header" slot="icon">
            <app-cricleicon bgcolor="bg-red" icon="icon-date"></app-cricleicon>
          </div>
          <div class="content" slot="action">
            <span class="icon-go"></span>
          </div>
        </app-formitem3>
        <!-- <app-formitem3 title="联系我们" note="">
          <div class="header" slot="icon">
            <app-cricleicon bgcolor="bg-lightblue" icon="icon-contact"></app-cricleicon>
          </div>
          <div class="content" slot="action">
            <span class="icon-go"></span>
          </div>
        </app-formitem3> -->
        <app-formitem3 title="关于我们" note="" @click.native='viewAboutus'>
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
        <app-formitem3 title="常见问题" note="" :last="true" @click.native='viewQuestions'>
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
import {mapMutations,mapActions} from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods:{
    aboutus(){
      this.get_qa_ansqwer({
        aim:'2-2',
        title:'关于我们',
      })
      helper.goPage('/questions')
    },
    viewQuestions(){
      helper.goPage('/questions')
    },
    goOrderList(){
      helper.goPageLoged('/orderRecords')
    },
    viewBalance(){
      helper.goPageLoged('/balance_page')
    },
    goSignIn(){
      helper.goPage('/login')
    },
    onClickAvatar(){
      if(this.userInfo.userId){
        if(!this.userInfo.name){
          this.hgjAlert('绑定第一张信用卡，自动实名')
        }
      }else{
        helper.goPage('/login')
      }
    },
    goSetting(){
        helper.goPage('/user_setting')
    },
    viewPlanRecords(){
      helper.goPageLoged('/planrecords')
    },
    viewAboutus(){
      this.get_qa_ansqwer({
        aim:'8',
        title:'关于我们',
      })
      helper.goPage('/questions')
    },
    ...mapMutations([
      'get_qa_ansqwer',
    ]),
    ...mapActions([
      'share_getCount',
      'account_getUserInfo',
      ],)
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
  created(){
    this.account_getUserInfo(false)
  },
  events: {},
  components: {}
}
</script>
<style lang="scss" scoped>
  .mine {
    article {
      overflow: auto;
      .banner{
        height: 2.2rem;
        position: relative;
        background: #0E2A53;
      }
      .myInfo {
        text-align: center;
        padding: 0.2rem;
        position: relative;
        /*z-index: 1;*/
        .setting{
          position:absolute;
          top:0.15rem;
          right:0.1rem;
          font-size: 0.12rem;
          color:#ccc;
          text-decoration: underline;
        }
        .dot-bg{
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
        .portraiture {
          box-sizing: border-box;
          width: 0.78rem;
          height: 0.78rem;
          padding: 0.1rem;
          margin:0 auto;
          border-radius: 50%;
          background: white;
          margin-bottom: 0.1rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
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
