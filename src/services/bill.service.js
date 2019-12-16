/**
 * 账单 接口服务
 * @author AndyPan
 * @createdate 2019年10月7日20:22:30
 * @lastupdatedate 2019年10月7日20:25:12
 * @remark POS
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'queryTradePage', remark: '查询交易订单列表' },
  { service: 'queryTrade', remark: '查询交易订单详情' },
  { service: 'queryFundPage', remark: '查询批量充提记录' },
  { service: 'queryFund', remark: '查询单笔充提记录' }
]

export const billService = StructureService(serviceGroups, 'portal/service/trade/')
