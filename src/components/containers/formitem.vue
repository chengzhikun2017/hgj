<template>
  <div class="formitem" :class="{'first':first,'last':last}">
    <div class="item" flex="cross:center main:justify">
      <span class="label" flex-box="0">{{label}} <span v-if="isQ" class="icon-question" @click="qa"></span></span>
      <slot ></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: '标题'
      },
      first: {
        type: Boolean,
        default: false
      },
      last: {
        type: Boolean,
        default: false
      },
      isQ: {
        type: Boolean,
        default: false
      },
      qa: {
        type: Function,
        default: function () {
          return false
        }
      }
    },
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .formitem {
    position: relative;
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    padding: 0 0.2rem;
    background: white;
    &.first:before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: #d3d3d3;
      content: ' ';
      transform: scaleY(.5);
    };
    &:after {
      position: absolute;
      bottom: 0;
      left: 0.2rem;
      right: 0;
      height: 1px;
      background: #d3d3d3;
      content: ' ';
      transform: scaleY(.5);
    };
    &.last:after {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: #d3d3d3;
      content: ' ';
      transform: scaleY(.5);
    };
    .label {
      font-size: 0.14rem;
      color: #383838;
      .icon-question {
        padding:0.01rem;
        font-size: 0.12rem;
        color: #888;
        border: 2px solid #888;
        border-radius: 50%;
      }
    }
    .item{
      position: relative;
    }
  }
</style>