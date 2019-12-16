/**
 * 银行账户管理
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月18日22:17:38
 */

let Forms = Components.use(Components.forms)
let { utils } = Utils.require()

export default {
  data () {
    return {
      // 当前组件
      currentComponent: null,
      // 选项卡及路由
      tabRoutes: [
        // { path: PagesMemberCenter.manageQuick, text: '快捷' },
        { path: PagesMemberCenter.manageWithdrawal, text: '提现' },
        { path: PagesMemberCenter.manageEntrustWithdrawal, text: '委托提现' }
      ]
    }
  },
  components: {
    'my-forms': Forms
  },
  methods: {
    tabClickEvent (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'tab-route-item')) {
        let route = target.getAttribute('data-route')
        if (route) {
          let currentRoute = this.$router.currentRoute
          this.$router.push({ path: currentRoute.path, query: { type: route } })
        }
      }
    },
    renderComponent () {
      let page = this.params('type') || PagesMemberCenter.manageQuick
      this.currentComponent = PagesMemberCenter.use(page)
      for (let key in this.tabRoutes) {
        this.tabRoutes[key].active = page === this.tabRoutes[key].path
      }
    }
  },
  watch: {
    '$route' () {
      this.renderComponent()
    }
  },
  created () {
    this.setWebSiteTitle('银行账户管理')
    this.renderComponent()
  }
}
