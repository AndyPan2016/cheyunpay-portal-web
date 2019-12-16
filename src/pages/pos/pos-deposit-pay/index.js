/**
 * POS押金缴纳
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月25日16:04:16
 */

let PosListItemBlock = PagesCommons.use(PagesCommons.posListItem)
let Popup = Components.use(Components.popup)
let { PosService } = Services.require()
let { STATUS } = Configs.require()

export default {
  data () {
    return {
      posList: [
        {
          head: { text: 'POS机押金在线缴纳', icon: 'icon-deposit-right' },
          body: {
            type: 'input',
            groups: [
              { label: '共计', vModel: null, modelType: 'number', modelPlaceHolder: '请输入缴纳押金POS机数量', remark: '台' }
            ]
          }
        }
      ],
      userNo: null,
      memberInfo: null
    }
  },
  components: {
    'pos-list-item': PosListItemBlock,
    'tip-popup': Popup
  },
  methods: {
    submitApply () {
      let applyPosNumber = this.posList[0].body.groups[0].vModel
      if (applyPosNumber) {
        PosService.createPosPledgePayApply({
          applyPosNumber,
          partnerName: this.memberInfo.comName,
          userId: this.userNo,
          userName: this.memberInfo.userName
        }).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].close()
            this.$store.dispatch('processStatusStoreUpdate', {
              // 标题
              title: 'POS押金缴纳',
              // 状态
              status: 'wait',
              // 结果
              result: '申请提交成功',
              // 备注
              remark: '申请提交成功，请耐心等待申请结果，如需再次申请，请等待本次申请通过后再次发起',
              // 按钮
              buttons: [
                {
                  text: '完成',
                  class: null,
                  fn: () => {
                    // 完成，回到首页
                    this.routeTo(PagesPos.router(PagesPos.index))
                  }
                }
              ]
            })
            // 去公共流程状态页
            this.routeTo(PagesCommons.router(PagesCommons.processStatus))
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      } else {
        this.$refs['tip-popup'].tip('请输入缴纳押金POS机数量')
      }
    }
  },
  created () {
    this.setWebSiteTitle('POS押金缴纳')
    this.userNo = this.getCookie(STATUS.USERNO)
    this.memberInfo = this.transfToJson(this.getLocalStorage(STATUS.MEMBERINFO))
  }
}
