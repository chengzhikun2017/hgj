class commonRemind {
  static inputWarn(vm, content, refName) {
    vm.hgjToast({
      content: content,
      cbEntered: () => {
        vm.$refs[refName].focus()
      },
      type:'normal',
    })
  }
}
export default commonRemind