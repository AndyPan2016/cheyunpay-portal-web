/**
 * Layout 总资产
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年8月21日13:53:08
 */

// let Header = PagesCommons.use(PagesCommons.header)

let render = {
  data () {
    return {
      // showHeader: false,
      currentComponent: null
    }
  },
  methods: {
    renderComponent () {
      let page = this.params('page') || PagesTotalAssets.index
      this.currentComponent = PagesTotalAssets.use(page)
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

export {
  render
}
