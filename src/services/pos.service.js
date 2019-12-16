/**
 * POS 接口服务
 * @author AndyPan
 * @createdate 2019年9月25日10:35:38
 * @lastupdatedate 2019年9月25日10:35:41
 * @remark POS
 */

let { StructureService } = Services.require(Services.axiosService)

let serviceGroups = [
  { service: 'createPosApplyPayOrder', remark: '创建POS订单接口' },
  { service: 'createPosPledgePayApply', remark: '创建POS押金缴纳申请记录' },
  { service: 'createPosRefund', remark: '创建POS退款' },
  { service: 'posApply', remark: 'POS资料申请接口' },
  { service: 'queryPledgePayApplyById', remark: '查询POS押金缴纳申请记录' },
  { service: 'queryPosApply', remark: '查询POS资料申请记录接口' },
  { service: 'queryPosApplyPayOrder', remark: '查询POS订单接口(分页)' },
  { service: 'queryPosApplyPayOrderDetail', remark: '查询POS订单详情' },
  { service: 'queryPosPledgePayApply', remark: '查询POS押金缴纳申请记录' },
  { service: 'queryPosRefund', remark: '查询POS机退款列表', type: 'post' },
  { service: 'updatePosPledgePayApply', remark: '更新用户申请记录' }
]

export const posService = StructureService(serviceGroups, 'portal/service/pos/')
