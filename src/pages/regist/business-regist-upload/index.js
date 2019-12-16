/**
 * 注册
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let UploadCertificates = PagesCommons.use(PagesCommons.uploadCertificates)
let Popup = Components.use(Components.popup)
let { STATUS } = Configs.require()
let { utils } = Utils.require()
let { RegistService } = Services.require()

export default {
  data () {
    return {
      uploadLists: [
        { text: '法人身份证正面', key: 'legalCertFrontPath', background: require('../../../assets/images/background/bg-idcard-upload-a.png') },
        { text: '法人身份证反面', key: 'legalCertBackPath', background: require('../../../assets/images/background/bg-idcard-upload-b.png') },
        { text: '营业执照复印件（加盖鲜章)', key: 'licencePath', background: require('../../../assets/images/background/bg-business-license.png') },
        { text: '门头照', key: 'doorPhotoPath', background: require('../../../assets/images/background/bg-facade.png') },
        { text: '开户许可证', key: 'openAccountPath', background: require('../../../assets/images/background/bg-licence.png') }
      ],
      uploadButtons: [
        { text: '下一步', class: null, fn: this.registSubmit }
      ]
    }
  },
  components: {
    'upload-certificates': UploadCertificates,
    'tip-popup': Popup
  },
  methods: {
    uploadFail (err) {
      this.$refs['tip-popup'].tip(err.message)
    },
    registSubmit () {
      let uploadLists = this.uploadLists
      let file
      let key
      let falseItem
      let params = this.transfToJson(this.getLocalStorage(STATUS.BUSINESSREGIST)) || {}
      utils.forEach(uploadLists, item => {
        file = item.file
        key = item.key
        params[key] = file
        if (!file) {
          falseItem = item
          return 'break'
        }
      })
      if (falseItem) {
        this.$refs['tip-popup'].tip(falseItem.text)
      } else {
        this.$refs['tip-popup'].loading('请稍等，正在提交数据...')
        RegistService.enterpriseRegister(params).then(res => {
          let data = res.data
          if (data.success) {
            // 去公共流程状态页
            // this.routeTo(PagesRegist.router(PagesRegist.registLoginInfo), {
            //   query: {
            //     pageType: 'business'
            //   }
            // })
            this.$store.dispatch('processStatusStoreUpdate', {
              // 标题
              title: '注册',
              // 状态
              status: 'wait',
              // 结果
              result: '等待审核',
              // 备注
              remark: '已提交申请，请耐心等待审核',
              // 按钮
              buttons: [
                {
                  text: '完成，返回业务平台',
                  class: null,
                  fn: () => {
                    // 完成，返回业务平台
                    let returnUrl = this.getCookie(STATUS.REGISTRETURNURL)
                    if (returnUrl) {
                      window.location.href = returnUrl
                    }
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
    }
  },
  created () {
    this.setWebSiteTitle('上传证件照')
  }
}
