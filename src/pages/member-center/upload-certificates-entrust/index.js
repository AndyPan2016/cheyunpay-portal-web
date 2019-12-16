/**
 * 委托提现-绑定银行卡-上传证件照
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月20日11:49:04
 */

let UploadCertificates = PagesCommons.use(PagesCommons.uploadCertificates)
let Popup = Components.use(Components.popup)
let { STATUS } = Configs.require()
let { utils } = Utils.require()
let { MemberService } = Services.require()

export default {
  data () {
    return {
      uploadLists: [
        { text: '持卡人身份证正面', key: 'certFrontPath', background: require('../../../assets/images/background/bg-idcard-upload-a.png') },
        { text: '持卡人身份证反面', key: 'certBackPath', background: require('../../../assets/images/background/bg-idcard-upload-b.png') },
        { text: '收款银行账户正面', key: 'bankCardFrontPath', background: require('../../../assets/images/background/bg-bank-receivables.png') },
        { text: '持卡人手持身份证照', key: 'holdCertPath', background: require('../../../assets/images/background/bg-individual-bank.png') },
        { text: '收款授权委托书盖章照', key: 'attorneyPowerPath', background: require('../../../assets/images/background/bg-attorney.png') }
      ],
      uploadButtons: [
        { text: '下载《收款授权委托书》', class: 'button-reset', fn: this.loadFile },
        { text: '下一步', class: null, fn: this.nextSubmit }
      ],
      userNo: null,
      accessToken: null
    }
  },
  components: {
    'upload-certificates': UploadCertificates,
    'tip-popup': Popup
  },
  methods: {
    loadFile () {
      this.downloadFiles({
        path: '/file/sqwts.docx'
      })
    },
    uploadSuccess (file) {
      // console.info(this.uploadLists)
    },
    uploadFail (err) {
      this.$refs['tip-popup'].tip(err.message)
    },
    nextSubmit () {
      let uploadLists = this.uploadLists
      let file
      let key
      let falseItem
      let params = this.transfToJson(this.getLocalStorage(STATUS.ENTRUSTBINDBANK)) || {}
      utils.forEach(uploadLists, item => {
        file = item.file
        key = item.key
        params[key] = file
        if (!file) {
          falseItem = item
          return 'break'
        }
      })
      if (falseItem) {
        this.$refs['tip-popup'].tip(falseItem.text)
      } else {
        this.$refs['tip-popup'].loading('请稍等，正在提交数据...')
        params.accessToken = this.accessToken
        MemberService.entrustBindCard(params).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].close()
            let that = this
            that.$store.dispatch('processStatusStoreUpdate', {
              // 标题
              title: '银行账户管理-绑定银行账户',
              // 状态
              status: 'wait',
              // 结果
              result: '等待审核',
              // 备注
              remark: '已成功提交审核，请耐心等待',
              // 按钮
              buttons: [
                {
                  text: '完成',
                  class: null,
                  fn: () => {
                    // 完成，回到银行账户管理首页
                    this.routeTo(PagesMemberCenter.router(PagesMemberCenter.bankAccountManage), {
                      query: {
                        type: PagesMemberCenter.manageEntrustWithdrawal
                      }
                    })
                  }
                }
              ]
            })
            this.setLocalStorage(STATUS.ENTRUSTBINDBANK, undefined)
            // 去公共流程状态页
            that.routeTo(PagesCommons.router(PagesCommons.processStatus))
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
    this.setWebSiteTitle('上传证件照')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.accessToken = this.params('accessToken')
  }
}
