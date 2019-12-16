/**
 * 模块化配置
 * @version 2.0.1
 * @authors AndyPan (pye-mail@163.com)
 * @create  2016年9月12日14:47:20
 * @update  2019年8月22日14:54:46
 * @remark 以modulesConfigs(模块配置集合)中的Key作为模块的前提对象进行use(或require)该对象下的模块
 *         比如：一个项目根目录下的bll目录中有admin.js模块和user.js模块，那么，
 *         我们需要配置modulesConfigs.Blls[该Blls名称为自定义，该名称将作为一个全局变量使用，
 *         因此尽量以该目录(bll)的名字且首字母大写(注意不要与其他地方的名称重复，这个规则只是建议且好记住一点，实际根据自己情况而定，
 *         比如：系统模块关键字，如路由目录"Router",可以加's'或改为其他名称，避免与系统模块冲突)].path = '该目录(在这里我们
 *         以一个目录作为一个模块对象)的绝对路径'，这样配置好后，我们在项目的任何地方
 *         如果要使用bll目录下的admin.js或user.js，
 *         那么你可以这样：let adminBll = Blls.require('admin')或者let userBll = Blls.require('user')。
 *         如果你需要获取该模块的绝对路径：let adminPath = Blls.assemblePath('admin')或者let userPath = Blls.assemblePath('user')。
 *         如果是获取'.vue'文件，那么使用'use'方法，使用方式同上：(根据当前项目创建页面规则而定制的默认规则“页面目录下存放视图、视图样式和交互三个文件”，所以use的参数为目录名，use会自动获取该目录下的view.vue文件)
 *         如果需要获取pages下的_layout下的index视图(配置如下modulesConfigs)，那么你可以这样：let IndexView = PagesLayout.use('index')
 *         如果请求的文件有多个对象时：let test = Test.use('test.js')，使用时，test.test1,test.test2...或者let {test1, test2, ...} = Test.use('test.js')
 *         use与require都是同样的效果，不同点在于use是根据本项目创建页面文件规则而定制的，默认加载传入模块名下的'view.vue'文件，如需加载其他类型的文件加上后缀名即可
 *         而require是以默认语法规则即默认加载js文件，如需用于加载其他类文件，同样加上后缀名即可
 *         如果你的页面目录不是本项目的规则，那么直接加后缀名(.vue)即可，如：Test.use('XXX.vue')或者Test.require('XXX.vue')，两者皆可使用
 *
 * ******************************************************************************************************************
 *         最后，总结一下我们这样做的好处：
 *         1.页面非常的简洁，不存在大量长串的模块路径
 *         2.这些路径都统一配置在同一个地方，当我们项目结构需要调整时(注意，这点非常重要，一个项目难免会有目录结构的调整，有时候只是嫌麻烦而放弃了优化调整)，
 *           直接在配置中修改路径即可，无需在每个页面引用的地方去修改，减少了工作量，也提高了在修改过程中的容错率，提高工作效率（这也是我的亲身经历，
 *           当项目和目录结构发生变动，修改引用地方的路径非常麻烦，深有体会，于是写下了这段代码）
 *         3.无需担心这样的写法有什么不妥，因为同样是采用自带的语法-import和require去引用模块，只是在此基础之上封装了我们想要的效果，不会有任何影响
 *         4.对已经引用过的模块进行了缓存，下次使用可直接从缓存获取，无需再次调用系统的import或require(将会自动判断，如果有缓存，则返回缓存对象)
 *           也可修改配置不需要缓存，也可指定某一个模块不缓存
 */

/**
 * 模块别名对象封装
 * @param  {Object} modules 模块配置集合
 * @return {Object}         操作函数对象
 */
