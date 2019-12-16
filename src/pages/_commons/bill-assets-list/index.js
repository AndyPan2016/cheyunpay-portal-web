/**
 * 账单资产列表
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日16:22:11
 */

export default {
  data () {
    return {
      datasetStore: this.$store.state.BillAssetsListStore.billAssetsList
    }
  },
  props: {
    // 数据集合
    dataset: { type: Array }
  },
  components: {},
  methods: {},
  watch: {},
  created () {
    this.datasetStore = this.dataset || this.$store.state.BillAssetsListStore.billAssetsList
    let that = this
    that.$store.state.BillAssetsListStore.billAssetsListStoreCallBack = function (dataset) {
      that.datasetStore = dataset || that.$store.state.BillAssetsListStore.billAssetsList
    }
  }
}
