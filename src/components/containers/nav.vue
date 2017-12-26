<template>
  <div class="nav">
    <nav flex="cross:center">
      <span flex-box="0" @click='back'>返回</span>
      <h1 flex-box="1">{{title}}</h1>
      <span flex-box="0"></span>
    </nav>
  </div>
</template>
<script>
  import '@/css/flex.css'
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    methods:{
      back(){//temp
        this.$router.go(-1)
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
      span {
        width: 40px;
        font-size: 0.14rem;
      }
    }
  }  
</style>