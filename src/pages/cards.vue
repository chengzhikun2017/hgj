<template>
  <div class="cards" flex="dir:top">
    <nav flex="cross:center" flex-box="0">
      <span flex-box="0">返回</span>
      <div class="tabs" flex-box="1" flex="main:center">
        <span>我的信用卡(3)</span>
        <span>我的储蓄卡(0)</span>
      </div>
      <span flex-box="0">...</span>
    </nav>
    <article flex-box="1">
      <div class="card">
        <div class="floor">
          <div class="logo"></div>
          <button>查看明细</button>
        </div>
        <div class="floor">
          <span>韩**</span>|
          <span>卡片尾号：3638</span>
          <button>建立还款计划</button>
        </div>
        <div class="floor">
          <span>账单日：每月3号 | 还款日：每月13号</span>
        </div>
      </div>
    </article>
    <button>添加银行卡</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    created(){
      
    },
    methods:{

    },
    events: {},
    components: {}
  }
</script>

<style lang='scss' scoped>
  .cards {
    width:100%;
    height: 100%;
    nav {
      height: 0.44rem;
      background: #f3f3f3;
      h1 {
        text-align: center;
        font-size: 0.18rem;
      }
      span {
        font-size: 0.15rem;
      }
    }
    article {
      background: linear-gradient(to top, #2c2c33, #3d404b);
    }
  }
</style>
