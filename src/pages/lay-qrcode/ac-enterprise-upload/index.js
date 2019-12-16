/**
 * 摆牌二维码物料申请-企业-上传照片
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月1日22:08:55
 */

let Forms = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let { utils } = Utils.require()
let { STATUS } = Configs.require()
let { MemberService } = Services.require()

export default {
  data () {
    return {
      formData: {
        manageUpload: null,
        controllerUpload: null,
        ownerUpload: null
      },
      way: null,
      userNo: null
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
      MemberService.applyChannelPayment({
        userNo: this.userNo,
        businessActivityInfo: this.businessActivityInfo,
        holdCertInfo: this.holdCertInfo,
        beneficiaryCertInfo: this.beneficiaryCertInfo,
        shopInfo: this.acMaterielApply,
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
    },
    manageUploadEvent () {
      this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acManageUpload), {
        query: {
          way: this.way
        }
      })
    },
    controllerUploadEvent () {
      this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acControllerUpload), {
        query: {
          way: this.way
        }
      })
    },
    ownerUpload () {
      this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acOwnerUpload), {
        query: {
          way: this.way
        }
      })
    }
  },
  created () {
    let params = this.params()
    this.way = params.way
    this.userNo = this.getCookie(STATUS.USERNO)
    this.setWebSiteTitle('摆牌二维码物料申请-企业-上传照片')
    this.acMaterielApply = this.transfToJson(this.getLocalStorage(STATUS.ACMATERIELAPPLY)) || {}
    let businessActivityInfo = this.getLocalStorage(STATUS.BUSINESSACTIVITYINFO + this.userNo)
    if (businessActivityInfo) {
      this.businessActivityInfo = this.transfToJson(businessActivityInfo) || {}
      this.formData.manageUpload = this.businessActivityInfo && this.businessActivityInfo !== {} ? '已上传' : null
    }
    let holdCertInfo = this.getLocalStorage(STATUS.HOLDCERTINFO + this.userNo)
    if (holdCertInfo) {
      this.holdCertInfo = this.transfToJson(holdCertInfo) || {}
      this.formData.controllerUpload = this.holdCertInfo && this.holdCertInfo !== {} ? '已上传' : null
    }
    let beneficiaryCertInfo = this.getLocalStorage(STATUS.BENEFICIARYCERTINFO + this.userNo)
    if (beneficiaryCertInfo) {
      this.beneficiaryCertInfo = this.transfToJson(beneficiaryCertInfo) || {}
      this.formData.ownerUpload = this.beneficiaryCertInfo && this.beneficiaryCertInfo !== {} ? '已上传' : null
    }
  }
}
