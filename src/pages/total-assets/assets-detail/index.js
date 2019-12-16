/**
 * 账单详情
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月22日13:54:29
 */

let Forms = Components.use(Components.forms)

export default {
  data () {
    return {
      payType: null,
      money: null,
      status: null,
      updateTime: null,
      balance: null,
      type: null,
      merchOrderNo: null,
      ordereNo: null
    }
  },
  components: {
    'bill-form': Forms
  },
  methods: {
  },
  created () {
    this.setWebSiteTitle('收支明细')
    let params = this.params()
    this.payType = params.title
    this.money = params.titleRemark
    this.status = params.status
    this.updateTime = params.updateTime
    this.balance = params.balance
    this.type = params.type
    this.merchOrderNo = params.merchOrderNo
    this.ordereNo = params.ordereNo
  }
}
