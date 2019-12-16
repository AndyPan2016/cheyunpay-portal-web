/**
 * 会员中心
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日14:01:18
 */

let Forms = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let { MemberService } = Services.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      // 用户编号
      userNo: null,
      // 身份ID
      partnerId: null,
      // 账户ID
      accountNo: null,
      // 会员信息
      memberInfo: {}
    }
  },
  components: {
    'member-form': Forms,
    'tip-popup': Popup
  },
  methods: {
    /**
     * 根据用户编码查询用户信息
     */
    queryMemberInfo () {
      this.$refs['tip-popup'].loading('加载中...')
      MemberService.queryMemberInfo({
        userNo: this.userNo,
        partnerId: this.partnerId
      }).then(res => {
        let data = res.data || {}
        if (data.success) {
          let entity = data.entity
          this.$refs['tip-popup'].close()
          this.memberInfo = entity
          this.memberInfo.memberTypeText = (LANG.memberType[entity.memberType] || {}).text
          this.memberInfo.registTypeText = (LANG.registType[entity.registerClient] || {}).text
        } else {
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    },
    formClick (e, target, key) {
      if (key === 'resetLoginPassword' || key === 'resetPayPassword') {
        let title = key === 'resetLoginPassword' ? '重置登录密码' : '重置支付密码'
        // 重置登录密码和支付密码
        this.setWebSiteTitle(title)
        this.routeTo(PagesMemberCenter.router(PagesMemberCenter.resetPwdFirstStep), {
          query: {
            resetType: key,
            accountNo: this.accountNo,
            phoneNo: this.memberInfo.mobileNo
          }
        })
      } else if (key === 'resetBindPhone') {
        let memberType = this.memberInfo.memberType
        if (memberType === 'BUSINESS') {
          // 企业
          this.routeTo(PagesMemberCenter.router(PagesMemberCenter.resetPhoneBusiness))
        } else {
          // 个人、个体、运营商
          this.routeTo(PagesMemberCenter.router(PagesMemberCenter.resetPhoneFirstStep))
        }
        // else if (memberType === 'PERSON') {
        //   // 企业
        // } else if (memberType === 'INDIVIDUAL') {
        //   // 个体
        // } else if (memberType === 'OPERATOR') {
        //   // 运营商
        // }
      } else if (key === 'bankManage') {
        // 银行卡管理
        this.routeTo(PagesMemberCenter.router(PagesMemberCenter.bankAccountManage), {
          query: {
            type: PagesMemberCenter.manageWithdrawal
          }
        })
      } else if (key === 'thirdAccountBind') {
        // 第三方绑定
        this.routeTo(PagesMemberCenter.router(PagesMemberCenter.thirdpartyBind))
      } else if (key === 'about') {
        this.routeTo(PagesMemberCenter.router(PagesMemberCenter.about))
      }
    }
  },
  created () {
    this.setWebSiteTitle('会员中心')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.partnerId = this.getCookie(STATUS.PARTNERID)
    this.accountNo = this.getCookie(STATUS.ACCOUNTNO)
  },
  mounted () {
    this.queryMemberInfo()
  }
}
