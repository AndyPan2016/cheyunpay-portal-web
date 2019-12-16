/**
 * pos列表
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日11:38:11
 */

import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      datasetStore: null
    }
  },
  props: {
    // 数据集合
    dataset: { type: Array }
  },
  components: {},
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
                  text: dataItem.body.qrCode
                })
                if (res._oQRCode) {
                  target.setAttribute('data-qrcode', true)
                }
              }
            }
          }
        }
      }, 100)
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.datasetStore = this.dataset || this.$store.state.PosListStore.posList
    if (!this.dataset) {
      let that = this
      that.createQRCode()
      that.$store.state.PosListStore.posStoreCallBack = function (dataset) {
        that.datasetStore = dataset || that.$store.state.PosListStore.posList
        that.createQRCode()
      }
    }
  }
}
