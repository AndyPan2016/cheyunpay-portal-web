/**
 * 摆牌二维码交易记录
 * @authors AndyPan (pye-mail@163.com)
 * @date    摆牌二维码交易记录
 */

let Select = Components.use(Components.select)
let DataSet = Components.use(Components.dataset)
let { MemberService, BillService } = Services.require()
let { STATUS, LANG } = Configs.require()
let Popup = Components.use(Components.popup)
let { utils } = Utils.require()

export default {
  data () {
    return {
      // 状态选项
      statusOptions: this.mergeJSON({
        text: { key: 0, value: 0, text: '请选择状态', type: 'remark' },
        all: { key: 'ALL', value: 'ALL', text: '全部' }
      }, LANG.tradeStatus),
      // {
      //   text: {value: 0, text: '请选择状态', type: 'remark'}
      // },
      qrcodeID: [
        {
          // values: ['A2019 5488 3211 1256', 'B2019 5488 3211 1256', 'C2019 5488 3211 1256', 'D2019 5488 3211 1256'],
          values: [],
          className: 'picker-one'
        }
      ],
      codeSecondTitle: { title: '请选择二维码ID' },
      complateDateStatus: null,
      pickerSecondTitle: { title: '请选择查询日期' },
      billListTip: '加载更多',
      dataset: [
        // {
        //   // groupName: '2019年9月',
        //   groups: [
        //     {
        //       title: '微信支付',
        //       titleIcon: 'icon-record-wx',
        //       titleRemark: '+100',
        //       status: 'txt-status-default',
        //       list: [
        //         { text: '二维码ID：5647 7482 5497 1234', status: 'formal' },
        //         { text: '完成时间：2019-08-30 23:00:01', value: '交易成功', status: 'formal-value' }
        //       ]
        //     },
        //     {
        //       title: '支付宝支付',
        //       titleIcon: 'icon-record-zfb',
        //       titleRemark: '-1.00',
        //       status: 'txt-status-error',
        //       list: [
        //         { text: '二维码ID：5647 7482 5497 1234', status: 'formal' },
        //         { text: '完成时间：2019-08-30 23:00:01', value: '交易成功', status: 'formal-value' }
        //       ]
        //     }
        //   ]
        // }
      ],
      scrollClass: 'scroll-class',
      userNo: null,
      pageNo: 1,
      pageSize: 10,
      totalPage: 10,
      queryParams: {
        // 交易状态
        tradeStatus: null,
        // 商户摆拍二维码（固定二维码）
        merchTwoNumCode: null,
        // 开始时间
        startTradeTime: null,
        // 结束时间
        endTradeTime: null
      }
    }
  },
  components: {
    'select-search': Select,
    'data-set': DataSet,
    'tip-popup': Popup
  },
  methods: {
    /**
     * 搜索条件的状态改变事件
     * @param {Event} e 事件
     * @param {Object} data 当前选择数据对象
     */
    statusChangeEvent (e, data) {
      if (data.value === 'ALL') {
        this.queryParams.tradeStatus = null
      } else {
        this.queryParams.tradeStatus = data.value
      }
      this.totalPage = 10
      this.pageNo = 1
      this.loadData()
    },
    /**
     * 搜索条件的二维码ID改变事件
     * @param {Event} e 事件
     * @param {Object} data 当前选择数据对象
     */
    qrcodeIDChangeEvent (e, data, pickerDatas) {
      this.queryParams.merchTwoNumCode = pickerDatas.join(',')
      this.scrollClass = 'scroll-class scroll-plus'
      this.totalPage = 10
      this.pageNo = 1
      this.loadData()
    },
    qrcodeIDClearEvent () {
      this.queryParams.merchTwoNumCode = null
      this.scrollClass = 'scroll-class'
      this.totalPage = 10
      this.pageNo = 1
      this.loadData()
    },
    /**
     * 完成日期改变事件
     * @param {Event} e 事件
     * @param {Object} data 当前选择数据对象
     * @param {Date} pickerDate 当前选择的日期
     * @param {String} formatPickerDate 当前选择日期格式化后的字符串
     */
    complateDateChangeEvent (e, data, pickerDate, formatPickerDate) {
      // console.info(pickerDate)
      // console.info(formatPickerDate)
      // this.createDateStatus = 'disabled'
      let year = pickerDate.getFullYear()
      let month = pickerDate.getMonth() + 1
      this.queryParams.startTradeTime = year + '-' + month + '-1 00:00:00'
      this.queryParams.endTradeTime = year + '-' + month + '-31 23:59:59'
      this.totalPage = 10
      this.pageNo = 1
      this.loadData()
    },
    /**
     * 完成日期清除事件
     */
    complateDateClearEvent () {
      // this.createDateStatus = null
      this.queryParams.startTradeTime = null
      this.queryParams.endTradeTime = null
      this.totalPage = 10
      this.pageNo = 1
      this.loadData()
    },
    /**
     * 列表滚动到底部事件
     * @param {Event} e
     * @param {Object} res
     */
    scrollBottomEvent (e, res) {
      // this.dataset[0].groups.push({
      //   title: '手续费1',
      //   titleIcon: 'icon-record-zfb',
      //   titleRemark: '-1.00',
      //   status: 'txt-status-error',
      //   list: [
      //     { text: '二维码ID：5647 7482 5497 1234', status: 'formal' },
      //     { text: '完成时间：2019-08-30 23:00:01', value: '交易失败', status: 'formal-value' }
      //   ]
      // })
      // let billAssetsListStoreCallBack = this.$store.state.BillAssetsListStore.billAssetsListStoreCallBack
      // if (billAssetsListStoreCallBack) {
      //   billAssetsListStoreCallBack(this.dataset)
      // }
      this.pageNo++
      this.loadData()
    },
    renderDataset () {
      this.$store.dispatch('billAssetsListStoreUpdate', {
        billAssetsList: this.dataset
      })
    },
    /**
     * 获取我的二维码ID集合
     */
    getQRCodeID () {
      MemberService.queryDimensionBarcodeList({userNo: this.userNo}).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity || {}
          let barcodeInfos = entity.barcodeInfos
          let qrCodeId = [
            {
              values: [],
              className: 'picker-one'
            }
          ]
          utils.forEach(barcodeInfos, item => {
            qrCodeId[0].values.push(item.barcodeNo)
          })
          this.qrcodeID = qrCodeId
        }
      })
    },
    loadData () {
      if (this.pageNo <= this.totalPage) {
        let queryParams = this.queryParams
        queryParams.gid = this.getGid()
        queryParams.pageInfo = {
          countOfCurrentPage: this.pageSize,
          currentPage: this.pageNo
        }
        BillService.queryTradePage(queryParams).then(res => {
          let data = res.data
          if (data.success) {
            let rows = data.rows
            this.totalPage = Math.ceil(data.total / this.pageSize)
            if (this.pageNo === 1) {
              this.dataset.push({ groups: [] })
            }
            if (!rows.length) {
              this.dataset = []
            }
            utils.forEach(rows, row => {
              // let changeDirection = LANG.changeDirection[this.tabType === 'fund' ? 'OUT' : 'IN']
              let changeDirection = LANG.changeDirection[row.flow === '-' ? 'OUT' : 'IN']
              let dataType = LANG['tradeOrderType'][row.tradeType] || {}
              let dataStatus = LANG['tradeStatus'][row.tradeStatus] || {}
              this.dataset[0].groups.push({
                mask: true,
                id: row.merchOrderNo,
                title: dataType.text || ('未知类型'),
                titleIcon: dataType.icon || '',
                titleRemark: (row.flow ? changeDirection.symbol : '') + this.transferMoney(row.amount),
                status: (row.flow ? changeDirection.status : ''),
                list: [
                  { text: '二维码ID：' + row.merchOrderNo, status: 'formal' },
                  { text: '完成时间：' + (row.finishTime || ''), value: dataStatus.text || '无状态', status: 'formal-value' }
                ]
              })
            })
            let billAssetsListStoreCallBack = this.$store.state.BillAssetsListStore.billAssetsListStoreCallBack
            if (billAssetsListStoreCallBack) {
              billAssetsListStoreCallBack(this.dataset)
            }
            this.renderDataset()
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
            type: 'trade'
          }
        })
      }
    }
  },
  created () {
    this.userNo = this.getCookie(STATUS.USERNO)
    this.setWebSiteTitle('摆牌二维码交易记录')
    this.renderDataset()
    this.getQRCodeID()
    this.loadData()
  }
}
