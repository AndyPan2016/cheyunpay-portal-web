/**
 * 我的摆牌二维码详情
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月28日13:09:35
 */

import QRCode from 'qrcodejs2'
let Popup = Components.use(Components.popup)
let CardBlock = PagesCommons.use(PagesCommons.cardBlock)
let { MemberService } = Services.require()
let { STATUS } = Configs.require()

export default {
  data () {
    return {
      qrcodeRemark: '重庆同花顺理发店解放碑店重庆同花顺理发店',
      qrcode: null,
      bindTime: null,
      barcodeNo: null,
      downloadImage: null
    }
  },
  components: {
    'card-block': CardBlock,
    'base-popup': Popup,
    'tip-popup': Popup
  },
  methods: {
    createQRCode () {
      let that = this
      // let target = this.$refs['j-download-qrcode']
      setTimeout(() => {
        /* eslint-disable no-new */
        let qrcode = new QRCode(that.$refs['j-qrcode-thumb'], {
          width: 400,
          height: 400,
          typeNumber: -1,
          text: that.qrcode || that.barcodeNo
        })
        setTimeout(() => {
          this.downloadImage = qrcode._oDrawing._el.childNodes[1].getAttribute('src')
          // target.setAttribute('href', qrcodeUrl)
        }, 100)
      }, 0)
    },
    editRemark () {
      let refs = this.$refs
      refs['base-popup'].prompt('二维码备注', '请输入备注信息，最多20字', (e, btnData, data) => {
        if (!data) {
          refs['tip-popup'].tip('请输入备注信息，最多20字')
          return false
        }
        this.qrcodeRemark = data
      })
    },
    getDetail () {
      MemberService.queryDimensionBarcode({
        barcodeNo: this.barcodeNo,
        userNo: this.barcodeNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity || {}
          let barcodeInfo = entity.barcodeInfo || {}
          this.qrcodeRemark = barcodeInfo.barcodeName
          this.qrcode = barcodeInfo.urlPath
          this.bindTime = barcodeInfo.bindTime
          this.createQRCode()
        }
      })
    },
    downloadQRCode () {
      if (this.downloadImage) {
        this.downloadFile((new Date()).getTime(), this.downloadImage)
      }
    }
  },
  created () {
    this.setWebSiteTitle('摆牌二维码')
  },
  mounted () {
    this.barcodeNo = this.params('barcodeNo')
    this.userNo = this.getCookie(STATUS.USERNO)
    // this.createQRCode()
    this.getDetail()
  }
}
