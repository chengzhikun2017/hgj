<template>
  <div class="addbankcard hgj-container" flex="dir:top">
    <app-nav flex-box="0">添加储蓄卡</app-nav>
    <article flex-box="1">
      <div class="banner"></div>
      <div class="chooseBank" flex="main:justify cross:center">
        <span>请绑定您本人的储蓄卡</span>
        <button class="btn">支持的银行</button>
      </div>
      <div class="addbankcard-content">
        <app-formitem label="持卡人姓名" :first="true"></app-formitem>
        <app-formitem label="储蓄卡卡号"></app-formitem>
        <app-formitem label="预留手机号" :last="true"></app-formitem>
      </div>
      <div class="mybutton">
        <app-button>同意并绑定</app-button>
        <div class="note">
          <app-protocol></app-protocol>
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
  .addbankcard {
    article {
      .banner {
        height: 1.78rem;
        background: white;
      }
      .chooseBank {
        padding:0 0.2rem;
        height: 0.44rem;
        font-size: 0.13rem;
        color: #a4a4a4;
        .btn {
          padding: 0.05rem 0.15rem;
          color: white;
          font-size: 0.12rem;
          line-height: 1;
          outline: none;
          border:none;
          border-radius: 0.03rem;
          background-image: linear-gradient(to right, #f86b4b 1%, #f84b4b);
        }
      }
      .mybutton {
        margin-top: 0.86rem;
        padding:0 0.2rem;
        .note {
          margin-top: 0.15rem;
        }
      }
    }
  }
</style>