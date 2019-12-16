/**
 * 重置绑定手机号
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日18:07:29
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
        phoneNumber: null,
        verifyCode: null
      },
      accessToken: null,
      resetType: null,
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
      let phoneNumber = myFormData.phoneNumber
      let verifyCode = myFormData.verifyCode
      if (phoneNumber && verifyCode) {
        this.$refs['tip-popup'].loading('正在重置手机号...')
        MemberService.resetMemberMobile({
          accessToken: this.accessToken,
          mobileNo: phoneNumber,
          operatorNo: this.userNo,
          userNo: this.userNo
        }).then(res => {
          let data = res.data
          // if (data.success) {

          // } else {
          //   this.$refs['tip-popup'].tip(data.message)
          // }
          this.$refs['tip-popup'].close()
          let that = this
          that.$store.dispatch('processStatusStoreUpdate', {
            // 标题
            title: '重置绑定手机号',
            // 状态
            status: data.success ? 'success' : 'fail',
            // 结果
            result: data.success ? '重置成功' : '重置失败',
            // 备注
            remark: data.message,
            // 按钮
            buttons: [
              {
                text: '完成',
                class: null,
                fn: () => {
                  // 完成，回到会员中心首页
                  that.routeTo(PagesMemberCenter.router())
                }
              }
            ]
          })
          // 去公共流程状态页
          that.routeTo(PagesCommons.router(PagesCommons.processStatus))
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      }
    },
    sendSmsCaptcha (e) {
      let target = e.target || e.srcElement
      if (!utils.hasClass(target, 'button-disabled')) {
        let phoneNumber = this.formData.phoneNumber
        let phoneTarget = this.$refs['j-verify-phone']
        let verifyResult = this.$refs['ref-forms-reset-phone'].verifyTarget(phoneTarget)
        if (!verifyResult.status) {
          return
        }
        // if (!phoneNumber) {
        //   this.$refs['j-verify-submit'].click()
        //   return
        // }
        this.send = true
        MemberService.sendSmsCaptcha({
          businessType: LANG.businessType.resetMobileNo.key,
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
    this.setWebSiteTitle('重置绑定手机号')
    let params = this.params()
    this.accessToken = params.accessToken
    this.resetType = params.resetType
    this.userNo = this.getCookie(STATUS.USERNO)
  }
}
