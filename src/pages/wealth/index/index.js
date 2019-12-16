/**
 * 财富
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月29日22:35:01
 */

let Forms = Components.use(Components.forms)

export default {
  data () {
    return {}
  },
  components: {
    'member-form': Forms
  },
  methods: {
  },
  created () {
    this.setWebSiteTitle('财富')
  }
}
