<template>
  <div class="menuList">
    <div v-if="choose == 'list_item1'">
      <app-menuitem v-for="item in value"
        :title="item.title"
        :icon="item.icon"
        :position="item.position"
        :notePoint="item.notePoint"
        :long="item.long"
        :note="item.note"
        :actionName="item.actionName"
        :action="item.action" >
      </app-menuitem>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      choose: {
        type: String,
        default: 'list_item1'
      },
      value: {
        type: Array,
        default: [
          // 使用示例
          // {
          //   title: '标题',
          //   icon: 'icon-person',
          //   note: '未完成',
          //   position: '-1',
          //   notePoint: false,
          //   actionName:'动作'
          //   long: false,
          //   action: function () {
          //     return
          //   }
          // }
        ]
      }
    },
    data () {

    }
  }
</script>
<style lang="scss" scoped>
  
</style>