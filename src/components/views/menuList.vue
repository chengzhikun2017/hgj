<template>
  <div class="menuList">
    <div v-if="choose == 'list_item1'">
      <app-menuitem v-for="(item, index) in value"
        :title="item.title"
        :icon="item.icon"
        :position="!item.position ? 0 : item.position"
        :notePoint="!item.notePoint ? false : true"
        :long="!item.long ? false: true"
        :note="item.note"
        :actionName="item.actionName"
        :action="item.action"
        :key="index" >
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
      return {
        
      }
    }
  }
</script>
<style lang="scss" scoped>
  
</style>