<template>
  <div class="addCreditCard2" flex="dir:top">
    <app-nav flex-box="0">添加信用卡</app-nav>
    <article flex-box="1">
      <div class="form">
        <app-formitem label="信用卡有效期" :first="true">
          <div class="datechoose" flex="main:justify cross:center">
            <app-select :options='yearOptions' :filter='yearPaser' :placeholder='"年份"' v-model='fullYear' class='expire-select'/>
            <span class="cuteliner">/</span>
            <app-select :options='monthOptions' :filter='dayPaser2' :placeholder='"月份"' v-model='fullMonth' class='expire-select'/>
          </div>
        </app-formitem>
        <app-formitem label="卡背后三位数字" :qa="readme" :isQ="true">
          <app-input class='form-input' :placeholder="'请输入相应信息'" v-model='cvv2' :type='"number"' />
        </app-formitem>
        <app-formitem label="账单日" >
          <app-select class='form-input' :options='billDateOpts' :filter='dayPaser' :placeholder="'请选择账单日'" v-model='billDate'/>
        </app-formitem>
        <app-formitem label="还款日" >
          <app-select class='form-input' :options='billDateOpts'  :filter='dayPaser' :placeholder="'请选择还款日'" v-model='repaymentDate'/>
        </app-formitem>
        <app-formitem label="手机号" >
          <app-input class='form-input' :placeholder="'请输入银行预留的手机号'" v-model='phone'/>
        </app-formitem>
        <app-formitem label="验证码" :last="true" >
            <app-input class='form-input code-input'  :placeholder="'请输入验证码'" v-model='validateCode'/>
            <bttn-code :validateMethod='canGetVerifyCode' :getCodeMethod='getVerifyCode'/>
            <!-- <div class="code-bttn " :class="{'code-bttn-disabled':countdownTimer!==null}"@click='getVerifyCode' >{{}}获取验证码</div> -->
            <!-- <div class="code-bttn " :class="{'code-bttn-disabled':false}"@click='' >{{''}}获取验证码</div> -->
          <!-- </div> -->
        </app-formitem>
        <div class="note" flex>
          <span class="icon-alert"></span>
          <p>请务必输入正确的账单日和还款日，否则执行的还款计划会导致自动还款任务未完成的情况下已到还款日</p>
        </div>
        <div class="mybutton">
          <app-button @click.native='submit'>确认添加</app-button>
        </div>
      </div>
    </article>
    <app-popphoto v-model="photoShow" :imgUrl="imgurl"></app-popphoto>
  </div>
</template>
<script>
  import '@/css/flex.css'
  import {mapMutations,mapActions} from 'vuex'
  import helper from '../utils/helper.js'
  export default {
    data () {
      return {
        phone:null,
        fullYear:null,
        fullMonth:null,
        cvv2:null,
        billDate:null,
        repaymentDate:null,
        validateCode:null,
        yearOptions:[],
        monthOptions:[],
        billDateOpts:[],
        repaymentDateOpts:[],

        photoShow: false,
        imgurl: '/static/img/creditreadme1.jpg'
      }
    },
    methods:{
      readme () {
        this.photoShow  = true
        return true;
      },
      submit(){
        this.addCardCC_setValue(this)
        this.addCardCC_submit().then(res=>{
          this.hgjToast('绑定成功')
          this.router_willBackToIndex()
          this.router_setNewPath(['/cards'])
          this.addCardCC_resetValue()
          this.getValueFromStore()
          helper.goPage(-1)
          // this.
        })
      },
      dayPaser(v){
        return v+'号'
      },
      dayPaser2(v){
        let s=String(v)
        return s.padStart(2,0)
      },
      yearPaser(v){
        return (v.toString()).slice(2,4)
      },
      monthPaser(v){
        return (v.toString()).padStart(2,0)
      },
      setYearOptions(){
        let l=20,start=(new Date()).getFullYear(),i=0
        while(i<l){
          this.yearOptions.push({value:start+i})
          i++
          }
        },
      setMonthOptions(){
        let l=12,i=1
        // let start=(new Date()).getMonth(),i=0
        while(i<=l){
          this.monthOptions.push({value:i})
          i++
        }
      },
      setBillDateOpts(){
        let i=1
        while(i<=28){
          this.billDateOpts.push({value:i})
          i++
        }
      },
      setRepaymentDateOpts(){
        //todo: 不得早于billdate
      },
      getValueFromStore(){
        let info=this.$store.state.addCardCC.info
        this.phone=info.phone
        this.fullYear=info.fullYear
        this.fullMonth=info.fullMonth
        this.cvv2=info.cvv2
        this.billDate=info.billDate
        this.repaymentDate=info.repaymentDate
        this.validateCode=info.validateCode
      },
      canGetVerifyCode(){

        return true
      },
      getVerifyCode(countdown){
        this.addCardCC_setValue(this)
        this.addCardCC_getCode(this.phone).then(res => {
          countdown()
        })
      },

      ...mapMutations([
        'addCardCC_setValue',
        'addCardCC_resetValue',
        'router_willBackToIndex',
        'router_setNewPath',
        ]),
      ...mapActions([
        'addCardCC_submit',
        'addCardCC_getCode',
        ])
    },
    computed:{
      cvv2Valid(){
        return /\d{3}/.test(this.cvv2)
      },
    },
    created(){
      this.setYearOptions()
      this.setMonthOptions()
      this.setBillDateOpts()
      this.setRepaymentDateOpts()
      this.getValueFromStore()
    },
    beforeDestroy(){
      this.addCardCC_setValue(this)
    },
    beforeRouteEnter(to,from,next){
      //todo:刷新此页面，进入addcard1
      // console.log('%c from','color:blue',from)
      if(/addCreditCard1/.test(from.name)){
        // console.log('%c from cc card page1','color:yellow')

        next()
      }else{
        // console.log('%c redirect to add cc card page1','color:yellow')
        helper.replaceRouter('/addCreditcard1')
      }
    },
  }
</script>
<style lang="scss" scoped>
  .addCreditCard2 {
    width:100%;
    height: 100%;
    article {
      overflow: auto;
      background: #f3f3f3;
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
      .mybutton {
        margin-top: 0.36rem;
        padding:0 0.2rem;
      }
    }
    .datechoose {
      width: 0.8rem;
      .cuteliner {
        padding:0 0.1rem;
        color: rgb(166, 166, 166);
      }
      .expire-select{
        /*border:1px solid red;*/
        width: 0.3rem;
      }
    }
   
  } 
</style>