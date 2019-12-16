/**
 * Scroll组件级 JavaScript
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月23日13:50:38
 */

export default {
  data () {
    return {
      uiScroll: null,
      uiScrollTarget: null,
      uiScrollWrap: null,
      uiScrollWrapTarget: null,
      currentScrollWrapHeight: null,
      isRun: false
    }
  },
  props: {
    // 距离底部多少时触发滚动到底部的事件
    scrollBottomSpace: { type: Number, default: 100 },
    // 自定义滚动事件
    onScroll: { type: Function },
    // 自定义滚动到底部事件
    onScrollBottom: { type: Function }
  },
  methods: {
    scrollEvent (e) {
      let scrollTop = this.uiScrollTarget.scrollTop
      let scrollHeight = this.uiScrollTarget.offsetHeight
      let scrollWrapHeight = this.uiScrollWrapTarget.offsetHeight
      if (!this.currentScrollWrapHeight || (this.currentScrollWrapHeight !== scrollWrapHeight)) {
        this.isRun = false
        this.currentScrollWrapHeight = scrollWrapHeight
      }
      // 滚动事件
      if (this.onScroll) this.onScroll.call(this.uiScrollTarget, e, { scrollTop, scrollHeight, scrollWrapHeight })
      // 滚动到底部事件
      if (this.onScrollBottom) {
        if (scrollTop + scrollHeight >= scrollWrapHeight - this.scrollBottomSpace && !this.isRun) {
          this.onScrollBottom.call(this.uiScrollTarget, e, { scrollTop, scrollHeight, scrollWrapHeight })
          this.isRun = true
        }
      }
    }
  },
  created () {
    let dateTime = (new Date()).getTime()
    this.uiScroll = 'ui-scroll-' + dateTime
    this.uiScrollWrap = 'ui-scroll-wrap-' + dateTime
  },
  mounted () {
    this.uiScrollTarget = this.$refs[this.uiScroll]
    this.uiScrollWrapTarget = this.$refs[this.uiScrollWrap]
  }
}
