/**
 * 第三方账号绑定
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日21:55:39
 */

let Forms = Components.use(Components.forms)
let { MemberService } = Services.require()
let { STATUS, LANG } = Configs.require()
let Popup = Components.use(Components.popup)

export default {
  data () {
    return {
      formData: {
        wxBind: null,
        status: true
      },
      userNo: null,
      code: null
    }
  },
  components: {
    'my-forms': Forms,
    'tip-popup': Popup
  },
  methods: {
    queryThirdAuthInfo () {
      MemberService.queryThirdAuthInfo({
        authType: LANG.thirdpartyBindType.WECHAT.key,
        userNo: this.userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          let wechatBindStatus = LANG.wechatBindStatus[entity.wechatStatus]
          this.formData.status = wechatBindStatus.status
          if (wechatBindStatus.status) {
            this.formData.wxBind = wechatBindStatus.text
          } else {
            let wechatCode = this.code
            if (wechatCode) {
              this.$refs['tip-popup'].loading('请稍等，正在绑定...')
              MemberService.bindWechat({
                wechatCode,
                userNo: this.userNo
              }).then(res => {
                let data = res.data
                if (data.success) {
                  this.formData.wxBind = '已绑定'
                  this.formData.status = true
                } else {
                  this.$refs['tip-popup'].tip(data.message)
                }
              }).catch(err => {
                this.$refs['tip-popup'].tip(err.message)
              })
            }
          }
        }
      })
    },
    toBindWechat () {
      // if (!this.formData.status) {
      let redirectUri = encodeURIComponent(window.location.href)
      console.info(redirectUri)
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
      // }
    }
  },
  created () {
    this.setWebSiteTitle('第三方账号绑定')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.queryThirdAuthInfo()
    let params = this.params()
    this.code = params.code
  }
}
