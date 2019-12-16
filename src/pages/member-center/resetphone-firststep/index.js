/**
 * 重置绑定手机号
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日17:51:21
 */

let PasswordBox = Components.use(Components.passwordbox)
let Popup = Components.use(Components.popup)
let { MemberService } = Services.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      formData: {
        password: null
      },
      verifyPwdNumber: 3,
      currentPwdCount: 0
    }
  },
  components: {
    'password-box': PasswordBox,
    'tip-popup': Popup
  },
  methods: {
    /**
     * 密码框输入完成
     * @param {String} pwd 密码
     */
    pwdComplateEvent (pwd) {
      if (pwd) {
        this.$refs['tip-popup'].loading('正在验证密码...')
        let resetType = ((LANG.businessType || {}).resetMobileNo || {}).key
        MemberService.checkPayPassword({
          userNo: this.userNo,
          businessType: resetType,
          payPassword: pwd,
          // 操作员编码（默认操作员编码：同用户编码userNo）
          operatorNo: this.userNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            let memberInfo = this.transfToJson(this.getLocalStorage(STATUS.MEMBERINFO))
            let certNo = memberInfo.certNo
            let noStr = certNo.substr(certNo.length - 4, certNo.length - 1)
            this.routeTo(PagesMemberCenter.router(PagesMemberCenter.resetPwdSecondStep), {
              query: {
                resetType: 'resetMobileNo',
                cardId: noStr,
                accessToken: (data.entity || {}).accessToken
              }
            })
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      }
    },
    /**
     * 密码框输入改变
     * @param {String} pwd 密码
     */
    pwdChangeEvent (pwd) {
      // console.info(pwd)
    }
  },
  created () {
    this.setWebSiteTitle('重置绑定手机号')
  }
}
