/**
 * 所有接口服务
 * @author AndyPan
 * @createdate 2019年9月25日10:34:12
 * @lastupdatedate 2019年9月25日10:34:15
 * @remark 所有服务统一入口
 */

// 登录、注册服务
let { loginService, registService, uploadService, registTokenService } = Services.require(Services.commonsService)
// POS服务
let { posService } = Services.require(Services.posService)
// transfer服务
let { transferService } = Services.require(Services.transferService)
// 会员
let { memberService } = Services.require(Services.memberService)
// 总资产
let { totalAssetsService } = Services.require(Services.totalAssetsService)
// 账单
let { billService } = Services.require(Services.billService)
// 跳收银台验签服务
let { cashierService } = Services.require(Services.cashierService)

export const PosService = posService
export const TransferService = transferService
export const LoginService = loginService
export const RegistService = registService
export const MemberService = memberService
export const UploadService = uploadService
export const RegistTokenService = registTokenService
export const TotalAssetsService = totalAssetsService
export const BillService = billService
export const CashierService = cashierService
