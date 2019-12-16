/**
 * 钱包
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日09:57:05
 */
import { Swiper, Slide } from 'vue-swiper-component'
let Forms = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let WallHead = PagesCommons.use(PagesCommons.wallHead)
let { utils } = Utils.require()
let { STATUS } = Configs.require()
let { MemberService, CashierService } = Services.require()

export default {
  data () {
    return {
      // 用户编号
      userNo: null,
      // 身份ID
      partnerId: null,
      // 钱包头部数据
      walletHeadData: null,
      // 导航数据集
      navDataset: [
        { key: 'assets', icon: 'icon-nav-assets', text: '总资产' },
        { key: 'recharge', icon: 'icon-nav-recharge', text: '充值' },
        { key: 'withdrawRedirect', icon: 'icon-nav-withdrawal', text: '提现' },
        { key: 'transferAccountRedirect', icon: 'icon-nav-transfer', text: '转账' }
      ],
      // 表单数据集
      formsDataset: [
        [
          {icon: 'icon-bill', text: '账单', key: 'bill', type: 'default'}
        ]
        // [
        //   {icon: 'icon-pos', text: 'POS', key: 'pos', type: 'default'},
        //   {icon: 'icon-qrcode', text: '摆牌二维码', key: 'qrcode', type: 'default'},
        //   {icon: 'icon-polymerize', text: '聚合收单', key: 'polymerize', type: 'default'}
        // ]
        // [
        //   {icon: 'icon-wealth', text: '财富', key: 'wealth', type: 'default'}
        // ]
      ],
      adList: [
        {url: require('../../../assets/images/ad/ad-1.png'), alt: '广告'},
        {url: require('../../../assets/images/ad/ad-1.png'), alt: '广告'},
        {url: require('../../../assets/images/ad/ad-1.png'), alt: '广告'}
      ]
    }
  },
  components: {
    Forms,
    Swiper,
    Slide,
    'wall-head': WallHead,
    'tip-popup': Popup
  },
  methods: {
    /**
     * 选择账户事件
     * @param {Event} e 事件
     */
    chooseAccountEvent (e) {
      // console.info(e)
    },
    /**
     * 账户点击事件（进入详情）
     * @param {Event} e 事件
     */
    accountClickEvent (e) {
      // console.info(e)
    },
    /**
     * 导航点击事件
     * @param {Event} e 事件对象
     */
    navClick (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'nav-item-text')) {
        target = target.parentNode
      }
      let key = target.getAttribute('data-key')
      if (key === 'assets') {
        // 总资产
        this.routeTo(PagesTotalAssets.router())
      } else {
        CashierService[key]().then(res => {
          let data = res.data
          if (data.success) {
            // this.$refs['tip-popup'].tip('成功')
            let entity = data.entity || {}
            this.delEntrtyInsidePage()
            this.openHref(entity.redirectUrl)
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      }
    },
    /**
     * 表单点击事件
     * @param {Event} e 事件对象
     * @param {DOMElement} target 点击目标元素对象
     * @param {String} key 点击元素的key值
     */
    formClick (e, target, key) {
      if (key === 'bill') {
        // 账单
        this.routeTo(PagesBill.router(PagesBill.billList))
      } else if (key === 'pos') {
        // pos
        this.routeTo(PagesPos.router())
      } else if (key === 'qrcode') {
        // 摆牌二维码
        this.routeTo(PagesLayQRCode.router())
      } else if (key === 'polymerize') {
        // 聚合收单
        this.$refs['tip-popup'].loading('加载中...')
        // 进入前先判断是否有申请及申请状态
        MemberService.queryMemberInfo({
          userNo: this.userNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            this.$refs['tip-popup'].close()
            // 聚合支付能力
            let aggregatePayStatus = entity.aggregatePayStatus
            // 摆牌能力
            let cardPayStatus = entity.cardPayStatus
            if (cardPayStatus === 'OPEN_OK' || aggregatePayStatus === 'OPEN_OK') {
              // 审核通过
              this.$store.dispatch('processStatusStoreUpdate', {
                // 标题
                title: '聚合收单',
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
                      this.routeTo(PagesWallet.router(PagesWallet.index))
                    }
                  }
                ]
              })
              // 去公共流程状态页
              this.routeTo(PagesCommons.router(PagesCommons.processStatus))
            } else if (cardPayStatus === 'OPEN_ING' || aggregatePayStatus === 'OPEN_ING') {
              // 开通中，等待
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
                      // 返回首页
                      this.routeTo(PagesWallet.router(PagesWallet.index))
                    }
                  }
                ]
              })
              // 去公共流程状态页
              this.routeTo(PagesCommons.router(PagesCommons.processStatus))
            } else if (cardPayStatus === 'OPEN_FAIL' || aggregatePayStatus === 'OPEN_FAIL') {
              // 开通失败，要么继续申请聚合，要么重新申请摆牌
              this.$store.dispatch('processStatusStoreUpdate', {
                // 标题
                title: '聚合收单',
                // 状态
                status: 'fail',
                // 结果
                result: '申请被驳回',
                // 备注
                remark: '资料有误',
                // 按钮
                buttons: [
                  {
                    text: '完成',
                    class: 'custom-btn-class',
                    fn: () => {
                      // 返回首页
                      this.routeTo(PagesWallet.router(PagesWallet.index))
                    }
                  }, {
                    text: '聚合收单申请',
                    class: 'custom-btn-class',
                    fn: () => {
                      // 聚合申请
                      this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acMaterielApply), {
                        query: {
                          type: 'AGGREGATE_PAY',
                          // 带参数
                          params: true,
                          way: 'wallet'
                        }
                      })
                    }
                  }, {
                    text: '摆牌二维码申请',
                    class: 'custom-btn-class',
                    fn: () => {
                      // 摆牌申请
                      this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acMaterielApply), {
                        query: {
                          type: 'CARD_PAY',
                          // 带参数
                          params: true,
                          way: 'wallet'
                        }
                      })
                    }
                  }
                ]
              })
              // 去公共流程状态页
              this.routeTo(PagesCommons.router(PagesCommons.processStatus))
            } else if (cardPayStatus === 'OPEN_NO' || aggregatePayStatus === 'OPEN_NO') {
              // 如果都未申请
              this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acMaterielApply), {
                query: {
                  type: 'AGGREGATE_PAY',
                  way: 'wallet'
                }
              })
            }
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
        // this.routeTo(PagesLayQRCode.router(PagesLayQRCode.acMaterielApply))
      } else if (key === 'wealth') {
        // 财富
        this.routeTo(PagesWealth.router())
      }
    },
    getMemberInfo () {
      this.$refs['tip-popup'].loading('加载中...')
      MemberService.queryMemberInfo({
        userNo: this.userNo
      }).then(res => {
        let data = res.data || {}
        if (data.success) {
          let entity = data.entity
          this.$refs['tip-popup'].close()
          if (entity.memberType !== 'PERSON') {
            this.formsDataset.push([
              {icon: 'icon-pos', text: 'POS', key: 'pos', type: 'default'},
              {icon: 'icon-qrcode', text: '摆牌二维码', key: 'qrcode', type: 'default'},
              {icon: 'icon-polymerize', text: '聚合收单', key: 'polymerize', type: 'default'}
            ])
          }
        } else {
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    }
  },
  created () {
    this.setWebSiteTitle('钱包')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.partnerId = this.getCookie(STATUS.PARTNERID)
  },
  mounted () {
    this.getMemberInfo()
  }
}
