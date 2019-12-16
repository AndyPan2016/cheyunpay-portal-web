/**
 * 银行账户管理-绑定银行账户-委托提现
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let Forms = Components.use(Components.forms)
let { utils } = Utils.require()
let Popup = Components.use(Components.popup)
let { MemberService } = Services.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      formData: {
        cardUserName: null,
        cardNumber: null,
        idNumber: null,
        phoneNumber: null,
        verifyCode: null
      },
      mobileNo: null,
      userNo: null,
      bankName: null,
      bankCode: null,
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
      // 保存当前页面数据，待提交
      let realName = this.formData.cardUserName
      let bankCardNo = this.formData.cardNumber
      let mobileNo = this.formData.phoneNumber
      let certNo = this.formData.idNumber
      let captcha = this.formData.verifyCode
      let userNo = this.userNo
      let entrustBindBank = {
        realName,
        bankCardNo,
        mobileNo,
        certNo,
        userNo
      }
      this.setLocalStorage(STATUS.ENTRUSTBINDBANK, JSON.stringify(entrustBindBank))
      this.$refs['tip-popup'].loading('正在校验...')
      // 短信验证码校验
      MemberService.checkSmsCaptcha({
        businessType: LANG.businessType.bindBankCard.key,
        captcha,
        mobileNo,
        userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          this.$refs['tip-popup'].close()
          let accessToken = (data.entity || {}).accessToken
          // 下一步，上传证件照
          this.routeTo(PagesMemberCenter.router(PagesMemberCenter.uploadCertificatesEntrust), {
            query: {
              accessToken
            }
          })
        } else {
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    },
    /**
     * 回到银行账户管理首页
     */
    gotoAccountManage () {
      // 完成，回到银行账户管理首页
      this.routeTo(PagesMemberCenter.router(PagesMemberCenter.bankAccountManage), {
        query: {
          type: PagesMemberCenter.manageWithdrawal
        }
      })
    },
    /**
     * 银行卡号输入完成后，拉去银行名称及code
     * @param {*} e
     */
    bankNumberChange (e) {
      let target = e.target || e.srcElement
      if (!utils.hasClass(target.parentNode.parentNode, 'error')) {
        let bankCardNo = target.value
        MemberService.queryCardBin({
          bankCardNo
        }).then(res => {
          // 6214850239656108
          let data = res.data
          let entity = data.entity || {}
          this.bankName = entity.bankName
          this.bankCode = entity.bankCode
        })
      }
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
        let verifyResult = this.$refs['ref-forms-entrust-bind-card'].verifyTarget(phoneTarget)
        if (!verifyResult.status) {
          return
        }

        this.send = true
        MemberService.sendSmsCaptcha({
          businessType: LANG.businessType.bindBankCard.key,
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
    },
    getMemberInfo () {
      MemberService.queryMemberInfo({
        userNo: this.userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          this.mobileNo = entity.mobileNo
        }
      })
    }
  },
  created () {
    this.setWebSiteTitle('委托提现-绑定银行账户')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.getMemberInfo()
  }
}
