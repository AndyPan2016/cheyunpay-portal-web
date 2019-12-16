<!--
 * 摆牌二维码交易记录 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月28日15:31:42
-->

<template>
  <div class="page-main page-bill-list" @click="clickEvent">
    <div :class="'bill-search-wrap' + (queryParams.merchTwoNumCode ? ' height-plus' : '')">
      <select-search placeholder="状态" class="select-search"
        type="default"
        :options="statusOptions"
        :onChange="statusChangeEvent" />
      <select-search placeholder="二维码ID" class="select-search"
        type="group-picker"
        :pickerTitle="codeSecondTitle"
        :title="false"
        :options="qrcodeID"
        :onChange="qrcodeIDChangeEvent"
        :onClear="qrcodeIDClearEvent" />
      <select-search placeholder="完成时间" class="select-search"
        :status="complateDateStatus"
        type="year-month"
        :pickerTitle="pickerSecondTitle"
        :onChange="complateDateChangeEvent"
        :onClear="complateDateClearEvent" />
    </div>
    <data-set :dataset="dataset"
      dataComponent="bill-assets-list"
      :scrollClass="scrollClass"
      :onScrollBottom="scrollBottomEvent">
      <div class="bill-assets-null" slot="dataset-null">暂无交易记录</div>
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
