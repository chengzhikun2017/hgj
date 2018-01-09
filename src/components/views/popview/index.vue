<template>
  <div class="popview">
    <div class="popcontainer">
      <div class="popbox">
        <div class="popheader" flex>
          <div class="icon"></div>
          <div class="title">标题</div>
          <div class="close">
            <span class="icon-cancel"></span>
          </div>
        </div>
        <slot name="content" class="popcontent">
          
        </slot>
        <slot name="footer" class="popfooter">
          
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      
    },
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .popview {
    position: fixed;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .8);
    .popcontainer {
      position: absolute;
      left: 0.2rem;
      right: 0.2rem;
      bottom: 0.2rem;
      .popbox {
        background: white;
        border-radius: 0.1rem;
        padding:0.2rem 0.15rem;
        .popheader {

        }
      }
    }
  }
</style>