/**
 * POS退款申请
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月29日17:31:39
 */

let DataSet = Components.use(Components.dataset)
let Popup = Components.use(Components.popup)
let { PosService } = Services.require()
let { STATUS, LANG } = Configs.require()
let { utils } = Utils.require()

export default {
  data () {
    return {
      dataset: [
        // {
        //   head: { text: 'POS机编号：105701695', fontSize: 'font-24', status: { text: '处理中', key: 'processing' } },
        //   body: {
        //     type: 'list',
        //     groups: [
        //       { label: '押金金额', text: '￥5,000.00' },
        //       { label: '会员名称', text: '张三' },
        //       { label: 'POS机状态', text: '正常' }
        //     ]
        //   }
        // },
        // {
        //   head: { text: 'POS机编号：105701695', fontSize: 'font-24', status: { text: '退款', key: 'refund' } },
        //   body: {
        //     type: 'list',
        //     groups: [
        //       { label: '押金金额', text: '￥5,000.00' },
        //       { label: '会员名称', text: '张三' },
        //       { label: 'POS机状态', text: '正常' }
        //     ]
        //   }
        // },
        // {
        //   head: { text: 'POS机编号：105701695', fontSize: 'font-24', status: { text: '处理中', key: 'processing' } },
        //   body: {
        //     type: 'list',
        //     groups: [
        //       { label: '押金金额', text: '￥5,000.00' },
        //       { label: '会员名称', text: '张三' },
        //       { label: 'POS机状态', text: '正常' }
        //     ]
        //   }
        // },
        // {
        //   head: { text: 'POS机编号：105701695', fontSize: 'font-24', status: { text: '处理中', key: 'processing' } },
        //   body: {
        //     type: 'list',
        //     groups: [
        //       { label: '押金金额', text: '￥5,000.00' },
        //       { label: '会员名称', text: '张三' },
        //       { label: 'POS机状态', text: '正常' }
        //     ]
        //   }
        // }
      ],
      userNo: null,
      totalAmount: null
    }
  },
  components: {
    'data-set': DataSet,
    'tip-popup': Popup
  },
  methods: {
    loadData () {
      PosService.queryPosRefund({
        userId: this.userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          let list = entity.list || []
          this.totalAmount = 0
          utils.forEach(list, item => {
            this.totalAmount += item.cashPledgeAmount
            let posStatus = LANG.posStatus[item.clientStatus]
            let posDepositStatus = LANG.posDepositStatus[item.cashPledgeStatus]
            let statusText
            let statusKey
            if (item.cashPledgeStatus === 'RETURN') {
              // 已退还
              statusText = posDepositStatus.text
              statusKey = ''
            } else if (item.cashPledgeStatus === 'CANCEL') {
              // 无押金
              statusText = posDepositStatus.text
              statusKey = ''
            }
            this.dataset.push({
              head: {
                text: 'POS机编号：' + item.posClientNo,
                fontSize: 'font-24',
                status: {
                  text: statusText,
                  key: statusKey,
                  id: item.posClientNo + ',' + item.cashPledgeAmount
                }
              },
              body: {
                type: 'list',
                groups: [
                  { label: '押金金额', text: '￥' + item.cashPledgeAmount },
                  { label: '会员名称', text: item.userName },
                  { label: 'POS机状态', text: posStatus.text }
                ]
              }
            })
          })
          let posStoreCallBack = this.$store.state.PosListStore.posStoreCallBack
          if (posStoreCallBack) {
            posStoreCallBack(this.dataset)
          }
        } else {
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    },
    renderDataset () {
      this.$store.dispatch('posListStoreUpdate', {
        posList: this.dataset
      })
    },
    scrollBottomEvent (e, res) {
      // this.dataset.push({
      //   head: { text: 'POS机编号：105701695', fontSize: 'font-24', status: { text: '处理中', key: 'processing' } },
      //   body: {
      //     type: 'list',
      //     groups: [
      //       { label: '押金金额', text: '￥5,000.00' },
      //       { label: '会员名称', text: '张三' },
      //       { label: 'POS机状态', text: '正常' }
      //     ]
      //   }
      // })
      // let posStoreCallBack = this.$store.state.PosListStore.posStoreCallBack
      // if (posStoreCallBack) {
      //   posStoreCallBack(this.dataset)
      // }
    },
    clickEvent (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'j-head-status') && utils.hasClass(target, 'refund')) {
        let dataParams = (target.getAttribute('data-id') || '').split(',')
        this.routeTo(PagesPos.router(PagesPos.posRefund), {
          query: {
            id: dataParams[0],
            amount: dataParams[1]
          }
        })
      }
    }
  },
  created () {
    this.setWebSiteTitle('POS退款申请')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.renderDataset()
    this.loadData()
  }
}
