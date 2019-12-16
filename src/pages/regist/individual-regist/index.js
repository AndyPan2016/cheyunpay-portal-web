/**
 * 注册
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let Forms = Components.use(Components.forms)
let { utils } = Utils.require()
let Popup = Components.use(Components.popup)
let { RegistService } = Services.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      formData: {
        phoneNumber: null,
        verifyCode: null,
        individualName: null,
        creditCode: null,
        legalName: null,
        legalIDNumber: null,
        legalBankNumber: null,
        legalPhoneNumber: null
      },
      userNo: null,
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
      this.$refs['tip-popup'].loading('正在校验...')
      // 短信验证码校验
      RegistService.checkSmsCaptcha({
        businessType: LANG.businessType.register.key,
        captcha: myFormData.verifyCode,
        mobileNo: myFormData.phoneNumber,
        userNo: this.userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          this.$refs['tip-popup'].close()
          let params = {
            accessToken: (data.entity || {}).accessToken,
            // 商户名称
            comName: myFormData.individualName,
            // 统一社会信用代码
            licenceNo: myFormData.creditCode,
            // 法人真实姓名
            legalRealName: myFormData.legalName,
            // 法人身份证号码
            legalCertNo: myFormData.legalIDNumber,
            // 法人银行卡号
            bankCardNo: myFormData.legalBankNumber,
            // 法人银行预留手机号码
            bankCardMobileNo: myFormData.legalPhoneNumber,
            // 注册客户端
            registerClient: LANG.registType.MOBILE.key,
            // 注册手机号
            mobileNo: myFormData.phoneNumber
          }
          this.setLocalStorage(STATUS.INDIVIDUALREGIST, JSON.stringify(params))
          // 下一步，上传证件照
          this.routeTo(PagesRegist.router(PagesRegist.individualRegistUpload))
        } else {
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    },
    /**
     * 发送验证码
     * @param {*} e
     */
    sendSmsCaptcha (e) {
      let target = e.target || e.srcElement
      if (!utils.hasClass(target, 'button-disabled')) {
        let phoneNumber = this.formData.phoneNumber
        let phoneTarget = this.$refs['j-verify-phone']
        let verifyResult = this.$refs['ref-forms-regist'].verifyTarget(phoneTarget)
        if (!verifyResult.status) {
          return
        }

        this.send = true
        RegistService.sendSmsCaptcha({
          businessType: LANG.businessType.register.key,
          mobileNo: phoneNumber,
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
    this.setWebSiteTitle('个体户注册')
    this.userNo = this.getCookie(STATUS.USERNO)
  }
}
