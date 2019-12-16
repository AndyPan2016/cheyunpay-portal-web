/**
 * 下拉 JavaScript
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月22日17:38:38
 */

let Popup = Components.use(Components.popup)
// let SelectPopup = Components.use(Components.popup, false)
// let SelectPopupDate = Components.use(Components.popup, false)
let { utils } = Utils.require()

export default {
  data () {
    return {
      selectText: null,
      downupButton: null,
      selectStatus: null,
      dataType: null,
      ref: null
    }
  },
  props: {
    // 文字
    text: { type: String },
    // 占位
    placeholder: { type: String, defaults: '请选择' },
    // 状态(selected | disabled)
    status: { type: String },
    // 类型（default | date | year-month | time）
    type: { type: String, defaults: 'default' },
    // 标题
    pickerTitle: { type: Object },
    // 日期选择格式化
    pickerFormatter: { type: Function },
    // 如果是日期类型，日期的格式
    format: { type: String },
    // 选项
    options: { type: Array | Object },
    // 改变事件
    onChange: { type: Function },
    // 清除
    onClear: { type: Function }
  },
  components: {
    'select-popup': Popup
    // 'select-popup': SelectPopup,
    // 'select-popup-date': SelectPopupDate
  },
  // watch: {
  //   options () {
  //     // console.info(this.options)
  //     this.dataType = this.type
  //     let options = this.options
  //     if (options) {
  //       let that = this
  //       for (let key in options) {
  //         let fn = options[key].fn
  //         options[key].fn = (e, data) => {
  //           that.selectText = data.text
  //           that.selectStatus = data.value ? 'selected' : ''
  //           if (fn) fn(e, data)
  //           if (that.onChange) that.onChange(e, data)
  //         }
  //       }
  //     }
  //   }
  // },
  methods: {
    selectClickEvent (e) {
      let target = e.target || window.event
      if (utils.hasClass(target, 'ui-select') && !utils.hasClass(target, 'disabled')) {
        this.$refs[this.ref].open()
      }
    },
    pickerFormatterEvent (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    pickerSure (e, data, pickerDate) {
      let formatPickerDate
      if (this.type !== 'group-picker') {
        let year = pickerDate.getFullYear()
        let month = pickerDate.getMonth() + 1
        let day = pickerDate.getDate()
        formatPickerDate = year + '年' + month + '月' + day + '日'
        if (this.type === 'year-month') {
          formatPickerDate = year + '年' + month + '月'
        } else if (type === 'time') {
          formatPickerDate = pickerDate.getHours() + ':' + pickerDate.getMinutes()
        }
      } else {
        formatPickerDate = pickerDate.join(',')
      }
      this.selectText = formatPickerDate
      this.selectStatus = 'selected'
      if (this.onChange) this.onChange(e, data, pickerDate, formatPickerDate)
    },
    pickerCancel (status) {
      this.selectText = null
      this.selectStatus = null
      if (this.onClear && status !== false) {
        this.onClear()
      }
    }
  },
  created () {
    this.ref = ('j-select-popup-' + (this.type || 'default')) + (new Date().getTime())
    this.selectText = this.text
    let options = this.options
    if (options) {
      let that = this
      for (let key in options) {
        let fn = options[key].fn
        options[key].fn = (e, data) => {
          that.selectText = data.text
          that.selectStatus = data.value ? 'selected' : ''
          if (fn) fn(e, data)
          if (that.onChange) that.onChange(e, data)
        }
      }
    }
  }
}
