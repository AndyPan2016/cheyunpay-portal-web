/**
 * Layout 中转页
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日22:11:14
 */

export default {
  data () {
    return {
      currentComponent: null
    }
  },
  methods: {
    renderComponent () {
      let page = this.params('page') || PagesTransfer.index
      this.currentComponent = PagesTransfer.use(page)
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
