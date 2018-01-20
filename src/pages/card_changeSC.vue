<template>
  <div class="change-sc">
    <app-nav flex-box="0" >更换结算卡</app-nav>
    <app-button @click.native='chooseCard'>选择</app-button>
    <app-button @click.native='bindSC'>绑定</app-button>
    <app-popview v-model="popFlag" title="选择银行卡" class="chooseCardsPopView">
      <div slot="icon" class="popicon">
        <app-cricleicon icon="icon-bankcard" size="0.28rem" circle="small"></app-cricleicon>
      </div>
      <div slot="content" class="chooseCardsContent">
        <div class="liner"></div>
        <app-radio v-model='cardId' :label='card.cardId' v-for='card in cardsDC' v-if='card.settlementStatus!=="SUCCESS"' :key='card.cardId'>
          <app-carditem :card='card' :choosedCardId='cardId'></app-carditem>
        </app-radio>
        <div @click='newCard' class='new-card' >使用新的银行卡</div>
      </div>
    </app-popview>
  </div>
</template>

<script>
import helper from '../utils/helper.js'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      cardId:null,
      popFlag:true,
    }
  },
  methods:{
    chooseCard(){
      this.popFlag=true
    },
    bindSC(){
      if(!this.cardId){
        this.hgjToast('请选择设为结算卡的银行卡','warning')
        return
      }
      this.addCardDC_bindSC(this.cardId)
    },
    newCard(){
      let path=helper.urlConcat('/addbankcard',{
      })
      helper.goPage(path)
    },
    ...mapActions([
      'addCardDC_bindSC',
      ]),
  },
  events: {},
  computed:{
    cardInfo(){
      if(!this.cardId){
        return {}
      }else{
        return this.cardsDC.find(item=>{
          return item.cardId==this.cardId
        })
      }
    },

    cardsDC(){
      return this.$store.state.cards.cardsListDC
    },
  },
  components: {}
}
</script>

<style lang='scss' scoped>
  .chooseCardsPopView {
    .liner {
      width: 100%;
      height: 1px;
      margin: 0.15rem 0;
      border:1px dashed #d3d3d3;
      transform: scaleY(.5);
    }
    .popicon{
      margin-right: 0.1rem;
    }
  }
</style>
