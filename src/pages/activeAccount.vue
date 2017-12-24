<template>
  <div class="activeaccount" flex="dir:top">
    <app-nav title="激活账户" flex-box="0"></app-nav>
    <article flex-box="1">
      <div class="banner">
        
      </div>
      <div class="activeaccount-content">
        <p class="info">完成下面任务，更轻松完成（感觉怪怪的）</p>
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
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .activeaccount {
    width: 100%;
    height: 100%;
    article {
      overflow: auto;
      background: #f3f3f3;
      .banner {
        width: 100%;
        height: 1.78rem;
        background: white;
      }
      .activeaccount-content {
        padding-top: 0.2rem;
        .info {
          border-top: 1px solid #d3d3d3;
          font-size: 0.14rem;
          color: #a4a4a4;
          padding:0.13rem 0.2rem;
          background: white;
        }
        .header {
          padding-right: 0.15rem;
        }
        .content {
          font-size: 0.13rem;
          color: #a4a4a4;
        }
      }
    }
  }
</style>