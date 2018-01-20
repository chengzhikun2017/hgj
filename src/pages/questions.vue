<template>
  <div class="questions" flex="dir:top">
    <app-nav flex-box="0">我的客服</app-nav>
    <article flex-box="1">
      <ul class="qalist">
        <li v-for="qa in questions" :class="{'active': qa.id == QaActiveIndex}">
          <div class="content" @click="openAnswer(qa)" flex="main:justify cross:center">
            <span>{{ qa.title }}</span>
            <span v-show="qa.more && QaActiveIndex !== qa.id" class="icon-show"></span>
            <span v-show="qa.more && QaActiveIndex === qa.id" class="icon-hide"></span>
          </div>
          <ul v-if="qa.more && QaActiveIndex === qa.id" class="child">
            <li v-for="child in qa.children" >
              <div class="content" @click.stop="openAnswer(child)">
                <span>{{ child.title }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </article>
    <div class="popanswer" v-show="QaPopFlag">
        <div class="header" flex="main:justify">
          <div class="title">{{QaTitle}}</div>
          <div class="close" @click="close"><span class="icon-cancel"></span></div>
        </div>
        <div class="content" v-if="QaContentId === '1-1'">
          <p>登陆禾管家→我的→未登录头像→新用户注册（目前只支持手机号注册）</p>
        </div>
        <div class="content" v-if="QaContentId === '1-2'">
          <p>登陆禾管家→我的→用户设置→账户激活→付费马上激活→确认支付（开业酬宾优惠价98元）</p>
        </div>
        <div class="content" v-if="QaContentId === '1-3'">
          <p>登陆禾管家→我的→用户设置→账户激活→免费激活→分享（成功分享15次即可免费激活账户）</p>
        </div>
        <div class="content" v-if="QaContentId === '2-1'">
          <p>登陆禾管家→卡包→我的信用卡→添加信用卡，输入相关信息即可添加（持卡人应与身份证名字一致，信用卡最多添加9张）。</p>
        </div>
        <div class="content" v-if="QaContentId === '2-2'">
          <p>登陆禾管家→卡包→我的储蓄卡→添加银行卡，输入相关信息即可添加（持卡人应与身份证名字一致）。</p>
        </div>
        <div class="content" v-if="QaContentId === '2-3'">
          <p>登陆禾管家→卡包→我的信用卡/储蓄卡→选择信用卡/储蓄卡→点击删除图标→确认</p>
        </div>
        <div class="content" v-if="QaContentId === '2-4'">
          <p>登陆禾管家→卡包→我的储蓄卡→设置为结算卡</p>
        </div>
        <div class="content" v-if="QaContentId === '3-1'">
          <p>登陆禾管家→卡包→我的信用卡→创建还款计划→预览还款计划→支付并开启还款计划（系统将自动为您设置最优还款计划，首次还款免服务费）</p>
        </div>
        <div class="content" v-if="QaContentId === '3-2'">
          <p>登陆禾管家→卡包→我的信用卡→选择信用卡→修改计划→选择还款计划→预览还款计划→支付并开启还款计划</p>
        </div>
        <div class="content" v-if="QaContentId === '4-1'">
          <p>登陆禾管家→我的→余额→提现→输入金额→提交</p>
          <div class="notemsg">备注：余额提现低于100元每笔收取2元手续费。</div>
        </div>
        <div class="content" v-if="QaContentId === '4-2'">
          <p>登陆禾管家→我的→余额→保证金提现→输入金额→提交</p>
          <div class="notemsg">备注：保证金只能提现到结算卡，结算卡最多只有一张。</div>
        </div>
        <div class="content" v-if="QaContentId === '4-3'">
          <p>登陆禾管家→我的→用户设置→修改密码→确认修改</p>
        </div>
        <div class="content" v-if="QaContentId === '5-1'">
          <p>登陆禾管家→推广→升级→选择支付方式→确认支付</p>
          <span class="note">备注：</span>
          <div class="notemsg">
            ⑴.付费升级：大众98元、保时捷198元、劳斯莱斯698元。
          </div>
          <div class="notemsg">
            ⑵.在原等级上升级，只需补相应的差价即可提升等级。比如，当前等级大众想升级为保时捷，支付费用为：198-98=100元，即可升级为保时捷。
          </div>
        </div>
        <div class="content" v-if="QaContentId === '5-2'">
          <p>登陆禾管家→推广→免费升级→分享</p>
          <span class="note">备注：</span>
          <div class="notemsg">
            ⑴.成功分享15次即可升级大众，成功分享30次即可升级保时捷，成功分享70次即可升级劳斯莱斯。
          </div>
          <div class="notemsg">
            ⑵.成功分享即推广的客户成功完成注册。
          </div>
        </div>
        <div class="content" v-if="QaContentId === '5-3'">
          <p>登陆禾管家→我的→用户设置→我的分享二维码→保存二维码图片→分享二维码图片，客户扫码注册后即成为您名下的客户，客户每次消费，佣金即返您的账户余额。</p>
        </div>
        <div class="content" v-if="QaContentId === '5-4'">
          <p>客户激活账户后，并成功创建还款计划，平台会收取服务费，服务费除掉成本，剩余服务费可进行分润，大概30元左右（服务费分润根据还款周期而波动）。</p>
        </div>
        <div class="content" v-if="QaContentId === '6'">
          <table class="bankList">
            <tr>
              <th>银行图标</th>
              <th>银行名称</th>
            </tr>
            <tr v-for="(value, key) in cards_dict">
              <td>
                <img :src="'https://apimg.alipay.com/combo.png?d=cashier&t=' + key" alt="">
              </td>
              <td>{{value}}</td>
            </tr>
          </table>
        </div>
        <div class="content" v-if="QaContentId === '7'">
          <p>结算卡就是一种可以用来结算的卡，具体的类别和功能需要我们仔细思考，认真琢磨。然后请打开书本第357页，对就是那页。什么你没有书本，不要意思了……</p>
        </div>
        <div class="content" v-if="QaContentId === '8'">
          <p>客服电话：4000577009  </p> 
          <p>QQ公众号：4000577009</p>
          <p>微信：13566244446</p>
        </div>
        <div class="content" v-if="QaContentId === '9'">
          <p>大众:</p>
          <div class="notemsg">
            当前等级权益<br>
            1、享受35%的收益；
          </div>
          <p>保时捷:</p>
          <div class="notemsg">
            当前等级权益<br>
            1、享受45%的收益；<br>
            2、享受大众多余的10%收益。<br>
          </div>
          <p>劳斯莱斯:</p>
          <div class="notemsg">
            当前等级权益<br>
            1、享受60%的收益；<br>
            2、享受大众多余的25%收益；<br>
            3、享受保时捷多余的15%收益；<br>
            4、享受同级别推广的3%奖励。<br>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
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
                'title': '如何设置结算卡',
                'id': '2-4',
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
              }
            ]
          },
          {
            'title': '支持银行卡类型',
            'id': '6',
            'more': false,
          },
          {
            'title': '什么是结算卡',
            'id': '7',
            'more': false,
          },
          {
            'title': '关于我们',
            'id': '8',
            'more': false,
          },
          {
            'title': '代理等级收益',
            'id': '9',
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
        'QaPopFlag',
        'QaContentId',
        'QaActiveIndex',
        'QaTitle'
      ])
    },
    methods: {
      openAnswer (qa) {
        if (qa.more) {
          // 做展开和收起操作
          if(qa.id === this.QaActiveIndex) {
            this.$store.commit('change_qa_activeIndex', 0)
          } else {
            this.$store.commit('change_qa_activeIndex', qa.id)
          }
          return;
        }
        this.$store.commit('set_qa_title', qa.title)
        this.$store.commit('choose_qa_contentId', qa.id)
        this.$store.commit('toggle_qa_popflag', true)
      },
      close () {
        this.$store.commit('toggle_qa_popflag', false)
      }
    },
    destroyed () {
      this.$store.commit('toggle_qa_popflag', false)
      this.$store.commit('change_qa_activeIndex', '0')
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
      overflow: auto;
      top: 0.44rem;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      transition: all 2s;
      .header {
        position: relative;
        padding:0.1rem 0.2rem;
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
        .bankList {
          border:1px solid #ccc;
          width: 100%;
          td, th {
            border:1px solid #ccc;
            text-align: center;
            font-size: 0.18rem;
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
        }
      }
    }
  }
</style>