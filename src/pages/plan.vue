<template>
  <div class="plan" flex="dir:top">
    <app-nav title="新建还款计划" flex-box="0"></app-nav>
    <article flex-box="1">
      <div class="photoDetail">
        <app-bluecard v-model="card1"></app-bluecard>
      </div>
      <div class="form">
        <app-formitem label="还款金额">
          <app-input type="text" :placeholder='"请输入还款金额"' class='form-input' v-model='planAmount'/>
        </app-formitem>
        <app-formitem :last="true" label="选择开始时间">
            <app-select v-model='startDay' :options='daysAvailable' :placeholder='"请选择开始日期"' />
        </app-formitem>
        <app-formitem :last="true" label="计划执行天数">
          <app-select v-model='duration' :options='durationAvailable' :placeholder='"请选择执行天数"' />
        </app-formitem>
        <div class="note" flex>
          <span class="icon-alert"></span>
          <p>结束时间必须在还款日前 2 天，起止时间最少间隔 1 天以上</p>
        </div>
        <app-formitem :last="true" label="选择保证金">
          |
          <bttn-choose :actived='item===securityFee'  v-for='item in securityFeeOpts' @click.native='chooseSecurityFee(item)' :key='item'>{{item}}</bttn-choose>
         
        </app-formitem>

      </div>
      <app-protocol></app-protocol>
      <div class="mybutton">
        <app-button>预览还款计划</app-button>
      </div>
    </article>
    <div class="popView" v-show="popFlag">
      <div class="popcontent">
        <div class="planbox">
          <header flex="cross:center">
            <span class="icon" flex="main:center cross:center" flex-box="0">
              <span class="icon-plan"></span>
            </span>
            <div class="title" flex="dir:top main:center" flex-box="1">
              <h2>您的还款计划</h2>
              <p></p>
            </div>
            <span flex-box="0" @click="popFlag=false">关闭</span>
          </header>
          <div class="content">
            <div class="liner"></div>
            <app-formitem2 label="计划还款：">
              <span class="msg">2000.00元</span>
            </app-formitem2>
             <app-formitem2 label="保证金：">
              <span class="msg">600.00元</span>
            </app-formitem2>
            <app-formitem2 label="服务费：">
              <span class="msg">18.00元</span>
            </app-formitem2>
            <app-formitem2 label="总计：">
              <span class="msg red"><span class="total">618.00</span>元</span>
            </app-formitem2>
            <div class="liner"></div>
            <app-formitem2 label="还款时间：">
              <span class="msg">2017/12/09 —— 2019/01/18</span>
            </app-formitem2>
             <app-formitem2 label="还款周期：">
              <span class="msg">36天/保证金600元/6期还完</span>
            </app-formitem2>
          </div>
          <div class="footer">
            <app-button>开启还款计划</app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '@/css/flex.css'
  export default {
    data () {
      return {
        planAmount:'',
        startDay:'',
        daysAvailable:[
        {value:'3号'},
        {value:'4号'},
        {value:'5号'},
        ],
        duration:'',
        durationAvailable:[
          {value:'3天'},
          {value:'4天'},
          {value:'5天'},
        ],
        securityFee:'',
        securityFeeOpts:[500,1000,2000,4000],
        card1: {
          type: 'change',
          name: '韩**',
          lastNo: '3638',
          billDate: 3,
          payDate: 13
        },
        popFlag: true
      }
    },
    methods:{
      chooseSecurityFee(fee){
        this.securityFee=fee
      },
    },
  }
</script>
<style lang="scss" scoped>
  .plan {
    width: 100%;
    height: 100%;
    article {
      background: #f3f3f3;
      .photoDetail {
        padding: 0.15rem 0.2rem;
        background: black;
        overflow: hidden;
      }
      .form {
        padding-bottom: 0.2rem;
      }
      .mybutton {
        margin-top: 0.24rem;
        padding: 0.16rem 0.2rem;
      }
      .note {
        padding: 0.16rem 0.2rem;
        font-size: 0.14rem;
        color: #a4a4a4;
        .icon-alert {
          position: relative;
          top: 0.03rem;
          padding-right: 0.1rem;
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
      }
      .planbox {
        background: white;
        border-radius: 0.1rem;
        padding:0.2rem 0.15rem;
        header {
          padding-bottom: 0.05rem;
          .icon {
            border-radius: 50%;
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.11rem;
            background-image: linear-gradient(to right, #64a6f8, #6767e8);
            .icon-plan {
              font-size: 0.24rem;
              color:white;
            }
          }
          .title {
            h2 {
              font-size: 0.19rem;
            }
          }
        }
        .content {
          .liner {
            width: 100%;
            height: 1px;
            margin: 0.15rem 0;
            border:1px dashed #d3d3d3;
          }
          .msg {
            color: #383838;
            font-size: 0.14rem;
            line-height: 1;
            vertical-align: bottom;
            .total {
              font-size: 0.28rem;
              line-height: 1;
            }
          }
          .red {
            color: #f84c4b;
          }
        }
        .footer {
          padding-top: 0.45rem;
        }
      }
    }
  }
</style>