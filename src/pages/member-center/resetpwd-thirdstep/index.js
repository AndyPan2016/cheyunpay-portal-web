/**
 * 注册
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let Forms = Components.use(Components.forms)
let PasswordBox = Components.use(Components.passwordbox)
let Popup = Components.use(Components.popup)
let { MemberService } = Services.require()
let { utils } = Utils.require()
let { STATUS } = Configs.require()

export default {
  data () {
    return {
      formData: {
        newPassword: null
      },
      // 重置密码类型(login.重置登录密码 pay.重置支付密码)
      resetType: null,
      realName: null,
      accessToken: null,
      userNo: null
    }
  },
  components: {
    'my-forms': Forms,
    'password-box': PasswordBox,
    'tip-popup': Popup
  },
  methods: {
    verifyFailureEvent (verifyValue, result, target) {
      let formItem = target.parentNode.parentNode
      utils.addClass(formItem, 'error')
    },
    formVerifySuccessEvent (myFormData) {
      let newPassword = myFormData.newPassword
      if (newPassword) {
        let pwdLength = newPassword.length
        if (pwdLength < 8 || pwdLength > 16) {
          return this.$refs['tip-popup'].tip('密码长度为8~16位')
        }
        this.$refs['tip-popup'].loading('正在重置密码...')
        MemberService.resetLoginPassword({
          userNo: this.userNo,
          accessToken: this.accessToken,
          loginPassword: newPassword,
          // 操作员编码（默认操作员编码：同用户编码userNo）
          operatorNo: this.userNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            this.processStatusSet('重置登录密码', '您已成功设置新登录密码，请牢记新密码')
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      }
    },
    processStatusSet (title, remark) {
      this.$refs['tip-popup'].close()
      let that = this
      that.$store.dispatch('processStatusStoreUpdate', {
        // 标题
        title: title,
        // 状态
        status: 'success',
        // 结果
        result: '设置成功',
        // 备注
        remark: remark,
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
    },
    /**
     * 密码框输入完成
     * @param {String} pwd 密码
     */
    pwdComplateEvent (pwd) {
      // console.info(pwd)
      if (pwd) {
        this.$refs['tip-popup'].loading('正在重置密码...')
        MemberService.resetPayPassword({
          userNo: this.userNo,
          accessToken: this.accessToken,
          payPassword: pwd,
          // 操作员编码（默认操作员编码：同用户编码userNo）
          operatorNo: this.userNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            this.processStatusSet('重置支付密码', '您已成功设置新支付密码，请牢记新密码')
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
    },
    getMemberInfo () {
      MemberService.queryMemberInfo({
        userNo: this.userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          this.realName = entity.realName
        }
      })
    }
  },
  created () {
    // this.setWebSiteTitle('重置登录密码')
    let params = this.params()
    this.resetType = params.resetType
    // this.realName = params.realName
    this.accessToken = params.accessToken
    this.userNo = this.getCookie(STATUS.USERNO)
    this.getMemberInfo()
  }
}
