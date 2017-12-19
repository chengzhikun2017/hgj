<template>
  <div class="addCard">
    <hgj-nav title="添加信用卡" flex-box="0"></hgj-nav>
    <article flex-box="1">
      <div class="banner">
        
      </div>
      <p>请绑定您本人的信用卡</p>
      <div class="form">
        <div class="input">
          <label for="">持卡人姓名</label>
          <input type="text" placeholder="请输入您的持卡人姓名">
        </div>
        <div class="input">
          <label for="">信用卡卡号</label>
          <input type="text" placeholder="请输入您的信用卡卡号">
        </div>
        <div class="input">
          <label for="">身份证号码</label>
          <input type="text" placeholder="请输入您的身份证号码">
        </div>
        <button>下一步</button>
      </div>
    </article>
  </div>
</template>
<script>
  import '@/css/flex.css'
  import nav from '@/pages/nav.vue'
  export default {
    components: {
      'hgj-nav': nav
    },
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .addCard {
    width:100%;
    height: 100%;
    article {
      
    }
  } 
</style>