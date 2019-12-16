/**
 * 流程状态
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月19日15:28:30
 */

let Popup = Components.use(Components.popup)
let { utils } = Utils.require()

export default {
  data () {
    return {
      processStatusButtons: this.$store.state.ProcessStatusStore.buttons
    }
  },
  components: {
    'tip-popup': Popup
  },
  methods: {
    /**
     * 流程状态页面按钮点击事件
     * @param {Event} e 点击事件对象
     */
    buttonsClickEvent (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'ui-button')) {
        let dataKey = target.getAttribute('data-key')
        let buttonItem = (this.processStatusButtons[dataKey] || {})
        let buttonItemFn = buttonItem.fn
        if (buttonItemFn) {
          buttonItemFn.call(target, e, this.$refs['tip-popup'])
        }
      }
    }
  },
  created () {
    if (this.$store.state.ProcessStatusStore.title !== false) {
      this.setWebSiteTitle(this.$store.state.ProcessStatusStore.title)
    }
  }
}
