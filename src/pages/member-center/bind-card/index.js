/**
 * 银行账户管理-绑定银行账户
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
        phoneNumber: null,
        verifyCode: null,
        subBranch: null
      },
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
    /**
     * 表单验证成功并提交
     */
    formVerifySuccessEvent (myFormData) {
      let captcha = this.formData.verifyCode
      let bankCardNo = myFormData.cardNumber
      let mobileNo = myFormData.phoneNumber
      // let subbranch = myFormData.subBranch
      let bankCode = this.bankCode
      let userNo = this.userNo

      let bindClearCard = (accessToken) => {
        this.$refs['tip-popup'].loading('正在绑定银行卡...')
        MemberService.bindClearCard({
          accessToken,
          bankCardNo,
          mobileNo,
          bankCode,
          userNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].close()
            let that = this
            that.$store.dispatch('processStatusStoreUpdate', {
              // 标题
              title: '银行账户管理-绑定银行账户',
              // 状态
              status: 'success',
              // 结果
              result: '绑定成功',
              // 备注
              remark: '绑定银行卡成功，15秒内将自动返回',
              // 按钮
              buttons: [
                {
                  text: '完成',
                  class: null,
                  fn: () => {
                    // 完成，回到银行账户管理首页
                    that.gotoAccountManage()
                  }
                }
              ],
              callBack: (storeState) => {
                let time = 15
                let eachTime = function () {
                  setTimeout(() => {
                    time--
                    storeState['remark'] = '绑定银行卡成功，#N#秒内将自动返回'.replace('#N#', time)
                    if (time) {
                      eachTime()
                    } else {
                      storeState['callBack'] = undefined
                      // 回到银行账户管理首页
                      that.gotoAccountManage()
                    }
                  }, 1000)
                }
                eachTime()
              }
            })
            // 去公共流程状态页
            that.routeTo(PagesCommons.router(PagesCommons.processStatus))
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      }

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
          bindClearCard((data.entity || {}).accessToken)
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
        let verifyResult = this.$refs['ref-forms-bind-card'].verifyTarget(phoneTarget)
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
    }
  },
  created () {
    this.setWebSiteTitle('银行账户管理-绑定银行账户')
    let memberInfo = this.transfToJson(this.getLocalStorage(STATUS.MEMBERINFO))
    this.formData.cardUserName = memberInfo.realName
    this.userNo = this.getCookie(STATUS.USERNO)
  }
}
