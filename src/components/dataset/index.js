/**
 * 数据状态管理组件 JavaScript
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月19日16:26:02
 */

let Scroll = Components.use(Components.scroll)

export default {
  data () {
    return {
      // 数据为空占位组件
      datasetNullComponent: null,
      // 数据加载中占位组件
      datasetLoadingComponent: null,
      // 动态数据展示组件
      datasetComponent: null
    }
  },
  props: {
    scrollClass: { type: String },
    // 数据集合对象
    dataset: { type: Array | Object | String, default: null },
    // 数据为空时是否显示默认占位(当设置为true，优先展示默认，否则，如果datasetNullComponent存在则展示datasetNullComponent，插槽slot存在则展示slot)
    nullPlaceDefault: { type: Boolean, default: false },
    // 数据为空时的组件名称
    nullPlaceComponent: { type: String },
    // 数据加载中默认占位组件
    loadingPlaceDefault: { type: Boolean, default: true },
    // 数据加载中占位组件名称
    loadingPlaceComponent: { type: String },
    // 数据展示组件
    dataComponent: { type: String },
    // 列表滚动到底部事件
    onScrollBottom: { type: Function }
  },
  components: {
    'scroll-wrap': Scroll
  },
  methods: {
    /**
     * 渲染动态加载的组件
     */
    renderComponent () {
      if (this.nullPlaceComponent) {
        this.datasetNullComponent = PagesCommons.use(this.nullPlaceComponent)
      }
      if (this.loadingPlaceComponent) {
        this.datasetLoadingComponent = PagesCommons.use(this.loadingPlaceComponent)
      }
      if (this.dataComponent) {
        this.datasetComponent = PagesCommons.use(this.dataComponent)
      }
    },
    /**
     * 列表滚动到底部事件
     * @param {*} e
     * @param {*} res
     */
    scrollBottomEvent (e, res) {
      if (this.onScrollBottom) {
        this.onScrollBottom(e, res)
      }
    }
  },
  created () {
    this.renderComponent()
  }
}
