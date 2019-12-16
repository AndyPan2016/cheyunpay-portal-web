/**
 * 我的摆牌二维码
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月27日11:33:53
 */

let DataSet = Components.use(Components.dataset)
let WallHead = PagesCommons.use(PagesCommons.wallHead)
let { MemberService } = Services.require()
let { utils } = Utils.require()
let { STATUS } = Configs.require()
let Popup = Components.use(Components.popup)

export default {
  data () {
    return {
      // 钱包头部数据
      walletHeadData: null,
      timeship: (new Date().getTime()),
      qrDataSet: [
        // {
        //   // qrcode: require('./images/qr-code.png'),
        //   qrcode: 'http://192.168.66.50:8081/#/',
        //   name: '四海一家自助餐',
        //   id: '5647 7482 5497 1234'
        // },
        // {
        //   qrcode: 'http://192.168.66.50:8081/#/',
        //   name: '四海一家自助餐',
        //   id: '5647 7482 5497 1234'
        // },
        // {
        //   qrcode: 'http://192.168.66.50:8081/#/',
        //   name: '四海一家自助餐',
        //   id: '5647 7482 5497 1234'
        // },
        // {
        //   qrcode: 'http://192.168.66.50:8081/#/',
        //   name: '四海一家自助餐',
        //   id: '5647 7482 5497 1234'
        // },
        // {
        //   qrcode: 'http://192.168.66.50:8081/#/',
        //   name: '四海一家自助餐',
        //   id: '5647 7482 5497 1234'
        // }
      ],
      userNo: null
    }
  },
  components: {
    'data-set': DataSet,
    'wall-head': WallHead,
    'tip-popup': Popup
  },
  methods: {
    renderDataset () {
      this.$store.dispatch('qrcodeListStoreUpdate', {
        qrcodeList: this.qrDataSet,
        clickQRCodeStore: (item) => {
          this.routeTo(PagesLayQRCode.router(PagesLayQRCode.qrcodeDetail), {
            query: {
              barcodeNo: item.id
            }
          })
        }
      })
    },
    scrollBottomEvent (e, res) {
      // this.qrDataSet.push({
      //   qrcode: 'http://www.baidu.com/',
      //   name: '四海一家自助餐2',
      //   id: '5647 7482 5497 12342'
      // })
      // let qrcodeListStoreCallBack = this.$store.state.QRCodeListStore.qrcodeListStoreCallBack
      // if (qrcodeListStoreCallBack) {
      //   qrcodeListStoreCallBack(this.qrDataSet)
      // }
    },
    loadData () {
      MemberService.queryDimensionBarcodeList({userNo: this.userNo}).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity || {}
          let barcodeInfos = entity.barcodeInfos
          if (barcodeInfos && barcodeInfos.length) {
            let qrDataSet = []
            utils.forEach(barcodeInfos, (item, idx) => {
              qrDataSet.push({
                qrcode: item.urlPath,
                name: item.barcodeName,
                id: item.barcodeNo
              })
            })

            this.qrDataSet = qrDataSet
            let qrcodeListStoreCallBack = this.$store.state.QRCodeListStore.qrcodeListStoreCallBack
            if (qrcodeListStoreCallBack) {
              qrcodeListStoreCallBack(this.qrDataSet)
            }
            this.renderDataset()
          }
        } else {
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    }
  },
  created () {
    this.setWebSiteTitle('摆牌二维码')
    this.renderDataset()
    this.userNo = this.getCookie(STATUS.USERNO)
    this.loadData()
  }
}
