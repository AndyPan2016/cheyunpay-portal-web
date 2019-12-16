/**
 * Layout 财富
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月29日22:26:19
 */

export default {
  data () {
    return {
      currentComponent: null
    }
  },
  methods: {
    renderComponent () {
      let page = this.params('page') || PagesWealth.index
      this.currentComponent = PagesWealth.use(page)
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
