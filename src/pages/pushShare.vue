<template>
  <div class="pushShare hgj-container" flex="dir:top">
    <app-nav flex-box="0">推广积分页面</app-nav>
    <article flex-box="1">
      <div class="banner"></div>
      <div class="pushShare-content">
        <div class="title" flex="cross:center">
          <app-cricleicon bgcolor="bg-red" icon="" flex-box="0"></app-cricleicon>
          <h2 flex-box="1">分润记录</h2>
          <button flex-box="0">提现</button>
        </div>
        <div class="liner"></div>
        <div class="points">
          <p>账号激活分润: <span class="point">+10点</span></p>
          <p>业务受理分润: <span class="point">+15点</span></p>
          <p>多几分润合计: <span class="point">+88点</span></p>
          <p>升级签到: <span class="point">+18点</span></p>
        </div>
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
  .pushShare {
    .banner {
      height: 1.78rem;
      background: white;
    }
    .pushShare-content {
      margin-top: 0.1rem;
      padding: 0 0.2rem;
      background: white;
      .title {
        padding: 0.2rem 0;
        h2 {
          padding-left: 0.1rem;
        }
        button {
          padding: 0.05rem 0.25rem;
          border-radius: 0.03rem;
          border: none;
          outline: none;
          font-size: 0.13rem;
          line-height: 1;
          color: white;
          background-color: #53d769;
        }
      }
      .liner {
        border:1px dashed #d3d3d3;
        height: 1px;
        transform: scaleY(.5);
      }
      .points {
        padding-top: 0.125rem;
        padding-bottom: 0.175rem;
        font-size: 0.14rem;
        color: #a4a4a4;
        line-height: 1;
        p {
          padding: 0.075rem 0;
        }
        .point {
          color: #f15151;
        }        
      }
    }
  }
</style>