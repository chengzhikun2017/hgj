<template>
  <div class="mine hgj-container" flex="dir:top">
    <app-nav title="我的" flex-box="0"></app-nav>
    <article flex-box="1">
      <div class="myInfo">
        <div class="portraiture">
          <img src="" alt="">
        </div>
        <div class="name">韩鑫波</div>
        <div class="phone">187-3512-3489</div>
        <div class="liner"></div>
        <div class="info" flex="main:center cross:center">
          <div class="item">
            <p>3638.00元</p>
            <div class="label">余额</div>
          </div>
          <div class="item">
            <p>568</p>
            <div class="label">积分</div>
          </div>
          <div class="item">
            <p>500.00元</p>
            <div class="label">已冻结保证金</div>
          </div>
        </div>
      </div>
      <div class="mine-content">
        <app-formitem3 title="计划执行记录" note="" :first="true">
          <div class="header" slot="icon">
            <app-cricleicon></app-cricleicon>
          </div>
          <div class="content" slot="action">
            未完成>
          </div>
        </app-formitem3>
        <app-formitem3 title="联系我们" note="">
          <div class="header" slot="icon">
            <app-cricleicon></app-cricleicon>
          </div>
          <div class="content" slot="action">
            未完成>
          </div>
        </app-formitem3>
        <app-formitem3 title="关于我们" note="">
          <div class="header" slot="icon">
            <app-cricleicon></app-cricleicon>
          </div>
          <div class="content" slot="action">
            未完成>
          </div>
        </app-formitem3>
        <app-formitem3 title="常见问题" note="" :last="true">
          <div class="header" slot="icon">
            <app-cricleicon></app-cricleicon>
          </div>
          <div class="content" slot="action">
            未完成>
          </div>
        </app-formitem3>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
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

<style>

</style>
