<template>
  <div class="paybankcard hgj-container" flex="dir:top">
    <app-nav flex-box="0" title="储蓄卡支付"></app-nav>
    <article flex-box="1">
      <app-formitem label="姓名" :first="true">
        
      </app-formitem>
      <app-formitem label="银行卡号">
        
      </app-formitem>
      <app-formitem label="手机号码">
        
      </app-formitem>
      <app-formitem label="验证码" :last="true">
        
      </app-formitem>
      <div class="myprotocol">
        <app-protocol></app-protocol>
      </div>
      <div class="mybutton">
        <app-button>支付并绑定</app-button>
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  .paybankcard {
    .myprotocol {
      padding: 0.3rem 0;
    }
    .mybutton {
      padding:0 0.2rem;
    }
  }
  
</style>