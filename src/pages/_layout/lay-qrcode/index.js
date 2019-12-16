/**
 * Layout 摆牌二维码
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日22:01:52
 */

// let Header = PagesCommons.use(PagesCommons.header)

export default {
  data () {
    return {
      // showHeader: false,
      currentComponent: null
    }
  },
  methods: {
    renderComponent () {
      let page = this.params('page') || PagesLayQRCode.index
      this.currentComponent = PagesLayQRCode.use(page)
    }
  },
  components: {
    // header: Header
  },
  watch: {
    '$route' () {
      this.renderComponent()
    }
  },
  created () {
    this.renderComponent()
  }
}
