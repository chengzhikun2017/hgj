<template>
  <div class="questions" flex="dir:top">
    <app-nav flex-box="0">我的客服</app-nav>
    <article flex-box="1">
      <ul class="qalist">
        <li v-for="qa in questions" @click="openAnswer(qa)">
          {{ qa.title }}
        </li>
      </ul>
    </article>
    <div class="popanswer" v-show="popFlag">
        <div class="header" flex="main:justify">
          <div class="title">{{title}}</div>
          <div class="close" @click="popFlag = false"><span class="icon-cancel"></span></div>
        </div>
        <div class="content" v-if="contentId === 1">
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
        <div class="content" v-if="contentId === 2">
          <p>结算卡就是一种可以用来结算的卡，具体的类别和功能需要我们仔细思考，认真琢磨。然后请打开书本第357页，对就是那页。什么你没有书本，不要意思了……</p>
        </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        title: '支持银行卡类型',
        contentId: 1,
        popFlag: false,
        questions:[
          {
            'title': '支持银行卡类型',
            'id': 1,
          },
          {
            'title': '什么是结算卡',
            'id': 2,
          }
        ]
      }
    },
    computed: {
      type(){
        return this.$route.query
      },
      ...mapGetters([
        'cards_dict'
      ])
    },
    methods: {
      openAnswer (qa) {
        this.title = qa.title;
        this.contentId = qa.id;
        this.popFlag = true;
      }
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
          padding-left: 0.2rem;
          height: 0.44rem;
          line-height: 0.44rem;
          font-size: 0.16rem;
          color: #383838;
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
        p {
          padding:0.1rem 0.1rem;
          font-size: 0.16rem;
          text-indent: 0.28rem;
          color: #888;
        }
      }
    }
  }
</style>