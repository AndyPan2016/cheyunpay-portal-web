<!--
 * POS退款申请视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月29日17:33:20
-->

<template>
  <div class="page-main page-main-pos" @click="clickEvent">
    <data-set :dataset="dataset"
      dataComponent="pos-list-item"
      scrollClass="pos-list-scroll"
      :onScrollBottom="scrollBottomEvent">
      <div slot="dataset-common">
        <div class="assets-hd">
          <div class="total-assets-wrap">
            <div class="assets-label">POS押金总金额</div>
            <div class="assets-value">{{totalAmount}}</div>
          </div>
        </div>
        <div class="refund-remark">
          点击退款后，POS退款状态为处理中，不能再次退款触发后端审核不过
        </div>
      </div>
      <div class="pos-list-null" slot="dataset-null">暂无记录</div>
    </data-set>
    <tip-popup ref="tip-popup" />
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
