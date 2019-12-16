/**
 * 状态字段配置
 * @author AndyPan
 * @createdate 2019年8月26日14:50:33
 * @lastupdatedate 2019年8月26日14:50:37
 * @remark 全局静态字段名称
 */

export default {
  // partnerId
  PARTNERID: 'partnerId',
  // 用户信息
  USERINFO: 'userInfo',
  // 用户编号
  USERNO: 'userNo',
  // 当前账户ID
  ACCOUNTNO: 'accountNo',
  // 会员信息
  MEMBERINFO: 'memberInfo',
  // 委托绑定银行卡提交到下一步的数据保存
  ENTRUSTBINDBANK: 'entrustBindBank',
  // 个人注册第一步数据
  PERSONALREGIST: 'personalRegist',
  // 个体注册第一步数据
  INDIVIDUALREGIST: 'individualRegist',
  // 企业注册第一步数据
  BUSINESSREGIST: 'businessRegist',
  // 在线申请POS机第一步数据
  POSONLINEAPPLY: 'posOnlineApply',
  // 摆牌二维码物料申请
  ACMATERIELAPPLY: 'acMaterielApply',
  // 摆牌二维码物料申请-资料上传-经营场所
  BUSINESSACTIVITYINFO: 'businessActivityInfo',
  // 摆牌二维码物料申请-资料上传-实际控制人非法人照片上传
  HOLDCERTINFO: 'holdCertInfo',
  // 摆牌二维码物料申请-资料上传-收益所有人非法人照片上传
  BENEFICIARYCERTINFO: 'beneficiaryCertInfo',
  // paymentType:进件功能类型 AGGREGATE_PAY.聚合支付 CARD_PAY.摆牌支付
  PAYMENTTYPE: 'paymentType',
  MERCHUSERNO: 'merchUserNo',
  // 注册返回url
  REGISTRETURNURL: 'registReturnUrl',
  // 是否已经从中转页进入到收银台内页(如果已经进入，后退到中转页时就直接再后退，不再进行中转页的其他逻辑，防止后退到中转页持续中转页的逻辑)
  ISENTRTYINSIDEPAGE: 'isEntrtyInsidePage'
}
