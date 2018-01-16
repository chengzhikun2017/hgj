<template>
  <div class="orderEdit hgj-container" flex="dir:top">
    <app-nav flex-box="0">账单/还款日修改</app-nav>
    <article flex-box="1">
      <div class="banner">
        <app-creditcard :card="card"></app-creditcard>
      </div>
      <div class="orderEdit-content">
        <app-formitem label="账单日" :first="true">
          <app-select class='form-input' :placeholder='"选择账单日"' :filter='dayPaser':options='billDateOpts' v-model='billDate'/>
        </app-formitem>
        <app-formitem label="还款日" :last="true">
          <app-select class='form-input' :placeholder='"选择还款日"' :filter='dayPaser':options='billDateOpts' v-model='repaymentDate'/>
        </app-formitem>
      </div>
      <div class="mybutton">
        <app-button @click.native='submitModify'>提交修改</app-button>
      </div>
    </article>
  </div> 
</template>
<script>
  import helper from '../utils/helper.js'
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        repaymentDate:null,
        billDate:null,
        billDateOpts:[],
        repaymentDateOpts:[],
        card:{},
        card1: {
          status: 'PLAN',
          name: '韩**',
          cardNoAfter4: '3638',
          billDate: 3,
          repaymentDate: 13
        }
      }
    },
    methods:{
      dayPaser(v){
        return v+'号'
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
      submitModify(){
        let params={
          cardId:this.card.cardId,
          billDate:this.billDate,
          repaymentDate:this.repaymentDate,
        }
        this.addCardCC_modifyCC(params).then(res=>{
          console.log('res',res)
          if(res.data.message==='success'){
            this.hgjToast({
              content:'修改成功',
              cbEntered:()=>{
                this.cards_getListCC()
                helper.goPage(-1)
              }
            })
          }
        })
      },
      ...mapActions([
        'addCardCC_modifyCC',
        'cards_getListCC',
      ])
    },
    created(){
      this.setBillDateOpts()
      this.setRepaymentDateOpts()
      this.billDate=this.$route.query.billDate
      this.repaymentDate=this.$route.query.repaymentDate
      this.card=this.$route.query
    },
  }
</script>
<style lang="scss" scoped>
  article {
    position: relative;
    .banner {
      padding: 0.15rem 0.2rem;
      overflow: hidden;
      background-image: linear-gradient(to top, #2c2c33, #3d404b);
    }
    .orderEdit-content {
      padding-top: 0.2rem;
    }
    .mybutton {
      padding:0 0.2rem;
      margin-top: 0.36rem;
    }
  }
</style>