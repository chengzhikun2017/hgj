<template>
  <div class="addCreditCard1" flex="dir:top">
    <app-nav flex-box="0">添加信用卡</app-nav>
    <article flex-box="1">
      <div class="banner">
        <img src="/static/img/bannercredit.jpg" alt="">
      </div>
      <p class="note">请绑定您本人的信用卡</p>
      <div class="form">
        <app-formitem label="持卡人姓名" :first="true">
          <!-- <app-input class='form-input' :placeholder='"请输入持卡人姓名"' v-model='name' :disabled='realNameVerified'/> -->
          <app-input class='form-input' :placeholder='"请输入持卡人姓名"' v-model='name' ref="formname" :disabled='false'/>
        </app-formitem>
        <app-formitem label="信用卡卡号" >
          <app-input class='form-input' type="number" :maxlength="19" :placeholder='"请输入信用卡卡号"' ref="formcreditcard" v-model='cardNo'/>
        </app-formitem>
        <app-formitem label="身份证号码" :last="true">
          <app-input class='form-input' :placeholder='"请输入身份证号码"' :maxlength="18" v-model='idCardNo' ref="formidcard" :disabled='realNameVerified'/>
        </app-formitem>
        <div class="mybutton">
          <app-button @click.native='nextStep'>下一步</app-button>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import '@/css/flex.css'
  import helper from '../utils/helper.js'
  import CR from '@/utils/commonRemind.js'
  import Regs from '@/utils/reg.js'
  import {mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    data () {
      return {
        name:'',
        cardNo:'',
        idCardNo:'',
      }
    },
    computed: {
    },
    methods:{
      checkValid () {
        if (!this.name) {
          CR.inputWarn(this,'请输入姓名','formname')
          return false
        }
        if (!Regs.bankCard(this.cardNo)) {
          CR.inputWarn(this,'请输入正确的信用卡号','formcreditcard')
          return false
        }
        // if (!Regs.idCardNoUtil.checkIdCardNo(this.idCardNo)) {
        //   CR.inputWarn(this,'请输入正确的身份证','formidcard')
        //   return false
        // }
        return true
      },
      nextStep (){
        if(!this.checkValid()) return

        //todo: 验证有效性，有效后下一步
        this.cards_getInfo(this.cardNo).then(res=>{
          if(res.type){
            helper.goPage('/addCreditcard2')
          }else if(res.type===''){
            this.hgjAlert({
              title:'此卡不支持',
              options:[
              {text:'确定',callback:()=>{}},
              {text:'查看支持的类型',callback:()=>{}},
              ],
            })
          }
        })
      },
      getValueFromStore(){
        let info=this.$store.state.addCardCC.info
        console.log('info card add cc',info)
        // let userInfo=this.$store.
        this.name=this.name||info.name
        this.cardNo=info.cardNo
        this.idCardNo=this.idCardNo||info.idCardNo
        if(this.userInfo.name){
          this.name=this.userInfo.name
          this.idCardNo=this.userInfo.idCardNo
        }
      },
      ...mapMutations([
        'addCardCC_setValue',
        ]),
      ...mapActions([
        'cards_getInfo',
        ]),
    },
    computed:{
      realNameVerified(){
        return this.userInfo.isRealNamed
      },
      ...mapGetters({
        userInfo:'account_userInfo'
      })
    },  
    watch:{
      realNameVerified(v){
        if(v){
          this.name=this.userInfo.name
          this.idCardNo=this.userInfo.idCardNo
        }
      },
    },
    created(){
      this.getValueFromStore()
    },
    updated(){

    },
    beforeDestroy(){
      // 正则不通过的 （invalid）设为空
      this.addCardCC_setValue(this)
    },
  }
</script>
<style lang="scss" scoped>
  .addCreditCard1 {
    width:100%;
    height: 100%;
    article {
      overflow: auto;
      background: #f3f3f3;
      .banner {
        height: 1.78rem;
        background: white;
        img {
          width: 100%;
        }
      }
      .note {
        font-size: 0.13rem;
        color: #a4a4a4;
        padding: 0.15rem 0.2rem;
      }
      .mybutton {
        margin-top: 0.36rem;
        padding:0 0.2rem;
      }
    }
  } 
</style>