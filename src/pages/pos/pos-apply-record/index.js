/**
 * POS申请记录
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日11:32:43
 */

let DataSet = Components.use(Components.dataset)
let Popup = Components.use(Components.popup)
let { PosService, CashierService } = Services.require()
let { STATUS, LANG } = Configs.require()
let { utils } = Utils.require()

export default {
  data () {
    return {
      dataset: [
        // {
        //   id: 'O001190307093351057016951',
        //   mask: true,
        //   head: { text: '订单号：O00119030709335105701695', fontSize: 'font-24', icon: 'icon-pos-record' },
        //   body: {
        //     type: 'list',
        //     groups: [
        //       { label: '押金金额', text: '￥5,000.00' },
        //       { label: '机具数量', text: '1台' },
        //       { label: '申请时间', text: '2019-10-31 23:00:45' }
        //     ]
        //   },
        //   status: {
        //     state: 'status-success',
        //     fontSize: 'font-24',
        //     groups: [
        //       { label: '交易成功' }
        //     ]
        //   }
        // },
        // {
        //   id: 'O001190307093351057016952',
        //   mask: true,
        //   head: { text: '订单号：O00119030709335105701695', fontSize: 'font-24', icon: 'icon-pos-record' },
        //   body: {
        //     type: 'list',
        //     groups: [
        //       { label: '押金金额', text: '￥5,000.00' },
        //       { label: '机具数量', text: '1台' },
        //       { label: '申请时间', text: '2019-10-31 23:00:45' }
        //     ]
        //   },
        //   status: {
        //     state: 'status-primary',
        //     fontSize: 'font-24',
        //     groups: [
        //       { label: '押金已缴纳' }
        //     ]
        //   }
        // },
        // {
        //   id: 'O001190307093351057016953',
        //   mask: true,
        //   head: { text: '订单号：O00119030709335105701695', fontSize: 'font-24', icon: 'icon-pos-record' },
        //   body: {
        //     type: 'list',
        //     groups: [
        //       { label: '押金金额', text: '￥5,000.00' },
        //       { label: '机具数量', text: '1台' },
        //       { label: '申请时间', text: '2019-10-31 23:00:45' }
        //     ]
        //   },
        //   status: {
        //     state: 'status-error',
        //     fontSize: 'font-24',
        //     groups: [
        //       { label: '押金未缴纳' }
        //     ]
        //   }
        // }
      ],
      userNo: null,
      pageIndex: 1,
      pageSize: 10,
      total: 1,
      totalPage: 10
    }
  },
  components: {
    'data-set': DataSet,
    'tip-popup': Popup
  },
  methods: {
    loadData () {
      if (this.pageIndex <= this.totalPage) {
        PosService.queryPosApplyPayOrder({
          userId: this.userNo,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          let data = res.data
          if (data.success) {
            let rows = data.rows
            this.totalPage = Math.ceil(data.total / this.pageSize)
            utils.forEach(rows, row => {
              let posApplyStatus = LANG.posApplyStatus[row.status] || {}
              this.dataset.push({
                id: row.merchOrderNo,
                rowStatus: row.status,
                mask: true,
                head: { text: '订单号：' + row.merchOrderNo, fontSize: 'font-24', icon: 'icon-pos-record' },
                body: {
                  type: 'list',
                  groups: [
                    { label: '押金金额', text: '￥' + this.transferMoney(row.amount) },
                    { label: '机具数量', text: row.payCount + '台' },
                    { label: '申请时间', text: row.createTime }
                  ]
                },
                status: {
                  state: posApplyStatus.status,
                  fontSize: 'font-24',
                  groups: [
                    { label: posApplyStatus.text }
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
      }
    },
    /**
     * 渲染数据集
     */
    renderDataset () {
      this.$store.dispatch('posListStoreUpdate', {
        posList: this.dataset
      })
    },
    /**
     * 滚动到底部加载更多
     * @param {*} e
     * @param {*} res
     */
    scrollBottomEvent (e, res) {
      this.loadData()
    },
    clickEvent (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'j-item-mask')) {
        let dataId = target.getAttribute('data-id')
        let dataIdx = target.getAttribute('data-idx')
        let datasetItem = (this.dataset || [])[dataIdx] || {}
        let rowStatus = datasetItem.rowStatus
        if (rowStatus !== 'PROCESSING' && rowStatus !== 'SUCCESS') {
          this.$refs['tip-popup'].loading('正在跳转...')
          CashierService.tradePayRedirect({
            merchOrderNo: dataId,
            userId: this.userNo
          }).then(res => {
            let data = res.data
            if (data.success) {
              let entity = data.entity || {}
              let redirectUrl = entity.redirectUrl
              if (redirectUrl) {
                this.delEntrtyInsidePage()
                this.openHref(redirectUrl)
              }
            } else {
              this.$refs['tip-popup'].tip(data.message)
            }
          }).catch(err => {
            this.$refs['tip-popup'].tip(err.message)
          })
        } else {
          this.routeTo(PagesPos.router(PagesPos.posRecordDetail), {
            query: {
              id: dataId
            }
          })
        }
      }
    }
  },
  created () {
    this.setWebSiteTitle('POS申请记录')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.renderDataset()
    this.loadData()
  }
}
