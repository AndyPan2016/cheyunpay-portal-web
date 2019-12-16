/**
 * POS押金缴纳
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月25日16:04:16
 */

let PosListItemBlock = PagesCommons.use(PagesCommons.posListItem)
let Popup = Components.use(Components.popup)
let { PosService, CashierService } = Services.require()
let { STATUS } = Configs.require()

export default {
  data () {
    return {
      posList: [
        {
          head: { text: 'POS机押金在线缴纳', icon: 'icon-deposit-right' },
          body: {
            type: 'input-txt',
            groups: [
              { label: '共计', text: null, modelType: 'number', modelPlaceHolder: '请输入缴纳押金POS机数量', remark: '台' }
            ]
          },
          status: {
            state: 'status-primary',
            fontSize: 'font-24',
            groups: [
              { label: '需要缴纳押金金额', value: null }
            ]
          }
        }
      ],
      userNo: null,
      memberInfo: null,
      merchantOrderNo: null,
      payCount: null,
      amount: null,
      partnerName: null,
      buyerUserId: null,
      memo: null
    }
  },
  components: {
    'pos-list-item': PosListItemBlock,
    'tip-popup': Popup
  },
  methods: {
    submitPay () {
      // let applyPosNumber = this.posList[0].body.groups[0].text
      // this.$refs['tip-popup'].tip('去收银台支付')
      PosService.createPosApplyPayOrder({
        amount: this.amount,
        payCount: this.payCount,
        buyerUserId: this.buyerUserId,
        payApplyId: merchantOrderNo,
        partnerName: this.partnerName,
        memo: this.memo
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          CashierService.tradePayRedirect({
            merchOrderNo: entity.merchOrderNo,
            userId: this.userNo
          }).then(res => {
            let data = res.data
            if (data.success) {
              let entity = data.entity || {}
              this.delEntrtyInsidePage()
              this.openHref(entity.redirectUrl)
            } else {
              this.$refs['tip-popup'].tip(data.message)
            }
          }).catch(err => {
            this.$refs['tip-popup'].tip(err.message)
          })
        } else {
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    },
    queryPosApplyPayOrderDetail () {
      PosService.queryPosApplyPayOrderDetail({
        merchantOrderNo: this.merchantOrderNo,
        userId: this.userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          let posApplyPay = entity.posApplyPay || {}
          this.payCount = posApplyPay.payCount
          this.amount = posApplyPay.amount
          this.partnerName = posApplyPay.partnerName
          this.buyerUserId = posApplyPay.buyerUserId
          this.memo = posApplyPay.memo
          // 数量
          this.posList[0].body.groups[0].text = posApplyPay.payCount
          // 交易金额
          this.posList[0].status.groups[0].value = posApplyPay.amount
        } else {
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    }
  },
  created () {
    this.setWebSiteTitle('POS押金缴纳')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.merchantOrderNo = this.params('id')
    this.memberInfo = this.transfToJson(this.getLocalStorage(STATUS.MEMBERINFO))
    this.queryPosApplyPayOrderDetail()
  }
}
