<template>
  <div class="plan" flex="dir:top">
    <app-nav flex-box="0">新建还款计划</app-nav>
    <article flex-box="1">
      <div class="photoDetail">
        <app-creditcard :card="cardInfo"></app-creditcard>
      </div>
      <div class="form">
        <app-formitem  label="选择开始时间">
            <app-select v-model='startDay' :options='startDaysAvailable' :filter='dayPaser' :optionFilter='startOptsPaser' :placeholder='"请选择开始日期"' />
        </app-formitem>
        <app-formitem  label="计划执行天数">
          <app-select v-model='duration' :disabled='!startDay' :optionFilter='durationOptsPaser' :options='durationAvailable' :placeholder='placeholderDuration' :filter='durationPaser' />
        </app-formitem>
        <app-formitem :last="true" label="还款金额">
          <app-input type="text" :placeholder='"请输入还款金额"' class='form-input' v-model='planAmount'/>
        </app-formitem>
        <div class="note" flex>
          <span class="icon-alert"></span>
          <p>结束时间必须在还款日前 2 天，起止时间最少间隔 1 天以上</p>
        </div>
        <app-formitem :last="true" label="选择保证金">
          <!-- | -->
          <p class="security-text" v-if='loadingPlanOpts'>loading...</p>
          <p class="security-text" v-if='!planOpts.length&&!loadingPlanOpts'>请填写以上信息</p>
          <!-- <app-button v-if='!planOpts.length' @click.native='getPlanOpts'>获取</app-button> -->
          <bttn-choose style='margin:0 0.05rem'  :actived='item.securityFee===choosedPlan.securityFee'  v-for='item in planOpts' @click.native='choosePlan(item)' :key='item.percent' v-if='planOpts.length'>{{(item.securityFee/100).toFixed(0)}}</bttn-choose>
        </app-formitem>
      </div>
      <app-protocol></app-protocol>
      <div class="mybutton">
        <app-button @click.native='viewPlan'>预览还款计划</app-button>
        <!-- <app-button @click.native='createPlan'>创建订单</app-button> -->

      </div>
    </article>
    <div class="popView" v-show="popFlag">
      <div class="popcontent">
        <div class="planbox">
          <header flex="cross:center">
            <span class="icon" flex="main:center cross:center" flex-box="0">
              <app-cricleicon bgcolor="bg-blue"></app-cricleicon>
            </span>
            <div class="title" flex="dir:top main:center" flex-box="1">
              <h2>您的还款计划</h2>
              <p></p>
            </div>
            <span flex-box="0" @click="popFlag=false">关闭</span>
          </header>
          <div class="planbox-content">
            <div class="liner"></div>
            <app-formitem2 label="计划还款：">
              <span class="msg">{{planAmountFee|moneyFilter}}</span>
            </app-formitem2>
             <app-formitem2 label="保证金：">
              <span class="msg">{{choosedPlan.securityFee|moneyFilter}}</span>
            </app-formitem2>
            <app-formitem2 label="服务费：">
              <span class="msg" :class="{'free-service':serviceFree}">{{choosedPlan.serviceFee|moneyFilter}}</span>
              <!-- <span class="msg">{{choosedPlan.serviceFee|moneyFilter}}</span> -->
            </app-formitem2>
            <app-formitem2 label="总计：">
              <span class="msg red"><span class="total">{{(ttlFee/100).toFixed(2)}}</span>元</span>
            </app-formitem2>
            <div class="liner"></div>
            <app-formitem2 label="还款时间：">
              <span class="msg">{{startDate}} 至 {{endDate}}</span>
            </app-formitem2>
             <app-formitem2 label="还款周期：">
              <span class="msg">{{duration}}天/保证金{{choosedPlan.securityFee/100}}元/{{choosedPlan.period}}期还完</span>
            </app-formitem2>
          </div>
          <div class="footer">
            <app-button @click.native='createPlan'>支付并开启还款计划</app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//startDate 未过还款日？本月：下月 day=账单日之后，&&>=tmw
