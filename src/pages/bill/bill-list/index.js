/**
 * 账单列表
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月22日15:00:59
 */

let Select = Components.use(Components.select)
let DataSet = Components.use(Components.dataset)
let Popup = Components.use(Components.popup)
let { BillService } = Services.require()
let { LANG } = Configs.require()
let { utils } = Utils.require()

export default {
  data () {
    return {
      // 选项卡
      tabGroups: [
        { text: '资金类', type: 'fund', active: true },
        { text: '交易类', type: 'trade' }
      ],
      // 状态选项
      statusOptions: this.mergeJSON({
        text: { key: 0, value: 0, text: '请选择状态', type: 'remark' },
        all: { key: 'ALL', value: 'ALL', text: '全部' }
      }, LANG.fundStatus),
      tradeStatusType: 'default',
      createDateStatus: null,
      complateDateStatus: null,
      billListTip: '加载更多',
      dataset: [],
      pageNo: 1,
      pageSize: 10,
      totalPage: 10,
      tabType: 'fund',
      tradeStatusSelect: false,
      queryParams: {
        // 交易状态
        tradeStatus: null,
        fundStatus: null,
        // 开始时间
        startTradeTime: null,
        isCheckStart: false,
        // 结束时间
        endTradeTime: null,
        isCheckEnd: false
      },
      isLoaded: true
    }
  },
  components: {
    'select-search': Select,
    'select-search1': Select,
    'data-set': DataSet,
    'tip-popup': Popup
  },
  methods: {
    tabSwitch (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'tab-route-item')) {
        let idx = parseInt(target.getAttribute('data-id'))
        let tabGroups = this.tabGroups
        let item
        for (let i = 0, len = tabGroups.length; i < len; i++) {
          tabGroups[i].active = idx === i
          if (idx === i) {
            item = tabGroups[i]
          }
        }
        this.tabType = item.type
        this.statusOptions = this.mergeJSON({
          text: { key: 0, value: 0, text: '请选择状态', type: 'remark' },
          all: { key: 'ALL', value: 'ALL', text: '全部' }
        }, LANG[item.type + 'Status'] || {})
        this.tradeStatusSelect = !this.tradeStatusSelect

        this.$refs['j-trade-status'].pickerCancel(false)
        this.$refs['j-begin-date'].pickerCancel(false)
        this.$refs['j-end-date'].pickerCancel(false)
        this.queryParams = {
          // 交易状态
          tradeStatus: null,
          fundStatus: null,
          // 开始时间
          startTradeTime: null,
          isCheckStart: false,
          // 结束时间
          endTradeTime: null,
          isCheckEnd: false
        }
        this.reloadData()
      }
    },
    /**
     * 搜索条件的状态改变事件
     * @param {Event} e 事件
     * @param {Object} data 当前选择数据对象
     */
    statusChangeEvent (e, data) {
      if (data.value === 'ALL') {
        this.queryParams[this.tabType + 'Status'] = null
      } else {
        this.queryParams[this.tabType + 'Status'] = data.value
      }
      this.reloadData()
    },
    /**
     * 创建日期改变事件
     * @param {Event} e 事件
     * @param {Object} data 当前选择数据对象
     * @param {Date} pickerDate 当前选择的日期
     * @param {String} formatPickerDate 当前选择日期格式化后的字符串
     */
    createDateChangeEvent (e, data, pickerDate, formatPickerDate) {
      // console.info(pickerDate)
      // console.info(formatPickerDate)
      // this.complateDateStatus = 'disabled'
      let year = pickerDate.getFullYear()
      let month = pickerDate.getMonth() + 1
      this.queryParams.startTradeTime = year + '-' + month + '-1 00:00:00'
      if (!this.queryParams.isCheckEnd) {
        // 如果结束日期没有选择，自动补齐当月
        this.queryParams.endTradeTime = year + '-' + month + '-31 23:59:59'
      }
      this.queryParams.isCheckStart = true
      this.reloadData()
    },
    /**
     * 创建日期清除事件
     */
    createDateClearEvent () {
      // this.complateDateStatus = null
      this.queryParams.startTradeTime = null
      if (!this.queryParams.isCheckEnd) {
        this.queryParams.endTradeTime = null
      }
      this.queryParams.isCheckStart = false
      this.reloadData()
    },
    /**
     * 完成日期改变事件
     * @param {Event} e 事件
     * @param {Object} data 当前选择数据对象
     * @param {Date} pickerDate 当前选择的日期
     * @param {String} formatPickerDate 当前选择日期格式化后的字符串
     */
    complateDateChangeEvent (e, data, pickerDate, formatPickerDate) {
      let year = pickerDate.getFullYear()
      let month = pickerDate.getMonth() + 1
      this.queryParams.endTradeTime = year + '-' + month + '-31 23:59:59'
      if (!this.queryParams.isCheckStart) {
        // 如果开始日期没有选择，自动补齐当月
        this.queryParams.startTradeTime = year + '-' + month + '-1 00:00:00'
      }
      this.queryParams.isCheckEnd = true
      this.reloadData()
    },
    /**
     * 完成日期清除事件
     */
    complateDateClearEvent () {
      // this.createDateStatus = null
      this.queryParams.endTradeTime = null
      if (!this.queryParams.isCheckStart) {
        this.queryParams.startTradeTime = null
      }
      this.queryParams.isCheckEnd = false
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
    renderDataset () {
      this.$store.dispatch('billAssetsListStoreUpdate', {
        billAssetsList: this.dataset
      })
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
    loadData () {
      if (this.pageNo <= this.totalPage) {
        let queryParams = this.queryParams
        queryParams.gid = this.getGid()
        queryParams.pageInfo = {
          countOfCurrentPage: this.pageSize,
          currentPage: this.pageNo
        }
        let tabType = this.tabType
        BillService['query' + this.firstUpperCase(tabType) + 'Page'](queryParams).then(res => {
          let data = res.data
          if (data.success) {
            let rows = data.rows
            this.totalPage = Math.ceil(data.total / this.pageSize)
            if (this.pageNo === 1) {
              this.dataset = [{ groups: [] }]
            }
            if (!rows.length) {
              this.dataset = []
            }
            utils.forEach(rows, (row, idx) => {
              // let changeDirection = LANG.changeDirection[this.tabType === 'fund' ? 'OUT' : 'IN']
              let changeDirection = LANG.changeDirection[row.flow === '-' ? 'OUT' : 'IN']
              // let dataType = LANG[tabType + 'OrderType'][row.tradeType] || {}
              let dataType = LANG['tradeOrderType'][row.tradeType] || {}
              let dataStatus = LANG[tabType + 'Status'][row.fundStatus || row.tradeStatus] || {}
              this.dataset[0].groups.push({
                mask: true,
                id: row.merchOrderNo,
                title: dataType.text || ('未知类型'),
                titleRemark: (row.flow ? changeDirection.symbol : '') + (this.transferMoney((row['amount']))),
                // 进、出类型
                status: (row.flow ? changeDirection.status : ''),
                list: [
                  { text: '创建时间：' + (row.tradeTime || '') },
                  { text: '结束时间：' + (row.finishTime || ''), value: dataStatus.text || '无状态' }
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
      }
    },
    clickEvent (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'j-item-mask')) {
        let id = target.getAttribute('data-id')
        this.routeTo(PagesBill.router(PagesBill.billDetail), {
          query: {
            id,
            type: this.tabType
          }
        })
      }
    }
  },
  created () {
    this.setWebSiteTitle('账单')
    this.renderDataset()
    this.loadData()
  }
}
