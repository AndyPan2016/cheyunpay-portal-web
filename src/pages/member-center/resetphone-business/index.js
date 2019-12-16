/**
 * 重置绑定手机号
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日17:51:21
 */

let PasswordBox = Components.use(Components.passwordbox)

export default {
  data () {
    return {
      formData: {
        password: null
      }
    }
  },
  components: {
    'password-box': PasswordBox
  },
  methods: {
    complateReset () {
      window.history.back()
    }
  },
  created () {
    this.setWebSiteTitle('重置绑定手机号')
  }
}
