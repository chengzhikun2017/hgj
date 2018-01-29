<template>
  <div class="applycreditlist" flex="dir:top">
    <app-nav flex-box="0">信用卡通道</app-nav>
    <article flex-box="1">
      <ul class="list">
        <li v-for="cc in cc_list">
          <app-bankitem 
            :code="cc.code" 
            :title="cc.name" 
            :record="cc.applyNum + '人'" 
            :feature="cc.feature" 
            :signs="JSON.parse(cc.tags)" 
            @banka="jumpgo(cc.id, cc.url)">
              
            </app-bankitem>
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
      jumpgo (id, url) {
        // 需要做一个实现申请
        this.cc_applyCard(id);
        window.location.href = url;
      },
      ...mapActions([
        'cc_cardList',
        'cc_applyCard'
      ]),
    }
  }
</script>
<style lang="scss" scoped>
  .applycreditlist {
    width: 100%;
    height: 100%;
    article {
      padding-top: 0.1rem;
      background: #F0F0F0;
    }
  }
</style>