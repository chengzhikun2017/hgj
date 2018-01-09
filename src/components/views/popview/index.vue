<template>
  <div class="popview" v-show="value">
    <div class="popcontainer">
      <div class="popbox">
        <div class="popheader" flex="cross:center">
          <slot name="icon" flex-box="0">
            
          </slot>
          <div class="title" flex-box="1">{{title}}</div>
          <div class="close" flex-box="0" @click="close">
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
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '标题'
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
          .title {
            font-size: 0.19rem;
            color: #383838;
            font-weight: 700;
          }
          .close {
            color: #a4a4a4;
            font-size: 0.25rem;
            span {
              display: block;
            }
          }
        }
      }
    }
  }
</style>