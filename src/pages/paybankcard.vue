<template>
  <div class="paybankcard hgj-container" flex="dir:top">
    <app-nav flex-box="0">储蓄卡支付</app-nav>
    <article flex-box="1">
      <app-formitem label="姓名" :first="true">
        <app-input class='form-input' :placeholder='"请输入~~"' v-model='name' :disabled='isRealNamed'/>
      </app-formitem>
      <app-formitem label="身份证号" >
        <app-input class='form-input' :placeholder='"请输入~~"' v-model='idCardNo' :disabled='isRealNamed'/>
      </app-formitem>
      <app-formitem label="银行卡号">
        <app-input class='form-input' :placeholder='"请输入~~"' v-model='cardNo'/>
      </app-formitem>
      <app-formitem label="手机号码">
        <app-input class='form-input' :placeholder='"请输入~~"' v-model='phone'/>
      </app-formitem>
      <app-formitem label="验证码" :last="true">
        <app-input class='form-input code-input' :placeholder='"请输入~~"' v-model='code' />
        <bttn-code :validateMethod='isValidated' :getCodeMethod='bindCardAndGetCode'></bttn-code>
      </app-formitem>
      <div class="myprotocol">
        <app-protocol></app-protocol>
      </div>
      <div class="mybutton">
        <app-button @click.native='pay'>支付并绑定</app-button>
      </div>
    </article>
  </div>
</template>
<script>
  import helper from '../utils/helper.js'
  import regs from '../utils/reg.js'
  import {mapActions,mapMutations} from 'vuex'
  export default {
    data () {
      return {
        // name:null,
        name:'',
        // cardNo:null,
        cardNo:'',
        phone:null,
        // phone:null,
        // idCardNo:null,
        idCardNo:'',
        code:null,
      }
    },
    methods:{
      isValidated(){
        //todo:从store.cards 判断是否是已存在卡片
        //todo: 判断 是否第一次获取
        return true
      },
      checkValid(){
        if(!this.cardId){
          //
          this.hgjToast('尚未获取验证码','warning')
          return false
        }
        if(!regs.code6(this.code)){
          //
          this.hgjToast('请输入正确的验证码','warning')
          return false
        }
        return true
      },
      pay(){
        if(!this.checkValid()){
          return
        }
        let params={
          payType:'UNSPAY',
          orderId:this.orderId,
          cardId:this.cardId,
          verCode:this.code,
        }
        this.order_pay(params).then(res=>{
          this.order_getStatusAfterPay(this.orderId)
          // .then(status=>{
            // if(status==='SUCCESS'&&res.productId==20000){
            //   this.account_setActived()
            // }
          // })
          // console.log('res',res)
        })
      },
      bindCardAndGetCode(countdown){
        // this.addCardDC_setValue(this)
        // //validate infomation
        // return new Promise((resolve,reject)=>{
        //   this.addCardDC_submit().then(res=>{
        //     resolve(res)
        //   })
        // })
        this.order_unspayPay({
          orderId:this.orderId,
          // cardId:this.cardId,
          name:this.name,
          idCardNo:this.idCardNo,
          cardNo:this.cardNo,
          phone:this.phone,
        }).then(res=>{
          console.log('bindCardAndGetCode res',res)
          this.cardId=res.cardId
          countdown()
        })
        
      },
      // getCode(countdown){
      //     this.order_unspayGetCode({
      //       orderId:this.orderId,
      //       cardId:res.cardId,
      //     }).then(res=>{
      //       console.log('res',res)
      //       countdown()
      //     }) 
      // },
      ...mapMutations([
        'addCardDC_setValue',
        ]),
      ...mapActions([
        'order_unspayPay',
        'order_unspayGetCode',
        'addCardDC_submit',
        'order_pay',
        'order_getStatusAfterPay',

        ])
    },
    computed:{
      orderId(){
        return this.$route.query.orderId
      },
      isRealNamed(){
        if(this.userInfo.name){
          return true
        }
        return false
      },
      userInfo(){
        return this.$store.state.account
      },
    },
    mounted(){
      if(this.userInfo.name){
        this.name=this.userInfo.name
        this.idCardNo=this.userInfo.idCardNo
      }
    },
  }
</script>
<style lang="scss" scoped>
  .paybankcard {
    .myprotocol {
      padding: 0.3rem 0;
    }
    .mybutton {
      padding:0 0.2rem;
    }
  }
  
</style>