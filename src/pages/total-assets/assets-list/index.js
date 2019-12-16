/**
 * 账单列表
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月22日15:00:59
 */

let Select = Components.use(Components.select)
let DataSet = Components.use(Components.dataset)
let Popup = Components.use(Components.popup)
let { TotalAssetsService } = Services.require()
let { STATUS, LANG } = Configs.require()
let { utils } = Utils.require()

export default {
  data () {
    return {
      dateStatus: null,
      assetsListTip: '加载更多',
      dataset: [
        // {
        //   groups: [
        //     {
        //       mask: true,
        //       title: 'POS聚合收单',
        //       titleRemark: '+100',
        //       status: 'txt-status-default',
        //       updateTime: '2019年10月7日19:33:19',
        //       balance: '111',
        //       type: '入金',
        //       merchOrderNo: '订单号',
        //       ordereNo: '流水号',
        //       list: [
        //         { text: '2019-08-30 23:00:01', value: '余额：54,620.00' }
        //       ]
        //     },
        //     {
        //       mask: true,
        //       title: '手续费',
        //       titleRemark: '-1.00',
        //       status: 'txt-status-error',
        //       updateTime: '2019年10月7日19:33:09',
        //       balance: '222',
        //       type: '出金',
        //       merchOrderNo: '订单号',
        //       ordereNo: '流水号',
        //       list: [
        //         { text: '2019-08-30 23:00:01', value: '余额：54,620.00' }
        //       ]
        //     }
        //   ]
        // }
      ],
      income: null,
      expenditure: null,
      userNo: null,
      pageNo: 1,
      pageSize: 10,
      totalPage: 10,
      startTime: '',
      endTime: '',
      isLoaded: true
    }
  },
  components: {
    'select-search': Select,
    'data-set': DataSet,
    'tip-popup': Popup
  },
  methods: {
    /**
     * 完成日期改变事件
     * @param {Event} e 事件
     * @param {Object} data 当前选择数据对象
     * @param {Date} pickerDate 当前选择的日期
     * @param {String} formatPickerDate 当前选择日期格式化后的字符串
     */
    dateChangeEvent (e, data, pickerDate, formatPickerDate) {
      this.createDateStatus = 'disabled'
      let year = pickerDate.getFullYear()
      let month = pickerDate.getMonth() + 1
      this.startTime = year + '-' + month + '-1 00:00:00'
      this.endTime = year + '-' + month + '-31 23:59:59'
      this.reloadData()
    },
    /**
     * 完成日期清除事件
     */
    dateClearEvent () {
      this.createDateStatus = null
      this.startTime = null
      this.endTime = null
      this.reloadData()
    },
    /**
     * 列表滚动到底部事件
     * @param {Event} e
     * @param {Object} res
     */
    scrollBottomEvent (e, res) {
      if (this.isLoaded) {
        this.pageNo++
        this.loadData()
      }
    },
    reloadData () {
      this.isLoaded = false
      this.dataset = [{ groups: [] }]
      let billAssetsListStoreCallBack = this.$store.state.BillAssetsListStore.billAssetsListStoreCallBack
      if (billAssetsListStoreCallBack) {
        billAssetsListStoreCallBack(this.dataset)
      }
      this.renderDataset()
      setTimeout(() => {
        this.pageNo = 1
        this.totalPage = 10
        this.loadData()
      }, 100)
    },
    renderDataset () {
      this.$store.dispatch('billAssetsListStoreUpdate', {
        billAssetsList: this.dataset
      })
    },
    /**
     * 加载数据
     */
    loadData () {
      if (this.pageNo <= this.totalPage) {
        TotalAssetsService.queryAccountChangeResult({
          userNo: this.userNo,
          pageInfo: {
            countOfCurrentPage: this.pageSize,
            currentPage: this.pageNo
          },
          startTime: this.startTime,
          endTime: this.endTime,
          gid: (new Date()).getTime()
        }).then(res => {
          let data = res.data
          if (data.success) {
            let rows = data.rows
            this.totalPage = Math.ceil(data.total / this.pageSize)
            if (this.pageNo === 1) {
              // this.dataset.push({ groups: [] })
              this.dataset = [{ groups: [] }]
            }
            if (!rows.length) {
              this.dataset = []
            }
            utils.forEach(rows, (row, idx) => {
              let changeDirection = LANG.changeDirection[row.changeDirection]
              let tradeOrderType = LANG.tradeOrderType[row.tradeOrderType] || {}
              this.dataset[0].groups.push({
                // 余额
                balance: this.transferMoney(row.balance),
                updateTime: row.updateTime,
                // 进出账类型
                type: changeDirection.text,
                // 订单号
                merchOrderNo: row.merchOrderNo,
                // 流水号
                ordereNo: row.ordereNo,
                title: tradeOrderType.text || '-',
                titleRemark: (changeDirection.symbol) + this.transferMoney(row.amount),
                // 进、出类型
                status: changeDirection.status,
                list: [
                  { text: row.createTime, value: '余额：' + this.transferMoney(row.balance) }
                ]
              })
            })

            let billAssetsListStoreCallBack = this.$store.state.BillAssetsListStore.billAssetsListStoreCallBack
            if (billAssetsListStoreCallBack) {
              billAssetsListStoreCallBack(this.dataset)
            }
            this.renderDataset()
            this.isLoaded = true
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
        TotalAssetsService.queryAccountChangeStatistic({
          userNo: this.userNo,
          startTime: this.startTime,
          endTime: this.endTime
        }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            this.income = this.transferMoney(entity.incomeAmount)
            this.expenditure = this.transferMoney(entity.expenseAmount)
          }
        })
      }
    },
    initLoadData () {
      // let nowDate = new Date()
      // let year = nowDate.getFullYear()
      // let month = nowDate.getMonth() + 1
      // this.startTime = year + '-' + month + '-1 00:00:00'
      // this.endTime = year + '-' + month + '-31 23:59:59'
      // this.dataset = []
      this.startTime = null
      this.endTime = null
      this.totalPage = 10
      this.pageNo = 1
      this.loadData()
    },
    clickEvent (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'j-item-mask')) {
        let idx = target.getAttribute('data-idx')
        let dataItem = this.dataset[0].groups[idx]
        this.routeTo(PagesTotalAssets.router(PagesTotalAssets.assetsDetail), {
          query: dataItem
        })
      }
    }
  },
  created () {
    this.setWebSiteTitle('收支明细')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.renderDataset()
    this.initLoadData()
  }
}
