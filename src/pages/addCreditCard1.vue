<template>
  <div class="addCreditCard1" flex="dir:top">
    <app-nav flex-box="0">添加信用卡</app-nav>
    <article flex-box="1">
      <div class="banner">
        
      </div>
      <p class="note">请绑定您本人的信用卡</p>
      <div class="form">
        <app-formitem label="持卡人姓名" :first="true"></app-formitem>
        <app-formitem label="信用卡卡号" ></app-formitem>
        <app-formitem label="身份证号码" :last="true"></app-formitem>
        <div class="mybutton">
          <app-button>下一步</app-button>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import '@/css/flex.css'
  export default {
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .addCreditCard1 {
    width:100%;
    height: 100%;
    article {
      overflow: auto;
      background: #f3f3f3;
      .banner {
        height: 1.78rem;
        background: white;
      }
      .note {
        font-size: 0.13rem;
        color: #a4a4a4;
        padding: 0.15rem 0.2rem;
      }
      .mybutton {
        margin-top: 1.05rem;
        padding:0 0.2rem;
      }
    }
  } 
</style>