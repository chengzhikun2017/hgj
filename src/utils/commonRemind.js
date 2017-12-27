class commonRemind {
  static inputWarn(vm, content, refName) {
    vm.hgjToast({
      content: content,
      cbEntered: () => {
        // console.log('vm.$refs[refName]',vm.$refs[refName])
        vm.$refs[refName].$refs.input.focus()
        // vm.$refs[refName].focus()
      },
      type:'normal',
    })
  }
}
export default commonRemind