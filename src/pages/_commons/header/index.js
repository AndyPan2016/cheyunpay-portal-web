/**
 * 头部
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年8月21日14:03:27
 */

export default {
  data () {
    return { }
  },
  props: {
    // 标题
    title: { type: Boolean | String, default: '标题' },
    // 是否显示返回按钮
    back: { type: Boolean | String, default: true },
    // 返回按钮事件
    onBack: { type: Function }
  },
  methods: {
    /**
     * 返回上一页
     * @param {Object} e 点击事件
     */
    goBack (e) {
      let onBack = this.onBack
      if (onBack) {
        let eventResult = onBack(e)
        if (eventResult === false || eventResult === 'false') {
          return
        }
      }
      window.history.back()
    },
    watchRoute () {
      this.headerBackStatus(!(window.history.length <= 1 || window.history.state))
      // let type = this.params('type')
      // if (type === 'regist') {
      //   this.headerBack('不可返回', () => {
      //     alert('说了不能返回')
      //     return false
      //   })
      // } else {
      //   this.headerBack('返回')
      // }
    }
  },
  watch: {
    '$route' () {
      this.watchRoute()
    }
  },
  created () {
    this.watchRoute()
  }
}
