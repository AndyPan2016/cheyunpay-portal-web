/**
 * Member(会员) 接口服务
 * @author AndyPan
 * @createdate 2019年9月30日11:44:34
 * @lastupdatedate 2019年9月30日11:44:40
 * @remark create
 */

let { StructureService } = Services.require(Services.axiosService)
let { STATUS } = Configs.require()

let serviceGroups = [
  { service: 'applyChannelPayment', remark: '申请渠道支付进件', type: 'post' },
  { service: 'bindClearCard', remark: '绑卡渠道清算卡，只能用于提现', type: 'post' },
  { service: 'bindWechat', remark: '微信绑定', type: 'post' },
  { service: 'checkCertNo', remark: '身份证号码校验', type: 'post' },
  { service: 'checkPayPassword', remark: '支付密码校验', type: 'post' },
  { service: 'checkSmsCaptcha', remark: '短信验证码校验', type: 'post' },
  { service: 'entrustBindCard', remark: '委托绑卡，用于汇付到他人卡', type: 'post' },
  { service: 'queryAccountInfo', remark: '查询用户资金账户信息', type: 'post', sync: { entity: { accountNo: STATUS.ACCOUNTNO } } },
  { service: 'queryBankCard', remark: '根据绑卡编码查询绑卡信息', type: 'post' },
  { service: 'queryBankCardList', remark: '根据会员编码查询绑卡列表', type: 'post' },
  { service: 'queryCardBin', remark: '卡BIN查询 用户绑定银行卡时自动填充', type: 'post' },
  { service: 'queryDimensionBarcode', remark: '查询二维码信息', type: 'post' },
  { service: 'queryDimensionBarcodeList', remark: '查询二维码列表信息', type: 'post' },
  { service: 'queryMemberAuthInfo', remark: '查询会员实名信息(用于申请pos的时候资料的自动填充)', type: 'post' },
  { service: 'queryMemberInfo', remark: '根据用户编码查询用户信息(用于登录后获取用户的信息)', type: 'post', vxStore: true, storage: { entity: STATUS.MEMBERINFO } },
  { service: 'queryThirdAuthInfo', remark: '第三方绑定信息查询', type: 'post' },
  { service: 'resetLoginPassword', remark: '登录密码重置', type: 'post' },
  { service: 'resetMemberMobile', remark: '手机号码重置', type: 'post' },
  { service: 'resetPayPassword', remark: '支付密码重置', type: 'post' },
  { service: 'sendSmsCaptcha', remark: '发送短信验证码', type: 'post' },
  { service: 'unbindBankCard', remark: '银行卡解绑', type: 'post' },
  { service: 'queryTrade', remark: '查询交易订单详情', type: 'post' },
  { service: 'queryTradePage', remark: '查询交易订单详情', type: 'post' },
  { service: 'queryPaymentInfo', remark: '查询会员支付进件信息' }
]

export const memberService = StructureService(serviceGroups, 'portal/service/member/')
