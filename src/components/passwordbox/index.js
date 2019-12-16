/**
 * 密码框 JavaScript
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日15:52:37
 */

// let { utils } = Utils.require()

export default {
  data () {
    return {
      passwordModel: null,
      tempModel: null,
      pwdBoxGroups: null
    }
  },
  props: {
    // 密码输入框类型
    type: { type: String, default: 'number' },
    // 密码长度
    length: { type: Number, default: 6 },
    // 自动获取焦点
    autofocus: { type: Boolean, default: true },
    // 输入完成
    onComplate: { type: Function },
    // 值改变
    onChange: { type: Function }
  },
  methods: {
    keypressEvent (e) {
      if (e.key === 'e' || e.key === 'E') {
        this.tempModel = this.passwordModel
      }
    },
    keydownEvent (e) {
      let that = this
      setTimeout(() => {
        if (that.tempModel) {
          that.passwordModel = that.tempModel
          that.tempModel = null
        }
        that.renderPwdToBox()
      }, 0)
    },
    /**
     * 渲染密码框内容
     */
    renderPwdToBox () {
      let passwordModel = (this.passwordModel || '').toString()
      let pwdBoxGroups = this.pwdBoxGroups
      let box
      let model
      for (let i = 0, len = pwdBoxGroups.length; i < len; i++) {
        box = pwdBoxGroups[i]
        model = passwordModel[i]
        if (box && model) {
          box.value = model
        } else {
          box.value = ''
        }
      }
      if (this.onChange) {
        this.onChange(this.passwordModel)
      }
      if (passwordModel.length === this.length) {
        if (this.onComplate) {
          this.onComplate(this.passwordModel)
        }
      }
    }
  },
  created () {},
  mounted () {
    let passwordBox = this.$refs['passwordBox']
    this.pwdBoxGroups = passwordBox.querySelectorAll('.password-box-item')
  }
}
