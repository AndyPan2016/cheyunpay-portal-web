/**
 * 收益所有人非法人照片上传
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月1日22:42:10
 */

let UploadCertificates = PagesCommons.use(PagesCommons.uploadCertificates)
let Popup = Components.use(Components.popup)
let { STATUS } = Configs.require()
let { utils } = Utils.require()

export default {
  data () {
    return {
      uploadLists: [
        { text: '受益所有人身份证正面', key: 'beneficiaryCertFrontPath', background: require('../../../assets/images/background/bg-idcard-upload-a.png'), file: require('../../../assets/images/background/bg-idcard-upload-a.png') },
        { text: '受益所有人身份证反面', key: 'beneficiaryCertBackPath', background: require('../../../assets/images/background/bg-idcard-upload-b.png'), file: require('../../../assets/images/background/bg-idcard-upload-b.png') }
      ],
      uploadButtons: [
        { text: '完成', class: null, fn: this.uploadButtonsFn }
      ],
      verifyReason: null,
      tempData: null,
      userNo: null
    }
  },
  components: {
    'upload-certificates': UploadCertificates,
    'tip-popup': Popup
  },
  methods: {
    uploadFail (err) {
      this.$refs['tip-popup'].tip(err.message)
    },
    uploadButtonsFn () {
      let uploadLists = this.uploadLists
      let verifyStatus = true
      if (this.tempData) {
        utils.forEach(uploadLists, item => {
          let tempItem = this.tempData[item.key]
          if (tempItem && item.background === tempItem) {
            verifyStatus = false
            item.status = 'error'
          }
        })
        if (!verifyStatus) {
          this.$refs['tip-popup'].tip('请修改审核未通过的数据再提交')
          return
        }
      }
      let file
      let key
      let falseItem
      let beneficiaryCertInfo = {}
      utils.forEach(uploadLists, item => {
        file = item.file
        key = item.key
        beneficiaryCertInfo[key] = file
        if (!file) {
          falseItem = item
          return 'break'
        }
      })
      if (falseItem) {
        this.$refs['tip-popup'].tip(falseItem.text)
        return
      }
      this.setLocalStorage(STATUS.BENEFICIARYCERTINFO + this.userNo, JSON.stringify(beneficiaryCertInfo))
      this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acEnterpriseUpload))
    }
  },
  created () {
    this.setWebSiteTitle('收益所有人非法人照片上传')
    this.verifyReason = this.params('verifyReason')
    this.userNo = this.getCookie(STATUS.USERNO)

    let beneficiaryCertInfo = this.transfToJson(this.getLocalStorage(STATUS.BENEFICIARYCERTINFO + this.userNo))
    if (beneficiaryCertInfo) {
      utils.forEach(this.uploadLists, item => {
        item.background = beneficiaryCertInfo[item.key]
        item.file = beneficiaryCertInfo[item.key]
      })
    }
  }
}
