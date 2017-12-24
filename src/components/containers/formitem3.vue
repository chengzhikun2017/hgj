<template>
  <div class="formitem3" :class="{'first':first,'last':last}">
    <div class="item" flex="cross:center main:justify">
      <slot name="icon" flex-box="0"></slot>
      <div class="formitem-content" flex-box="1">
        <div class="title">
          {{title}}
        </div>
        <p>{{note}}</p>
      </div>
      <slot name="action" flex-box="0"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '标题'
      },
      note: {
        type: String,
        default: '备注'
      },
      first: {
        type: Boolean,
        default: false
      },
      last: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .formitem3 {
    position: relative;
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
    width: 100%;
    padding: 0 0.2rem;
    .item {
      height: 0.64rem;
    }
    .formitem-content {
      .title {
        font-size: 0.16rem;
        color: #383838;
      }
      p {
        font-size: 0.13rem;
        color: #a4a4a4;
      }
    }
  }
</style>