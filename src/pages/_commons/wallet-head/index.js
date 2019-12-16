/**
 * 钱包头部
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月27日10:14:53
 */

let { MemberService } = Services.require()
let { STATUS, LANG } = Configs.require()
let Popup = Components.use(Components.popup)

export default {
  data () {
    return {
      // 用户编号
      userNo: null,
      // 身份ID
      partnerId: null,
      // 钱包数据
      walletData: {}
    }
  },
  props: {
    // 钱包数据
    walletHeadData: { type: Object },
    // 选择账户
    onChooseAccount: { type: Function },
    // 点击
    onAccountClick: { type: Function }
  },
  components: {
    'tip-popup': Popup
  },
  methods: {
    /**
     * 切换账号
     * @param {*} e
     */
    chooseAccountEvent (e) {
      let result
      if (this.onChooseAccount) {
        result = this.onChooseAccount(e)
      }
      if (result !== false) {
        this.$router.push({
          path: PagesWallet.router(PagesWallet.accountSwitch)
        })
      }
    },
    /**
     * 账号详情
     * @param {*} e
     */
    accountDetailEvent (e) {
      let result
      if (this.onAccountClick) {
        result = this.onAccountClick(e)
      }
      if (result !== false) {
        this.$router.push({
          path: PagesMemberCenter.router()
        })
      }
    },
    /**
     * 查询用户资金账户信息
     */
    queryAccountInfo () {
      MemberService.queryAccountInfo({
        accountType: 'NORMAL',
        userNo: this.userNo,
        partnerId: this.partnerId
      }).then(res => {
        let data = res.data || {}
        if (data.success) {
          let entity = data.entity
          // this.walletData = {
          //   // accountName: entity.memberType === 'PERSON' ? memberInfo.realName : entity.comName,
          //   accountType: (LANG.accountType[entity.accountType] || {}).text,
          //   accountMoney: this.transferMoney(entity.balance),
          //   accountNumber: entity.accountNo
          //   // accountNumber: entity.bankAccountCoreNo
          // }
          MemberService.queryMemberInfo({
            userNo: this.userNo
          }).then(res => {
            let data = res.data || {}
            if (data.success) {
              let memberInfo = data.entity
              this.walletData = {
                accountName: memberInfo.memberType === 'PERSON' ? memberInfo.realName : memberInfo.comName,
                accountType: (LANG.accountType[entity.accountType] || {}).text,
                accountMoney: this.transferMoney(entity.balance),
                accountNumber: entity.accountNo
                // accountNumber: entity.bankAccountCoreNo
              }
              // this.walletData.accountName = memberInfo.memberType === 'PERSON' ? memberInfo.realName : memberInfo.comName
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
  created () {
    this.userNo = this.getCookie(STATUS.USERNO)
    this.partnerId = this.getCookie(STATUS.PARTNERID)
    if (this.walletHeadData && this.walletHeadData !== {}) {
      let walletHeadData = this.walletHeadData
      for (let key in walletHeadData) {
        this.walletData[key] = walletHeadData[key]
      }
    } else {
      this.queryAccountInfo()
    }
  }
}
