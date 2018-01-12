<template>
  <div class="addbankcard hgj-container" flex="dir:top">
    <app-nav flex-box="0">添加储蓄卡</app-nav>
    <article flex-box="1">
      <div class="banner"></div>
      <div class="chooseBank" flex="main:justify cross:center">
        <span>请绑定您本人的储蓄卡</span>
        <button class="btn">支持的银行</button>
      </div>
      <div class="addbankcard-content">
        <app-formitem label="持卡人姓名" :first="true">
          <app-input class='form-input' :placeholder='"请输入持卡人姓名"' v-model='name' :disabled='false'/>
        </app-formitem>
        <app-formitem label="持卡人身份证">
          <app-input class='form-input' :placeholder='"请输入身份证号"' v-model='idCardNo' />
        </app-formitem>
        <app-formitem label="储蓄卡卡号">
          <app-input class='form-input' :placeholder='"请输入储蓄卡卡号"' v-model='cardNo' />
        </app-formitem>
        <app-formitem label="预留手机号" :last="true">
          <app-input class='form-input' :placeholder='"请输入银行预留手机号"' v-model='phone' />
        </app-formitem>
      </div>
      <div class="mybutton">
        <app-button @click.native='submit'>同意并绑定</app-button>
        <div class="note">
          <app-protocol></app-protocol>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import {mapActions,mapMutations,mapGetters} from 'vuex'
  import helper from '../utils/helper.js'

  export default {
    data () {
      return {
        name:null,
        idCardNo:null,
        phone:null,
        cardNo:null,
      }
    },
    methods:{
      submit(){
        //todo: 验证
        this.addCardDC_setValue(this)
        this.addCardDC_submit().then(res=>{
          this.hgjToast('绑定成功')
          helper.goPage(-1)
        })
      },
      getValueFromStore(){
        let info = this.$store.state.addCardDC.info
        console.log('add bank card info',info)
        this.name=info.name
        this.idCardNo=info.idCardNo
        this.phone=info.phone
        this.cardNo=info.cardNo
        if(this.userInfo.name){
          this.name=this.userInfo.name
          this.idCardNo=this.userInfo.idCardNo
        }
      },
      ...mapMutations([
        'addCardDC_setValue',
        ]),
      ...mapActions([
        'addCardDC_submit',
        ])
    },
    watch:{
      realNameVerified(v){
        if(v){
          this.name=this.userInfo.name
          this.idCardNo=this.userInfo.idCardNo
        }
      },
    },
    computed:{
      realNameVerified(){
        return this.userInfo.isRealNamed
      },
      ...mapGetters({
        userInfo:'account_userInfo'
      })
    },

    created(){
      this.getValueFromStore()
    },
    beforeDestroy(){
      this.addCardDC_setValue(this)
    },
  }
</script>
<style lang="scss" scoped>
  .addbankcard {
    article {
      .banner {
        height: 1.78rem;
        background: white;
      }
      .chooseBank {
        padding:0 0.2rem;
        height: 0.44rem;
        font-size: 0.13rem;
        color: #a4a4a4;
        .btn {
          padding: 0.05rem 0.15rem;
          color: white;
          font-size: 0.12rem;
          line-height: 1;
          outline: none;
          border:none;
          border-radius: 0.03rem;
          background-image: linear-gradient(to right, #f86b4b 1%, #f84b4b);
        }
      }
      .mybutton {
        margin-top: 0.86rem;
        padding:0 0.2rem;
        .note {
          margin-top: 0.15rem;
        }
      }
    }
  }
</style>