/**
 * utils
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018-08-14 10:23:48
 */
let { STATUS } = Configs.require()

export const utils = {
  isTrue (attr) {
    return (attr === true || attr === 'true') ? 1 : 0
  },
  isFalse (attr) {
    return (attr === false || attr === 'false') ? 1 : 0
  },
  isString (str) {
    return (str && typeof (str) === 'string') ? 1 : 0
  },
  isFunction (fn) {
    return (fn && typeof (fn) === 'function') ? 1 : 0
  },
  isArray (ary) {
    try {
      return Object.prototype.toString.call(ary) === '[object Array]'
    } catch (e) {
      return false
    }
  },
  addClass (target, clas) {
    if (target && clas) {
      var className = target.getAttribute('class') || target.className
      if (className.indexOf(clas) < 0) {
        target.className += ' ' + clas
      }
    }
    return this
  },
  removeClass (target, clas) {
    if (target && clas) {
      var classNameAry = (target.getAttribute('class') || target.className).split(' ')
      let i = 0
      let len = classNameAry.length
      let item
      let tempClas = []
      for (; i < len; i++) {
        item = classNameAry[i]
        if (item !== clas) {
          tempClas.push(item)
        }
      }
      target.className = tempClas.join(' ')
    }
    return this
  },
  hasClass (target, clas) {
    if (target && clas) {
      var classNameAry = (target.getAttribute('class') || target.className).split(' ')
      let i = 0
      let len = classNameAry.length
      let item
      let status = false
      for (; i < len; i++) {
        item = classNameAry[i]
        if (item === clas) {
          status = true
          break
        }
      }
      return status
    }
  },
  isMobile () {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  },
  isWeixin () {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      return true
    } else {
      return false
    }
  },
  setWebSiteTitle (title) {
    if (title) {
      let websiteTarget = document.getElementById('j-website-title')
      if (websiteTarget) {
        websiteTarget.innerHTML = title
      }
      this.$store.dispatch('headerStoreUpdate', {title})
    }
    return this
  },
  headerBack (backText, onBack) {
    let params = typeof (backText) === 'function' ? { onBack: backText } : { backText, onBack }
    this.$store.dispatch('headerStoreUpdate', params)
    return this
  },
  headerBackStatus (status) {
    this.$store.dispatch('headerStoreUpdate', { back: status })
    return this
  },
  /**
   * 遍历数据
   * @param {*} data
   * @param {*} callBack
   */
  forEach (data, callBack) {
    let tempData = []
    if (data) {
      let item
      let cbResult
      for (let key in data) {
        item = data[key]
        if (callBack) {
          cbResult = callBack(item, key)
          if (cbResult === 'break') {
            tempData = 'break'
            break
          }
          if (cbResult) {
            tempData.push(cbResult)
          }
        }
      }
    }
    return tempData
  },
  /**
   * 异步遍历数据
   * @param {*} data
   * @param {*} cb
   * @param {*} last
   */
  asyncEach (data, cb, last) {
    if (data) {
      let i = 0
      let len = data.length
      let item
      let each = () => {
        item = data[i]
        if (cb) {
          cb(item, i)
        }
        i++
        if (i < len) {
          setTimeout(each, 0)
        } else {
          if (last) {
            last()
          }
        }
      }
      if (len) {
        each()
      } else if (last) {
        last()
      }
    }
  },
  // 获取Url地址的参数
  queryUrl (url, name) {
    // 获取url中"?"符后的字串
    var search = url ? url.substring(url.indexOf('?'), url.length) : location.search
    var result = null
    if (search.indexOf('?') !== -1) {
      result = {}
      var substr = search.substr(1)
      var strArray = substr.split('&')
      var i = 0
      var length = strArray.length
      var strArrayItem
      for (; i < length; i++) {
        strArrayItem = strArray[i].split('=')
        result[strArrayItem[0]] = unescape(strArrayItem[1])
      }
    }

    if (name && result) {
      result = result[name]
    }

    return result
  },
  /**
   * 获取路由参数
   * @param {String} key 参数名称，不写表示获取所有参数对象
   * @returns 获取到的参数或参数集合
   */
  params (key) {
    // let params = this.$route.params
    // let query = this.$route.query || {}
    // if (query) {
    //   params = params || {}
    //   for (let key in query) {
    //     params[key] = query[key]
    //   }
    // }
    // return key ? (params[key] || query[key]) : (params !== {} ? params : query)
    let params = this.$route.params || {}
    let query = this.$route.query || {}
    for (let key in query) {
      params[key] = query[key]
    }
    return key ? (params[key]) : params
  },
  /**
   * 跳转路由
   * @param {String} path 跳转的路由地址
   */
  routeTo (path, params) {
    if (path) {
      params = params || {}
      this.$router.push({path, query: params.query, params: params.params})
    }
    return this
  },
  /**
   * 设置本地存储
   * @param {*} key 需要设置本地存储的名称
   * @param {*} value 需要设置本地存储的值
   */
  setLocalStorage (key, value) {
    window.localStorage.setItem(key, value)
  },
  /**
   * 获取本地存储
   * @param {*} key 需要获取本地存储的名称
   */
  getLocalStorage (key) {
    return window.localStorage.getItem(key)
  },
  /**
   * 设置Cookie
   * @param {*} name 需要设置cookie的名称
   * @param {*} value 需要设置cookie的值
   */
  setCookie (name, value) {
    var Days = 30
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString()
  },
  /**
   * 获取Cookie
   * @param {*} name 需要获取cookie的名称
   */
  getCookie (name) {
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    var arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  /**
   * 删除cookies
   * @param {*} name 需要删除cookie的名称
   */
  delCookie (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(name)
    if (cval !== null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString()
    }
  },
  /**
   * 组装URL参数
   * @param options <any> 组装参数集合
   * @returns 组装后的URL
   */
  assembleUrlParams (options) {
    // 需要拼接参数的URL
    let url = options.url || window.location.href
    // 被组装的参数对象
    let params = options.params || {}
    // 判断原url中是否已经存在参数
    let hasParams = url.indexOf('?')

    let i = 0
    // 连接符
    let connector
    // 参数字符串
    let paramsString = ''
    for (let key in params) {
      connector = (i === 0 ? (hasParams > -1 ? '&' : '?') : '&')
      paramsString += connector + key + '=' + params[key]
      i++
    }

    return (url + paramsString)
  },
  /**
   * json字符串转json对象
   * @param {*} jsonString
   */
  transfToJson (jsonString) {
    let json = {}
    if (jsonString && jsonString !== 'undefined' && jsonString !== 'null') {
      jsonString = jsonString.substr(1, jsonString.length - 2)
      if (jsonString) {
        jsonString = jsonString.split(',')
        json = {}
        let jsonItem
        for (let i = 0, len = jsonString.length; i < len; i++) {
          jsonItem = jsonString[i].split('":')
          if (jsonItem[1].indexOf('{') > -1 && jsonItem[1].indexOf('}') > -1) {
            json[jsonItem[0].replace(/'/g, '').replace(/"/g, '')] = this.transfToJson(jsonItem[1])
          } else {
            json[jsonItem[0].replace(/'/g, '').replace(/"/g, '')] = jsonItem[1].replace(/'/g, '').replace(/"/g, '')
          }
        }
      } else {
        return {}
      }
    }

    return json
  },
  /**
   * 电话号码隐藏中间位数
   * @param {String} phone 电话号码
   */
  phoneEncryption (phone, options) {
    options = options || {}
    let defaults = {
      begin: options.begin || 3,
      end: options.end || 4,
      placeholder: options.placeholder || '*',
      phLength: options.phLength || 4
    }

    let result
    if (phone) {
      result = phone.substr(0, defaults.begin) + ' ' + (Array(defaults.phLength + 1).join(defaults.placeholder)) + ' ' + phone.substr(phone.length - defaults.end, phone.length)
    }

    return result
  },
  /**
   * 倒计时
   * @param {Object} options 参数选项
   */
  countDown (options) {
    options = options || {}
    let defaults = {
      // 倒计时秒数
      timer: options.timer || 10,
      // 倒计时函数
      fn: options.fn,
      // 倒计时完成回调函数
      callBack: options.callBack
    }

    let down = function () {
      if (defaults.fn) {
        defaults.fn(defaults.timer)
      }
      setTimeout(function () {
        defaults.timer--
        if (defaults.timer === 0) {
          if (defaults.callBack) {
            defaults.callBack(defaults.timer)
          }
        } else {
          if (defaults.fn) {
            defaults.fn(defaults.timer)
          }
          down()
        }
      }, 1000)
    }
    down()
  },
  /**
   * json合并
   * @param {Object} json1 合并的json对象
   * @param {Object} json2 被合并的json对象
   */
  mergeJSON (json1, json2) {
    for (let key in json2) {
      json1[key] = json2[key]
    }

    return json1
  },
  /**
   * 英文字符串首字母大写
   * @param {String} character 字符
   */
  firstUpperCase (character) {
    return character.charAt(0).toUpperCase() + character.slice(1)
  },
  /**
   * 英文字符串首字母小写
   * @param {String} character 字符
   */
  firstLowerCase (character) {
    return character.charAt(0).toLowerCase() + character.slice(1)
  },
  downloadFile (fileName, content) {
    let aLink = document.createElement('a')
    // new Blob([content]);
    let blob = this.base64ToBlob(content)

    let evt = document.createEvent('HTMLEvents')
    // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    evt.initEvent('click', true, true)
    aLink.download = fileName
    aLink.href = URL.createObjectURL(blob)

    // aLink.dispatchEvent(evt);
    // aLink.click()
    // 兼容火狐
    aLink.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}))
  },
  // base64转blob
  base64ToBlob (code) {
    let parts = code.split(';base64,')
    let contentType = parts[0].split(':')[1]
    let raw = window.atob(parts[1])
    let rawLength = raw.length

    let uInt8Array = new Uint8Array(rawLength)

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], {type: contentType})
  },
  getGid () {
    return (new Date()).getTime()
  },
  openHref (href) {
    window.location.href = href
  },
  transferMoney (money) {
    return (money ? money / 100 : 0).toFixed(2)
  },
  downloadFiles (options) {
    let fileName = options.fileName || '委托书[' + (new Date()).getTime() + ']'
    let filePath = options.path
    if (filePath) {
      let suffix = filePath.substring(filePath.lastIndexOf('.'), filePath.length)
      fileName = fileName + suffix
      let link = document.createElement('a')
      link.href = filePath
      link.download = fileName
      link.click()
    }
  },
  /**
   * 设置是否已经进入过收银台内部页面
   */
  delEntrtyInsidePage () {
    let isEntrtyInsidePage = this.getCookie(STATUS.ISENTRTYINSIDEPAGE)
    if (isEntrtyInsidePage === true || isEntrtyInsidePage === 'true') {
      this.delCookie(STATUS.ISENTRTYINSIDEPAGE)
    }
  }
}
