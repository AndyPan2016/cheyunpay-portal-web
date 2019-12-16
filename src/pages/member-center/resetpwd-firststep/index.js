/**
 * 注册
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let Forms = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let { MemberService } = Services.require()
let { utils } = Utils.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      formData: {
        verifyCode: null
      },
      resetType: null,
      userNo: null,
      accountNo: null,
      phoneNo: null,
      phoneEncryptionNo: null,
      send: null,
      sendBtnText: '发送验证码'
    }
  },
  components: {
    'my-forms': Forms,
    'tip-popup': Popup
  },
  methods: {
    verifyFailureEvent (verifyValue, result, target) {
      let formItem = target.parentNode.parentNode
      utils.addClass(formItem, 'error')
    },
    formVerifySuccessEvent (myFormData) {
      let verifyCode = myFormData.verifyCode
      if (verifyCode) {
        this.$refs['tip-popup'].loading('正在校验短信...')
        let resetType = ((LANG.businessType || {})[this.resetType] || {}).key
        MemberService.checkSmsCaptcha({
          businessType: resetType,
          captcha: verifyCode,
          mobileNo: this.phoneNo,
          userNo: this.userNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            // this.$refs['tip-popup'].toast('短信校验成功')
            let that = this
            // setTimeout(() => {
            let memberInfo = that.transfToJson(that.getLocalStorage(STATUS.MEMBERINFO))
            let certNo = memberInfo.certNo
            let noStr = certNo.substr(certNo.length - 4, certNo.length - 1)
            that.routeTo(PagesMemberCenter.router(PagesMemberCenter.resetPwdSecondStep), {
              query: {
                resetType: this.resetType,
                cardId: noStr,
                accessToken: (data.entity || {}).accessToken
              }
            })
            // }, 2000)
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      }
    },
    sendSmsCaptcha (e) {
      let target = e.target || e.srcElement
      this.send = true
      if (!utils.hasClass(target, 'button-disabled')) {
        let resetType = ((LANG.businessType || {})[this.resetType] || {}).key
        MemberService.sendSmsCaptcha({
          businessType: resetType,
          mobileNo: this.phoneNo,
          userNo: this.userNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].toast('发送成功')
            this.countDown({
              timer: 59,
              fn: (count) => {
                this.sendBtnText = count + '秒后重新发送'
              },
              callBack: () => {
                this.sendBtnText = '发送验证码'
                this.send = false
              }
            })
          } else {
            this.$refs['tip-popup'].tip(data.message)
            this.send = false
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
          this.send = false
        })
      }
    }
  },
  created () {
    // this.setWebSiteTitle('重置登录密码')
    let params = this.params()
    this.accountNo = params.accountNo
    this.phoneNo = params.phoneNo
    this.resetType = params.resetType
    this.phoneEncryptionNo = this.phoneEncryption(params.phoneNo)
    this.userNo = this.getCookie(STATUS.USERNO)
  }
}
