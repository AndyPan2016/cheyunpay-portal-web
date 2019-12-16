/**
 * 流程状态store模块
 * @author AndyPan
 * @createdate 2019年9月19日15:15:45
 * @lastupdatedate 2019年9月19日15:15:48
 * @remark
 */

export const ProcessStatusStore = {
  state: {
    // 标题
    title: '流程状态',
    // 状态(success.成功 wait.等待处理 fail.失败)
    status: 'success',
    // 结果
    result: '结果',
    // 备注
    remark: '备注',
    // 按钮
    buttons: [
      // { text: '修改资料，重新验证身份', class: 'button-reset', fn: null },
      { text: '完成', class: null, fn: null }
    ]
  },
  getters: {
    getStateProcessStatus (state) {
      return state
    }
  },
  mutations: {
    processStatusStoreUpdate (state, params) {
      if (params.stateKey) {
        state[params.stateKey] = params.storeValue
      } else {
        for (let key in params) {
          state[key] = params[key]
        }
      }
      if (state.callBack) {
        state.callBack(state)
      }
    }
  },
  actions: {
    processStatusStoreUpdate (context, params) {
      context.commit('processStatusStoreUpdate', params)
    }
  }
}
