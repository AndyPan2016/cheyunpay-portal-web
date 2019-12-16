<!--
 * 账单列表 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月22日15:00:43
-->

<template>
    <div class="page-main page-assets-list" @click="clickEvent">
      <div class="assets-search-wrap">
        <span class="assets-outline">
          <label class="outline-item"><label>收入</label>￥ {{income}}</label>
          <label class="outline-item"><label>支出</label>￥ {{expenditure}}</label>
        </span>
        <select-search placeholder="选择日期"
          class="select-search theme-white size-max box-shadow"
          :status="dateStatus"
          type="year-month"
          :pickerTitle="{ title: '请选择查询日期' }"
          :onChange="dateChangeEvent"
          :onClear="dateClearEvent" />
      </div>
      <data-set :dataset="dataset"
        dataComponent="bill-assets-list"
        scrollClass="bill-assets-scroll"
        :onScrollBottom="scrollBottomEvent">
        <div class="bill-assets-null" slot="dataset-null">暂无收支记录</div>
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
