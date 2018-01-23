<template>
  <div v-if="value" class="photo" flex="main:center cross:center" @click="close">
    <!-- <img :src="imgUrl" alt=""> -->
    <div v-if="type == '有效期说明'" class="readmeBox" @click.stop="">
      <div class="readmeTitle">有效期说明</div>
      <div class="readmeImg">
        <img src="/static/img/bankreadme3.jpg" alt="">
      </div>
      <div class="readmeNote">
        有效期是出现在银行卡正面左下方，标准格式为月份在前，年份在后的一串数字。
      </div>
      <div class="readmeButton" @click="close">
        知道了
      </div>
    </div>
    <div v-if="type == 'CVN2说明'" class="readmeBox" @click.stop="">
      <div class="readmeTitle">CVN2说明</div>
      <div class="readmeImg">
        <img src="/static/img/bankreadme2.jpg" alt="">
      </div>
      <div class="readmeNote">
        安全码是出现在银行卡背面签名栏上卡号后4位数之后的3个数字。
      </div>
      <div class="readmeButton" @click="close">
        知道了
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: '有效期说明'
      }
    },
    data () {
      return {

      }
    },
    methods: {
      close () {
        this.$emit('input', false)
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .photo {
    position: fixed;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .36);
    .readmeBox {
      width: 3rem;
      border-radius: 0.1rem;
      background: white;
      .readmeTitle {
        font-size: 0.18rem;
        text-align: center;
        padding-top: 0.15rem;
      }
      .readmeImg {
        margin:0.2rem;
        border-radius: 0.1rem;
        overflow: hidden;
        box-shadow: 0.01rem 0.01rem 0.1rem #ccc;
        img {
          width: 100%;
          display: block;
        }
      }
      .readmeNote {
        margin:0 0.2rem 0.1rem;
        font-size: 0.12rem;
        letter-spacing: 0.005rem;
      }
      .readmeButton {
        border-top: 2px solid #ccc;
        text-align: center;
        color: #5697D8;
        font-size: 0.18rem;
        line-height: 1;
        padding: 0.15rem 0;
      }
    }
  }
</style>