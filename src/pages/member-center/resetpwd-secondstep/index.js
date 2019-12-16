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
        IDNumber: null
      },
      resetType: null,
      cardId: null,
      accessToken: null,
      userNo: null
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
      let IDNumber = myFormData.IDNumber
      if (IDNumber) {
        this.$refs['tip-popup'].loading('正在校验身份证...')
        MemberService.checkCertNo({
          businessType: ((LANG.businessType || {})[this.resetType] || {}).key,
          accessToken: this.accessToken,
          certNo: IDNumber,
          userNo: this.userNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            // this.$refs['tip-popup'].toast('身份证校验成功')
            let that = this
            // setTimeout(() => {
            // let resetMobildKey = ((LANG.businessType || {}).resetMobileNo || {}).key
            if (this.resetType === 'resetMobileNo') {
              // 重置手机号身份验证成功跳转
              that.routeTo(PagesMemberCenter.router(PagesMemberCenter.resetPhoneThirdStep), {
                query: {
                  resetType: this.resetType,
                  accessToken: (data.entity || {}).accessToken
                }
              })
            } else {
              // 重置登录、支付密码身份验证成功跳转
              let memberInfo = that.transfToJson(that.getLocalStorage(STATUS.MEMBERINFO))
              that.routeTo(PagesMemberCenter.router(PagesMemberCenter.resetPwdThirdStep), {
                query: {
                  resetType: this.resetType,
                  realName: memberInfo.realName,
                  accessToken: (data.entity || {}).accessToken
                }
              })
            }
            // }, 2000)
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
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
          let certNo = entity.certNo
          this.cardId = certNo.substr(certNo.length - 4, certNo.length - 1)
        }
      })
    }
  },
  created () {
    // this.setWebSiteTitle('重置登录密码')
    let params = this.params()
    // this.cardId = params.cardId
    this.accessToken = params.accessToken
    this.resetType = params.resetType
    this.userNo = this.getCookie(STATUS.USERNO)
    this.getMemberInfo()
  }
}
