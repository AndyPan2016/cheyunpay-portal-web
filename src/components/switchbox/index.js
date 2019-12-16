/**
 * Switch JavaScript
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018年8月25日14:40:19
 */

let { utils } = Utils.require()

let render = {
  data () {
    return {
      // 是否选中
      isActive: false
    }
  },
  props: [
    // 自定义Class
    'className',
    // 是否选中
    'checked',
    // 绑定数据
    'dataId',
    // 切换事件
    'onSwitch',
    // 切换前事件
    'onSwitchBefore'
  ],
  methods: {
    boxClick (e) {
      e = e || window.event
      let target = e.target || e.srcElement
      let dataId = target.getAttribute('bind-data')

      let onSwitchBefore = this.onSwitchBefore
      if (utils.isFunction(onSwitchBefore)) {
        let result = onSwitchBefore.call(target, e, () => {
          this.isActive = !this.isActive
        }, this.isActive, dataId)
        if (result === false) {
          return
        }
      }

      this.isActive = !this.isActive

      let onSwitch = this.onSwitch
      if (utils.isFunction(onSwitch)) {
        onSwitch.call(target, e, this.isActive, dataId)
      }
    }
  },
  created () {
    this.isActive = this.checked !== undefined ? this.checked : this.isActive
  }
}

export {
  render
}
