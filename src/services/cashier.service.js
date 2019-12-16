/**
 * 跳收银台验签 接口服务
 * @author AndyPan
 * @createdate 2019年10月12日00:33:26
 * @lastupdatedate 2019年10月12日00:33:29
 * @remark
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'recharge', remark: '充值(用于钱包首页充值跳转)' },
  { service: 'tradePayRedirect', remark: '交易跳转收银台 (用于缴纳押金支付跳转收银台)' },
  { service: 'transferAccountRedirect', remark: '转账 (用于钱包首页转账跳转)' },
  { service: 'withdrawRedirect', remark: '提现跳转 (用于钱包首页提现跳转)' }
]

export const cashierService = StructureService(serviceGroups, 'portal/service/cashier/')
