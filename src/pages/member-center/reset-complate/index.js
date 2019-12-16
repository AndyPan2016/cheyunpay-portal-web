/**
 * 身份验证
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月14日18:27:44
 */

export default {
  data () {
    return {
      // success、fail
      status: 'success',
      // 结果文本
      text: '设置成功',
      // remark
      remark: '您已成功设置新登录密码，请牢记新密码',
      // 完成按钮文本
      complateBtnText: '完成'
    }
  },
  props: {
    // // success、fail
    // status: { type: String, default: 'success' },
    // // 结果文本
    // text: { type: String, default: '设置成功' },
  },
  components: {},
  methods: {},
  created () {
    this.setWebSiteTitle('身份验证')
  }
}
