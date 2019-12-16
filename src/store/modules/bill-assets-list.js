/**
 * 银行列表store模块
 * @author AndyPan
 * @createdate 2019年9月20日14:41:38
 * @lastupdatedate 2019年9月20日14:41:42
 * @remark
 */

export const BillAssetsListStore = {
  state: {
    billAssetsList: null,
    billAssetsListStoreCallBack: null
  },
  getters: {
    getStateBillAssetsList (state) {
      return state
    }
  },
  mutations: {
    billAssetsListStoreUpdate (state, params) {
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
    billAssetsListStoreUpdate (context, params) {
      context.commit('billAssetsListStoreUpdate', params)
    }
  }
}
