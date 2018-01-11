<template>
  <app-formitem3 :title="cards_dict[card.cardCode]" :note="'(尾号：'+card.cardNoAfter4+')'" :last="true" :long="true">
    <div slot="icon">
      <div class="myicon">
        <img :src="'/static/img/logo/'+card.cardCode+'.png'" alt="">
      </div>
    </div>
    <div slot="action">
      <app-check :value='choosedCardId==card.cardId' :type='1' class='check-icon' />
    </div>
  </app-formitem3>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{
    card:{
      default:{},
      type:Object,
    },
    choosedCardId:{
      
    },
  },
  methods:{},
  events: {},
  components: {},
  computed:{
    cards_dict(){
      return this.$store.getters.cards_dict
    },
  },
}
</script>

<style lang='scss' scoped>
.chooseCardsContent {
  .liner {
    margin-bottom: 0;
  }
  .myicon {
    margin-right: 0.1rem;
    img {
      width: 0.34rem;
    }
  }
}
</style>
