/**
 * Header头部store模块
 * @author AndyPan
 * @createdate 2019年9月4日13:44:00
 * @lastupdatedate 2019年9月4日13:44:04
 * @remark
 */

export const HeaderStore = {
  state: {
    // 标题
    title: '标题',
    // 返回按钮文本
    backText: '返回',
    // 是否显示返回按钮
    back: true,
    // 返回事件
    onBack: null
  },
  getters: {
    getStateTitle (state) {
      return state.title
    }
  },
  mutations: {
    headerStoreUpdate (state, params) {
      if (params.stateKey) {
        state[params.stateKey] = params.storeValue
      } else {
        for (let key in params) {
          state[key] = params[key]
        }
      }
    }
  },
  actions: {
    headerStoreUpdate (context, params) {
      context.commit('headerStoreUpdate', params)
    }
  }
}
