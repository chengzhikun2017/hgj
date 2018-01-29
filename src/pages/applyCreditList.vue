<template>
  <div class="applycreditlist" flex="dir:top">
    <app-nav flex-box="0">信用卡通道</app-nav>
    <article flex-box="1">
      <ul class="list">
        <li v-for="i in 10">
          <app-bankitem></app-bankitem>
        </li>
      </ul>
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
  .applycreditlist {
    width: 100%;
    height: 100%;
    article {
      background: #F7F7F9;
      .list {
        li {
          padding: 0.1rem 0.1rem 0;
        }
      }
    }
  }
</style>