;(function () {
  // 模块文件路径配置
  let modulesConfigs = {
    // 静态资源
    Assets: { path: 'assets/' },
    // 图片资源
    AssetsImages: { path: 'assets/images/' },
    // less资源
    AssetsLess: { path: 'assets/less/' },
    // 组件
    Components: {
      path: 'components/',
      fileName: {
        checkbox: { key: 'checkbox', text: '选择框' },
        popup: { key: 'popup', text: '弹出框' },
        tabs: { key: 'tabs', text: '选项卡' },
        switchbox: { key: 'switchbox', text: '切换框' },
        forms: { key: 'forms', text: '表单' },
        passwordbox: { key: 'passwordbox', text: '密码框' },
        dataset: { key: 'dataset', text: '数据集合' },
        select: { key: 'select', text: '选择框' },
        scroll: { key: 'scroll', text: '滚动' }
      }
    },
    // 配置
    Configs: {
      path: 'configs/',
      fileName: { index: 'index.js', lang: 'lang.js', status: 'status.js' }
    },
    // 页面
    Pages: {
      path: 'pages/',
      route: true,
      fileName: {
        bill: { key: 'bill', text: '账单' },
        memberCenter: { key: 'member-center', text: '会员中心' },
        regist: { key: 'regist', text: '注册' },
        totalAssets: { key: 'total-assets', text: '总资产' },
        wallet: { key: 'wallet', text: '钱包' }
      }
    },
    // 账单
    PagesBill: {
      path: 'pages/bill/',
      fileName: {
        billList: { key: 'bill-list', text: '账单列表' },
        billDetail: { key: 'bill-detail', text: '账单详情' }
      }
    },
    // 摆牌二维码
    PagesLayQRCode: {
      path: 'pages/lay-qrcode/',
      fileName: {
        index: { key: 'index', text: '摆牌二维码' },
        myQRCode: { key: 'my-qrcode', text: '我的摆牌二维码' },
        qrcodeDetail: { key: 'qrcode-detail', text: '摆牌二维码详情' },
        qrcodeTransactionRecord: { key: 'qrcode-transaction-record', text: '摆牌二维码交易记录' },
        qrcodeTransactionDetail: { key: 'qrcode-transaction-detail', text: '摆牌二维码交易详情' },
        // 聚合收单
        acMaterielApply: { key: 'ac-materiel-apply', text: '摆牌二维码物料申请' },
        acEnterpriseUpload: { key: 'ac-enterprise-upload', text: '摆牌二维码物料申请-企业-上传照片' },
        acManageUpload: { key: 'ac-manage-upload', text: '经营场所照片上传' },
        acControllerUpload: { key: 'ac-controller-upload', text: '实际控制人非法人照片上传' },
        acOwnerUpload: { key: 'ac-owner-upload', text: '收益所有人非法人照片上传' }
      }
    },
    // 会员中心
    PagesMemberCenter: {
      route: true,
      path: 'pages/member-center/',
      fileName: {
        // 会员中心
        index: { key: 'index', text: '会员中心' },
        // 重置密码 - 第一步
        resetPwdFirstStep: { key: 'resetpwd-firststep', text: '重置密码 - 第一步' },
        // 重置密码 - 第二步
        resetPwdSecondStep: { key: 'resetpwd-secondstep', text: '重置密码 - 第二步' },
        // 重置密码 - 第三步
        resetPwdThirdStep: { key: 'resetpwd-thirdstep', text: '重置密码 - 第三步' },
        // 重置绑定手机号 - 企业
        resetPhoneBusiness: { key: 'resetphone-business', text: '重置绑定手机号 - 企业' },
        // 重置绑定手机号 - 第一步
        resetPhoneFirstStep: { key: 'resetphone-firststep', text: '重置绑定手机号 - 第一步' },
        // 重置绑定手机号 - 第二步
        resetPhoneSecondStep: { key: 'resetphone-secondstep', text: '重置绑定手机号 - 第二步' },
        // 重置绑定手机号 - 第三步
        resetPhoneThirdStep: { key: 'resetphone-thirdstep', text: '重置绑定手机号 - 第三步' },
        // 重置完成
        resetComplate: { key: 'reset-complate', text: '重置完成' },
        // 第三方绑定
        thirdpartyBind: { key: 'thirdparty-bind', text: '第三方绑定' },
        // 银行账户管理
        bankAccountManage: { key: 'bank-account-manage', text: '银行账户管理' },
        // 银行账户管理-快捷
        manageQuick: { key: 'manage-quick', text: '银行账户管理-快捷' },
        // 银行账户管理-提现
        manageWithdrawal: { key: 'manage-withdrawal', text: '银行账户管理-提现' },
        // 银行账户管理-委托提现
        manageEntrustWithdrawal: { key: 'manage-entrust-withdrawal', text: '银行账户管理-委托提现' },
        // 绑定银行卡(个人、个体)
        bindCard: { key: 'bind-card', text: '绑定银行卡(个人、个体)' },
        // 绑定银行卡(企业)
        bindCardBusiness: { key: 'bind-card-business', text: '绑定银行卡(企业)' },
        // 绑定银行卡(委托提现)
        bindCardEntrust: { key: 'bind-card-entrust', text: '绑定银行卡(委托提现)' },
        // 绑定银行卡-上传证件照(委托提现)
        uploadCertificatesEntrust: { key: 'upload-certificates-entrust', text: '绑定银行卡-上传证件照(委托提现)' },
        // 关于
        about: { key: 'about', text: '关于车云' }
      }
    },
    // POS
    PagesPos: {
      path: 'pages/pos/',
      fileName: {
        index: { key: 'index', text: 'POS管理' },
        posOnlineApply: { key: 'pos-online-apply', text: '在线申请POS机' },
        posOnlineApplyPay: { key: 'pos-online-apply-pay', text: '在线申请POS机-去支付' },
        uploadCertificates: { key: 'upload-certificates', text: '上传证件照片' },
        posDepositPay: { key: 'pos-deposit-pay', text: 'POS押金缴纳' },
        posDepositSure: { key: 'pos-deposit-sure', text: 'POS押金确认支付' },
        posApplyRecord: { key: 'pos-apply-record', text: 'POS申请记录' },
        posRecordDetail: { key: 'pos-record-detail', text: 'POS申请记录详情' },
        posRefundApply: { key: 'pos-refund-apply', text: 'POS退款申请' },
        posRefund: { key: 'pos-refund', text: 'POS退款申请-退款' }
      }
    },
    // 注册
    PagesRegist: {
      path: 'pages/regist/',
      fileName: {
        // 个人注册
        personalRegist: { key: 'personal-regist', text: '个人注册' },
        // 个人注册-上传资料
        personalRegistUpload: { key: 'personal-regist-upload', text: '个人注册-上传资料' },
        // 个体户注册
        individualRegist: { key: 'individual-regist', text: '个体户注册' },
        // 个体户注册-上传资料
        individualRegistUpload: { key: 'individual-regist-upload', text: '个体户注册-上传资料' },
        // 企业注册
        businessRegist: { key: 'business-regist', text: '企业注册' },
        // 企业注册-上传资料
        businessRegistUpload: { key: 'business-regist-upload', text: '企业注册-上传资料' },
        // 设置登录信息
        registLoginInfo: { key: 'regist-login-info', text: '设置登录信息' },
        // 身份验证
        identityVerify: { key: 'identity-verify', text: '身份验证' }
      }
    },
    // 总资产
    PagesTotalAssets: {
      path: 'pages/total-assets/',
      fileName: {
        index: { key: 'index', text: '总资产' },
        assetsList: { key: 'assets-list', text: '资产列表' },
        assetsDetail: { key: 'assets-detail', text: '资产详情' }
      }
    },
    // 中转页
    PagesTransfer: {
      path: 'pages/transfer/',
      fileName: {
        index: {
          key: 'index',
          text: '中转页',
          query: {
            'x-api-signType': 'MD5',
            'x-api-sign': 'd24f715ffc9f8dc02ada35603aa946a1',
            'body': '%7B%22code%22%3A%22SUCCESS%22%2C%22context%22%3A%22%22%2C%22detail%22%3A%22%E8%B7%B3%E8%BD%AC%E9%92%B1%E5%8C%85%E6%88%90%E5%8A%9F%22%2C%22ext%22%3A%7B%7D%2C%22message%22%3A%22%E6%88%90%E5%8A%9F%22%2C%22operatorNo%22%3A%2219092311080520110003%22%2C%22partnerId%22%3A%22test%22%2C%22protocol%22%3A%22JSON%22%2C%22requestNo%22%3A%2219100510182101400000%22%2C%22requestTime%22%3A%221570241901486%22%2C%22returnUrl%22%3A%22http%3A%2F%2Fwwww.baidu.com%22%2C%22service%22%3A%22walletRedirect%22%2C%22showTitle%22%3A%22yes%22%2C%22success%22%3Atrue%2C%22target%22%3A%22index%22%2C%22themeColor%22%3A%22FF0000%22%2C%22userNo%22%3A%2219092311080520110003%22%2C%22version%22%3A%221.0%22%7D',
            'gid': 'g5d97fd7218d2ca5530742f15'
          }
        }
      }
    },
    // 钱包
    PagesWallet: {
      path: 'pages/wallet/',
      fileName: {
        // 钱包首页
        index: { key: 'index', text: '钱包' },
        // 账号切换
        accountSwitch: { key: 'account-switch', text: '账户切换' }
      }
    },
    // 财富
    PagesWealth: {
      path: 'pages/wealth/',
      route: true,
      fileName: {
        // 首页
        index: { key: 'index', text: '财富首页' }
      }
    },
    // 公共页面
    PagesCommons: {
      path: 'pages/_commons/',
      route: true,
      fileName: {
        footer: 'footer',
        header: 'header',
        welcome: 'welcome',
        404: '404',
        test: 'test',
        // 钱包头部
        wallHead: 'wallet-head',
        // 流程状态
        processStatus: 'process-status',
        // 银行账户列表
        bankList: 'bank-list',
        // 证件上传
        uploadCertificates: 'upload-certificates',
        // pos列表
        posListItem: 'pos-list-item',
        // 账单资产列表
        billAssetsList: 'bill-assets-list',
        // 我的摆牌二维码列表
        qrcodeList: 'qrcode-list',
        // card-block
        cardBlock: 'card-block'
      }
    },
    // 页面布局
    PagesLayout: {
      path: 'pages/_layout/',
      route: true,
      fileName: {
        // 首页
        index: 'index',
        // layout-账单
        bill: 'bill',
        // layout-摆牌二维码
        layQRCode: 'lay-qrcode',
        // layout-会员中心
        memberCenter: 'member-center',
        // layout-pos管理
        pos: 'pos',
        // layout-注册
        regist: 'regist',
        // layout-总资产
        totalAssets: 'total-assets',
        // layout-中转
        transfer: 'transfer',
        // layout-钱包
        wallet: 'wallet',
        // 财富
        wealth: 'wealth',
        // 公共
        common: 'common'
      }
    },
    // 插件
    Plugins: { path: 'plugins/' },
    // 路由
    Router: { path: 'router/' },
    // 服务
    Services: {
      path: 'services/',
      fileName: {
        axiosService: 'axios.service.js',
        posService: 'pos.service.js',
        transferService: 'transfer.service.js',
        commonsService: 'commons.service.js',
        memberService: 'member.service.js',
        totalAssetsService: 'total-assets.service.js',
        billService: 'bill.service.js',
        cashierService: 'cashier.service.js'
      }
    },
    // vuex store
    Store: { path: 'store/' },
    // vuex store模块
    StoreModules: {
      path: 'store/modules/',
      fileName: {
        header: 'header.js',
        processStatus: 'process-status.js',
        bankList: 'bank-list.js',
        posListItem: 'pos-list-item.js',
        billAssetsList: 'bill-assets-list.js',
        qrcodeList: 'qrcode-list.js',
        response: 'response.js'
      }
    },
    // Utils工具
    Utils: {
      path: 'utils/',
      fileName: {
        city: 'city.js'
      }
    }
  }
  // 在require时，没有指定模块时，默认为index模块
  let defaultsModule = 'index'
  // 缓存，将加载过的模块缓存起来，下次直接使用
  let cache = {}
  // 是否需要缓存
  let isCache = true

  /**
   * 渲染配置
   */
  let renderConfigs = () => {
    for (let key in modulesConfigs) {
      window[key] = (function (key) {
        let configItem = modulesConfigs[key]
        let moduleConfigPath = configItem.path
        let fileName = {}
        let result = {}
        let nameItem
        let objItem
        let strItem
        for (let name in configItem.fileName) {
          nameItem = configItem.fileName[name]
          if (typeof (nameItem) === 'object') {
            strItem = nameItem.key
            objItem = nameItem
          } else if (typeof (nameItem) === 'string') {
            strItem = nameItem
            objItem = { key: nameItem, text: name }
          }
          fileName[name] = objItem
          result[name] = strItem
        }
        result.fileName = fileName

        // 是否生成路由路径
        if (configItem.route) {
          /**
           * 路由路径
           * @param {String} name 名称，比如要跳转至pages下的_layout下的index页面，PagesLayout.route('index')(或者如果担心index目录名称会变：PagesLayout.route(PagesLayout.index))
           * @returns {String} 返回路由路径
           */
          result.route = (name) => {
            return '/' + moduleConfigPath + name
          }
        }

        /**
         * 引用模块，默认为引用.vue的文件且此处以模块下的view.vue为默认文件（根据当前项目创建页面规则而定制的默认规则“页面目录下存放视图、视图样式和交互三个文件”），如需引用js、图片等其他文件则需加上后缀名
         * @param {String} moduleName 模块名称，默认为"index"
         * @param {Boolean} isCache 是否需要缓存，如果不需要则传入Boolean类型false或Number类型0(这时，如果已经有缓存，将自动帮你清除)，否则不传
         * @returns {Object} 获取到的模块对象
         */
        result.use = (moduleName, isCache) => {
          let lastIndexOf = moduleName.lastIndexOf('.')
          let suffix = lastIndexOf > 0 ? moduleName.substring(lastIndexOf + 1) : undefined
          return toUse(key, moduleName, (moduleConfigPath + (moduleName || defaultsModule) + (!suffix ? '/view.vue' : '')), isCache)
        }

        /**
         * 加载模块，与use原理一样，只是默认为加载js文件（如果不想加载js文件写后缀名，则可使用该方法代替use方法），如需加载js以外的其他文件则需加上后缀名
         * @param {String} moduleName 模块名称，默认为"index"
         * @param {Boolean} isCache 是否需要缓存，如果不需要则传入Boolean类型false或Number类型0(这时，如果已经有缓存，将自动帮你清除)，否则不传
         * @returns {Object} 获取到的模块对象
         */
        result.require = (moduleName, isCache) => {
          return toUse(key, moduleName, (moduleConfigPath + (moduleName || defaultsModule)), isCache)
        }

        /**
         * 清除缓存数据
         * @param {String} moduleName 模块名称（不填为清除当前key下的全部，当传入Boolean类型true或Number类型1时，为清空所有缓存）
         */
        result.clearCache = (moduleName) => {
          if (moduleName === true || moduleName === 1) {
            delCache()
          } else {
            delCache(key, moduleName)
          }
        }

        /**
         * 组合地址，用于获取模块的绝对路径
         * @param {String} fileName 文件名，需带后缀
         * @returns {String} 模块的绝对路径
         */
        result.assemblePath = (fileName) => {
          return './' + moduleConfigPath + '/' + (fileName)
        }

        return result
      })(key)
    }
  }

  /**
   * 设置缓存
   * @param {String} key 缓存Key
   * @param {String} moduleName 缓存模块名称
   * @param {Object} modules 缓存模块对象
   * @param {Boolean} isCacheParam 是否需要缓存，如果不需要则传入false，否则不传
   */
  let setCache = (key, moduleName, modules, isCacheParam) => {
    if (isCache && (isCacheParam !== false || isCacheParam !== 0)) {
      let moduleConfigPath = modulesConfigs[key].path
      cache[key] = cache[key] || {}
      cache[key][moduleConfigPath] = cache[key][moduleConfigPath] || {}
      cache[key][moduleConfigPath][moduleName] = modules
    } else {
      delCache(key, moduleName)
    }
  }

  /**
   * 获取缓存
   * @param {String} key 缓存Key
   * @param {String} moduleName 缓存模块名称
   * @returns {Object} 获取到的模块对象
   */
  let getCache = (key, moduleName) => {
    let moduleConfigPath = modulesConfigs[key].path
    return ((cache[key] || {})[moduleConfigPath] || {})[moduleName]
  }

  /**
   * 删除缓存
   * @param {String} key 缓存Key
   * @param {String} moduleName 缓存模块名称
   */
  let delCache = (key, moduleName) => {
    let moduleConfigPath = modulesConfigs[key].path
    if (key) {
      if (moduleName) {
        // 清除指定moduleName的缓存
        ((cache[key] || {})[moduleConfigPath] || {})[moduleName] = undefined
      } else {
        // 清除key下的所有缓存
        (cache[key] || {})[moduleConfigPath] = {}
      }
    } else {
      // 清除所有缓存
      cache = {}
    }
  }

  /**
   * 引用文件
   * @param {String} key 缓存Key
   * @param {String} moduleName 缓存模块名称
   * @param {String} path use路径
   * @param {Boolean} isCache 是否需要缓存，如果不需要则传入false，否则不传
   * @returns {Object} 获取到的模块对象
   */
  let toUse = (key, moduleName, path, isCache) => {
    let myModule = getCache(key, moduleName)
    if (!myModule) {
      let lastIndexOf = path.lastIndexOf('.')
      let suffix = lastIndexOf > 0 ? path.substring(lastIndexOf + 1) : undefined
      if (suffix !== 'vue') {
        myModule = require('@/' + path)
      } else {
        let isIn = checkInFile(moduleName, modulesConfigs[key], path)
        if (!isIn) {
          return onNotInFile(moduleName, path)
        } else {
          myModule = () => import('@/' + path)
        }
      }
      setCache(key, moduleName, myModule, isCache)
    }
    return myModule
  }

  /**
   * 检查引用的文件或模块是否存在(只有引用.vue的文件才会判断)
   * @param {String} name 名称
   * @returns {Boolean} true.存在 false.不存在
   */
  let checkInFile = (name, configItem) => {
    let fileName = configItem.fileName
    let isIn = false
    let fileObj
    for (let key in fileName) {
      fileObj = fileName[key]
      if (typeof (fileObj) === 'string') {
        if (fileObj === name) {
          isIn = true
          break
        }
      } else if (typeof (fileObj) === 'object') {
        if (fileObj.key === name) {
          isIn = true
          break
        }
      }
    }

    return isIn
  }

  /**
   * 没找到模块的操作
   * @param {String} name 模块名称
   * @param {String} path 模块路径
   */
  let onNotInFile = (name, path) => {
    let NotFound = PagesCommons.use(PagesCommons['404'])
    return NotFound
  }

  renderConfigs()
})()
