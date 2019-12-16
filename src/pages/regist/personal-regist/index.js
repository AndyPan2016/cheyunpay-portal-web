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
        registPhoneNumber: null,
        verifyCode: null,
        realName: null,
        IDNumber: null,
        bankNumber: null,
        phoneNumber: null
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
        mobileNo: myFormData.registPhoneNumber,
        userNo: this.userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          this.$refs['tip-popup'].close()
          let params = {
            accessToken: (data.entity || {}).accessToken,
            // 银行预留手机
            bankCardMobileNo: myFormData.phoneNumber,
            // 银行卡号
            bankCardNo: myFormData.bankNumber,
            // 身份证号
            certNo: myFormData.IDNumber,
            // 注册手机号
            mobileNo: myFormData.registPhoneNumber,
            // 真实姓名
            realName: myFormData.realName,
            // 注册客户端
            registerClient: LANG.registType.MOBILE.key
          }
          this.setLocalStorage(STATUS.PERSONALREGIST, JSON.stringify(params))
          // 下一步，上传证件照
          this.routeTo(PagesRegist.router(PagesRegist.personalRegistUpload))
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
        let registPhoneNumber = this.formData.registPhoneNumber
        let phoneTarget = this.$refs['j-verify-phone']
        let verifyResult = this.$refs['ref-forms-regist'].verifyTarget(phoneTarget)
        if (!verifyResult.status) {
          return
        }

        this.send = true
        RegistService.sendSmsCaptcha({
          businessType: LANG.businessType.register.key,
          mobileNo: registPhoneNumber,
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
    this.setWebSiteTitle('个人注册')
    this.userNo = this.getCookie(STATUS.USERNO)
  }
}
