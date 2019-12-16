/**
 * 上传证件
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月25日15:48:55
 */

let UploadCertificates = PagesCommons.use(PagesCommons.uploadCertificates)
let Popup = Components.use(Components.popup)
let { STATUS, APIHOST } = Configs.require()
let { utils } = Utils.require()
let { PosService, MemberService } = Services.require()

export default {
  data () {
    return {
      uploadLists: [
        { text: '营业执照复印件（加盖鲜章)', key: 'businessLicense', background: require('../../../assets/images/background/bg-business-license.png') },
        { text: '身份证正面', key: 'legalPersonCertFrontPath', background: require('../../../assets/images/background/bg-idcard-upload-a.png') },
        { text: '身份证反面', key: 'legalPersonCertBackPath', background: require('../../../assets/images/background/bg-idcard-upload-b.png') },
        { text: '营业地点门头照', key: 'doorheadPhotoPath1', background: require('../../../assets/images/background/bg-facade.png') },
        { text: '营业地点门头照', key: 'doorheadPhotoPath2', background: require('../../../assets/images/background/bg-facade.png') }
        // { text: '营业许可证', background: require('../../../assets/images/background/bg-licence.png') }
      ],
      uploadButtons: [
        { text: '提交申请', class: null, fn: this.registSubmit }
      ],
      recordNo: null,
      userNo: null,
      verifyReason: null,
      tempData: null,
      fillPayment: false
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
    registSubmit () {
      let uploadLists = this.uploadLists
      let verifyStatus = true
      if (this.tempData) {
        utils.forEach(uploadLists, item => {
          let tempItem = this.tempData[item.key]
          if (tempItem && item.file === tempItem) {
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
      let params = this.transfToJson(this.getLocalStorage(STATUS.POSONLINEAPPLY)) || {}
      if (this.verifyReason && this.recordNo) {
        params.recordNo = this.recordNo
      }
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
        params.userId = this.userNo
        this.$refs['tip-popup'].loading('请稍等，正在提交数据...')
        PosService.posApply(params).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].close()
            let that = this
            that.$store.dispatch('processStatusStoreUpdate', {
              // 标题
              title: '在线申请POS机',
              // 状态
              status: 'wait',
              // 结果
              result: '申请提交成功',
              // 备注
              remark: '申请已提交成功，请耐心等待工作人员审核结束',
              // 按钮
              buttons: [
                {
                  text: '完成',
                  class: null,
                  fn: () => {
                    // 完成，回到首页
                    this.routeTo(PagesPos.router(PagesPos.index))
                  }
                }
              ]
            })
            // this.setLocalStorage(STATUS.POSONLINEAPPLY, undefined)
            // 去公共流程状态页
            that.routeTo(PagesCommons.router(PagesCommons.processStatus))
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      }
    },
    /**
     * 检查是否有未审核通过原因
     */
    checkReason () {
      let verifyReason = this.verifyReason
      if (verifyReason) {
        PosService.queryPosApply({ userId: this.userNo }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            let baseUrl = (APIHOST ? APIHOST.substr(0, APIHOST.length - 1) : '')
            this.uploadLists[0].file = baseUrl + entity.businessLicense
            this.uploadLists[0].background = baseUrl + entity.businessLicense
            this.uploadLists[1].file = baseUrl + entity.legalPersonCertFrontPath
            this.uploadLists[1].background = baseUrl + entity.legalPersonCertFrontPath
            this.uploadLists[2].file = baseUrl + entity.legalPersonCertBackPath
            this.uploadLists[2].background = baseUrl + entity.legalPersonCertBackPath
            this.uploadLists[3].file = baseUrl + entity.doorheadPhotoPath1
            this.uploadLists[3].background = baseUrl + entity.doorheadPhotoPath1
            this.uploadLists[4].file = baseUrl + entity.doorheadPhotoPath2
            this.uploadLists[4].background = baseUrl + entity.doorheadPhotoPath2
            let verifyReasonAry = verifyReason.split(',')
            this.tempData = {}
            let flag = 0
            utils.forEach(verifyReasonAry, reason => {
              if (reason === 'businessLicense') {
                this.uploadLists[0].status = 'error'
                this.tempData[reason] = baseUrl + entity.businessLicense
                flat++
              } else if (reason === 'legalPersonCertFrontPath') {
                this.uploadLists[1].status = 'error'
                this.tempData[reason] = baseUrl + entity.legalPersonCertFrontPath
                flat++
              } else if (reason === 'legalPersonCertBackPath') {
                this.uploadLists[2].status = 'error'
                this.tempData[reason] = baseUrl + entity.legalPersonCertBackPath
                flat++
              } else if (reason === 'doorheadPhotoPath1') {
                this.uploadLists[3].status = 'error'
                this.tempData[reason] = baseUrl + entity.doorheadPhotoPath1
                flat++
              } else if (reason === 'doorheadPhotoPath2') {
                this.uploadLists[4].status = 'error'
                this.tempData[reason] = baseUrl + entity.doorheadPhotoPath2
                flat++
              }
            })
            if (flag) {
              this.recordNo = entity.recordNo
            }
          }
        })
      }
    },
    /**
     * 填充聚合申请的数据(如果聚合申请已经通过)
     */
    fillPaymentInfo () {
      MemberService.queryPaymentInfo({
        userNo: this.userNo,
        paymentType: 'AGGREGATE_PAY'
      }).then(res => {
        let data = res.data
        if (data.success) {
          // let entity = data.entity
        }
      })
    }
  },
  created () {
    this.setWebSiteTitle('上传证件照')
    this.userNo = this.getCookie(STATUS.USERNO)
    let params = this.params()
    // this.fillPayment = params.fillPayment === true || params.fillPayment === 'true'
    this.verifyReason = params.verifyReason
    this.checkReason()
    // if (this.fillPayment) {
    //   this.fillPaymentInfo()
    // } else {
    //   this.checkReason()
    // }
  }
}
