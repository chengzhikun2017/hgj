<template>
  <div class="addCard1" flex="dir:top">
    <app-nav title="添加信用卡" flex-box="0"></app-nav>
    <article flex-box="1">
      <div class="banner">
        
      </div>
      <p class="note">请绑定您本人的信用卡</p>
      <div class="form">
        <app-formitem label="持卡人姓名" :first="true">
          <app-input class='form-input' :placeholder='"请输入持卡人姓名"' v-model='name'/>
        </app-formitem>
        <app-formitem label="信用卡卡号" >
          <app-input class='form-input' :placeholder='"请输入信用卡卡号"' v-model='cardNo'/>
        </app-formitem>
        <app-formitem label="身份证号码" :last="true">
          <app-input class='form-input' :placeholder='"请输入身份证号码"' v-model='idCardNo'/>
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
  import {mapMutations} from 'vuex'
  export default {
    data () {
      return {
        name:'',
        cardNo:'',
        idCardNo:'',
      }
    },
    methods:{
      nextStep(){
        helper.goPage('/addcard2')
      },
      getValueFromStore(){
        let info=this.$store.state.addCardCC.info
        this.name=info.name
        this.cardNo=info.cardNo
        this.idCardNo=info.idCardNo

      },
      ...mapMutations([
        'addCardCC_setValue',
        ])
    },
    created(){
      this.getValueFromStore()
    },
    beforeDestroy(){
      // 正则不通过的 （invalid）设为空
      this.addCardCC_setValue(this)
    },
  }
</script>
<style lang="scss" scoped>
  .addCard1 {
    width:100%;
    height: 100%;
    article {
      overflow: auto;
      background: #f3f3f3;
      .banner {
        height: 1.78rem;
        background: white;
      }
      .note {
        font-size: 0.13rem;
        color: #a4a4a4;
        padding: 0.15rem 0.2rem;
      }
      .mybutton {
        margin-top: 1.05rem;
        padding:0 0.2rem;
      }
    }
  } 
</style>