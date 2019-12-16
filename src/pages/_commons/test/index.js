/**
 * 测试
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月10日18:24:00
 */

let Popup = Components.use(Components.popup)
let Forms = Components.use(Components.forms)
let { utils } = Utils.require()

export default {
  data () {
    return {
      pickerData: [
        {
          values: ['A', 'B', 'C'],
          className: 'picker-one'
        },
        {
          values: ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'],
          className: 'picker-two'
        }
      ],
      pickerTitle: { title: 'Picker选择', remark: '支持多列显示' },
      datePickerTitle: { title: 'DatePicker选择' },
      downupButton: {
        text: {value: 0, text: '请选择操作', type: 'remark'},
        key1: {value: 1, text: 'key1', fn: function (e, data) { alert(JSON.stringify(data)) }},
        key2: {value: 2, text: '禁用', disabled: true, fn: function (e, data) { alert(JSON.stringify(data)) }},
        submit: {value: 3, text: 'submit', fn: function (e, data) { alert(JSON.stringify(data)) }},
        sure: {value: 4, text: '确定', fn: function (e, data) { alert(JSON.stringify(data)) }},
        cancel: {value: 5, text: '取消', fn: function (e, data) { alert(JSON.stringify(data)) }}
      },
      formData: {
        userName: null,
        testNumber: null,
        dateString: null,
        select1: null
      },
      verifyMsg: ''
    }
  },
  props: {},
  components: {
    'picker-popup': Popup,
    'date-picker-popup': Popup,
    'picker-button-popup': Popup,
    'base-popup': Popup,
    'tip-popup': Popup,
    'my-forms': Forms,
    'my-forms-verify': Forms
  },
  methods: {
    openPicker (e) {
      this.$refs['j-picker-popup'].open()
    },
    pickerSure (e, data, pickerDatas) {
      console.info(pickerDatas)
      this.formData.select1 = pickerDatas.join('-')
      this.$refs['refFormsVerify'].verifyTargetSync(this.$refs['j-choose-select1'])
    },
    pickerCancel (e) {
      console.info('picker cancel')
    },
    openDatePicker (e) {
      this.$refs['j-datepicker-popup'].open()
    },
    datePickerSure (e, data, pickerDate) {
      let year = pickerDate.getFullYear()
      let month = pickerDate.getMonth() + 1
      let day = pickerDate.getDate()
      let dateStr = year + '年' + month + '月' + day + '日'
      this.formData.dateString = dateStr
      this.$refs['refFormsVerify'].verifyTargetSync(this.$refs['j-choose-date'])
    },
    pickerFormatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    openPickerButton (e) {
      this.$refs['j-picker-button-popup'].open()
    },
    verifyFailureEvent (verifyValue, result, target) {
      let formItem = target.parentNode.parentNode
      utils.addClass(formItem, 'error')
      if (!result.status) {
        this.verifyMsg = result.message
      }
    },
    formVerifySuccessEvent (myFormData) {
      console.info(myFormData)
    },
    alert () {
      this.$refs['base-popup'].alert('alert', 'alert提示')
    },
    confirm () {
      this.$refs['base-popup'].confirm('confirm', 'confirm提示')
    },
    confirm1 () {
      this.$refs['base-popup'].confirm('confirm提示')
    },
    prompt () {
      this.$refs['base-popup'].prompt('prompt', 'prompt提示', (e, btnData, data) => {
        console.info(data)
      }, null, null, {
        request: true
      })
    },
    promptTip () {
      let refs = this.$refs
      this.$refs['base-popup'].prompt('prompt', 'prompt提示', (e, btnData, data) => {
        if (!data) {
          refs['tip-popup'].tip('请输入内容')
          return false
        }
      })
    },
    tip () {
      this.$refs['tip-popup'].tip('Tip 提示')
    },
    toast () {
      this.$refs['tip-popup'].toast('成功')
    }
  },
  watch: {},
  created () {}
}
