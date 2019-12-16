/**
 * 银行卡列表
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月20日11:07:07
 */

let { utils } = Utils.require()

export default {
  data () {
    return {
      bankList: null
    }
  },
  props: {
    dataset: { type: Array, default: null }
  },
  methods: {
    bankClickEvent (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'bank-unbind')) {
        let dataKey = target.getAttribute('data-key')
        let onUnBind = this.$store.state.BankListStore.onUnBind
        if (onUnBind) {
          onUnBind.call(target, e, this.bankList[dataKey])
        }
      }
    }
  },
  created () {
    this.bankList = this.dataset || this.$store.state.BankListStore.bankList
    let that = this
    that.$store.state.BankListStore.bankListStoreCallBack = function (dataset) {
      that.bankList = dataset || that.$store.state.BankListStore.bankList
    }
  }
}
