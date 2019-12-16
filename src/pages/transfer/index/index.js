/**
 * 中转页
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日22:16:53
 */

let Popup = Components.use(Components.popup)
let { RegistTokenService, LoginService } = Services.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {}
  },
  components: {
    'tip-popup': Popup
  },
  methods: {
    /**
     * 中转验证
     */
    transferAuth () {
      let params = this.params()
      let query = window.location.href.split('index?')[1]
      let body = params.body
      let bodyJson = this.transfToJson(unescape(body))
      console.info(bodyJson)
      // let xApiSign = params['x-api-sign']
      // let xApiSignType = params['x-api-signType']
      let partnerId = bodyJson.partnerId
      let service = bodyJson.service
      let userType = bodyJson.userType
      let merchUserNo = bodyJson.merchUserNo
      let returnUrl = bodyJson.returnUrl

      if (merchUserNo) {
        this.setCookie(STATUS.MERCHUSERNO, merchUserNo)
      }
      if (returnUrl) {
        this.setCookie(STATUS.REGISTRETURNURL, returnUrl)
      }
      if (partnerId) {
        this.setCookie(STATUS.PARTNERID, partnerId)
      }

      if (service === 'memberRegisterRedirect') {
        // console.info(bodyJson)
        let toRegist = () => {
          RegistTokenService.registerTokenAuth(query).then(res => {
            let data = res.data || {}
            if (data.success) {
              let registPath = ''
              if (userType === 'PERSON') {
                // 个人注册
                registPath = PagesRegist.personalRegist
              } else if (userType === 'BUSINESS') {
                // 企业注册
                registPath = PagesRegist.businessRegist
              } else if (userType === 'INDIVIDUAL') {
                // 个体注册
                registPath = PagesRegist.individualRegist
              }
              this.routeTo(PagesRegist.router(registPath))
            } else {
              this.$refs['tip-popup'].tip(data.message)
            }
          }).catch(err => {
            this.$refs['tip-popup'].tip(err.message)
          })
        }
        let registerStatus = bodyJson.registerStatus
        if (registerStatus !== 'null' && registerStatus !== '') {
          let processConfs = {}
          let langRegisterStatus = LANG.registStatus[registerStatus]
          let tempRegisterStatus
          if (langRegisterStatus) {
            tempRegisterStatus = langRegisterStatus
          } else {
            let validStatus = bodyJson.validStatus
            let registeStatus = LANG.registStatus[validStatus] || LANG.registStatus['VALID_FAIL']
            if (registeStatus) {
              tempRegisterStatus = registeStatus
            }
          }
          processConfs = {
            // 标题
            title: tempRegisterStatus.text,
            // 状态
            status: tempRegisterStatus.type,
            // 结果
            result: tempRegisterStatus.text,
            // 备注
            remark: bodyJson.validReason,
            buttons: false
          }
          if (tempRegisterStatus.key === 'VALID_FAIL') {
            processConfs.buttons = [
              {
                text: '重新注册',
                fn: () => {
                  // 完成
                  // toQRCodeCollection()
                  toRegist()
                }
              }
            ]
          }
          this.$store.dispatch('processStatusStoreUpdate', processConfs)
          this.routeTo(PagesCommons.router(PagesCommons.processStatus))
        } else {
          // 去注册
          if (userType) {
            // RegistTokenService.registerTokenAuth({ partnerId, body, sign: xApiSign, signType: xApiSignType }).then(res => {
            toRegist()
          }
        }
      } else if (service === 'walletRedirect') {
        // 登录，然后去钱包
        // LoginService.loginAuth({ partnerId, body, sign: xApiSign, signType: xApiSignType }).then(res => {
        LoginService.loginAuth(query).then(res => {
          let data = res.data || {}
          if (data.success) {
            // console.info(data)
            let entity = data.entity || {}
            let page = entity.page
            let userNo = entity.userNo
            this.setCookie(STATUS.USERNO, userNo)
            if (page === 'INDEX') {
              // 去钱包首页
              this.routeTo(PagesWallet.router())
            } else if (page === 'NOT_EXIST_MEMBER') {
              // 会员不存在
              this.$store.dispatch('processStatusStoreUpdate', {
                // 标题
                title: '验证失败',
                // 状态
                status: 'error',
                // 结果
                result: '验证失败',
                // 备注
                remark: '会员不存在'
                // 按钮
                // buttons: [
                //   {
                //     text: '完成，返回业务平台',
                //     class: null,
                //     fn: () => {
                //       // 完成，返回业务平台
                //       // this.routeTo(PagesMemberCenter.router(PagesMemberCenter.index))
                //     }
                //   }
                // ]
              })
              // 去公共流程状态页
              this.routeTo(PagesCommons.router(PagesCommons.processStatus))
            } else if (page === 'SET_LOGIN_INFO') {
              // 设置登录信息
              this.routeTo(PagesRegist.router(PagesRegist.registLoginInfo))
            }
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      }
    }
  },
  created () {
    this.setWebSiteTitle('请稍等，正在连接...')
    this.transferAuth()
  },
  mounted () {
    this.$refs['tip-popup'].loading('请稍等，正在连接...')
  }
}
