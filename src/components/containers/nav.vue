<template>
  <div class="nav">
    <nav flex="cross:center">
      <span class="side" flex-box="0" >
        <span v-show="showBack" class="icon" @click='back' flex="main:center cross:center">
          <span class="icon-back"></span>
        </span>
      </span>
      <h1 flex-box="1">
        <slot></slot>
      </h1>
      <span class="side" flex-box="0"></span>
    </nav>
  </div>
</template>
<script>
  import '@/css/flex.css'
  import helper from '@/utils/helper.js'
  export default {
    props: {
      showBack: {
        type: Boolean,
        default: true,
      },
      diyBack: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    methods:{
      back(){//temp
        if(!this.diyBack) {
          // 默认方法
          // this.$router.go(-1)
          helper.goPage(-1)
        } else {
          this.$emit('back')
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .nav {
    nav {
      padding:0 0.15rem;
      height: 0.44rem;
      background: #f3f3f3;
      h1 {
        text-align: center;
        font-size: 0.18rem;
      }
      .side {
        width: 40px;
        font-size: 0.14rem;
        .icon {
          width: 0.23rem;
          height: 0.23rem;
          border-radius: 50%;
          background-color: #383838;
          font-size: 0.10rem;
          font-weight: 1000;
          color: white;
          line-height: 1;
        }
      }
    }
  }  
</style>