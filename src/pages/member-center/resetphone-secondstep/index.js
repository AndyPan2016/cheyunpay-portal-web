/**
 * 重置绑定手机号
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日18:04:50
 */

let Forms = Components.use(Components.forms)
let { utils } = Utils.require()

export default {
  data () {
    return {
      formData: {
        IDNumber: null
      }
    }
  },
  components: {
    'my-forms': Forms
  },
  methods: {
    verifyFailureEvent (verifyValue, result, target) {
      let formItem = target.parentNode.parentNode
      utils.addClass(formItem, 'error')
    },
    formVerifySuccessEvent (myFormData) {
      console.info(myFormData)
    }
  },
  created () {
    this.setWebSiteTitle('重置绑定手机号')
  }
}
