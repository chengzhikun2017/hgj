class commonRemind {
  static inputWarn(vm, content, refName) {
    vm.hgjToast({
      content: content,
      cbEntered: () => {
        vm.$refs[refName].focus()
      }
    })
  }
}
export default commonRemind