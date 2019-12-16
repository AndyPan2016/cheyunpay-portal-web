/**
 * POS退款申请-退款
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月29日17:50:34
 */

let Forms = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let { PosService } = Services.require()
let { STATUS } = Configs.require()
let { utils } = Utils.require()

export default {
  data () {
    return {
      formData: {
        refundReason: null,
        amount: null,
        posClientNo: null,
        userNo: null
      }
    }
  },
  components: {
    'my-forms': Forms,
    'tip-popup': Popup
  },
  methods: {
    verifyFailureEvent (verifyValue, result, target) {
      let formItem = target.parentNode.parentNode
      utils.addClass(formItem, 'error')
    },
    formVerifySuccessEvent (myFormData) {
      PosService.createPosRefund(this.formData).then(res => {
        let data = res.data
        if (data.success) {
          this.$store.dispatch('processStatusStoreUpdate', {
            // 标题
            title: 'POS押金退款',
            // 状态
            status: 'wait',
            // 结果
            result: '退款申请提交成功',
            // 备注
            remark: '尊敬的商家，您POS押金退款申请已受理',
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
    }
  },
  created () {
    this.setWebSiteTitle('POS退款申请-退款')
    let params = this.params
    this.formData.amount = params.amount
    this.formData.posClientNo = params.id
    this.formData.userNo = this.getCookie(STATUS.USERNO)
  }
}
