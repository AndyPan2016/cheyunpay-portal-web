/**
 * POS 接口服务
 * @author AndyPan
 * @createdate 2019年9月25日10:35:38
 * @lastupdatedate 2019年9月25日10:35:41
 * @remark POS
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'authTradePayRedirect.do', api: 'authTradePayRedirect', remark: '测试二维码', type: 'post' }
]

export const transferService = StructureService(serviceGroups, 'cashier/common/')
