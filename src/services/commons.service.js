/**
 * POS 接口服务
 * @author AndyPan
 * @createdate 2019年9月25日10:35:38
 * @lastupdatedate 2019年9月25日10:35:41
 * @remark POS
 */

let { StructureService } = Services.require(Services.axiosService)
let { STATUS } = Configs.require()

let loginServiceGroups = [
  {
    // 服务名，也是api调用接口的方法名
    service: 'loginAuth',
    // 服务备注
    remark: '登录校验',
    // 接口请求类型，默认为post
    type: 'post',
    // 是否缓存接口返回的数据到Vuex的Store中
    vxStore: true,
    // 缓存接口返回字段中的某个或多个字段
    sync: {
      // entity.接口返回的对象key
      entity: {
        // userNo.需要缓存的字段，允许多层嵌套，最底层为最终需要缓存的字段名称
        // 如：响应返回的data下的entity下的userInfo下的userName，可以写成：sync: { entity: { userInfo: { userName: '被缓存的Key' } } }
        userNo: STATUS.USERNO
      }
    },
    header: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
  }
]

let registerTokenService = [
  // { service: 'registerTokenAuth', remark: '验签', type: 'post' }
  { service: 'registerTokenAuth', remark: '验签', type: 'post', header: { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } } }
]

let registServiceGroups = [
  { service: 'checkUserName', remark: '用户名校验（用于设置登录信息）', type: 'post' },
  { service: 'enterpriseRegister', remark: '企业用户注册', type: 'post' },
  { service: 'individualRegister', remark: '个体户注册', type: 'post' },
  { service: 'personRegister', remark: '个人用户注册', type: 'post' },
  { service: 'queryMemberRegisterInfo', remark: '查询注册信息', type: 'post' },
  { service: 'setLoginInfo', remark: '设置登录信息', type: 'post' },
  { service: 'sendSmsCaptcha', remark: '发送短信验证码' },
  { service: 'checkSmsCaptcha', remark: '短信验证码校验' },
  { service: 'queryCardBin', remark: '卡BIN查询 用户绑定银行卡时自动填充' },
  { service: 'queryBankCode', remark: '查询银行卡简称' }
]

let uploadServiceGroup = [
  { service: 'upload', remark: '文件上传', type: 'post', header: {'Content-Type': 'multipart/form-data'} }
]

export const registTokenService = StructureService(registerTokenService, 'portal/common/')
export const loginService = StructureService(loginServiceGroups, 'portal/common/')
export const registService = StructureService(registServiceGroups, 'portal/service/register/')
export const uploadService = StructureService(uploadServiceGroup, 'ofile/')
