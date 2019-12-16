/**
 * 摆牌二维码物料申请
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月1日21:48:31
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
        // 店铺名称
        shopName: null,
        // 店铺详细地址
        shopAddress: null,
        // 店铺所在省
        shopProvice: null,
        // 店铺所在市
        shopCity: null,
        // 店铺所在区
        shopDistrict: null,
        shopAddressStr: null
      },
      memberInfo: {},
      licenceNo: null,
      certNo: null,
      pickerCityTitle: '请选择地址',
      way: null,
      isParams: false
    }
  },
  components: {
    'my-forms': Forms,
    'picker-popup': Popup
  },
  methods: {
    verifyFailureEvent (verifyValue, result, target) {
      let formItem = target.parentNode.parentNode
      utils.addClass(formItem, 'error')
    },
    formVerifySuccessEvent (myFormData) {
      this.setLocalStorage(STATUS.ACMATERIELAPPLY, JSON.stringify(this.formData))
      let memberType = this.memberInfo.memberType

      if (memberType === 'PERSON') {
        this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acManageUpload), {
          query: {
            way: this.way,
            isParams: this.isParams
          }
        })
      } else if (memberType === 'BUSINESS' || memberType === 'INDIVIDUAL') {
        this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acEnterpriseUpload), {
          query: {
            way: this.way,
            isParams: this.isParams
          }
        })
      }
    },
    /**
     * 城市选择确认事件
     * @param {*} e Event
     * @param {*} data 数据
     * @param {*} pickerDatas 当前选择的数据
     */
    pickerCitySure (e, data, pickerDatas) {
      this.formData.shopAddressStr = pickerDatas.join(' ')
      this.$refs['j-ref-form'].verifyTargetSync(this.$refs['j-choose-address'])
      this.formData.shopProvice = pickerDatas[0]
      this.formData.shopCity = pickerDatas[1]
      this.formData.shopDistrict = pickerDatas[2]
    },
    pickerCityCancel (e) {},
    /**
     * 打开选择城市弹出框
     */
    chooseCity () {
      this.$refs['j-picker-city'].open()
    },
    isGetParams () {
      let params = this.params()
      let isParams = params.params
      this.isParams = isParams
      let paymentType = params.paymentType || params.type
      this.way = params.way
      this.setCookie(STATUS.PAYMENTTYPE, paymentType)
      if (isParams) {
        // 获取信息填充
        let userNo = this.memberInfo.userNo
        MemberService.queryPaymentInfo({
          userNo: userNo,
          // 这是填充聚合数据，所以查询聚合
          paymentType: 'AGGREGATE_PAY'
        }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            // 填充数据
            // let shopAddressStr = entity.shopProvice + ' ' + entity.shopCity + ' ' + shopDistrict
            // this.formData = entity.shopInfo
            // this.formData.shopAddressStr = shopAddressStr
            let shopInfo = entity.shopInfo
            this.formData = {
              // 店铺名称
              shopName: shopInfo.shopName,
              // 店铺详细地址
              shopAddress: shopInfo.shopAddress,
              // 店铺所在省
              shopProvice: shopInfo.shopProvice,
              // 店铺所在市
              shopCity: shopInfo.shopCity,
              // 店铺所在区
              shopDistrict: shopInfo.shopDistrict,
              shopAddressStr: shopInfo.shopProvice + ' ' + shopInfo.shopCity + ' ' + shopInfo.shopDistrict
            }
            // 缓存经营场所照片
            this.setLocalStorage(STATUS.BUSINESSACTIVITYINFO + userNo, JSON.stringify(entity.businessActivityInfo))
            // 缓存受益人股东证件照
            this.setLocalStorage(STATUS.BENEFICIARYCERTINFO + userNo, JSON.stringify(entity.beneficiaryCertInfo))
            // 缓存控股股东证件照
            this.setLocalStorage(STATUS.HOLDCERTINFO + userNo, JSON.stringify(entity.holdCertInfo))
          }
        })
      }
    }
  },
  created () {
    this.setWebSiteTitle('摆牌二维码物料申请')
    this.memberInfo = this.transfToJson(this.getLocalStorage(STATUS.MEMBERINFO)) || {}
    this.licenceNo = this.phoneEncryption(this.memberInfo.licenceNo, { begin: 6, phLength: 8 })
    this.certNo = this.phoneEncryption(this.memberInfo.certNo, { begin: 6, phLength: 8 })
    this.isGetParams()
  }
}
