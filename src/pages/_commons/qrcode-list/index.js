/**
 * 二维码列表
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月27日13:50:10
 */

import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      datasetStore: null,
      clickQRCodeStore: this.$store.state.QRCodeListStore.clickQRCodeStore
    }
  },
  props: {
    // 数据集合
    dataset: { type: Array },
    // 点击事件
    onClick: { type: Function }
  },
  methods: {
    createQRCode () {
      let that = this
      setTimeout(() => {
        let data = that.datasetStore
        let dataItem
        let target
        let ref
        for (let key in data) {
          dataItem = data[key]
          ref = that.$refs['qrcode-thumb-' + key]
          if (ref) {
            target = ref[0]
            if (target) {
              if (!target.getAttribute('data-qrcode')) {
                /* eslint-disable no-new */
                let res = new QRCode(target, {
                  width: 95,
                  height: 95,
                  text: dataItem.qrcode
                })
                if (res._oQRCode) {
                  target.setAttribute('data-qrcode', true)
                }
              }
            }
          }
        }
      }, 100)
    },
    clickEvent (item) {
      if (this.onClick) this.onClick(item)
      if (this.clickQRCodeStore) this.clickQRCodeStore(item)
    }
  },
  created () {},
  mounted () {
    this.datasetStore = this.dataset || this.$store.state.QRCodeListStore.qrcodeList
    let that = this
    that.createQRCode()
    that.$store.state.QRCodeListStore.qrcodeListStoreCallBack = function (dataset) {
      that.datasetStore = dataset || that.$store.state.QRCodeListStore.qrcodeList
      that.createQRCode()
    }
  }
}
