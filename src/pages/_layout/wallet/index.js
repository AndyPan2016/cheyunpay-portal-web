/**
 * Layout 钱包
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
      let page = this.params('page') || PagesWallet.index
      this.currentComponent = PagesWallet.use(page)
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
