<template>
  <div class="plan" flex="dir:top">
    <app-nav flex-box="0">新建还款计划</app-nav>
    <article flex-box="1">
      <div class="photoDetail">
        <app-creditcard :card="cardInfo"></app-creditcard>
      </div>
      <div class="form">
        <app-formitem :last="true" label="还款金额">
        <app-input type="text" :placeholder='"请输入还款金额"' class='form-input' v-model='planAmount'/>
      </app-formitem>
      <app-formitem  label="选择开始时间">
      <app-select v-model='startDay' :options='startDaysAvailable' :filter='dayPaser' :optionFilter='startOptsPaser' :placeholder='"请选择开始日期"' />
    </app-formitem>
    <app-formitem  :label="serviceLabel"  >
    <app-input :value='choosedPlanDscrp' class='form-input' :placeholder='"请稍后..."'
    :disabled='true'></app-input>
    <!-- <span>{{choosedPlan.percent}}%保证金，{{choosedPlan.days}}天完成</span> -->
  </app-formitem>

        <!-- <app-formitem  label="计划执行天数">
          <app-select v-model='duration' :disabled='!startDay' :optionFilter='durationOptsPaser' :options='durationAvailable' :placeholder='placeholderDuration' :filter='durationPaser' />
        </app-formitem> -->

        <!-- <div class="note" flex>
          <span class="icon-alert"></span>
          <p>结束时间必须在还款日前 2 天，起止时间最少间隔 1 天以上</p>
        </div> -->
        <!-- <app-formitem :last="true" label="选择保证金">
          <p class="security-text" v-if='loadingPlanOpts'>loading...</p>
          <p class="security-text" v-if='!planOpts.length&&!loadingPlanOpts'>请填写以上信息</p>
          <bttn-choose style='margin:0 0.05rem'  :actived='item.securityFee===choosedPlan.securityFee'  v-for='item in planOpts' @click.native='choosePlan(item)' :key='item.percent' v-if='planOpts.length'>{{(item.securityFee/100).toFixed(0)}}</bttn-choose>
        </app-formitem> -->
      </div>
      <div class="change-plan-box">
        <span class="change-plan" @click='startChoosePlan'>修改计划</span>
      </div>

      <app-protocol></app-protocol>
      <div class="mybutton">
        <app-button @click.native='viewPlan'>预览还款计划</app-button>
        <!-- <app-button @click.native='createPlan'>创建订单</app-button> -->
        
      </div>
    </article>

    <app-popview v-model="popFlagPlan" title="选择计划" >
      <div slot="icon" class="popicon">
        <app-cricleicon icon="icon-bankcard" size="0.28rem" circle="small"></app-cricleicon>
      </div>
      <div class="service-container" slot="content">
        <app-radio v-for='plan in planOpts' class='service-box' :class='{"actived":choosedPlan.percent===plan.percent}'  v-model='choosedPlan' :label='plan' :key='plan.percent'>
          <app-formitem3  :title='plan.percent+"%保证金"' :note='plan.days+"天完成"'>
            <div slot="action">
              <app-check :value='choosedPlan.percent===plan.percent' :type='1' class='check-icon' />
            </div>
            <div slot="icon">
              <div class="plan-options-icon">
                <i class="icon icon-rank"></i>
              </div>
            </div>
          </app-formitem3>
        </app-radio>
      </div>
    </app-popview>
    <app-popview v-model="popFlag" title="您的还款计划" class="planRepaymentPopView">
      <div slot="icon" class="popicon">
        <app-cricleicon icon="icon-plan" bgcolor="bg-blue" size="0.22rem" circle="small"></app-cricleicon>
      </div>
      <div slot="content" class="planRepaymentsContent">
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
          <span class="msg">{{choosedPlan.days}}天/保证金{{choosedPlan.securityFee/100}}元/{{choosedPlan.period}}期还完</span>
        </app-formitem2>
        <!-- <div @click='addNewDC' >使用新的银行卡</div> -->
        <!-- <div @click='popFlag=false'>确认选择</div> -->
      </div>
      <div slot="footer" class="mybutton">
        <app-button @click.native='confirmCreatePlan'>支付并开启还款计划</app-button>
      </div>
    </app-popview>
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

      defaultServiceChanged:false,
      loadingPlanOpts:false,
      planAmount:'',
      startDay:'',
      startDaysAvailable:[],
      duration:'',
      choosedPlan:{},
      planOpts:[],
      popFlag: false,
      popFlagPlan:false,
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
      // planAmount(v){
        // this.lazyGetPlanOpts()
      // },
      // duration(v){
      //   this.lazyGetPlanOpts()
      // },
      startDay(v){
        this.lazyGetPlanOpts()
      },
    },
    beforeDestroy(){
      clearTimeout(this.getPlanOptsTimer)
    },
    methods:{

      startChoosePlan(){
        console.log('choose plan')
        this.popFlagPlan=true
      },
      countDownMilis(){
        let now=new Date()
        // let 
      },
      resetPlan(){
        this.planOpts=[]
        this.choosedPlan={}
      },
      viewPlan(){
        if(!this.planAmount){
          this.hgjToast('请先填写金额',1)
          return
        }
        this.getPlanOpts(this.planAmount,1)
        // this.popFlag=true
      },
      lazyGetPlanOpts(){
        clearTimeout(this.getPlanOptsTimer)
        this.getPlanOptsTimer=setTimeout(()=> {
          this.getPlanOpts()
        }, 300);
      },
      getPlanOpts(amount=0,willViewPlan=0){
        if(!this.allFilled){
          return
        }
        if(willViewPlan){
          console.log('loading')
          this.hgjShowLoading()
        }
        this.loadingPlanOpts=true
        // this.resetPlan()
        let fee=this.planAmountFee,
        startDate=this.startDate,
        endDate=this.endDate
        // console.log('fee,startDate,endDate',fee,startDate,endDate)
        // return
        this.plan_calc({
          fee:amount,
          startDate,
          endDate:this.latestEndDate,
        }).then(res=>{
          for(let i=0;i<res.length;i++){
            let fee=res[i].percent*this.planAmountFee/100
            fee.toFixed(0)
            //todo: 非整数问题
            res[i].securityFee=fee
          }

          this.planOpts=res
          this.setChoosedPlan(res)
          this.loadingPlanOpts=false
          this.hgjHideLoading()
          if(willViewPlan){
            this.popFlag=true
          }
        },rej=>{
          this.loadingPlanOpts=false
        })
      },
      setChoosedPlan(newPlanOpts){
        let choosedPlan=this.choosedPlan
        console.log('choosedPlan',this,this.choosedPlan,!!choosedPlan.percent)
        if(!choosedPlan.percent){
          this.choosedPlan=newPlanOpts[0]
        }else{
          console.log('newPlanOpts',newPlanOpts)
          let newPlanChoosed=newPlanOpts.find(item=>{
            return item.percent===choosedPlan.percent
          })
          console.log('newPlanChoosed',newPlanChoosed)
          if(newPlanChoosed){
            this.choosedPlan=newPlanChoosed
          }else{
            this.choosedPlan=newPlanOpts[0]
          }
        }
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
      confirmCreatePlan(){
        if(!this.$store.state.account.isActive){
          this.hgjToast('账户尚未激活')
          helper.goPage('/activeaccount')
          return
        }

        this.hgjAlert({
          title:'确认支付',
          options:[
          {
            text:'确认',callback:()=>{
              this.createPlan()
            },
          },{
            text:'取消',
          },
          ],
        })

      },
      createPlan(){
        let params = {
          cardId: this.cardInfo.cardId,
          fee: this.planAmountFee,
          period: this.choosedPlan.period,
          percent: this.choosedPlan.percent,
          startDate: this.startDate,
          endDate: this.endDate,
        }
        this.order_createPlan(params).then(res=>{
          // console.log('res orderId',res.orderId)
          // let url=helper.urlConcat('/pay',{
          //   orderId:res.orderId
          // })
          // helper.goPage(url)
          this.order_pay({
            payType:'HELIPAY_CC',
            orderId:res.orderId,
            cardId:this.cardInfo.cardId
          }).then(response=>{
            this.order_getStatusAfterPay(res.orderId).then(status=>{
              if(status==='SUCCESS'){
                this.cards_updatePlanStatus({
                  cardId:this.cardInfo.cardId,
                  status:'DOING',
                })
              }
            })
            // helper.goPage(-1)
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
        'order_getStatusAfterPay',
        'cards_getListCC',
        'order_createPlan',
        'account_getUserInfo',
        ])
    },
    created(){
      var today=this.today
      var {year,month,day}=today
      var nextDay=new Date(year,month,day+1)
      console.log('nextD',nextDay,this.nowDate,nextDay-this.nowDate)
      setTimeout(()=>{
        console.log('choosedPlan',this.choosedPlan)
      }, 5000);
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
  choosedPlanDscrp(){
    var choosedPlan=this.choosedPlan
    if(choosedPlan.percent){
      return choosedPlan.percent+'%保证金 '+choosedPlan.days+"天完成"
    }else{
      return null
    }
  },
  serviceLabel(){
    if(this.defaultServiceChanged){
      return '已选计划'
    }else{
      return '默认计划'
    }
  },
  ttlFee(){
    let service=this.serviceFree?0:this.choosedPlan.serviceFee
    return service+this.choosedPlan.securityFee
  },
  allFilled(){
    let t=this
        // let allFilled=t.planAmount>100&&t.duration&&
        let allFilled=t.startDay
        // &&t.planAmount
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
        // if(!this.startDay||!this.duration){
        //   return null
        // }
        if(!this.startDay||!this.choosedPlan.percent){
          return null
        }
        let v=Number(this.startDay)+(Number(this.choosedPlan.days)-1)*86400000
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
      latestEndDay(){
        let len=this.startDaysAvailable.length
        return this.startDaysAvailable[len-1]
      },
      latestEndDate(){
        return this.dayPaser(this.latestEndDay.value)
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
  .plan-options-icon {
    margin-right: 0.1rem;
    .icon {
      font-size: 0.34rem;
      color:#50CA55;
    }
  }
  .change-plan-box{
    text-align: right;
    padding-bottom: 0.2rem;
    .change-plan{
      font-size: 0.14rem;
      color:#768bf5;
      margin-right: 0.15rem;
    }

  }
  .popicon{
    margin-right: 0.1rem;
  }
  .service-container{
    /*height: 2rem;*/
    /*width: 2rem;*/
    .service-box{
      /*height: 0.5rem;*/
      font-size: 0.15rem;
      /*border:1px solid #EECEBA;*/
      position: relative;
    }
    .actived{
      background: #F97D00;
    }
  }
  
  .service-box:first-child{
    &:after{
      content:'荐';
      position: absolute;
      border:1px solid red;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      background: #E4EF00;
      top: 0.05rem;
      color:#FF0051;
      left:1.35rem;
      text-align: center;
      line-height: 0.2rem;
      font-size: 0.14rem;
    }
  }
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
        /*padding-bottom: 0.2rem;*/
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
    .planRepaymentPopView {
      .liner {
        width: 100%;
        height: 1px;
        margin: 0.15rem 0;
        border:1px dashed #d3d3d3;
        transform: scaleY(.5);
      }
      .planRepaymentsContent {
        .noplan-text{
          font-size: 0.14rem;
          text-align: center;
          color: #a4a4a4;
          line-height: 1;
          margin-top: 0.6rem;
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
      .popicon {
        margin-right: 0.1rem;
      }
      .mybutton {
        margin:0.45rem 0 0;
      }
    }
  }
</style>