/**
 * 文本及状态配置
 * @author AndyPan
 * @createdate 2019年8月26日14:47:39
 * @lastupdatedate 2019年8月26日14:47:44
 * @remark 通用提示文本等
 */

export default {
  // 空文本
  placeholderText: '无',
  // 账号类型
  accountType: {
    'NORMAL': { key: 'NORMAL', text: '普通账户' },
    'INACCOUNT': { key: 'INACCOUNT', text: '入金账户' }
  },
  // 会员类型
  memberType: {
    'PERSON': { key: 'PERSON', text: '个人' },
    'BUSINESS': { key: 'BUSINESS', text: '企业' },
    'INDIVIDUAL': { key: 'INDIVIDUAL', text: '个体户' },
    'OPERATOR': { key: 'OPERATOR', text: '运营商' }
  },
  // 注册状态
  registStatus: {
    'VALID_SUCCESS': { key: 'VALID_SUCCESS', text: '审核成功', type: 'success' },
    'VALID_FAIL': { key: 'VALID_FAIL', text: '审核失败', type: 'fail' },
    'VALID_NO': { key: 'VALID_NO', text: '无需审核', type: 'success' },
    'VALID_ING': { key: 'VALID_ING', text: '等待初审', type: 'wait' },
    'RE_CHECK': { key: 'RE_CHECK', text: '等待复审', type: 'wait' },
    'success': { key: 'VALID_SUCCESS', text: '注册成功', type: 'success' },
    'failure': { key: 'VALID_FAIL', text: '注册失败', type: 'fail' },
    'processing': { key: 'VALID_ING', text: '处理中', type: 'wait' }
  },
  // 认证状态
  authStatus: {
    'AUTH_NO': { key: 'AUTH_NO', text: '未认证' },
    'AUTH_ING': { key: 'AUTH_ING', text: '认证中' },
    'AUTH_OK': { key: 'AUTH_OK', text: '已认证' },
    'AUTH_FAIL': { key: 'AUTH_FAIL', text: '认证失败' }
  },
  // pos支付能力
  payStatus: {
    'OPEN_NO': { key: 'OPEN_NO', text: '未开通' },
    'OPEN_ING': { key: 'OPEN_ING', text: '开通中' },
    'OPEN_OK': { key: 'OPEN_OK', text: '开通成功' },
    'OPEN_FAIL': { key: 'OPEN_FAIL', text: '开通失败' }
  },
  // 注册端类型
  registType: {
    'PC': { key: 'PC', text: '电脑端' },
    'MOBILE': { key: 'MOBILE', text: '手机端' },
    'BOSS': { key: 'BOSS', text: '后台端' }
  },
  // 业务类型(非交易类验证需传)
  businessType: {
    register: { key: 'REGISTER', text: '用户注册' },
    setPassword: { key: 'SET_PASSWORD', text: '设置密码' },
    resetLoginPassword: { key: 'RESET_LOGIN_PASSWORD', text: '重置登录密码' },
    resetPayPassword: { key: 'RESET_PAY_PASSWORD', text: '重置支付密码' },
    resetMobileNo: { key: 'RESET_MOBILE_NO', text: '重置手机号码' },
    bindBankCard: { key: 'BIND_BANK_CARD', text: '绑定银行卡' }
  },
  // 绑卡类型
  bindType: {
    standard: { key: 'STANDARD', text: '标准提现' },
    entrust: { key: 'ENTRUST', text: '委托提现' }
  },
  // 绑卡用途
  bindPurpose: {
    deduct: { key: 'DEDUCT', text: '代扣' },
    withdraw: { key: 'WITHDRAW', text: '提现' }
  },
  // 卡种
  bankCardType: {
    'ALL': { key: 'ALL', text: '所有卡种' },
    'DEBIT_CREDIT': { key: 'DEBIT_CREDIT', text: '借贷一体' },
    'PREPAID': { key: 'PREPAID', text: '预付费卡' },
    'SEMI_CREDIT': { key: 'SEMI_CREDIT', text: '准贷记卡' },
    'DEBIT_CARD': { key: 'DEBIT_CARD', text: '借记卡' },
    'CREDIT_CARD': { key: 'CREDIT_CARD', text: '贷记卡' },
    'COMPANY_CARD': { key: 'COMPANY_CARD', text: '企业账户' }
  },
  // 第三方绑定类型
  thirdpartyBindType: {
    'WECHAT': { key: 'WECHAT', text: '微信' },
    'QQ': { key: 'QQ', text: 'QQ' }
  },
  // 微信绑定状态
  wechatBindStatus: {
    'DO_BIND': { key: 'DO_BIND', text: '已绑定', status: true },
    'NOT_BIND': { key: 'NOT_BIND', text: '未绑定', status: false }
  },
  // POS申请状态
  posApplyStatus: {
    'INIT': { key: 'INIT', text: '初始状态', status: 'status-primary' },
    'PROCESSING': { key: 'PROCESSING', text: '支付中', status: 'status-primary' },
    'SUCCESS': { key: 'SUCCESS', text: '交易成功', status: 'status-success' },
    'FAIL': { key: 'FAIL', text: '交易失败', status: 'status-error' },
    'CANCEL': { key: 'CANCEL', text: '交易撤销', status: 'status-primary' },
    'REFUND': { key: 'REFUND', text: '交易退款', status: 'status-primary' },
    'CLOSE': { key: 'CLOSE', text: '交易关闭', status: 'status-primary' }
  },
  // POS激活状态
  posActivateStatus: {
    'ACTIVATE_OK': { key: 'ACTIVATE_OK', text: '已激活', status: 'status-primary' },
    'ACTIVATE_NO': { key: 'ACTIVATE_NO', text: '未激活', status: 'status-error' },
    'ALREADY_RETURN': { key: 'ALREADY_RETURN', text: '已返还', status: 'status-primary' }
  },
  // POS状态
  posStatus: {
    0: { key: '0', text: '正常' },
    1: { key: '1', text: '禁用' }
  },
  // pos押金状态
  posDepositStatus: {
    'OK': { key: 'OK', text: '已确认' },
    'NO': { key: 'NO', text: '未确认' },
    'CANCEL': { key: 'CANCEL', text: '无押金' },
    'RETURN': { key: 'RETURN', text: '已退还' }
  },
  // 账单进出类型
  changeDirection: {
    'IN': { key: 'IN', text: '入金', symbol: '+', status: 'txt-status-default' },
    'OUT': { key: 'OUT', text: '出金', symbol: '-', status: 'txt-status-error' },
    'KEEP': { key: 'KEEP', text: '不变', symbol: '', status: 'txt-status-default' }
  },
  // 交易订单类型
  tradeOrderType: {
    'DEPOSIT_NET': { key: 'DEPOSIT_NET', text: '网银充值' },
    'DEPOSIT_OFFLINE': { key: 'DEPOSIT_OFFLINE', text: '离线充值' },
    'WITHDRAW': { key: 'WITHDRAW', text: '提现' },
    'WITHDRAW_ENTRUST': { key: 'WITHDRAW_ENTRUST', text: '委托提现' },
    'BALANCE_PAY': { key: 'BALANCE_PAY', text: '余额支付' },
    'NET_DEPOSIT_PAY': { key: 'NET_DEPOSIT_PAY', text: '网银支付' },
    'POS_ONLINE_PAY': { key: 'POS_ONLINE_PAY', text: 'pos在线支付' },
    'POS_OFFLINE_PAY': { key: 'POS_OFFLINE_PAY', text: 'pos离线支付' },
    'OFFLINE_PAY': { key: 'OFFLINE_PAY', text: '线下支付' },
    'TRADE_REFUND': { key: 'TRADE_REFUND', text: '交易退款' },
    'PROTOCOL_PAY': { key: 'PROTOCOL_PAY', text: '协议支付' },
    'WECHAT_PUBLIC_PAY': { key: 'WECHAT_PUBLIC_PAY', text: '微信公众号支付', icon: 'icon-record-wx' },
    'WECHAT_BEI_SCAN_PAY': { key: 'WECHAT_BEI_SCAN_PAY', text: '微信付款码支付', icon: 'icon-record-wx' },
    'WECHAT_ZHU_SCAN_PAY': { key: 'WECHAT_ZHU_SCAN_PAY', text: '微信扫码支付', icon: 'icon-record-wx' },
    'WECHAT_MINI_PAY': { key: 'WECHAT_MINI_PAY', text: '微信小程序支付', icon: 'icon-record-wx' },
    'ALI_LIFE_PAY': { key: 'ALI_LIFE_PAY', text: '支付宝生活号', icon: 'icon-record-zfb' },
    'ALI_ZHU_SCAN_PAY': { key: 'ALI_ZHU_SCAN_PAY', text: '支付宝扫码支付', icon: 'icon-record-zfb' },
    'ALI_BEI_SCAN_PAY': { key: 'ALI_BEI_SCAN_PAY', text: '支付宝款码支付', icon: 'icon-record-zfb' },
    'NET_DEPOSIT_REFUND': { key: 'NET_DEPOSIT_REFUND', text: '充值充退' },
    'NET_DEPOSIT_PAY_REFUND': { key: 'NET_DEPOSIT_PAY_BACK', text: '网银支付充退' },
    'WECHAT_PAY_REFUND': { key: 'WECHAT_PAY_BACK', text: '微信支付退款', icon: 'icon-record-wx' },
    'ALI_PAY_REFUND': { key: 'ALI_PAY_BACK', text: '支付宝支付退款', icon: 'icon-record-zfb' },
    'TRADE_PROFIT': { key: 'TRADE_PROFIT', text: '交易清分' },
    'TRADE_SPLIT_ACCOUNT': { key: 'TRADE_SPLIT_ACCOUNT', text: '交易分账' },
    'TRANSFER': { key: 'TRANSFER', text: '站内转账' }
  },
  // 交易状态
  tradeStatus: {
    'INIT': { key: 'INIT', value: 'INIT', text: '初始状态' },
    'PROCESSING': { key: 'PROCESSING', value: 'PROCESSING', text: '支付中' },
    'SUCCESS': { key: 'SUCCESS', value: 'SUCCESS', text: '交易成功' },
    'FAIL': { key: 'FAIL', value: 'FAIL', text: '交易失败' },
    'CANCEL': { key: 'CANCEL', value: 'CANCEL', text: '交易撤销' },
    'REFUND': { key: 'REFUND', value: 'REFUND', text: '交易退款' },
    'CLOSE': { key: 'CLOSE', value: 'CLOSE', text: '交易关闭' }
  },
  // 资金交易状态
  fundStatus: {
    'INIT': { key: 'INIT', value: 'INIT', text: '初始状态' },
    'PROCESSING': { key: 'PROCESSING', value: 'PROCESSING', text: '处理中' },
    'SUCCESS': { key: 'SUCCESS', value: 'SUCCESS', text: '交易成功' },
    'FAIL': { key: 'FAIL', value: 'FAIL', text: '交易失败' },
    'CLOSE': { key: 'CLOSE', value: 'CLOSE', text: '交易关闭' }
  },
  // 资金交易类型
  fundOrderType: {
    'DEPOSIT': { key: 'DEPOSIT', value: 'DEPOSIT', text: '充值' },
    'WITHDRAW': { key: 'WITHDRAW', value: 'WITHDRAW', text: '提现' },
    'ADVANCE_WITHDRAW': { key: 'ADVANCE_WITHDRAW', value: 'ADVANCE_WITHDRAW', text: '垫资提现' }
  },
  // 开通状态
  openStatus: {
    'OPEN_NO': { key: 'OPEN_NO', text: '未开通' },
    'OPEN_ING': { key: 'OPEN_ING', text: '开通中' },
    'OPEN_OK': { key: 'OPEN_OK', text: '开通成功' },
    'OPEN_FAIL': { key: 'OPEN_FAIL', text: '开通失败' }
  }
}
