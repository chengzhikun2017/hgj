import fetch from '../utils/fetch.js'

export default class accountAPI {
  static isPhoneRegister(phone) {
    return fetch({
      url: '/account/isPhoneRegister',
      params: {
        phone: phone
      },
    })
  }
}
