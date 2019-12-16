/**
 * 总资产 接口服务
 * @author AndyPan
 * @createdate 2019年10月7日00:12:11
 * @lastupdatedate 2019年9月25日10:35:41
 * @remark POS
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'queryAccountChangeResult', remark: '查询资金账户列表(详情页面的数据也来着这里带过去)' },
  { service: 'queryAccountChangeStatistic', remark: '查询用户收支总金额统计' },
  { service: 'queryAccountList', remark: '查询资金账户列表' }
]

export const totalAssetsService = StructureService(serviceGroups, 'portal/service/account/')
