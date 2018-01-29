<template>
  <div class="applycreditlist" flex="dir:top">
    <app-nav flex-box="0">信用卡通道</app-nav>
    <article flex-box="1">
      <ul class="list">
        <li v-for="cc in cc_list">
          <app-bankitem :code="cc.code" :title="cc.name" :record="cc.applyNum + '人'" :note="cc.feature" ></app-bankitem>
        </li>
      </ul>
    </article>
  </div>
</template>
<script>
  import {mapMutations,mapActions,mapGetters} from 'vuex'

  export default {
    data () {
      return {
      }
    },
    created () {
      this.cc_cardList({
        page: 1,
        limit: 10
      }).then(res => {

      });
    },
    mounted () {
      console.log(this.cc_list)
    },
    computed: {
      ...mapGetters([
        'cc_list'
      ])
    },
    methods: {
      ...mapActions([
        'cc_cardList',
      ]),
    }
  }
</script>
<style lang="scss" scoped>
  .applycreditlist {
    width: 100%;
    height: 100%;
    article {
      background: #F7F7F9;
      .list {
        li {
          padding: 0.1rem 0.1rem 0;
        }
      }
    }
  }
</style>