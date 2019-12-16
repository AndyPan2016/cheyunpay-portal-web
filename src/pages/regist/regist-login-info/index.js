/**
 * 注册
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let Forms = Components.use(Components.forms)
let { utils } = Utils.require()
let Popup = Components.use(Components.popup)
let { RegistService, MemberService } = Services.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      formData: {
        loginName: null,
        loginPwd: null,
        payPwd: null,
        verifyCode: null
      },
      registInfo: null,
      mobileNo: null,
      mobileNoStr: null,
      userNo: null,
      send: null,
      sendBtnText: '发送验证码',
      pageType: null
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
      RegistService.checkUserName({
        userName: this.formData.loginName
      }).then(res => {
        let data = res.data
        if (data.success) {
          // 短信验证码校验
          RegistService.checkSmsCaptcha({
            businessType: LANG.businessType.setPassword.key,
            captcha: myFormData.verifyCode,
            mobileNo: this.mobileNo,
            userNo: this.userNo
          }).then(res => {
            let data = res.data
            if (data.success) {
              // this.$refs['tip-popup'].close()
              this.loginInfoSubmit(data.entity.accessToken)
            } else {
              this.$refs['tip-popup'].tip(data.message)
            }
          }).catch(err => {
            this.$refs['tip-popup'].tip(err.message)
          })
        } else {
          utils.addClass(this.$refs['j-ref-username'], 'error')
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    },
    loginInfoSubmit (accessToken) {
      this.$refs['tip-popup'].loading('正在设置登录信息...')
      RegistService.setLoginInfo({
        accessToken,
        loginPassword: this.formData.loginPwd,
        payPassword: this.formData.payPwd,
        userName: this.formData.loginName,
        userNo: this.userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          this.$refs['tip-popup'].close()
          this.routeTo(PagesWallet.router())
          // let that = this
          // that.$store.dispatch('processStatusStoreUpdate', {
          //   // 标题
          //   title: '身份验证',
          //   // 状态
          //   status: 'wait',
          //   // 结果
          //   result: '等待审核',
          //   // 备注
          //   remark: '已提交申请，请耐心等待审核',
          //   // 按钮
          //   buttons: [
          //     {
          //       text: '完成，返回业务平台',
          //       class: null,
          //       fn: () => {
          //         // 完成，返回业务平台
          //         this.routeTo(PagesMemberCenter.router(PagesMemberCenter.index))
          //       }
          //     }
          //   ]
          // })
          // this.setLocalStorage(STATUS.PERSONALREGIST, undefined)
          // // 去公共流程状态页
          // that.routeTo(PagesCommons.router(PagesCommons.processStatus))
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
        this.send = true
        RegistService.sendSmsCaptcha({
          businessType: LANG.businessType.setPassword.key,
          mobileNo: this.mobileNo,
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
    queryMemberRegisterInfo () {
      MemberService.queryMemberInfo({
        userNo: this.getCookie(STATUS.USERNO)
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          let mobileNo = entity.mobileNo
          this.mobileNo = mobileNo
          this.mobileNoStr = this.phoneEncryption(mobileNo)
          // this.userNo = entity.userNo
          // this.setCookie(STATUS.USERNO, this.userNo)
        }
      })
    }
  },
  created () {
    this.setWebSiteTitle('设置登录信息')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.registInfo = this.transfToJson(this.getLocalStorage(STATUS.PERSONALREGIST)) || {}
    this.queryMemberRegisterInfo()
    // this.mobileNo = this.registInfo.mobileNo
    // if (!this.mobileNo) {
    //   this.queryMemberRegisterInfo()
    // } else {
    //   this.mobileNoStr = this.phoneEncryption(this.mobileNo)
    // }
    // this.mobileNo = '18899000000'
    // this.mobileNoStr = this.phoneEncryption(this.mobileNo)
    this.pageType = this.params('pageType')
  }
}
