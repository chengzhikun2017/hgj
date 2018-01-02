<template>
  <div>
    <app-nav flex-box="0">免费升级</app-nav>
    <div class="lv-treatment" style='border:1px solid red;'>
      <h3 class="sub-title">
        当前等级（保时捷）权益
      </h3>
      <p class="treatment-detail">1.享受25%的激活码购买折扣，助您邀请更多同道中人。</p>
      <p class="treatment-detail">2.享受最高达35%的分润。</p>
      <p class="treatment-detail">3.享受多至两级的再次分润。</p>
    </div>
    <div class="lv-treatment" style='border:1px solid red;'>
      <h3 class="sub-title">
        下一等级（劳斯莱斯）权益
      </h3>
      <p class="treatment-detail">1.享受25%的激活码购买折扣，助您邀请更多同道中人。</p>
      <p class="treatment-detail">2.享受最高达35%的分润。</p>
      <p class="treatment-detail">3.享受多至两级的再次分润。</p>
    </div>
    <div class="activeaccount-content">
      <!-- <p class="info"></p> -->
      <p class="info">完成下面任务，即可免费升级</p>
      <app-formitem3 title="分享" note="已被浏览10次" :first="true">
        <div class="header" slot="icon">
          <app-cricleicon></app-cricleicon>
        </div>
        <div class="content" slot="action">
          去分享>
        </div>
      </app-formitem3>
      <app-formitem3 title="了解养成计划" note="详细了解养成计划">
        <div class="header" slot="icon">
          <app-cricleicon></app-cricleicon>
        </div>
        <div class="content" slot="action">
          未完成>
        </div>
      </app-formitem3>
      <app-formitem3 title="实名计划" note="请完成您的实名认证" :last="true">
        <div class="header" slot="icon">
          <app-cricleicon></app-cricleicon>
        </div>
        <div class="content" slot="action">
          未完成>
        </div>
      </app-formitem3>
      <app-button style='width:80%; margin: 0.1rem auto;'>立即升级</app-button>
      <app-button style='width:80%; margin: 0.1rem auto;'>马上升级</app-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canUpgradeFree:false,//通过积分判断
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{},
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>

</style>
