/**
 * 银行账户管理-绑定银行账户
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let Forms = Components.use(Components.forms)
let { utils } = Utils.require()
let Popup = Components.use(Components.popup)
let { MemberService, RegistService } = Services.require()
let { STATUS } = Configs.require()

export default {
  data () {
    return {
      formData: {
        accountName: null,
        phoneNumber: null,
        bankNumber: null,
        openingBank: null,
        bankName: null,
        bankCode: null
      },
      userNo: null,
      bankCodeList: [
        {
          values: [],
          className: 'bank-code-list'
        }
      ],
      bankCodeFormat: {}
    }
  },
  components: {
    'my-forms': Forms,
    'tip-popup': Popup,
    'picker-popup': Popup
  },
  methods: {
    verifyFailureEvent (verifyValue, result, target) {
      let formItem = target.parentNode.parentNode
      utils.addClass(formItem, 'error')
    },
    formVerifySuccessEvent (myFormData) {
      let bankCardNo = this.formData.bankNumber
      let mobileNo = this.formData.phoneNumber
      let subbranch = this.formData.bankName
      let bankCode = this.formData.bankCode
      let userNo = this.userNo
      this.$refs['tip-popup'].loading('正在绑定银行卡...')
      MemberService.bindClearCard({
        bankCardNo,
        mobileNo,
        subbranch,
        bankCode,
        userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          this.$refs['tip-popup'].close()
          let that = this
          let callBackThread
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
                  window.clearTimeout(callBackThread)
                  that.gotoAccountManage()
                }
              }
            ],
            callBack: (storeState) => {
              let time = 15
              let eachTime = function () {
                callBackThread = setTimeout(() => {
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
      // this.routeTo(PagesMemberCenter.router())
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
          this.formData.openingBank = entity.bankName
          this.formData.bankCode = entity.bankCode
        })
      }
    },
    queryBankCode () {
      RegistService.queryBankCode().then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          let bankCode = entity.bankCode
          if (bankCode) {
            let tempValue = []
            utils.forEach(bankCode, (item, key) => {
              this.bankCodeFormat[item] = key
              tempValue.push(item)
            })
            this.bankCodeList = [ { values: tempValue, className: 'bank-code-list' } ]
          }
        }
      })
    },
    bankPickerSure (e, data, pickerDatas) {
      this.formData.openingBank = pickerDatas[0]
      this.formData.bankCode = this.bankCodeFormat[pickerDatas[0]]
    },
    bankPickerCancel () {},
    chooseBankCode () {
      this.$refs['j-bankcode-popup'].open()
    }
  },
  created () {
    this.setWebSiteTitle('银行账户管理-绑定银行账户')
    let memberInfo = this.transfToJson(this.getLocalStorage(STATUS.MEMBERINFO))
    this.formData.accountName = memberInfo.comName
    this.formData.phoneNumber = memberInfo.legalMobileNo
    this.userNo = this.getCookie(STATUS.USERNO)
    this.queryBankCode()
  }
}
