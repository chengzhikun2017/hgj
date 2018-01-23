<template>
  <div class="menuItem" :class="{'first': position === -1, 'last':position === 1, 'full': long}">
    <div class="item" flex="cross:center main:justify" @click="action">
      <div flex-box="0" class="menuitemicon">
        <app-cricleicon v-if="icon === 'icon-share'" icon="icon-share" bgcolor="bg-red" size="0.27rem"></app-cricleicon>
        <app-cricleicon v-if="icon === 'icon-date'" icon="icon-date" bgcolor="bg-lightblue" size="0.26rem"></app-cricleicon>
        <app-cricleicon v-if="icon === 'icon-person'" icon="icon-person" bgcolor="bg-purple" size="0.26rem"></app-cricleicon>
      </div>
      <div class="formitem-content" flex-box="1">
        <div class="title">
          {{title}}
        </div>
        <p :class="{'important':notePoint}">{{note}}</p>
      </div>
      <div class="action" @click="action">
        {{actionName}} <span class="icon-go"></span>
      </div>
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
      icon: {
        type: String,
        default: 'icon-person'
      },
      note: {
        type: String,
        default: '备注'
      },
      position: {
        type: Number,
        default: 0
      },
      notePoint: {
        type: Boolean,
        default: false
      },
      long: {
        type: Boolean,
        default: false
      },
      actionName: {
        type: String,
        default: '动作'
      },
      action: {
        type: Function,
        default: function () {
          return ;
        }
      }
    },
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss">
  .menuItem:first-child{
    color:red;
  }
  .menuItem:last-child{
    background: cyan;
    border-color: red;
  }
</style>
<style lang="scss" scoped>
  .menuItem {
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
    .menuitemicon {
      margin-right: 0.15rem;
    }
    &.full {
      padding: 0;
    }
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
        &.important {
          color: #f84f4b;
        }
      }
    }
    .action {
      font-size: 0.13rem;
      color: #a4a4a4;
    }
  }
</style>