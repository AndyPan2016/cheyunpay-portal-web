/**
 * checkbox JavaScript
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018年8月25日15:49:49
 */

let { utils } = Utils.require()

let render = {
  data () {
    return {
      // 是否选中
      isActive: false,
      // 文字
      chkText: 'checkbox',
      // 类型
      chkType: 'checkbox'
    }
  },
  props: [
    // 自定义Class
    'className',
    // 是否选中
    'checked',
    // 文字
    'text',
    // 类型（checkbox[默认]、radio）
    'type',
    // name(用于type=radio分组)
    'name',
    // 点击事件
    'onClick'
  ],
  methods: {
    chkBoxClick (e) {
      let target = this.$refs['myBox']
      if (!target) { return }
      let groupName = target.getAttribute('name')
      if (target.getAttribute('customevent')) {
        this.isActive = false
        target.setAttribute('customevent', '')
        return
      }
      if (groupName) {
        // 如果有分组，选中后点击不能取消选中，只能选择同组的其他元素来取消当前的选中，跟原生radio相同
        this.isActive = true
        let groups = window.radioGroup[groupName] || []
        // console.info(groups)
        let i = 0
        let lenI = groups.length
        let item
        for (; i < lenI; i++) {
          item = groups[i]
          if (item !== target) {
            item.setAttribute('customevent', true)
            item.click()
          }
        }
      } else {
        // 如果没有分组，可以选中也可以取消选中
        this.isActive = !this.isActive
      }
      let onClick = this.onClick
      if (utils.isFunction(onClick)) {
        onClick.call(target, e, this.isActive)
      }
    }
  },
  created () {
    let type = this.type
    this.chkType = type || this.chkType

    let text = this.text
    this.chkText = text === false ? '' : (text || this.chkType)
  },
  mounted () {
    let dom = this.$refs['myBox']
    let name = this.name
    if (name) {
      window.radioGroup = window.radioGroup || {}
      window.radioGroup[name] = window.radioGroup[name] || []
      let groups = window.radioGroup[name]
      let i = 0
      let lenI = groups.length
      let item
      let status = true
      for (; i < lenI; i++) {
        item = groups[i]
        if (item === dom) {
          status = false
          break
        }
      }
      if (status) {
        window.radioGroup[name].push(dom)
      }
    }
    let checked = this.checked
    if (checked) { dom.click() }
  }
}

export {
  render
}
