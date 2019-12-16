/**
 * 银行列表store模块
 * @author AndyPan
 * @createdate 2019年9月20日14:41:38
 * @lastupdatedate 2019年9月20日14:41:42
 * @remark
 */

export const BankListStore = {
  state: {
    // 银行卡列表
    bankList: null,
    // onUnBind
    onUnBind: null,
    bankListStoreCallBack: null
  },
  getters: {
    getStateBankList (state) {
      return state
    }
  },
  mutations: {
    bankListStoreUpdate (state, params) {
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
    bankListStoreUpdate (context, params) {
      context.commit('bankListStoreUpdate', params)
    }
  }
}
