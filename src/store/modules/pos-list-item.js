/**
 * 银行列表store模块
 * @author AndyPan
 * @createdate 2019年9月20日14:41:38
 * @lastupdatedate 2019年9月20日14:41:42
 * @remark
 */

export const PosListStore = {
  state: {
    posList: null,
    posStoreCallBack: null
  },
  getters: {
    getStatePosList (state) {
      return state
    }
  },
  mutations: {
    posListStoreUpdate (state, params) {
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
    posListStoreUpdate (context, params) {
      context.commit('posListStoreUpdate', params)
    }
  }
}
