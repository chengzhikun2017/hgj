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
    <div class="popanswer" v-show="qa_popFlag">
        <div class="header" flex="main:justify">
          <div class="title">{{qa_title}}</div>
          <div class="close" @click="close"><span class="icon-cancel"></span></div>
        </div>
        <div class="content" v-if="qa_contentId === '1-1'">
          <p>登陆禾管家→我的→未登录头像→新用户注册（目前只支持手机号注册）</p>
        </div>
        <div class="content" v-if="qa_contentId === '1-2'">
          <p>登陆禾管家→我的→用户设置→账户激活→付费马上激活→确认支付（开业酬宾激活免费）</p>
        </div>
        <div class="content" v-if="qa_contentId === '1-3'">
          <p>登陆禾管家→我的→用户设置→账户激活→免费激活→分享（成功分享15次即可免费激活账户）</p>
        </div>
        <div class="content" v-if="qa_contentId === '2-1'">
          <p>登陆禾管家→卡包→我的信用卡→添加信用卡，输入相关信息即可添加（持卡人应与身份证名字一致，信用卡最多添加9张）。</p>
        </div>
        <div class="content" v-if="qa_contentId === '2-2'">
          <p>登陆禾管家→卡包→我的储蓄卡→添加银行卡，输入相关信息即可添加（持卡人应与身份证名字一致）。</p>
        </div>
        <div class="content" v-if="qa_contentId === '2-3'">
          <p>登陆禾管家→卡包→我的信用卡/储蓄卡→选择信用卡/储蓄卡→点击删除图标→确认</p>
        </div>
        <div class="content" v-if="qa_contentId === '2-4'">
          <p>结算卡用于提现保证金， 最多只能设置一张储蓄卡为结算卡，一般选择您的常用储蓄卡作为结算卡，目前暂不支持更换结算卡，如有需求请联系客服</p>
        </div>
        <div class="content" v-if="qa_contentId === '2-5'">
          <p>登陆禾管家→卡包→我的储蓄卡→设置为结算卡</p>
        </div>
        <div class="content" v-if="qa_contentId === '3-1'">
          <p>登陆禾管家→卡包→我的信用卡→创建还款计划→预览还款计划→支付并开启还款计划（系统将自动为您设置最优还款计划）</p>
        </div>
        <div class="content" v-if="qa_contentId === '3-2'">
          <p>登陆禾管家→卡包→我的信用卡→选择信用卡→修改计划→选择还款计划→预览还款计划→支付并开启还款计划</p>
        </div>
        <div class="content" v-if="qa_contentId === '4-1'">
          <p>登陆禾管家→我的→余额→提现→输入金额→提交</p>
          <div class="notemsg">备注：余额提现低于100元每笔收取2元手续费。</div>
        </div>
        <div class="content" v-if="qa_contentId === '4-2'">
          <p>登陆禾管家→我的→余额→保证金提现→输入金额→提交</p>
          <div class="notemsg">备注：保证金只能提现到结算卡，结算卡最多只有一张。</div>
        </div>
        <div class="content" v-if="qa_contentId === '4-3'">
          <p>登陆禾管家→我的→用户设置→修改密码→确认修改</p>
        </div>
        <div class="content" v-if="qa_contentId === '5-1'">
          <p>登陆禾管家→推广→升级→选择支付方式→确认支付</p>
          <span class="note">备注：</span>
          <div class="notemsg">
            ⑴.付费升级：大众98元、保时捷198元、劳斯莱斯698元。
          </div>
          <div class="notemsg">
            ⑵.在原等级上升级，只需补相应的差价即可提升等级。比如，当前等级大众想升级为保时捷，支付费用为：198-98=100元，即可升级为保时捷。
          </div>
        </div>
        <div class="content" v-if="qa_contentId === '5-2'">
          <p>登陆禾管家→推广→免费升级→分享</p>
          <span class="note">备注：</span>
          <div class="notemsg">
            ⑴.成功分享10次即可升级大众，成功分享10次即可升级保时捷，成功分享50次即可升级劳斯莱斯。
          </div>
          <div class="notemsg">
            ⑵.成功分享即推广的客户成功完成注册。
          </div>
        </div>
        <div class="content" v-if="qa_contentId === '5-3'">
          <p>登陆禾管家→我的→用户设置→我的分享二维码→保存二维码图片→分享二维码图片，客户扫码注册后即成为您名下的客户，客户每次消费，佣金即返您的账户余额。</p>
        </div>
        <div class="content" v-if="qa_contentId === '5-4'">
          <p>客户激活账户后，并成功创建还款计划，平台会收取服务费，服务费除掉成本，剩余服务费可进行分润，大概30元左右（服务费分润根据还款周期而波动）。</p>
        </div>
         <div class="content" v-if="qa_contentId === '5-5'">
          <p>同一级别或者低一级别，除劳斯莱斯外，其他级别推广无收益，公司奖励劳斯莱斯3%，另外代理关系最多3层。</p>
          <div class="notemsg2">
            <div class="label">例⑴.大众1→保时捷→大众2→客户，该客户付费激活账户后，各级别收益情况如下：</div>
            
            <table cellspacing="0" border="1">
              <tr>
                <td>大众1</td>
                <td>无收益</td>
              </tr>
              <tr>
                <td>保时捷</td>
                <td>99元*（45-35）%=9.9元</td>
              </tr>
              <tr>
                <td>大众2</td>
                <td>99元*35%=34.65元</td>
              </tr>
            </table>
            <div class="msg">
              备注：大众1想获得收益，可以升级更高一级代理，下一次间接推广的客户就可以获得收益
              （大众1和大众2同一级别，并且大众1比保时捷低一级别，所以大众1无收益）。
            </div>
          </div>
          <div class="notemsg2">
            <div class="label">例⑵.劳斯莱斯1→劳斯莱斯2→客户，该客户付费激活账户后，各级别收益情况如下：</div>
            <table cellspacing="0" border="1">
              <tr>
                <td>劳斯莱斯1</td>
                <td>99元*3%=3.97元</td>
              </tr>
              <tr>
                <td>莱斯莱斯2</td>
                <td>99元*60%=59.4元</td>
              </tr>
            </table>
          </div>
          <div class="notemsg2">
            <div class="label">例⑶.保时捷1→保时捷2→大众1→大众2→客户，该客户付费激活账户后，各级别收益情况如下：</div>
            <table cellspacing="0" border="1">
              <tr>
                <td>保时捷1</td>
                <td>无收益</td>
              </tr>
              <tr>
                <td>保时捷2</td>
                <td>99元*（45-35）%=9.9元</td>
              </tr>
              <tr>
                <td>大众1</td>
                <td>无收益</td>
              </tr>
              <tr>
                <td>大众2</td>
                <td>99元*35%=34.65元</td>
              </tr>
            </table>
            <div class="msg">
              备注：保时捷1因代理关系超过3层无收益；大众1因同一级别无收益。
            </div>
          </div>
        </div>
        <div class="content" v-if="qa_contentId === '6'">
          <table class="bankList">
            <tr v-for="(value, key) in cards_dict">
              <td flex>
                <!-- <div :class='"ui-banklogo-s-" + key' style="margin:0 auto;background-image: url(/static/img/small_logo_sprite.png);"></div> -->
                <div class="name">{{value}}</div><!-- <img :src="'https://apimg.alipay.com/combo.png?d=cashier&t=' + key" alt=""> -->
              </td>
              <td></td>
            </tr>
          </table>
        </div>
        <div class="content" v-if="qa_contentId === '8'">
          <p>客服电话：4000577009  </p> 
          <p>QQ公众号：4000577009</p>
          <p>招商加盟电话/微信：13566244446</p>
        </div>
        <div class="content" v-if="qa_contentId === '9'">
          <p>大众:</p>
          <div class="notemsg2">
            当前等级权益<br>
            <div class="label">1、享受35%的收益。</div>
            <div class="msg">
              （收益来源包括客户账户激活费、等级升级费、服务费分润）例：大众→客户，客户激活账户后并操作还款（首次还款免服务费，第二次开始计费结算收益），并且客户付费升级为大众，原大众获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>账户激活收益</td>
                <td>99元*35%=34.65元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*35%=34.3元</td>
              </tr>
              <tr>
                <td>服务费分润收益</td>
                <td>30元*35%=10.5元</td>
              </tr>
            </table>
          </div>
          <p>保时捷:</p>
          <div class="notemsg2">
            当前等级权益<br>
            <div class="label">1、享受45%的收益。</div>
             <div class="msg">
              （收益来源包括客户账户激活费、等级升级费、服务费分润）例：保时捷→客户，客户激活账户后并操作还款（首次还款免服务费，第二次开始计费结算收益），并且客户付费升级为大众，原保时捷获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>账户激活收益</td>
                <td>99元*45%=44.55元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*45%=44.1元</td>
              </tr>
              <tr>
                <td>服务费分润收益</td>
                <td>30元*45%=13.5元</td>
              </tr>
            </table>
            2、享受大众多余的10%收益。<br>
            <div class="msg">
              例：保时捷→大众→客户，客户激活账户后并操作还款（首次还款免服务费，第二次开始计费结算收益），并且客户付费升级为大众，原保时捷获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>账户激活收益</td>
                <td>99元*（45-35）%=9.9元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*（45-35）%=9.8元</td>
              </tr>
              <tr>
                <td>服务费分润收益</td>
                <td>30元*（45-35）%=3元</td>
              </tr>
            </table>
          </div>
          <p>劳斯莱斯:</p>
          <div class="notemsg2">
            当前等级权益<br>
            <div class="label">1、享受60%的收益；</div>
            <div class="msg">
              （收益来源包括客户账户激活费、等级升级费、服务费分润）例：劳斯莱斯→客户，客户激活账户后并操作还款（首次还款免服务费，第二次开始计费结算收益），并且客户付费升级为大众，原劳斯莱斯获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>账户激活收益</td>
                <td>99元*60%=59.4元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*60%=58.8元</td>
              </tr>
              <tr>
                <td>服务费分润收益</td>
                <td>30元*60%=18元</td>
              </tr>
            </table>
            <div class="label">2、享受大众多余的25%的收益；</div>
            <div class="msg">
              例：劳斯莱斯→大众→客户，客户激活账户后并操作还款（首次还款免服务费，第二次开始计费结算收益），并且客户付费升级为大众，原劳斯莱斯获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>账户激活收益</td>
                <td>99元*（60-35）%=24.75元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*（60-35）%=24.5元</td>
              </tr>
              <tr>
                <td>服务费分润收益</td>
                <td>30元*（60-35）%=7.5元</td>
              </tr>
            </table>
            <div class="label">3、享受保时捷多余的15%的收益；</div>
            <div class="msg">
              例：劳斯莱斯→保时捷→客户，客户激活账户后并操作还款（首次还款免服务费，第二次开始计费结算收益），并且客户付费升级为大众，原劳斯莱斯获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>账户激活收益</td>
                <td>99元*（60-45）%=14.85元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*（60-45）%=14.7元</td>
              </tr>
              <tr>
                <td>服务费分润收益</td>
                <td>30元*（60-45）%=4.5元</td>
              </tr>
            </table>
            <div class="label">4、享受同级别推广的3%的收益。</div>
            <div class="msg">
              例：劳斯莱斯1→劳斯莱斯2→客户，客户激活账户后并操作还款（首次还款免服务费，第二次开始计费结算收益），并且客户付费升级为大众，原劳斯莱斯1获得收益如下：
            </div>
            <table cellspacing="0" border="1">
              <tr>
                <td>账户激活收益</td>
                <td>99元*3%=2.97元</td>
              </tr>
              <tr>
                <td>等级升级收益</td>
                <td>98元*3%=2.94元</td>
              </tr>
              <tr>
                <td>服务费分润收益</td>
                <td>30元*3%=0.9元</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="content" v-if="qa_contentId === '10'">
          <p>推广一个注册用户即可获得10000积分，积分目前可以用于免费激活账号、代理升级等</p>
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
            'title': '注册/激活账户问题',
            'id': '1',
            'more': true,
            'children': [
              {
                'title': '如何注册禾管家账户',
                'id': '1-1',
                'more': false,
              },
              {
                'title': '如何付费激活账户',
                'id': '1-2',
                'more': false,
              },
              {
                'title': '如何免费激活账户',
                'id': '1-3',
                'more': false,
              }
            ]
          },
          {
            'title': '如何添加/删除“卡”的问题',
            'id': '2',
            'more': true,
            'children': [
              {
                'title': '如何添加信用卡',
                'id': '2-1',
                'more': false,
              },
              {
                'title': '如何添加储蓄卡',
                'id': '2-2',
                'more': false,
              },
              {
                'title': '如何删除信用卡/储蓄卡',
                'id': '2-3',
                'more': false,
              },
              {
                'title': '什么是结算卡',
                'id': '2-4',
                'more': false,
              },
              {
                'title': '如何设置结算卡',
                'id': '2-5',
                'more': false,
              }
            ]
          },
          {
            'title': '如何设置/修改还款计划的问题',
            'id': '3',
            'more': true,
            'children': [
              {
                'title': '如何设置还款计划',
                'id': '3-1',
                'more': false,
              },
              {
                'title': '如何修改还款计划',
                'id': '3-2',
                'more': false,
              }
            ]
          },
          {
            'title': '如何提现/修改密码的问题',
            'id': '4',
            'more': true,
            'children': [
              {
                'title': '余额如何提现',
                'id': '4-1',
                'more': false,
              },
              {
                'title': '保证金如何提现',
                'id': '4-2',
                'more': false,
              },
              {
                'title': '如何修改密码',
                'id': '4-3',
                'more': false,
              }
            ]
          },
          {
            'title': '如何推广赚收益的问题',
            'id': '5',
            'more': true,
            'children': [
              {
                'title': '如何付费升级',
                'id': '5-1',
                'more': false,
              },
              {
                'title': '如何免费升级',
                'id': '5-2',
                'more': false,
              },
              {
                'title': '升级后，如何推广赚收益',
                'id': '5-3',
                'more': false,
              },
              {
                'title': '什么是服务费分润',
                'id': '5-4',
                'more': false,
              },
              {
                'title': '关于同一级别或低一级别的推广问题',
                'id': '5-5',
                'more': false,
              }
            ]
          },
          {
            'title': '支持银行卡类型',
            'id': '6',
            'more': false,
          },
          
          {
            'title': '代理等级收益',
            'id': '9',
            'more': false,
          },
          {
            'title': '如何赚取积分',
            'id': '10',
            'more': false,
          },
          {
            'title': '关于我们',
            'id': '8',
            'more': false,
          },
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
      position: fixed;
      /*overflow: hidden;*/
      top: 0.44rem;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      transition: all 2s;
      /*overflow: scroll;*/
      .header {
        /*position: relative;*/
        padding:0.1rem 0.2rem;
        position: absolute;
        top: 0;left: 0;
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
        position: fixed;
        top: 0.92rem;
        bottom: 0;
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