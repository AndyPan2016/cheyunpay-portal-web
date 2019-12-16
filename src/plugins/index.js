/**
 * 插件
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月5日01:01:15
 */

let Popup = Components.use(Components.popup)

const MyPlugins = {}
MyPlugins.install = function (Vue, options) {
  const PopupInstance = Vue.extend(Popup)
  let popupTip = new PopupInstance()
  console.info(popupTip)

  Vue.prototype.$tip = function (msg) {
    console.info(msg)
  }
}

MyPlugins.props = {}

export const MyTPlugins = MyPlugins
