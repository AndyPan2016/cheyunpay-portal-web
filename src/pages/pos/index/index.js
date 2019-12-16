/**
 * POS管理
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日09:57:05
 */

let Forms = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let { PosService, CashierService } = Services.require()
let { STATUS } = Configs.require()
let { utils } = Utils.require()

export default {
  data () {
    return {
      // 表单数据集
      formsDataset: [
        [
          {icon: 'icon-online-apply', text: '在线申请POS机', key: 'pos-online-apply', type: 'default'},
          {icon: 'icon-apply-record', text: 'POS申请记录', key: 'pos-apply-record', type: 'default'}
        ],
        [
          {icon: 'icon-deposit', text: '押金在线缴纳', key: 'pos-deposit-pay', type: 'default'}
          // {icon: 'icon-refund', text: 'POS退款申请', key: 'pos-refund-apply', type: 'default'}
        ]
      ],
      userNo: null,
      refPopup: null
    }
  },
  components: {
    Forms,
    'tip-popup': Popup
  },
  methods: {
    /**
     * 表单点击事件
     * @param {Event} e 事件对象
     * @param {DOMElement} target 点击目标元素对象
     * @param {String} key 点击元素的key值
     */
    formClick (e, target, key) {
      if (key === 'pos-online-apply') {
        this.$refs['tip-popup'].loading('loading')
        // 查询是否有已申请数据
        PosService.queryPosApply({ userId: this.userNo }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            if (entity.haveApply) {
              this.$refs['tip-popup'].close()
              let applyProcessStatus = { title: '在线申请POS机' }
              // 如果有申请
              if (entity.verifyStatus === 'VERIFY_OK') {
                // 审核通过
                applyProcessStatus.status = 'success'
                applyProcessStatus.result = '申请通过'
                applyProcessStatus.remark = '如申请审核通过，请在线缴纳押金并及时进件相关纸质资料用以开通POS服务，资料详情及邮寄地址请与客户经理确认。'
                applyProcessStatus.buttons = [
                  {
                    text: '完成',
                    class: null,
                    fn: () => {
                      // 完成，回到首页
                      this.routeTo(PagesPos.router(PagesPos.index))
                    }
                  }
                ]
                // 清空数据
                this.setLocalStorage(STATUS.POSONLINEAPPLY, undefined)
              } else if (entity.verifyStatus === 'VERIFY_FAIL') {
                // 审核未通过
                applyProcessStatus.status = 'fail'
                applyProcessStatus.result = '申请驳回'
                applyProcessStatus.remark = '资料提交有误'
                applyProcessStatus.buttons = [
                  {
                    text: '返回',
                    class: null,
                    fn: () => {
                      // 审核原因,如果审核未通过以‘,’分隔未通过的字段
                      let verifyReason = entity.verifyReason || ''
                      // 如果包含表单数据，去表单数据填写页面，如果只有资料上传的数据，去资料上传页面
                      // let onlineApplyCache = this.transfToJson(this.getLocalStorage(STATUS.POSONLINEAPPLY)) || {}
                      let applyFormData = {
                        businessAddress: entity.businessAddress,
                        linkMan: entity.linkMan,
                        linkPhone: entity.linkPhone,
                        shopName: entity.shopName
                      }
                      let applyForm = false
                      let applyPathData = {
                        businessLicense: entity.businessLicense,
                        legalPersonCertFrontPath: entity.legalPersonCertFrontPath,
                        legalPersonCertBackPath: entity.legalPersonCertBackPath,
                        doorheadPhotoPath1: entity.doorheadPhotoPath1,
                        doorheadPhotoPath2: entity.doorheadPhotoPath2
                      }
                      let applyPath = false
                      let verifyReasonAry = verifyReason.split(',')
                      utils.forEach(verifyReasonAry, reason => {
                        if (applyFormData[reason]) {
                          // 是否包含表单数据
                          applyForm = true
                        }
                        if (applyPathData[reason]) {
                          // 是否包含证件上传数据
                          applyPath = true
                        }
                      })
                      if (applyForm) {
                        // 跳转表单
                        this.routeTo(PagesPos.router(PagesPos.posOnlineApply), {
                          query: {
                            // 只将未通过字段带过去，数据太长，在那边重新请求
                            verifyReason
                          }
                        })
                      } else if (applyPath) {
                        // 跳转证件上传
                        this.routeTo(PagesPos.router(PagesPos.uploadCertificates), {
                          query: {
                            // 只将未通过字段带过去，数据太长，在那边重新请求
                            verifyReason
                          }
                        })
                      } else {
                        this.routeTo(PagesPos.router(PagesPos.posOnlineApply), {
                          query: {
                            // 只将未通过字段带过去，数据太长，在那边重新请求
                            verifyReason: 'test'
                          }
                        })
                      }
                    }
                  }
                ]
              } else {
                // 审核进行中或重审
                applyProcessStatus.status = 'wait'
                applyProcessStatus.result = '申请提交成功'
                applyProcessStatus.remark = '申请已提交成功，请耐心等待工作人员审核结束'
                applyProcessStatus.buttons = [
                  {
                    text: '完成',
                    class: null,
                    fn: () => {
                      // 完成，回到首页
                      this.routeTo(PagesPos.router(PagesPos.index))
                    }
                  }
                ]
              }
              this.$store.dispatch('processStatusStoreUpdate', applyProcessStatus)
              // 去公共流程状态页
              this.routeTo(PagesCommons.router(PagesCommons.processStatus))
            } else {
              // 如果没有申请，直接去申请
              this.routeTo(PagesPos.router(key))
            }
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      } else if (key === 'pos-deposit-pay') {
        this.$refs['tip-popup'].loading('loading')
        // 查询是否有已申请数据
        PosService.queryPosPledgePayApply({
          userId: this.userNo,
          userSureStatus: 'UNCONFIRM'
        }).then(res => {
          let data = res.data
          if (data.success) {
            // this.$refs['tip-popup'].close()
            let entity = data.entity
            let id = entity.id
            if (id) {
              // id存在,查看processResult字段和userSureStatus字段
              let processResult = entity.processResult
              if (processResult) {
                let userSureStatus = entity.userSureStatus
                if (userSureStatus === 'CONFIRM') {
                  // 为CONFIRM(确认)跳转到 申请页面 提交申请
                  this.routeTo(PagesPos.router(key))
                } else if (userSureStatus === 'UNCONFIRM') {
                  // UNCONFIRM(未确认)
                  PosService.updatePosPledgePayApply({
                    id,
                    userId: this.userNo
                  }).then(res => {
                    let data = res.data
                    if (data.success) {
                      if (processResult === 'NO_PLEDGE') {
                        // (无押金)跳转申请成功页面
                        this.$store.dispatch('processStatusStoreUpdate', {
                          title: '在线申请POS机',
                          status: 'success',
                          result: '申请通过',
                          remark: '如申请审核通过，请在线缴纳押金并及时进件相关纸质资料用以开通POS服务，资料详情及邮寄地址请与客户经理确认。',
                          buttons: [
                            {
                              text: '完成',
                              class: null,
                              fn: () => {
                                // 返回pos首页
                                this.routeTo(PagesPos.router(PagesPos.index))
                              }
                            }
                          ]
                        })
                        // 去公共流程状态页
                        this.routeTo(PagesCommons.router(PagesCommons.processStatus))
                      } else if (processResult === 'TURN_DOWN') {
                        // (拒绝)申请失败页面
                        this.$store.dispatch('processStatusStoreUpdate', {
                          title: '在线申请POS机',
                          status: 'fail',
                          result: '申请驳回',
                          remark: '资料提交有误。' + entity.turnDownReason,
                          buttons: [
                            {
                              text: '完成',
                              class: null,
                              fn: () => {
                                // 返回pos首页
                                this.routeTo(PagesPos.router(PagesPos.index))
                              }
                            }
                          ]
                        })
                        // 去公共流程状态页
                        this.routeTo(PagesCommons.router(PagesCommons.processStatus))
                      } else if (processResult === 'PLEDGE') {
                        // (有押金)创建订单跳转收银台
                        this.createPosApplyPayOrder({
                          amount: entity.amount,
                          buyerUserId: entity.userId,
                          partnerId: entity.partnerId,
                          partnerName: entity.partnerName,
                          payApplyId: entity.id,
                          payCount: entity.applyPosNumber
                        })
                      }
                    }
                  })
                }
              } else {
                // processResult 为空 跳转到 提交成功页面
                this.$store.dispatch('processStatusStoreUpdate', {
                  title: '在线申请POS机',
                  status: 'wait',
                  result: '申请已提交成功',
                  remark: '申请已提交成功，请耐心等待工作人员审核结束',
                  buttons: [
                    {
                      text: '完成',
                      class: null,
                      fn: () => {
                        // 返回pos首页
                        this.routeTo(PagesPos.router(PagesPos.index))
                      }
                    }
                  ]
                })
                // 去公共流程状态页
                this.routeTo(PagesCommons.router(PagesCommons.processStatus))
              }
            } else {
              // id 不存在，证明用户还没有提交过申请，去申请
              this.routeTo(PagesPos.router(key))
            }

            // // 2019年10月17日14:56:54
            // if (entity.status === 'N') {
            //   // 数据未审核
            //   if (!entity.userId) {
            //     // 未申请，去申请
            //     this.routeTo(PagesPos.router(key))
            //   } else if (entity.userId) {
            //     // 提交了申请，但未审核
            //     this.$store.dispatch('processStatusStoreUpdate', {
            //       title: '在线申请POS机',
            //       status: 'wait',
            //       result: '申请已提交成功',
            //       remark: '申请已提交成功，请耐心等待工作人员审核结束',
            //       buttons: [
            //         {
            //           text: '完成',
            //           class: null,
            //           fn: () => {
            //             // 返回pos首页
            //             this.routeTo(PagesPos.router(PagesPos.index))
            //           }
            //         }
            //       ]
            //     })
            //     // 去公共流程状态页
            //     this.routeTo(PagesCommons.router(PagesCommons.processStatus))
            //   }
            // } else if (entity.status === 'Y') {
            //   // 数据已审核，但可能是失败，可能是成功
            //   let processResult = entity.processResult
            //   // processResult: NO_PLEDGE.无押金 PLEDGE.有押金 TURN_DOWN.拒绝
            //   if (processResult === 'TURN_DOWN') {
            //     // 申请被拒绝
            //     this.$store.dispatch('processStatusStoreUpdate', {
            //       title: '在线申请POS机',
            //       status: 'fail',
            //       result: '申请驳回',
            //       remark: '资料提交有误。' + entity.turnDownReason,
            //       buttons: [
            //         {
            //           text: '完成',
            //           class: null,
            //           fn: () => {
            //             // 返回pos首页
            //             this.routeTo(PagesPos.router(PagesPos.index))
            //           }
            //         }
            //       ]
            //     })
            //     // 去公共流程状态页
            //     this.routeTo(PagesCommons.router(PagesCommons.processStatus))
            //   } else if (processResult === 'NO_PLEDGE' || processResult === 'PLEDGE') {
            //     let applyProcessStatus = { title: '在线申请POS机' }
            //     applyProcessStatus.status = 'success'
            //     applyProcessStatus.result = '申请通过'
            //     applyProcessStatus.remark = '如申请审核通过，请在线缴纳押金并及时进件相关纸质资料用以开通POS服务，资料详情及邮寄地址请与客户经理确认。'
            //     applyProcessStatus.buttons = [
            //       {
            //         text: '完成',
            //         class: null,
            //         clickLoading: true,
            //         fn: (e, refsPopup) => {
            //           if (processResult === 'PLEDGE') {
            //             // 创建POS订单，并去收银台
            //             this.createPosApplyPayOrder({
            //               amount: entity.amount,
            //               buyerUserId: entity.userId,
            //               partnerId: entity.partnerId,
            //               partnerName: entity.partnerName,
            //               payApplyId: entity.id,
            //               payCount: entity.applyPosNumber
            //             }, refsPopup)
            //           } else if (processResult === 'NO_PLEDGE') {
            //             // 返回pos首页
            //             this.routeTo(PagesPos.router(PagesPos.index))
            //           }
            //         }
            //       }
            //     ]
            //     this.$store.dispatch('processStatusStoreUpdate', applyProcessStatus)
            //     // 去公共流程状态页
            //     this.routeTo(PagesCommons.router(PagesCommons.processStatus))
            //   }
            // }
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      } else {
        this.routeTo(PagesPos.router(key))
      }
    },
    createPosApplyPayOrder (params, refsPopup) {
      // refsPopup.loading('loading')
      PosService.createPosApplyPayOrder(params).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          let merchOrderNo = entity.merchOrderNo
          this.tradePayRedirect({ merchOrderNo, userId: params.buyerUserId, partnerId: params.partnerId }, refsPopup)
        } else {
          this.$refs['tip-popup'].tip(data.message)
          // refsPopup.tip(data.message)
        }
      }).then(err => {
        this.$refs['tip-popup'].tip(err.message)
        // refsPopup.tip(err.message)
      })
    },
    tradePayRedirect (params, refsPopup) {
      CashierService.tradePayRedirect(params).then(res => {
        let data = res.data
        if (data.success) {
          // refsPopup.close()
          let entity = data.entity || {}
          let redirectUrl = entity.redirectUrl
          if (redirectUrl) {
            this.delEntrtyInsidePage()
            this.openHref(redirectUrl)
          }
        } else {
          this.$refs['tip-popup'].tip(data.message)
          // refsPopup.tip(data.message)
        }
      }).then(err => {
        this.$refs['tip-popup'].tip(err.message)
        // refsPopup.tip(err.message)
      })
    }
  },
  created () {
    this.setWebSiteTitle('POS管理')
    this.userNo = this.getCookie(STATUS.USERNO)
  },
  mounted () {
    this.refPopup = this.$refs['tip-popup']
  }
}
