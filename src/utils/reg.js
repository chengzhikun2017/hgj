export default class Regs{
  static phone(v){
    let reg=/^1[3|4|5|8|7][0-9]\d{8}$/
    return reg.test(v)
  }
  static password(v){
    let reg
    //reg=
    return reg.test(v)
  }
}