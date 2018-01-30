<template>
  <div class="questions" flex="dir:top">
    <app-nav flex-box="0">我的客服</app-nav>
    <article flex-box="1">
      <ul class="qalist">
        <li v-for="qa in questions" :class="{'active': qa.id == qa_activeIndex}">
          <div class="content" @click="openAnswer(qa)" flex="main:justify cross:center">
            <span>{{ qa.title }}</span>
            <span v-show="qa.more && qa_activeIndex !== qa.id" class="icon-show"></span>
            <span v-show="qa.more && qa_activeIndex === qa.id" class="icon-hide"></span>
          </div>
          <ul v-if="qa.more && qa_activeIndex === qa.id" class="child">
            <li v-for="child in qa.children" >
              <div class="content" @click.stop="openAnswer(child)">
                <span>{{ child.title }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </article>
    <div class="popanswer" v-show="qa_popFlag" flex="dir:top">
        <div class="header" flex="main:justify" flex-box="0">
          <div class="title">{{qa_title}}</div>
          <div class="close" @click="close"><span class="icon-cancel"></span></div>
        </div>
        <div class="content" flex-box="1" v-if="qa_contentId === '1'">
          <p>登陆禾管家→我的→未登录头像→新用户注册（目前只支持手机号注册）</p>
        </div>
        <div class="content" flex-box="1" v-if="qa_contentId === '2'">
          <p>登陆禾管家→我的→余额→提现→输入金额→提交</p>
          <div class="notemsg">备注：单笔提现低于100元收取2元手续费，单日提现最高1万元。</div>
        </div>
        <div class="content" flex-box="1" v-if="qa_contentId === '3'">
          <p>登陆禾管家→我的→用户设置→修改密码→确认修改</p>
        </div>
        <div class="content" flex-box="1" v-if="qa_contentId === '4'">
          <p>登陆禾管家→推广→升级→选择支付方式→确认支付</p>
          <span class="note">备注：</span>
          <div class="notemsg">⑴.付费升级：大众98元、保时捷198元、劳斯莱斯698元。</div>
          <div class="notemsg">⑵.在原等级上升级，只需补相应的差价即可提升等级。比如，当前等级大众想升级为保时捷，支付费用为：198-98=100元，即可升级为保时捷。 </div>
          <div class="notemsg">⑶.同一级别或者低一级别推广，除劳斯莱斯公司奖励劳斯莱斯3%，其他等级无收益。另外代理关系最多3层。</div>
        </div>
        <div class="content" flex-box="1" v-if="qa_contentId === '5'">
          <p>登陆禾管家→推广→免费升级→分享</p>
          <span class="note">备注：</span>
          <div class="notemsg">⑴.成功分享10次即可升级大众，成功分享20次即可升级保时捷，成功分享70次即可升级劳斯莱斯。</div>
          <div class="notemsg">⑵.成功分享即推广的客户成功完成注册。 </div>
        </div>

        <div class="content" flex-box="1" v-if="qa_contentId === '6'">
          <p>
            ⑴.登陆禾管家→分享→二维码分享/微信分享/链接分享
          </p>
          <p>
            ⑵.登陆禾管家→我的→用户设置→我的分享二维码→保存二维码图片→分享二维码图片
          </p>
        </div>
        <div class="content" flex-box="1" v-if="qa_contentId === '7'">
          <p>大众:</p>
          <div class="notemsg2">
            当前等级权益<br>
            <div class="label">1、享受35%的收益。</div>
            <div class="msg">
              （例：大众→客户，成功获批平安银行信用卡，并且客户付费升级为大众，原大众获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>信用卡收益</td>
                <td>110元*35%=38.5元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*35%=34.3元</td>
              </tr>
            </table>
          </div>
          <p>保时捷:</p>
          <div class="notemsg2">
            当前等级权益<br>
            <div class="label">1、享受45%的收益。</div>
              <div class="msg">
                例：保时捷→客户，成功获批平安银行信用卡，并且客户付费升级为大众，原保时捷获得收益如下：
              </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>信用卡收益</td>
                <td>110元*45%=49.5元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*45%=44.1元</td>
              </tr>
            </table>
            2、享受大众多余的10%收益。<br>
            <div class="msg">
              例：保时捷→大众→客户，成功获批平安银行信用卡，并且客户付费升级为大众，原保时捷获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>信用卡收益</td>
                <td>110元*（45-35）%=11元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*（45-35）%=9.8元</td>
              </tr>
            </table>
          </div>
          <p>劳斯莱斯:</p>
          <div class="notemsg2">
            当前等级权益<br>
            <div class="label">1、享受60%的收益；</div>
            <div class="msg">
              例：劳斯莱斯→客户，成功获批平安银行信用卡，并且客户付费升级为大众，原劳斯莱斯获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>信用卡收益</td>
                <td>110元*60%=66元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*60%=58.8元</td>
              </tr>
            </table>
            <div class="label">2、享受大众多余的25%的收益；</div>
            <div class="msg">
              例：劳斯莱斯→大众→客户，成功获批平安银行信用卡，并且客户付费升级为大众，原劳斯莱斯获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>信用卡收益</td>
                <td>110元*（60-35）%=27.5元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*（60-35）%=24.5元</td>
              </tr>
            </table>
            <div class="label">3、享受保时捷多余的15%的收益；</div>
            <div class="msg">
              例：劳斯莱斯→保时捷→客户，成功获批平安银行信用卡，并且客户付费升级为大众，原劳斯莱斯获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>信用卡收益</td>
                <td>110元*（60-45）%=16.5元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*（60-45）%=14.7元</td>
              </tr>
            </table>
            <div class="label">4、享受同级别推广的3%奖励。</div>
            <div class="msg">
              例：劳斯莱斯1→劳斯莱斯2→客户，成功获批平安银行信用卡，并且客户付费升级为大众，原劳斯莱斯1获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>信用卡收益</td>
                <td>110元*3%=3.3元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*3%=2.94元</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="content" flex-box="1" v-if="qa_contentId === '8'">
          <p>客服电话：4000577009  </p> 
          <p>QQ公众号：4000577009</p>
          <p>招商加盟电话/微信：13566244446</p>
        </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import helper from '@/utils/helper.js'

  export default {
    data () {
      return {
        questions:[
          {
            'title': '如何注册账号？',
            'id': '1',
            'more': false,
          },
          {
            'title': '余额如何提现？',
            'id': '2',
            'more': false,
          },
          {
            'title': '如何修改密码？',
            'id': '3',
            'more': false,
          },
          {
            'title': '如何付费升级？',
            'id': '4',
            'more': false,
          },
          {
            'title': '如何免费升级？',
            'id': '5',
            'more': false,
          },
          {
            'title': '如何推广赚收益？',
            'id': '6',
            'more': false,
          },
          {
            'title': '信用卡等级收益',
            'id': '7',
            'more': false,
          }
        ]
      }
    },
    computed: {
      type(){
        return this.$route.query
      },
      ...mapGetters([
        'cards_dict',
        'qa_popFlag',
        'qa_contentId',
        'qa_activeIndex',
        'qa_title',
        'qa_straight'
      ])
    },
    methods: {
      openAnswer (qa) {
        if (qa.more) {
          // 做展开和收起操作
          if(qa.id === this.qa_activeIndex) {
            this.$store.commit('qa_change_activeIndex', 0)
          } else {
            this.$store.commit('qa_change_activeIndex', qa.id)
          }
          return;
        }
        this.$store.commit('qa_set_title', qa.title)
        this.$store.commit('qa_choose_contentId', qa.id)
        this.$store.commit('qa_toggle_popflag', true)
      },
      close () {
        this.$store.commit('qa_toggle_popflag', false)
        if (this.qa_straight) {
          helper.goPage(-1)
        }
        this.$store.commit('qa_change_straight', false)
      }
    },
    destroyed () {
      this.$store.commit('qa_toggle_popflag', false)
      this.$store.commit('qa_change_activeIndex', '0')
    }
  }
</script>
<style lang="scss" scoped>
  .questions {
    article {
      overflow: auto;
      .qalist {
        list-style: none;
        li {
          position: relative;
          /*height: 0.44rem;*/
          line-height: 0.44rem;
          font-size: 0.16rem;
          color: #383838;
          .content {
            position: relative;
            padding:0 0.2rem;
            &:after {
              position: absolute;
              left:0;
              bottom: 0;
              right: 0;
              height: 1px;
              background: #ccc;
              content: ' ';
              transform: scaleY(.5);
            };
          }
          
          .child {
            list-style-type: none;
            .content {
              padding-left: 0.4rem;
              font-size: 0.14rem;
            }
          }
        }
      }
    }
    .popanswer {
      position: absolute;
      /*overflow: hidden;*/
      top: 0.44rem;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      transition: all 2s;
      /*overflow: scroll;*/
      .header {
        position: relative;
        padding:0.1rem 0.2rem;
        /*position: absolute;
        top: 0;left: 0;*/
        width: 100%;
        font-size: 0.18rem;
        &:after {
          position: absolute;
          left:0;
          bottom: 0;
          right: 0;
          height: 1px;
          background: #ccc;
          content: ' ';
          transform: scaleY(.5);
        };
      }
      .content {
        overflow: scroll;
        /*height: 100%;*/
        /*position: fixed;
        top: 0.92rem;
        bottom: 0;*/
        /*margin-top: 0.46rem;*/
        .bankList {
          padding-top: 0.2rem;
          padding-left: 0.2rem;
          td, th {
            text-align: center;
            font-size: 0.18rem;
            padding-bottom: 0.05rem;
          }
          .name {
            margin-left: 0.1rem;
            position: relative;
            top: -0.04rem;
          }
        }
        .note {
          padding-left: 0.2rem;
          font-size: 0.14rem;
          color: #888;
        }
        p {
          padding:0.1rem 0.1rem;
          font-size: 0.16rem;
          text-indent: 0.28rem;
          color: #383838;
        }
        .notemsg {
          padding-left: 0.2rem;
          font-size: 0.14rem;
          color: #888;
          table {
            margin-top: 0.1rem;
            margin-bottom: 0.2rem;
            td {
              padding:0.05rem;
            }
          }
        }
        .notemsg2 {
          padding: 0 0.1rem;
          font-size: 0.1rem;
          font-size: 0.2rem;
          color: #888;
          .label {
            color: #f84c4b;
            font-size: 0.1rem;
          }
          .msg {
            font-size: 0.08rem;
            font-size: 0.16rem;
          }
          table {
            margin-top: 0.1rem;
            margin-bottom: 0.2rem;
            font-size: 0.12rem;
            td {
              padding:0.05rem;
            }
          }
        }
      }
    }
  }
</style>