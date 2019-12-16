/**
 * 在线申请POS机
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月25日15:26:21
 */

let Forms = Components.use(Components.forms)
let { utils } = Utils.require()
let Popup = Components.use(Components.popup)
let { STATUS } = Configs.require()
let { PosService, MemberService } = Services.require()

export default {
  data () {
    return {
      formData: {
        shopName: null,
        businessAddress: null,
        linkMan: null,
        linkPhone: null
      },
      verifyReason: null,
      userNo: null,
      memberInfo: null,
      tempData: null,
      // 是否填充聚合申请的数据(如果聚合申请已经通过)
      fillPayment: false
    }
  },
  components: {
    'my-forms': Forms,
    'tip-popup': Popup
  },
  methods: {
    verifyFailureEvent (verifyValue, result, target) {
      let formItem = target.parentNode.parentNode
      utils.addClass(formItem, 'error')
    },
    formVerifySuccessEvent (myFormData) {
      let verifyReason = this.verifyReason
      if (verifyReason) {
        let tempData = this.tempData
        let verifyReasonStatus = true
        utils.forEach(tempData, (item, key) => {
          if (myFormData[key] && item === myFormData[key]) {
            verifyReasonStatus = false
            utils.addClass(this.$refs['j-' + key], 'error')
          }
        })
        if (!verifyReasonStatus) {
          this.$refs['tip-popup'].tip('请修改审核未通过的数据再提交')
          return
        }
      }
      if (this.formData.recordNo) {
        myFormData.recordNo = this.formData.recordNo
      }
      this.setLocalStorage(STATUS.POSONLINEAPPLY, JSON.stringify(myFormData))
      // 下一步，上传证件照
      this.routeTo(PagesPos.router(PagesPos.uploadCertificates), {
        query: {
          verifyReason: this.verifyReason,
          fillPayment: this.fillPayment
        }
      })
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
            this.formData.shopName = entity.shopName
            this.formData.businessAddress = entity.businessAddress
            this.formData.linkMan = entity.linkMan
            this.formData.linkPhone = entity.linkPhone
            let verifyReasonAry = verifyReason.split(',')
            this.tempData = {}
            let flag = 0
            utils.forEach(verifyReasonAry, (reason, idx) => {
              if (idx < verifyReasonAry.length - 1) {
                if (this.formData[reason]) {
                  utils.addClass(this.$refs['j-' + reason], 'error')
                  this.tempData[reason] = this.formData[reason]
                  flag++
                }
              }
            })
            if (flag || this.verifyReason === 'test') {
              this.formData.recordNo = entity.recordNo
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
        userNo: this.memberInfo.userNo,
        paymentType: 'AGGREGATE_PAY'
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          let shopInfo = entity.shopInfo
          this.formData.shopName = shopInfo.shopName
          this.formData.businessAddress = shopInfo.shopAddress
          this.formData.linkMan = entity.realName
          this.formData.linkPhone = entity.linkPhone
          // // 缓存经营场所照片
          // this.setLocalStorage(STATUS.BUSINESSACTIVITYINFO, JSON.stringify(entity.businessActivityInfo))
          // // 缓存受益人股东证件照
          // this.setLocalStorage(STATUS.BENEFICIARYCERTINFO, JSON.stringify(entity.beneficiaryCertInfo))
          // // 缓存控股股东证件照
          // this.setLocalStorage(STATUS.HOLDCERTINFO, JSON.stringify(entity.holdCertInfo))
        }
      })
    }
  },
  created () {
    this.setWebSiteTitle('在线申请POS机')
    let params = this.params()
    this.verifyReason = params.verifyReason
    // this.fillPayment = params.fillPayment === true || params.fillPayment === 'true'
    this.userNo = this.getCookie(STATUS.USERNO)
    this.memberInfo = this.transfToJson(this.getLocalStorage(STATUS.MEMBERINFO))
    this.checkReason()
    // if (this.fillPayment) {
    //   this.fillPaymentInfo()
    // } else {
    //   this.checkReason()
    // }
  }
}
