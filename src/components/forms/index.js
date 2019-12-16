/**
 * 表单元素及验证 JavaScript
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018年8月25日16:14:13
 */

// import { utils } from '@/utils'
let { utils } = Utils.require()

let render = {
  data () {
    return {
      // 表单元素
      myForm: undefined,
      // 表单数据
      myFormData: {},
      // 表单中被验证元素
      formTargets: undefined,
      // 表单被验证元素class标记
      verifyFlag: 'j-verify',
      // 所验证元素名，非这些元素的可以使用data-value属性来指定被验证值
      verifyNodeName: ['input', 'select', 'textarea'],
      // 表单某个元素验证失败时是否中断后面元素的验证，默认为true.中断
      isVeriyfFailureBreak: true,
      // 是否全部成功
      isVerifySuccessAll: true,
      // 验证相关属性
      verifyAttr: {dataValue: 'data-value', dataKey: 'data-key'},
      // 作为指定触发验证的按钮class
      verifyBtnClass: 'j-verify-submit',
      // 验证类型
      type: {
        // 必填
        'request': function (value, fn) {
          let target = this
          let targetType = target.type || target.getAttribute('type')
          let customMsg = fn.getMsg(target, 'request')

          let result = {status: true, message: customMsg.success || 'success'}

          if (targetType === 'radio' || targetType === 'checkbox') {
            result = fn.checkBoxVerify(target) || result
          } else {
            if (!value) {
              result = {
                status: false,
                message: customMsg.error || '必填'
              }
            }
          }

          return result
        },
        // 银行卡号
        'bank-number': {regular: /^([1-9]{1})(\d{15}|\d{18})$/, remark: '请输入正确的银行卡号'},
        // 手机
        // 11位数字，以1开头
        'phone': {regular: /^1\d{10}$/, remark: '手机号码格式不正确'},
        // 身份证
        'id-card': { regular: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/, remark: '请输入正确的身份证号' },
        // 座机
        // 验证规则：区号+号码，区号以0开头，3位或4位，号码由7位或8位数字组成，区号与号码之间可以无连接符，也可以“-”连接
        'telphone': {regular: /^0\d{2,3}-?\d{7,8}$/, remark: '座机号码格式不正确'},
        // 字母
        'letters': { regular: /^[A-Za-z]+$/, remark: '只能为字母' },
        // 正整数
        'int': { regular: /^[1-9]*[1-9][0-9]*$/, remark: '请输入正整数' },
        // 非零的正整数
        'non-zero-plus': {regular: /^\+?[1-9][0-9]*$/, remark: '非零的正整数'},
        // 非零的负整数
        /* eslint-disable */
        'non-zero-minus': {regular: /^\-?[1-9][0-9]*$/, remark: '非零的负整数'},
        // 正整数 + 0
        'non-minus': {regular: /^\d+$/, remark: '非负整数（正整数 + 0）'},
        // 负整数 + 0
        'non-plus': {regular: /^((-\d+)|(0+))$/, remark: '非正整数（负整数 + 0）'},
        // 数字
        'number': { regular: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/, remark: '请输入数字' },
        // 六位数字
        'number-6': {regular: /^\d{6}$/, remark: '六位数字'},
        // 至少六位数字
        'number-min-6': {regular: /^\d{6,}$/, remark: '至少六位数字'},
        // 六至十八位数字
        'number-6-18': {regular: /^\d{6,18}$/, remark: '六至十八位数字'},
        // 邮件
        /* eslint-disable */
        'email': { regular: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, remark: '请输入正确的邮件' },
        // 浮点数(两位有效数字)
        'float2': { regular: /^(-?\d+)(\.\d{1,2})?$/, remark: '请输入浮点数(两位有效数字)' },
        // 非空且保留一位小数
        'not-null-Float1': { regular: /^[0-9]+(\.[0-9]{1})?$/, remark: '非空且保留一位小数' },
        // 非空且保留两位小数
        'not-null-Float2': { regular: /^\\d{1,8}\\.{0,1}(\\d{1,2})?$/, remark: '非空且保留两位小数' },
        // 判断日期类型是否为YYYY-MM-DD格式的类型
        'date': {regular: /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, remark: '日期格式不正确'},
        // 判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型
        'date-time': {regular: /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, remark: '日期时间格式不正确'},
        // 判断日期类型是否为hh:mm:ss格式的类型
        /* eslint-disable */
        'time': {regular: /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, remark: '时间格式不正确'},
        // 判断输入的字符是否为中文
        'chinese': {regular: /^[\u0391-\uFFE5]+$/, remark: '只能为中文'}
      },
      clearValueFn: null
    }
  },
  props: [
    'dataset',
    'onClick',
    // 每个被验证元素在验证时的事件
    'onVerify',
    // 验证失败事件
    'onVerifyFailure',
    // 整个表单验证成功事件
    'onFormVerifySuccess',
    // 表单某个元素验证失败时是否中断后面元素的验证
    'isFailureBreak',
    // 自定义验证类型
    'verifyType'
  ],
  methods: {
    getMsg (target, key) {
      let errorMsg
      if (key === 'request') {
        errorMsg = target.getAttribute('data-request-msg') || target.getAttribute('placeholder')
      } else {
        errorMsg = target.getAttribute('data-error-msg')
      }
      let successMsg = target.getAttribute('data-success-msg')
      return {error: errorMsg, success: successMsg}
    },
    checkBoxVerify (target) {
      let formTargets = fn.formTargets || []
      let i = 0
      let lenI = formTargets.length
      let formTarget

      let result
      let boxAry = []
      let boxFirst
      let flag = 0
      let targetName = target.name || target.getAttribute('name')
      for (; i < lenI; i++) {
        formTarget = formTargets[i]
        if ((formTarget.name || formTarget.getAttribute('name')) === targetName) {
          // 保存同组（name相同）元素
          boxAry.push(formTarget)
          // 保存第一个元素，先关属性从第一个元素上获取
          if (!boxFirst) {
            boxFirst = formTarget
          }
          // 获取选中个数
          if (formTarget.checked) {
            flag++
          }
        }
      }
      if (flag <= 0) {
        result = {
          status: false,
          message: customMsg.error || '必选'
        }
      } else {
        //  如果有选中的项，再验证选中项个数限制
        var minLength = target.getAttribute('minlength')
        var maxLength = target.getAttribute('maxlength')
        // 长度判断
        if (minLength) {
          minLength = parseInt(minLength)
          if (flag < minLength) {
            result.status = false
            result.message = '至少需要选择#MIN#项'.replace('#MIN#', minLength)
          }
        }
        if (maxLength) {
          maxLength = parseInt(maxLength)
          if (flag > maxLength) {
            result.status = false
            result.message = '最多只能选择#MAX#项'.replace('#MAX#', maxLength)
          }
        }
      }
      return result
    },
    verify () {
      // 验证前清空表单数据对象
      this.myFormData = {}
      // 重置状态
      this.isVerifySuccessAll = true

      let formTargets = this.formTargets
      let verifyNodeName = this.verifyNodeName
      if (formTargets) {
        let i = 0
        let lenI = formTargets.length
        let target
        let nodeName
        let isMatch
        // 验证结构
        let result
        let verifyValue
        let verifyAttr = this.verifyAttr
        let dataKey
        for (; i < lenI; i++) {
          target = formTargets[i]
          nodeName = target.nodeName.toLowerCase()
          // 判断当前元素是否与指定类型的验证元素匹配
          isMatch = verifyNodeName.join('|').indexOf(nodeName)
          dataKey = target.getAttribute(verifyAttr.dataKey)
          if (isMatch > -1) {
            // 指定验证元素类型
            verifyValue = target.value
            result = this.verifyTarget(target, verifyValue)
          } else {
            // 非指定验证元素类型，验证data-value
            verifyValue = target.getAttribute(verifyAttr.dataValue)
            result = this.verifyTarget(target, verifyValue)
          }

          if (dataKey) {
            // 保存表单数据
            this.myFormData[dataKey] = verifyValue
          }
          // 每一个表单元素的验证事件
          let onVerify = this.onVerify
          if (utils.isFunction(onVerify)) {
            let eventResult = onVerify(target, verifyValue, result)
            result = eventResult || result
          }
          /** 定制开发 */
          // let formItem = target.parentNode.parentNode
          // utils.removeClass(formItem, 'error')
          /** 定制开发 */
          // 验证状态为false，
          if (!result.status) {
            // 设置所有验证成功状态为false
            this.isVerifySuccessAll = false
            // 验证失败事件
            let onVerifyFailure = this.onVerifyFailure
            let eventResult
            if (utils.isFunction(onVerifyFailure)) {
              /** 定制开发 */
              // utils.addClass(formItem, 'error')
              /** 定制开发 */
              eventResult = onVerifyFailure.call(target, verifyValue, result, target)
            }
            // 中断循环
            if (this.isVeriyfFailureBreak && eventResult !== 'continue') break
          }
        }
        if (this.isVerifySuccessAll) {
          // 所有验证成功
          let onFormVerifySuccess = this.onFormVerifySuccess
          if (utils.isFunction(onFormVerifySuccess)) {
            onFormVerifySuccess.call(this.myForm, this.myFormData)
          }
        }

        return {isVerifySuccessAll: this.isVerifySuccessAll, result: result}
      }
    },
    verifyTarget (target, verifyValue) {
      verifyValue = verifyValue || target.value || target.getAttribute(this.verifyAttr.dataValue)
      let result = { status: true, message: 'success' }
      let verifyType = this.type
      let type
      let customMsg
      for (let key in verifyType) {
        if (utils.hasClass(target, key)) {
          type = verifyType[key]
          customMsg = this.getMsg(target, key)
          if (type) {
            if (utils.isFunction(type)) {
              result = type.call(target, verifyValue, this)
            } else {
              result.status = new RegExp(type['regular']).test(verifyValue)
              result.message = result.status ? (customMsg.success || 'success') : (customMsg.error || type['remark'])
            }
          }

          if (!result.status) {
            target.focus()
            break
          }
        }
        if (verifyValue) {
          let minlength = target.getAttribute('minlength')
          if (minlength) {
            if (verifyValue.length < parseInt(minlength)) {
              result.status = false
              result.message = '最小长度为' + minlength
              if (!result.status) {
                target.focus()
                break
              }
            }
          }
        }
      }
      let formItem = target.parentNode.parentNode
      if (result.status) {
        utils.removeClass(formItem, 'error')
      } else {
        utils.addClass(formItem, 'error')
      }
      return result
    },
    verifyTargetSync (target, verifyValue) {
      setTimeout(() => {
        this.verifyTarget(target, verifyValue)
      }, 10)
    },
    formClick (e) {
      e = e || window.event
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'ui-form-item') && utils.hasClass(target, 'focus')) {
        if (this.clearValueFn) {
          this.clearValueFn(e)
        }
      }
      if (utils.hasClass(target, this.verifyBtnClass)) {
        this.verify()
      }
      if (utils.hasClass(target, 'ui-form-item') || utils.hasClass(target, 'form-item-lab') || utils.hasClass(target, 'form-item-txt')) {
        if (utils.hasClass(target, 'form-item-lab') || utils.hasClass(target, 'form-item-txt')) {
          target = target.parentNode
        }
        if (this.onClick) {
          let key = target.getAttribute('data-key')
          this.onClick(e, target, key)
        }
      }
    }
  },
  components: {
  },
  created () {
    // 表单某个元素验证失败时是否中断后面元素的验证，默认为true.中断
    this.isVeriyfFailureBreak = this.isFailureBreak !== undefined ? this.isFailureBreak : true
    // 自定义验证类型
    let verifyType = this.verifyType
    if (verifyType) {
      this.type = this.type || {}
      for (let key in verifyType) {
        this.type[key] = verifyType[key]
      }
    }
  },
  mounted () {
    // console.info(this)
    let slotFormBlock = this.$slots['form-block'] || this.$vnode
    this.myForm = slotFormBlock[0] ? slotFormBlock[0].elm.parentNode : undefined
    this.formTargets = this.myForm ? this.myForm.querySelectorAll('.' + this.verifyFlag) : []
    let that = this
    // 给输入框加清除内容操作
    for (let i = 0, len = this.formTargets.length; i < len; i++) {
      let target = this.formTargets[i]
      let targetName = (target.nodeName || '').toLowerCase()
      let type = target.type || target.getAttribute('type')
      if ((targetName === 'input' && (type === 'text' || type === 'password' || type === 'number')) || targetName === 'textarea') {
        let focusTarget = function (e) {
          if (!this.getAttribute('readonly') && this.getAttribute('data-close') !== 'false') {
            let parentNode = this.parentNode.parentNode
            utils.addClass(parentNode, 'focus')
            let target = this
            that.clearValueFn = () => {
              target.value = null
              that.clearValueFn = null
              utils.removeClass(parentNode, 'focus')
            }
          }
        }
        target.onfocus = focusTarget
        target.onclick = focusTarget
        target.onblur = function (e) {
          let parentNode = this.parentNode.parentNode
          // let value = this.value
          // if (!value) {
          setTimeout(() => {
            utils.removeClass(parentNode, 'focus')
          }, 80)
          // }
        }
        target.onkeyup = function (e) {
          that.verifyTarget(target)
        }
      }
    }
  }
}

export {
  render
}
