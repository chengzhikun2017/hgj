<template>
  <div class="populizeScore hgj-container" flex="dir:top">
    <app-nav flex-box="0">推广积分页面</app-nav>
    <article flex-box="1">
      <div class="banner"></div>
      <div class="populizeScore-content">
        <div class="title" flex="cross:center">
          <app-cricleicon bgcolor="bg-red" icon="" flex-box="0"></app-cricleicon>
          <h2 flex-box="1">推广记录</h2>
          <button flex-box="0">这里该放什么?</button>
        </div>
        <div class="liner"></div>
        <div class="points">
          <div class="pointItem" flex="main:justify">
            <span>一级推广人数: <span class="data">36次</span></span>
            <span class="point">+36积分</span>
          </div>
          <div class="pointItem" flex="main:justify">
            <span>二级推广人数: <span class="data">36次</span></span>
            <span class="point">+10积分</span>
          </div>
          <div class="pointItem" flex="main:justify">
            <span>三级推广人数: <span class="data">36次</span></span>
            <span class="point">+10积分</span>
          </div>
          <div class="pointItem" flex="main:justify">
            <span>三级以上推广人数: <span class="data">36次</span></span>
            <span class="point">+18积分</span>
          </div>
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
  .populizeScore {
    .banner {
      height: 1.78rem;
      background: white;
    }
    .populizeScore-content {
      margin-top: 0.1rem;
      padding: 0 0.2rem;
      background: white;
      .title {
        padding: 0.2rem 0;
        h2 {
          padding-left: 0.1rem;
        }
        button {
          padding: 0.05rem 0.12rem;
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
        .pointItem {
          padding: 0.075rem 0;
          font-size: 0.14rem;
          color: #a4a4a4;
          .data {
            color: #383838;
          }
          .point {
            color: #f15151;
          }
        }
      }
    }
  }
</style>