/**
 * POS申请记录详情
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日17:57:17
 */

let DataSet = Components.use(Components.dataset)
let PosListItem = PagesCommons.use(PagesCommons.posListItem)
let Popup = Components.use(Components.popup)
let { PosService } = Services.require()
let { STATUS, LANG } = Configs.require()
let { utils } = Utils.require()

export default {
  data () {
    return {
      datasetDetail: [
        {
          head: { text: null, fontSize: 'font-24', icon: 'icon-pos-record' },
          body: {
            type: 'list',
            groups: [
              { label: '押金金额', text: '' },
              { label: '机具数量', text: '' },
              { label: '收款会员名称', text: '' },
              { label: '状态', text: '' }
            ]
          }
        }
      ],
      dataset: [
        // {
        //   split: false,
        //   body: {
        //     type: 'qr-detail',
        //     qrCode: 'http://192.168.66.50:8081/#/',
        //     code: '190307010',
        //     name: '名称'
        //   },
        //   status: {
        //     state: 'status-success',
        //     fontSize: 'font-24',
        //     groups: [
        //       { label: '已关联' }
        //     ]
        //   }
        // },
        // {
        //   split: false,
        //   body: {
        //     type: 'qr-detail',
        //     qrCode: 'http://192.168.66.50:8081/#/',
        //     code: '190307010',
        //     name: '名称'
        //   },
        //   status: {
        //     state: 'status-error',
        //     fontSize: 'font-24',
        //     groups: [
        //       { label: '未激活' }
        //     ]
        //   }
        // },
        // {
        //   split: false,
        //   body: {
        //     type: 'qr-detail',
        //     qrCode: 'http://192.168.66.50:8081/#/',
        //     code: '190307010',
        //     name: '名称'
        //   },
        //   status: {
        //     state: 'status-error',
        //     fontSize: 'font-24',
        //     groups: [
        //       { label: '未激活' }
        //     ]
        //   }
        // }
      ],
      userNo: null,
      merchantOrderNo: null
    }
  },
  components: {
    'data-set': DataSet,
    'pos-record-detail': PosListItem,
    'tip-popup': Popup
  },
  methods: {
    renderDataset () {
      this.$store.dispatch('posListStoreUpdate', {
        posList: this.dataset
      })
    },
    scrollBottomEvent (e, res) {
      // this.dataset.push({
      //   split: false,
      //   body: {
      //     type: 'qr-detail',
      //     qrCode: 'http://www.baidu.com/',
      //     code: '190307010',
      //     name: '名称1'
      //   },
      //   status: {
      //     state: 'status-error',
      //     fontSize: 'font-24',
      //     groups: [
      //       { label: '未激活' }
      //     ]
      //   }
      // })
      // let posStoreCallBack = this.$store.state.PosListStore.posStoreCallBack
      // if (posStoreCallBack) {
      //   posStoreCallBack(this.dataset)
      // }
    },
    getDetail () {
      this.$refs['tip-popup'].loading('加载中...')
      PosService.queryPosApplyPayOrderDetail({
        merchantOrderNo: this.merchantOrderNo,
        userId: this.userNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          this.$refs['tip-popup'].close()
          let entity = data.entity
          let posApplyPay = entity.posApplyPay
          this.datasetDetail[0].head.text = '订单号：' + this.merchantOrderNo
          let datasetDetailBody = this.datasetDetail[0].body
          datasetDetailBody.groups[0].text = '￥' + this.transferMoney(posApplyPay.amount)
          datasetDetailBody.groups[1].text = posApplyPay.payCount + '台'
          datasetDetailBody.groups[2].text = (posApplyPay.buyerUserName === 'null' ? '' : posApplyPay.buyerUserName) || ''
          datasetDetailBody.groups[3].text = (LANG.posApplyStatus[posApplyPay.status] || {}).text

          let list = entity.list
          this.dataset = []
          utils.forEach(list, (item, idx) => {
            let posActivateStatus = LANG.posActivateStatus[item.activateStatus]
            this.dataset.push({
              split: false,
              body: {
                type: 'qr-detail',
                // qrCode: 'http://192.168.66.50:8081/#/?posApplyPayId=' + item.posApplyPayId + '&posClientNo=' + item.posClientNo,
                qrCode: '{"posSysClintNo":"' + item.posClientNo + '","ok":"POS机初始化成功","error":"机器的POS机编号与激活码不匹配","activationId":"' + item.posApplyPayId + '"}',
                code: item.posClientNo,
                name: '器具' + (idx + 1)
              },
              status: {
                state: posActivateStatus.status,
                fontSize: 'font-24',
                groups: [
                  { label: posActivateStatus.text }
                ]
              }
            })
          })
          let posStoreCallBack = this.$store.state.PosListStore.posStoreCallBack
          if (posStoreCallBack) {
            posStoreCallBack(this.dataset)
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
  created () {
    this.setWebSiteTitle('POS申请记录详情')
    this.renderDataset()
    this.userNo = this.getCookie(STATUS.USERNO)
    this.merchantOrderNo = this.params('id')
  },
  mounted () {
    this.getDetail()
  }
}
