<template>
  <div class="orderEdit hgj-container" flex="dir:top">
    <app-nav title="账单/还款日修改" flex-box="0"></app-nav>
    <article flex-box="1">
      <div class="banner">
        <app-creditcard v-model="card1"></app-creditcard>
      </div>
      <div class="orderEdit-content">
        <app-formitem label="账单日" :first="true"></app-formitem>
        <app-formitem label="还款日" :last="true"></app-formitem>
      </div>
      <div class="mybutton">
        <app-button>提交修改</app-button>
      </div>
    </article>
  </div> 
</template>
<script>
  export default {
    data () {
      return {
        card1: {
          type: 'none',
          name: '韩**',
          lastNo: '3639',
          billDate: 3,
          payDate: 13
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  article {
    position: relative;
    .banner {
      padding: 0.15rem 0.2rem;
      overflow: hidden;
      background-image: linear-gradient(to top, #2c2c33, #3d404b);
    }
    .orderEdit-content {
      padding-top: 0.2rem;
    }
    .mybutton {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0.3rem 0.2rem;
    }
  }
</style>