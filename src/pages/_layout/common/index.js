/**
 * Layout 公共
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月5日17:19:55
 */

export default {
  data () {
    return {
      currentComponent: null
    }
  },
  methods: {
    renderComponent () {
      let page = this.params('page') || PagesCommons.index
      this.currentComponent = PagesCommons.use(page)
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
