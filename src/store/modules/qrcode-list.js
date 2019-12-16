/**
 * 二维码列表store模块
 * @author AndyPan
 * @createdate 2019年9月27日13:52:16
 * @remark
 */

export const QRCodeListStore = {
  state: {
    qrcodeList: null,
    clickQRCodeStore: null,
    qrcodeListStoreCallBack: null
  },
  getters: {
    getStateQRCodeList (state) {
      return state
    }
  },
  mutations: {
    qrcodeListStoreUpdate (state, params) {
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
    qrcodeListStoreUpdate (context, params) {
      context.commit('qrcodeListStoreUpdate', params)
    }
  }
}