//可选天数，还款日-startDay
  import '@/css/flex.css'
  import '@/css/components.scss'
  import {mapActions,mapMutations} from 'vuex'
  import helper from '../utils/helper.js'
  import TimeUtil from '../utils/time.js'
  import config from './../config.js'
  export default {
    data () {
      return {
        loadingPlanOpts:false,
        planAmount:'',
        startDay:'',
        startDaysAvailable:[],
        duration:'',
        choosedPlan:{},
        planOpts:[],
        popFlag: false,
        // nowDate:config.nowDate,
        nowDate:new Date(),
        getPlanOptsTimer:null,
      }
    },
    updated(){
      // console.log('updated')
      // let t=this
      // let allFilled=t.planAmount&&t.duration&&t.choosedPlan
      // if(allFilled){

      // }
    },
    watch:{
      planAmount(v){
        this.lazyGetPlanOpts()
      },
      duration(v){
        this.lazyGetPlanOpts()
      },
      startDay(v){
        this.lazyGetPlanOpts()
      },
    },
    beforeDestroy(){
      clearTimeout(this.getPlanOptsTimer)
    },
    methods:{
      countDownMilis(){
        let now=new Date()
        // let 
      },
      resetPlan(){
        this.planOpts=[]
        this.choosedPlan={}
      },
      viewPlan(){
        if(!this.allFilled||!this.choosedPlan.percent){
          this.hgjToast('请先填写信息',1)
          return
        }
        this.popFlag=true
      },
      lazyGetPlanOpts(){
        clearTimeout(this.getPlanOptsTimer)
        this.getPlanOptsTimer=setTimeout(()=> {
          this.getPlanOpts()
        }, 300);
      },
      getPlanOpts(){
        if(!this.allFilled){
          return
        }
        this.loadingPlanOpts=true
        this.resetPlan()
        let fee=this.planAmountFee,
        startDate=this.startDate,
        endDate=this.endDate
        // console.log('fee,startDate,endDate',fee,startDate,endDate)
        // return
        this.plan_calc({
          fee,
          startDate,
          endDate,
        }).then(res=>{
          for(let i=0;i<res.length;i++){
            let fee=res[i].percent*this.planAmountFee/100
            fee.toFixed(0)
            //todo: 非整数问题
            res[i].securityFee=fee
          }
          this.planOpts=res
          this.choosedPlan=res[0]
          this.loadingPlanOpts=false
        },rej=>{
          this.loadingPlanOpts=false
        })
      },
      durationPaser(v){
        return v+'天'
      },
      durationOptsPaser(v){
        return v+'天'
      },
      startOptsPaser(v){
        v=new Date(v)
        return v.getMonth()+1+'月'+v.getDate()+'日'
      },
      dayPaser(v){
        let date =new Date(Number(v))
        let month =(date.getMonth()+1).toString().padStart(2,0)
        let day =(date.getDate()).toString().padStart(2,0)
        return `${date.getFullYear()}-${month}-${day}`
      },
      choosePlan(plan){
        this.choosedPlan=plan
      },
      createPlan(){
        if(!this.$store.state.account.isActive){
          this.hgjToast('账户尚未激活')
          helper.goPage('/activeaccount')
          return
        }
        let params={
          cardId:this.cardInfo.cardId,
          fee:this.planAmountFee,
          period:this.choosedPlan.period,
          percent:this.choosedPlan.percent,
          startDate:this.startDate,
          endDate:this.endDate,
        }
        this.order_createPlan(params).then(res=>{
          console.log('res orderId',res.orderId)
          // let url=helper.urlConcat('/pay',{
          //   orderId:res.orderId
          // })
          // helper.goPage(url)
          this.order_pay({
            payType:'HELIPAY_CC',
            orderId:res.orderId,
            cardId:this.cardInfo.cardId
          }).then(res=>{
            console.log('res order pay',res)
            this.hgjToast('提交成功')
            this.router_willBackToIndex()
            //维护card list 数据
            this.cards_updatePlanStatus({
              cardId:this.cardInfo.cardId,
              status:'DOING',
            })
            helper.goPage(-1)
          })
        })
      },
      calcStartDaysAvailable(){
        var dateArr=[],day=this.earlistStartDay
        //var billDateStamp=this.billDateStamp
        let month=this.today.month,year=this.today.year
        if(this.isRepamentSameMonth){//&&this.isPlanInCrrtMonth
          if(this.isPlanInCrrtMonth){
            while(day<=TimeUtil.getStampByDate(this.cardInfo.repaymentDate-2)){
              dateArr.push({value:day})
              day+=86400000
            }
          }else{
            while(day<=TimeUtil.getStampByDate(this.cardInfo.repaymentDate-2,1)){
              dateArr.push({value:day})
              day+=86400000
            }
          }
        }else{
          if(this.isPlanInCrrtMonth){
            while(day<=TimeUtil.getStampByDate(this.cardInfo.repaymentDate-2)){
              dateArr.push({value:day})
              day+=86400000
            }
          }else{
            while(day<=TimeUtil.getStampByDate(TimeUtil.dayQtyOfMonth())){
              dateArr.push({value:day})
              day+=86400000
            }
            while(day<=TimeUtil.getStampByDate(this.cardInfo.repaymentDate-2,1)){
              dateArr.push({value:day})
              day+=86400000
            }
          }
        }
        this.startDaysAvailable=dateArr
      },
      reInit(){
        this.nowDate=new Date()
        this.$nextTick(()=>{
          this.startDay=this.earlistStartDay
          this.calcStartDaysAvailable()
        })
      },
      ...mapMutations([
        'router_willBackToIndex',
        'cards_updatePlanStatus',
        ]),
      ...mapActions([
        'plan_calc',
        'order_pay',
        'cards_getListCC',
        'order_createPlan',
        'account_getUserInfo',
        ])
    },
    created(){
      // setTimeout(()=> {
      //   this.nowDate=new Date(2018,1,5)
      //   this.$nextTick(()=>{
      //     this.startDay=this.earlistStartDay
      //     this.calcStartDaysAvailable()
      //   })
      // }, 3330);
    },
    mounted(){
      this.calcStartDaysAvailable()
      this.startDay=this.earlistStartDay
    },
    computed:{
      ttlFee(){
        let service=this.serviceFree?0:this.choosedPlan.serviceFee
        return service+this.choosedPlan.securityFee
      },
      allFilled(){
        let t=this
        let allFilled=t.planAmount>100&&t.duration&&t.startDay
        return !!allFilled
      },
      serviceFree(){
        return this.$store.state.account.freePlanTimes
      },
      planAmountFee(){
        return this.planAmount*100||0
      },
      startDate(){
        if(!this.startDay){
          return null
        }
        let v=this.startDay
        // this.dayPaser(v)
        return this.dayPaser(v)
      },
      endDate(){
        if(!this.startDay||!this.duration){
          return null
        }
        let v=Number(this.startDay)+(Number(this.duration)-1)*86400000
        return this.dayPaser(v)
      },
      durationAvailable(){
        if(this.startDay){
          let opts=[]
          let day=Number(this.startDay)+86400000
          let duration=2
          if(this.startDaysAvailable.length<1){
            return[]
          }
          let lastDay=this.startDaysAvailable[this.startDaysAvailable.length-1].value
          // console.log('duration',duration)
          // console.log('day',new Date(this.startDay))
          // console.log('lastDay',new Date(lastDay))
          while(day<=lastDay&&duration<=30){
            // console.log('duration',duration)
            opts.push({value:duration})
            duration++
            day+=86400000
          }
          // console.log('duration opts',opts)
          this.duration=duration-1
          return opts
        }else{
          return []
        }
      },
      placeholderDuration(){
        if(!this.startDay){
          return "请先选择开始时间"
        }else{
          return '请选择执行天数'
        }
      },
      today(){//2400时刷新 | 提交时检测 today
        var today={}
        today.day=this.nowDate.getDate()
        today.month=this.nowDate.getMonth()+1
        today.year=this.nowDate.getFullYear()
        return today
      },
      nowDay(){
        return this.nowDate.getDate()
      },
      earlistStartDay(){
        var now=this.today
        // var nowDay=this.nowDay
        var nowDay=now.day
        if(this.isRepamentSameMonth){
          if(this.isPlanInCrrtMonth){
            if(nowDay<this.cardInfo.billDate){
              return TimeUtil.getStampByDate(this.cardInfo.billDate)
            }else{
              return TimeUtil.getStampByDate(Number(nowDay)+1)
            }
          }else{
            return TimeUtil.getStampByDate(this.cardInfo.billDate,1)
          }
          
        }else{
          if(this.isPlanInCrrtMonth){
            return TimeUtil.getStampByDate(Number(nowDay)+1)
          }else{
            if(nowDay<this.cardInfo.billDate){
              return TimeUtil.getStampByDate(this.cardInfo.billDate)
            }else{
              return TimeUtil.getStampByDate(Number(nowDay)+1)
            }
          }
        }
      },
      billDateStamp(){
        return 
      },
      isRepamentSameMonth(){
        if(this.cardInfo.repaymentDate<this.cardInfo.billDate){
          return true
        }else{
          return false
        }
      },
      isPlanInCrrtMonth() {
        if (this.today.day < this.cardInfo.repaymentDate-2) {
          return true
        } else {
          return false
        }
        // if (this.isRepamentSameMonth) {
         
        // }else{

        // }
      },
      cardInfo(){
        return this.$route.query
      },
    },
  }
</script>
<style lang="scss" scoped>
  .free-service{
    text-decoration: line-through;
  }
  .security-text{
    font-size: 0.14rem;
    color: #a4a4a4;
  }
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
        .planbox {
          .icon {
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
</style>