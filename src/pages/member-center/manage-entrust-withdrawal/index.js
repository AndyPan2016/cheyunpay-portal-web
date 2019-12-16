/**
 * 银行账户管理-托管提现
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月18日22:49:56
 */

let DataSet = Components.use(Components.dataset)
let Popup = Components.use(Components.popup)
let { MemberService } = Services.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      userNo: null,
      dataset: [
        // { id: 'CCB-1', logo: 'CCB', type: '储蓄卡', name: '中国建设银行', number: '622*****9999' },
        // { id: 'CCB-1', logo: 'CCB', type: '储蓄卡', name: '中国建设银行', number: '622*****9999' },
        // { id: 'CCB-1', logo: 'CCB', type: '储蓄卡', name: '中国建设银行', number: '622*****9999' },
        // { id: 'CCB-1', logo: 'CCB', type: '储蓄卡', name: '中国建设银行', number: '622*****9999' },
        // { id: 'CCB-1', logo: 'CCB', type: '储蓄卡', name: '中国建设银行', number: '622*****9999' },
        // { id: 'CCB-1', logo: 'CCB', type: '储蓄卡', name: '中国建设银行', number: '622*****9999' },
        // { id: 'CCB-1', logo: 'CCB', type: '储蓄卡', name: '中国建设银行', number: '622*****9999' }
      ]
    }
  },
  components: {
    'dataset': DataSet,
    'tip-popup': Popup
  },
  methods: {
    renderNullDataset () {
      this.$store.dispatch('processStatusStoreUpdate', {
        // 标题
        title: false,
        // 状态
        status: 'bind-card',
        // 结果
        result: '',
        // 备注
        remark: '还未绑定提现银行账户',
        // 按钮
        buttons: [
          {
            text: '添加银行账户',
            class: null,
            fn: () => {
              this.routeTo(PagesMemberCenter.router(PagesMemberCenter.bindCardEntrust))
            }
          }
        ]
      })
      this.$store.dispatch('bankListStoreUpdate', {
        bankList: this.dataset,
        onUnBind: (e, item) => {
          this.$refs['tip-popup'].confirm('取消绑定银行账户', '你好，解除绑定之后将无法使用该银行账户进行提现，是否解绑？', () => {
            let that = this
            setTimeout(() => {
              // 银行卡解绑
              that.$refs['tip-popup'].loading('正在解绑...')
              MemberService.unbindBankCard({
                bindNo: item.id,
                userNo: that.userNo
              }).then(res => {
                let data = res.data
                if (data.success) {
                  that.renderNullDataset()
                  that.queryBankCardList()
                } else {
                  that.$refs['tip-popup'].tip(data.message)
                }
              }).catch(err => {
                that.$refs['tip-popup'].tip(err.message)
              })
            }, 10)
          })
        }
      })
    },
    scrollBottomEvent () {
      // this.dataset.push({ id: 'ABC-1', logo: 'ABC', type: '储蓄卡', name: '中国农业银行', number: '622*****9999' })
      // let bankListStoreCallBack = this.$store.state.BankListStore.bankListStoreCallBack
      // if (bankListStoreCallBack) {
      //   bankListStoreCallBack(this.dataset)
      // }
    },
    /**
     * 根据会员编码查询绑卡列表
     */
    queryBankCardList () {
      MemberService.queryBankCardList({
        userNo: this.userNo,
        // 绑卡类型
        bindType: LANG.bindType.entrust.key,
        // 绑卡用途
        purpose: LANG.bindPurpose.withdraw.key
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity || {}
          let bankCardInfos = entity.bankCardInfos || []
          let dataset = []
          this.forEach(bankCardInfos, (item) => {
            dataset.push({
              id: item.bindNo,
              logo: item.bankCode,
              type: LANG.bankCardType[item.bankCardType || 'ALL'].text,
              name: item.bankName,
              number: this.phoneEncryption(item.bankCardNo, {
                // 显示5个*
                phLength: 5
              })
            })
          })
          this.dataset = dataset
          this.renderNullDataset()
          // 更新store中的银行卡列表数据
          let bankListStoreCallBack = this.$store.state.BankListStore.bankListStoreCallBack
          if (bankListStoreCallBack) {
            bankListStoreCallBack(this.dataset)
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
    this.setWebSiteTitle('银行账户管理-托管提现')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.renderNullDataset()
    this.queryBankCardList()
  }
}
