/**
 * 注册
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let Forms = Components.use(Components.forms)
let { utils } = Utils.require()
let Popup = Components.use(Components.popup)
let { RegistService } = Services.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      formData: {
        mobileNo: null,
        verifyCode: null,
        comName: null,
        licenceNo: null,
        bankCardNo: null,
        bankCode: null,
        bankName: null,
        legalRealName: null,
        legalCertNo: null,
        legalMobileNo: null,
        contactRealName: null,
        contactEmail: null,
        contactMobileNo: null
      },
      userNo: null,
      send: null,
      sendBtnText: '发送验证码',
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
      this.$refs['tip-popup'].loading('正在校验...')
      // 短信验证码校验
      RegistService.checkSmsCaptcha({
        businessType: LANG.businessType.register.key,
        captcha: myFormData.verifyCode,
        mobileNo: myFormData.mobileNo,
        userNo: this.userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          this.$refs['tip-popup'].close()
          myFormData.bankCode = this.formData.bankCode
          myFormData.accessToken = (data.entity || {}).accessToken
          myFormData.registerClient = LANG.registType.MOBILE.key
          this.setLocalStorage(STATUS.BUSINESSREGIST, JSON.stringify(myFormData))
          // 下一步，上传证件照
          this.routeTo(PagesRegist.router(PagesRegist.businessRegistUpload))
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
        let mobileNo = this.formData.mobileNo
        let phoneTarget = this.$refs['j-verify-phone']
        let verifyResult = this.$refs['ref-forms-regist'].verifyTarget(phoneTarget)
        if (!verifyResult.status) {
          return
        }

        this.send = true
        RegistService.sendSmsCaptcha({
          businessType: LANG.businessType.register.key,
          mobileNo: mobileNo,
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
    queryCardBin (e) {
      let target = e.target || e.srcElement
      let formItem = target.parentNode.parentNode
      if (!utils.hasClass(formItem, 'error')) {
        RegistService.queryCardBin({
          bankCardNo: this.formData.bankCardNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            this.formData.bankCode = entity.bankCode
            this.formData.bankName = entity.bankName
          }
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
      this.formData.bankName = pickerDatas[0]
      this.formData.bankCode = this.bankCodeFormat[pickerDatas[0]]
    },
    bankPickerCancel () {},
    chooseBankCode () {
      this.$refs['j-bankcode-popup'].open()
    }
  },
  created () {
    this.setWebSiteTitle('企业注册')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.queryBankCode()
  }
}
