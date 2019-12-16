/**
 * 总资产
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月23日15:49:30
 */

let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
let Forms = Components.use(Components.forms)
let { MemberService } = Services.require()
let { STATUS } = Configs.require()

export default {
  data () {
    return {
      userNo: null,
      accountInfo: {}
    }
  },
  components: {
    'assets-form': Forms
  },
  methods: {
    renderChart () {
      var myChart = echarts.init(this.$refs['j-report-cont'])
      myChart.setOption({
        series: [{
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: function (params) {
                // 自定义颜色
                let colorList = [
                  // 4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                  // 第五个参数，数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置，0表示开始 1表示结束
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#43D4F9'}, {offset: 1, color: '#3A8FEC'}]),
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#FFC985'}, {offset: 1, color: '#FE5E76'}])
                ]
                return colorList[params.dataIndex]
              }
            }
          },
          data: [
            {value: (this.accountInfo.freeze)},
            {value: (this.accountInfo.availableBalance)}
          ]
        }]
      })
    },
    toAssetsList () {
      this.routeTo(PagesTotalAssets.router(PagesTotalAssets.assetsList))
    }
  },
  created () {
    this.setWebSiteTitle('总资产')
    this.userNo = this.getCookie(STATUS.USERNO)
  },
  mounted () {
    MemberService.queryAccountInfo({
      userNo: this.userNo
    }).then(res => {
      let data = res.data
      let entity = data.entity
      this.accountInfo = entity
      this.accountInfo.balance = this.transferMoney(entity.balance)
      this.accountInfo.freeze = this.transferMoney(entity.freeze)
      this.accountInfo.availableBalance = this.transferMoney(entity.availableBalance)
      this.renderChart()
    })
  }
}
