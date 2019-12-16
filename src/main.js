// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 淘宝弹性布局方案
import 'lib-flexible'
// 兼容IE Promise(安装、导入并调用即可)
import Promise from 'es6-promise'
import router from './router'
import App from './App'
import store from './store'
import { utils } from './utils'
import { Picker, DatetimePicker } from 'vant'
import 'vant/lib/index.css'
// let { MyTPlugins } = Plugins.require()
// console.info(MyTPlugins)
Vue.use(Picker)
Vue.use(DatetimePicker)
// Vue.use(MyTPlugins)
// 公共样式
// import './assets/less/commons.less'

Promise.polyfill()
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

for (let key in utils) {
  Vue.prototype[key] = utils[key]
}
