import Vue from 'vue'
import Router from 'vue-router'
require('@/configs/module')
// import PageIndex from '@/pages/_layout/index/view.vue'
// import NotFound from '@/pages/_commons/404/view.vue'
// import Test from '@/pages/_commons/test/view.vue'
// let { utils } = Utils.require()
// let { STATUS } = Configs.require()
let PageIndex = PagesLayout.use(PagesLayout.index)
let NotFound = PagesCommons.use(PagesCommons['404'])
let Test = PagesCommons.use(PagesCommons.test)

let LayoutBill = PagesLayout.use(PagesLayout.bill)
let LayoutLayQRCode = PagesLayout.use(PagesLayout.layQRCode)
let LayoutMemberCenter = PagesLayout.use(PagesLayout.memberCenter)
let LayoutPOS = PagesLayout.use(PagesLayout.pos)
let LayoutRegist = PagesLayout.use(PagesLayout.regist)
let LayoutTotalAssets = PagesLayout.use(PagesLayout.totalAssets)
let LayoutTransfer = PagesLayout.use(PagesLayout.transfer)
let LayoutWallet = PagesLayout.use(PagesLayout.wallet)
let LayoutWealth = PagesLayout.use(PagesLayout.wealth)
let LayoutCommon = PagesLayout.use(PagesLayout.common)

Vue.use(Router)

// 路由配置
const routes = [
  // 首页
  {
    path: '/',
    name: 'PageIndex',
    component: PageIndex
  },
  // 测试
  {
    path: '/test',
    name: 'Test',
    component: Test,
    remark: '组件测试',
    pages: {
      test: { key: '', text: '组件测试' }
    }
  },
  // Layout-中转页
  {
    path: '/layout-transfer/:page',
    name: 'LayoutTransfer',
    component: LayoutTransfer,
    remark: '中转页',
    key: 'PagesTransfer'
  },
  // Layout-账单
  {
    path: '/layout-bill/:page',
    name: 'LayoutBill',
    component: LayoutBill,
    remark: '账单',
    key: 'PagesBill'
  },
  // Layout-摆牌二维码
  {
    path: '/layout-lay-qrcode/:page',
    name: 'LayoutLayQRCode',
    component: LayoutLayQRCode,
    remark: '摆牌二维码',
    key: 'PagesLayQRCode'
  },
  // Layout-会员中心
  {
    path: '/layout-member-center/:page',
    name: 'LayoutMemberCenter',
    component: LayoutMemberCenter,
    remark: '会员中心',
    key: 'PagesMemberCenter'
  },
  // Layout-Pos管理
  {
    path: '/layout-pos/:page',
    name: 'LayoutPOS',
    component: LayoutPOS,
    remark: 'Pos管理',
    key: 'PagesPos'
  },
  // Layout-注册
  {
    path: '/layout-regist/:page',
    name: 'LayoutRegist',
    component: LayoutRegist,
    remark: '注册',
    key: 'PagesRegist'
  },
  // Layout-总资产
  {
    path: '/layout-total-assets/:page',
    name: 'LayoutTotalAssets',
    component: LayoutTotalAssets,
    remark: '总资产',
    key: 'PagesTotalAssets'
  },
  // Layout-钱包
  {
    path: '/layout-wallet/:page',
    name: 'LayoutWallet',
    component: LayoutWallet,
    remark: '钱包',
    key: 'PagesWallet'
  },
  // 财富
  {
    path: '/layout-wealth/:page',
    name: 'LayoutWealth',
    component: LayoutWealth,
    remark: '财富',
    key: 'PagesWealth'
  },
  // 公共模块、页面
  {
    path: '/layout-common/:page',
    name: 'LayoutCommon',
    component: LayoutCommon,
    // remark: '公共模块',
    key: 'PagesCommons'
  },
  // 404
  { path: '*', component: NotFound }
]

;((routes, win) => {
  let i = 0
  let len = routes.length
  let route
  let key
  for (; i < len; i++) {
    route = routes[i]
    key = route.key
    if (key) {
      if (win[key]) {
        ((route) => {
          win[key]['router'] = (name) => {
            return route.path.replace(':page', name || 'index')
          }
        })(route)
        route['pages'] = win[key].fileName
      }
    }
  }
})(routes, window)

// 创建router对路由进行管理，由构造函数 new Router()创建，接收routes参数
const router = new Router({
  // mode: 'history',
  routes: routes
})

// 路由拦截器
router.beforeEach((to, from, next) => {
  // let userNo = utils.getCookie(STATUS.USERNO)
  // if (!userNo && to.path !== '/' && to.path !== '/layout-transfer/index' && to.path !== '/layout-common/process-status') {
  //   next({path: '/layout-transfer/index'})
  // } else {
  //   next()
  // }
  next()
})

export default router
