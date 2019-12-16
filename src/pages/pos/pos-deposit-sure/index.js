/**
 * POS押金确认支付
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日10:55:57
 */

let PosListItemBlock = PagesCommons.use(PagesCommons.posListItem)

export default {
  data () {
    return {
      posList: [
        {
          head: { text: 'POS机押金在线缴纳', icon: 'icon-deposit-right' },
          body: {
            type: 'input-txt',
            groups: [
              { label: '共计', text: 3, remark: '台' }
            ]
          },
          status: {
            state: 'status-primary',
            groups: [
              { label: '需要缴纳押金金额', value: '￥5,000.00' }
            ]
          }
        }
      ]
    }
  },
  components: {
    'pos-list-item': PosListItemBlock
  },
  methods: {},
  created () {
    this.setWebSiteTitle('POS押金支付')
  }
}
