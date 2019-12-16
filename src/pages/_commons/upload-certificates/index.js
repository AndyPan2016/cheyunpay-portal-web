/**
 * 上传证件
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月20日11:35:10
 */

let { UploadService } = Services.require()
let { utils } = Utils.require()
let { APIHOST } = Configs.require()

export default {
  data () {
    return {
      uploadListData: []
    }
  },
  props: {
    // 需要上传的证件列表
    // { text: '证件描述', background: '证件默认背景' }
    uploadList: { type: Array },
    // 按钮
    buttons: { type: Array | Object, default: () => { return [{ text: '下一步', class: null, fn: null }] } },
    // 文件改变事件
    changeFn: { type: Function },
    // 上传成功
    uploadSuccess: { type: Function },
    // 上传失败
    uploadFail: { type: Function }
  },
  methods: {
    resetList (list) {
      if (list) {
        this.uploadListData = list
      }
    },
    /**
     * 页面按钮点击事件
     * @param {Event} e 点击事件对象
     */
    buttonsClickEvent (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'ui-button')) {
        let dataIdx = target.getAttribute('data-idx')
        let buttonItemFn = (this.buttons[dataIdx] || {}).fn
        if (buttonItemFn) {
          buttonItemFn.call(target, e)
        }
      }
    },
    /**
     * 文件上传改变事件
     * @param {*} e
     */
    fileInpChange (e) {
      let target = e.target || e.srcElement
      let file = target.files[0]
      if (!file) {
        return
      }
      // 创建form对象
      let formData = new FormData()
      // 通过append向form对象添加数据
      formData.append('file', file)

      let dataIdx = target.getAttribute('data-idx')
      let listItem = this.uploadList[dataIdx]
      let listItemChange = listItem.changeFn
      let itemResult
      if (listItemChange) {
        itemResult = listItemChange(e, target, formData, listItem, dataIdx)
      }
      if (itemResult === false) {
        return
      }
      let changeResult
      if (this.changeFn) {
        changeResult = this.changeFn(e, target, formData, listItem, dataIdx)
      }
      if (changeResult === false) {
        return
      }
      let temp = []
      utils.forEach(this.uploadListData, (list) => {
        temp.push(list)
      })

      UploadService.upload(formData).then(res => {
        let data = res.data || {}
        if (data.success) {
          let rows = data.rows || []
          let fileItem = rows[0]
          let file
          if (fileItem) {
            file = (APIHOST ? APIHOST.substr(0, APIHOST.length - 1) : '') + fileItem.accessUrl
            // file = fileItem.accessUrl
            temp[dataIdx].file = file
            temp[dataIdx].background = file
            // 清除错误状态
            if (temp[dataIdx].status === 'error') {
              temp[dataIdx].status = undefined
            }
            this.uploadListData = temp
          }
          if (this.uploadSuccess) {
            this.uploadSuccess(file, rows, fileItem, dataIdx)
          }
        } else {
          if (this.uploadFail) {
            this.uploadFail(data)
          }
        }
      }).catch(err => {
        if (this.uploadFail) {
          this.uploadFail(err)
        }
      })
    }
  },
  watch: {
    uploadList () {
      this.uploadListData = this.uploadList
    },
    deep: true
  },
  created () {
    this.uploadListData = this.uploadList
  }
}
