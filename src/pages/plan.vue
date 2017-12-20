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
    <div class="popView" v-show="false">
      <div class="popCard">
        <div class="title" flex>
          <img src="" alt="">
          <h2>您的还款计划</h2>
          <img src="" alt="">
        </div>
        <div class="content">
          <div class="line">
            <span>计划还款：</span>
            <span>2000.00元</span>
          </div>
          <div class="line">
            <span>保证金：</span>
            <span>600.00元</span>
          </div>
          <div class="line">
            <span>服务费：</span>
            <span>18.00元</span>
          </div>
          <div class="line">
            <span>总计：</span>
            <span>618.00元</span>
          </div>
        </div>
        <div class="footer">
          <div class="line">
            <span>还款时间：</span>
            <span>2017/12/09 —— 2019/01/18</span>
          </div>
          <div class="line">
            <span>还款周期：</span>
            <span>36天/保证金600元/6期还完</span>
          </div>
          <button>开启还款计划</button>
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
        }
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
  }
</style>