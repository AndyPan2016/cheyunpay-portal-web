/**
 * 实际控制人非法人照片上传
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月1日22:38:52
 */

let UploadCertificates = PagesCommons.use(PagesCommons.uploadCertificates)
let Popup = Components.use(Components.popup)
let { STATUS } = Configs.require()
let { utils } = Utils.require()

export default {
  data () {
    return {
      uploadLists: [
        { text: '控股股东或者实际控制人身份证正面', key: 'holdCertFrontPath', background: require('../../../assets/images/background/bg-idcard-upload-a.png'), file: require('../../../assets/images/background/bg-idcard-upload-a.png') },
        { text: '控股股东或者实际控制人身份证反面', key: 'holdCertBackPath', background: require('../../../assets/images/background/bg-idcard-upload-b.png'), file: require('../../../assets/images/background/bg-idcard-upload-b.png') }
      ],
      uploadButtons: [
        { text: '完成', class: null, fn: this.uploadButtonsFn }
      ],
      verifyReason: null,
      tempData: null,
      way: null,
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
      let holdCertInfo = {}
      utils.forEach(uploadLists, item => {
        file = item.file
        key = item.key
        holdCertInfo[key] = file
        if (!file) {
          falseItem = item
          return 'break'
        }
      })
      if (falseItem) {
        this.$refs['tip-popup'].tip(falseItem.text)
        return
      }
      this.setLocalStorage(STATUS.HOLDCERTINFO + this.userNo, JSON.stringify(holdCertInfo))
      this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acEnterpriseUpload), {
        query: {
          way: this.way
        }
      })
    }
  },
  created () {
    this.setWebSiteTitle('实际控制人非法人照片上传')
    this.verifyReason = this.params('verifyReason')
    let params = this.params()
    this.way = params.way
    this.userNo = this.getCookie(STATUS.USERNO)

    let holdCertInfo = this.transfToJson(this.getLocalStorage(STATUS.HOLDCERTINFO + this.userNo))
    if (holdCertInfo) {
      utils.forEach(this.uploadLists, item => {
        item.background = holdCertInfo[item.key]
        item.file = holdCertInfo[item.key]
      })
    }
  }
}
