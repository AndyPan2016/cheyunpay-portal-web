/**
 * 摆牌二维码
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日22:05:01
 */

let WallHead = PagesCommons.use(PagesCommons.wallHead)
let Forms = Components.use(Components.forms)
let { utils } = Utils.require()
let { STATUS } = Configs.require()
let { MemberService } = Services.require()

export default {
  data () {
    return {
      // 钱包头部数据
      walletHeadData: null,
      // 表单数据集
      formsDataset: [
        [
          {icon: 'icon-my-qrcode', text: '摆牌二维码物料申请', key: 'matter', type: 'default'},
          {icon: 'icon-my-qrcode', text: '我的摆牌二维码', key: 'qrcode', type: 'default'},
          {icon: 'icon-qrcode-record', text: '摆牌二维码交易记录', key: 'record', type: 'default'}
        ]
      ],
      memberInfo: {}
    }
  },
  components: {
    'wall-head': WallHead,
    Forms
  },
  methods: {
    formClick (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'form-item-lab')) {
        target = target.parentNode
      }
      let key = target.getAttribute('data-key')
      if (key === 'matter') {
        // 进入前先判断是否有申请及申请状态
        MemberService.queryMemberInfo({
          userNo: this.memberInfo.userNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            // 聚合支付能力
            let aggregatePayStatus = entity.aggregatePayStatus
            // 摆牌能力
            let cardPayStatus = entity.cardPayStatus
            if (cardPayStatus === 'OPEN_OK') {
              // 审核通过
              this.$store.dispatch('processStatusStoreUpdate', {
                // 标题
                title: '摆牌二维码物料申请',
                // 状态
                status: 'success',
                // 结果
                result: '申请通过',
                // 备注
                remark: '尊敬的商家，您的资料已审核通过',
                // 按钮
                buttons: [
                  {
                    text: '完成',
                    class: null,
                    fn: () => {
                      // 完成，回到首页
                      this.routeTo(PagesLayQRCode.router(PagesLayQRCode.index))
                    }
                  }
                ]
              })
              // 去公共流程状态页
              this.routeTo(PagesCommons.router(PagesCommons.processStatus))
            } else if (cardPayStatus === 'OPEN_FAIL') {
              // 审核未通过
              this.$store.dispatch('processStatusStoreUpdate', {
                // 标题
                title: '摆牌二维码物料申请',
                // 状态
                status: 'fail',
                // 结果
                result: '申请驳回',
                // 备注
                remark: '资料有误',
                // 按钮
                buttons: [
                  {
                    text: '重新填写',
                    class: null,
                    fn: () => {
                      // 重新填写，带参数
                      this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acMaterielApply), {
                        query: {
                          type: 'CARD_PAY',
                          params: true
                        }
                      })
                    }
                  }
                ]
              })
              // 去公共流程状态页
              this.routeTo(PagesCommons.router(PagesCommons.processStatus))
            } else if (cardPayStatus === 'OPEN_ING') {
              // 开通中
              this.$store.dispatch('processStatusStoreUpdate', {
                // 标题
                title: '摆牌二维码物料申请',
                // 状态
                status: 'wait',
                // 结果
                result: '申请已提交',
                // 备注
                remark: '申请已提交，请耐心等待工作人员审核结果',
                // 按钮
                buttons: [
                  {
                    text: '返回',
                    class: null,
                    fn: () => {
                      // 返回
                      this.routeTo(PagesLayQRCode.router(PagesLayQRCode.index))
                    }
                  }
                ]
              })
              // 去公共流程状态页
              this.routeTo(PagesCommons.router(PagesCommons.processStatus))
            } else if (cardPayStatus === 'OPEN_NO') {
              if (aggregatePayStatus === 'OPEN_NO') {
                // 如果两个都没开通，去申请
                this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acMaterielApply), {
                  query: {
                    type: 'CARD_PAY'
                  }
                })
              } else if (aggregatePayStatus === 'OPEN_ING') {
                // 开通中，等待
                this.$store.dispatch('processStatusStoreUpdate', {
                  // 标题
                  title: '摆牌二维码物料申请',
                  // 状态
                  status: 'wait',
                  // 结果
                  result: '聚合申请中',
                  // 备注
                  remark: '请耐心等待系统审核结果',
                  // 按钮
                  buttons: [
                    {
                      text: '返回',
                      class: null,
                      fn: () => {
                        // 返回首页
                        this.routeTo(PagesLayQRCode.router(PagesLayQRCode.index))
                      }
                    }
                  ]
                })
                // 去公共流程状态页
                this.routeTo(PagesCommons.router(PagesCommons.processStatus))
              } else if (aggregatePayStatus === 'OPEN_OK') {
                // 开通成功，去申请页面，并带入聚合申请资料数据
                this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acMaterielApply), {
                  query: {
                    type: 'CARD_PAY',
                    // 带入参数
                    params: true
                  }
                })
              } else if (aggregatePayStatus === 'OPEN_FAIL') {
                // 开通失败，要么继续申请聚合，要么重新申请摆牌
                this.$store.dispatch('processStatusStoreUpdate', {
                  // 标题
                  title: '摆牌二维码物料申请',
                  // 状态
                  status: 'fail',
                  // 结果
                  result: '聚合申请被驳回',
                  // 备注
                  remark: '资料有误',
                  // 按钮
                  buttons: [
                    {
                      text: '完成',
                      class: null,
                      fn: () => {
                        // 返回首页
                        this.routeTo(PagesLayQRCode.router(PagesLayQRCode.index))
                      }
                    }, {
                      text: '重新填写聚合申请',
                      class: null,
                      fn: () => {
                        // 聚合申请
                        this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acMaterielApply), {
                          query: {
                            type: 'AGGREGATE_PAY',
                            // 带参数
                            params: true
                          }
                        })
                      }
                    }, {
                      text: '摆牌二维码申请',
                      class: null,
                      fn: () => {
                        // 摆牌申请
                        this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acMaterielApply), {
                          query: {
                            type: 'CARD_PAY',
                            // 带参数
                            params: true
                          }
                        })
                      }
                    }
                  ]
                })
                // 去公共流程状态页
                this.routeTo(PagesCommons.router(PagesCommons.processStatus))
              }
            }
          }
        })
        // this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acMaterielApply))
      } else if (key === 'qrcode') {
        this.routeTo(PagesLayQRCode.router(PagesLayQRCode.myQRCode))
      } else if (key === 'record') {
        this.routeTo(PagesLayQRCode.router(PagesLayQRCode.qrcodeTransactionRecord))
      }
    }
  },
  created () {
    this.setWebSiteTitle('摆牌二维码')
    this.memberInfo = this.transfToJson(this.getLocalStorage(STATUS.MEMBERINFO)) || {}
  }
}
