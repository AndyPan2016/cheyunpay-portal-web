/**
 * 全局配置
 * @author AndyPan
 * @createdate 2019年8月26日14:47:39
 * @lastupdatedate 2019年8月26日14:47:44
 * @remark 针对不同环境的相关配置项：api接口等信息
 */

let Lang = Configs.require(Configs.lang)
let Status = Configs.require(Configs.status)

// 当前环境
let environment = 'build'

// 环境配置
let envConfigs = {
  // 开发环境配置
  develop: {
    // api接口地址
    apiHost: '/api/'
    // apiHost: 'http://192.168.66.61:8082/'
    // 收银台
    // apiHost: 'http://192.168.66.52:8081/'
  },
  // 家中环境
  home: {
    // 接口请求地址
    apiHost: '/api/'
    // apiHost: 'http://192.168.55.51:8082/'
  },
  // 测试环境配置
  test: {},
  // 正式环境配置
  build: {
    // 接口请求地址
    apiHost: '/'
  }
}

// 当前配置
let environmentConfigs = envConfigs[environment]

// api host
export const APIHOST = environmentConfigs.apiHost

// 通用语言文本配置
export const LANG = Lang.default

// 通用状态配置
let thisStatus = {}
for (let key in Status.default) {
  thisStatus[key] = environment + '_' + Status.default[key]
}
export const STATUS = thisStatus
