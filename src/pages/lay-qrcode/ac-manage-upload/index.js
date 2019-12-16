/**
 * 经营场所照片上传
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月1日22:18:56
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
        { text: '经营场所室内照片', key: 'indoorImagePath', background: require('../../../assets/images/background/bg-manage-in.png'), file: require('../../../assets/images/background/bg-manage-in.png') },
        { text: '经营场所室外照片', key: 'outdoorImagePath', background: require('../../../assets/images/background/bg-manage-out.png'), file: require('../../../assets/images/background/bg-manage-out.png') }
      ],
      uploadButtons: [
        { text: '提交申请', class: null, fn: this.uploadButtonsFn }
      ],
      memberInfo: {},
      userNo: null,
      verifyReason: null,
      tempData: null,
      way: null,
      // 是否需要填充聚合的数据（如果摆牌未申请，聚合已申请通过，则填充聚合数据）
      isParams: false
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
      let params = this.transfToJson(this.getLocalStorage(STATUS.ACMATERIELAPPLY)) || {}
      let businessActivityInfo = {}
      utils.forEach(uploadLists, item => {
        file = item.file
        key = item.key
        businessActivityInfo[key] = file
        if (!file) {
          falseItem = item
          return 'break'
        }
      })
      if (falseItem) {
        this.$refs['tip-popup'].tip(falseItem.text)
        return
      }
      let memberType = this.memberInfo.memberType
      if (memberType === 'INDIVIDUAL') {
        this.$refs['tip-popup'].loading('请稍等，正在提交数据...')
        MemberService.applyChannelPayment({
          userNo: this.userNo,
          businessActivityInfo: businessActivityInfo,
          shopInfo: params,
          paymentType: this.getCookie(STATUS.PAYMENTTYPE)
        }).then(res => {
          let data = res.data
          if (data.success) {
            this.$store.dispatch('processStatusStoreUpdate', {
              // 标题
              title: '摆牌二维码物料申请',
              // 状态
              status: 'wait',
              // 结果
              result: '申请已提交',
              // 备注
              remark: '申请已提交，请耐心等待工作人员审核结果',
              // 按钮
              buttons: [
                {
                  text: '完成',
                  class: null,
                  fn: () => {
                    // 完成，回到首页
                    if (this.way === 'wallet') {
                      this.routeTo(PagesWallet.router())
                    } else {
                      this.routeTo(PagesLayQRCode.router(PagesLayQRCode.index))
                    }
                  }
                }
              ]
            })
            // 去公共流程状态页
            this.routeTo(PagesCommons.router(PagesCommons.processStatus))
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      } else if (memberType === 'BUSINESS') {
        this.setLocalStorage(STATUS.BUSINESSACTIVITYINFO + this.userNo, JSON.stringify(businessActivityInfo))
        this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acEnterpriseUpload), {
          query: {
            isParams: this.isParams,
            way: this.way
          }
        })
      }
    },
    /**
     * 检查是否有未审核通过原因
     */
    checkReason () {
      let verifyReason = this.verifyReason
      if (verifyReason) {
        // PosService.queryPosApply({ userId: this.userNo }).then(res => {
        //   let data = res.data
        //   if (data.success) {
        //     let entity = data.entity
        //     this.recordNo = entity.recordNo
        //     this.uploadLists[0].background = entity.businessLicense
        //     this.uploadLists[1].background = entity.legalPersonCertFrontPath
        //     this.uploadLists[2].background = entity.legalPersonCertBackPath
        //     this.uploadLists[3].background = entity.doorheadPhotoPath1
        //     this.uploadLists[4].background = entity.doorheadPhotoPath2
        //     let verifyReasonAry = verifyReason.split(',')
        //     this.tempData = {}
        //     utils.forEach(verifyReasonAry, reason => {
        //       if (reason === 'businessLicense') {
        //         this.uploadLists[0].status = 'error'
        //         this.tempData[reason] = entity.businessLicense
        //       } else if (reason === 'legalPersonCertFrontPath') {
        //         this.uploadLists[1].status = 'error'
        //         this.tempData[reason] = entity.legalPersonCertFrontPath
        //       } else if (reason === 'legalPersonCertBackPath') {
        //         this.uploadLists[2].status = 'error'
        //         this.tempData[reason] = entity.legalPersonCertBackPath
        //       } else if (reason === 'doorheadPhotoPath1') {
        //         this.uploadLists[3].status = 'error'
        //         this.tempData[reason] = entity.doorheadPhotoPath1
        //       } else if (reason === 'doorheadPhotoPath2') {
        //         this.uploadLists[4].status = 'error'
        //         this.tempData[reason] = entity.doorheadPhotoPath2
        //       }
        //     })
        //   }
        // })
      }
    }
  },
  created () {
    let params = this.params()
    this.way = params.way
    // this.isParams = params.isParams
    // if (this.isParams) {
    //   let businessActivityInfo = this.transfToJson(this.getLocalStorage(STATUS.BUSINESSACTIVITYINFO))
    //   this.uploadLists[0].background = businessActivityInfo.indoorImagePath
    //   this.uploadLists[0].file = businessActivityInfo.indoorImagePath
    //   this.uploadLists[1].background = businessActivityInfo.outdoorImagePath
    //   this.uploadLists[1].file = businessActivityInfo.outdoorImagePath
    // }
    this.setWebSiteTitle(params.title || '经营场所照片上传')
    this.verifyReason = this.params('verifyReason')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.memberInfo = this.transfToJson(this.getLocalStorage(STATUS.MEMBERINFO)) || {}
    let memberType = this.memberInfo.memberType
    // this.uploadButtons[0].text = memberType === 'INDIVIDUAL' ? '提交审核' : '完成'
    this.uploadButtons[0].text = memberType === 'PERSON' ? '提交审核' : '完成'
    let businessActivityInfo = this.transfToJson(this.getLocalStorage(STATUS.BUSINESSACTIVITYINFO + this.userNo))
    if (businessActivityInfo) {
      utils.forEach(this.uploadLists, item => {
        item.background = businessActivityInfo[item.key]
        item.file = businessActivityInfo[item.key]
      })
    }
  }
}
