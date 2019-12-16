/**
 * 账单详情
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月22日13:54:29
 */

let Forms = Components.use(Components.forms)
let { BillService } = Services.require()
let { LANG } = Configs.require()

export default {
  data () {
    return {
      merchOrderNo: null,
      type: null,
      changeDirectionStatus: null,
      changeDirectionType: null,
      changeDirectionSymbol: null,
      details: {}
    }
  },
  components: {
    'bill-form': Forms
  },
  methods: {
    getDetail () {
      let type = this.type
      BillService['query' + this.firstUpperCase(type)]({
        merchOrderNo: this.merchOrderNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          // let changeDirection = LANG.changeDirection[params.type === 'fund' ? 'OUT' : 'IN']
          let flow = entity.flow
          let changeDirection = LANG.changeDirection[flow === '-' ? 'OUT' : (flow === '+' ? 'IN' : 'KEEP')]
          this.changeDirectionStatus = changeDirection.status
          this.changeDirectionType = changeDirection.text
          this.changeDirectionSymbol = changeDirection.symbol

          this.details = entity
          this.details.amount = (this.transferMoney(entity.amount))
          // 交易状态
          this.details.transStatus = (LANG[this.type + 'Status'][entity[this.type === 'fund' ? 'fundStatus' : 'tradeStatus']] || {}).text
          // 交易方式
          // this.details.transType = (LANG[this.type + 'Type'][entity['tradeType']] || {}).text
          this.details.profitAmount = this.transferMoney(entity.profitAmount)
          this.details.shareProfitAmount = this.transferMoney(entity.shareProfitAmount)
          this.details.chargeAmount = this.transferMoney(entity.chargeAmount)
          this.details.actualAmount = this.transferMoney(entity.actualAmount)
        }
      })
    }
  },
  created () {
    this.setWebSiteTitle('账单详情')
    let params = this.params()
    this.merchOrderNo = params.id
    this.type = params.type
    this.getDetail()
  }
}
