<!--
 * 账单列表 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月22日15:00:43
-->

<template>
    <div class="page-main page-bill-list" @click="clickEvent">
      <div class="tab-hd">
        <div class="tab-hd-wrap" @click="tabSwitch">
          <span :class="'tab-route-item' + (tab.active ? ' router-link-active' : '')"
            v-for="(tab, idx) in tabGroups" v-bind:key="idx" :data-id="idx"
            >{{tab.text}}</span>
        </div>
      </div>
      <div class="bill-search-wrap">
        <select-search ref="j-trade-status" placeholder="状态" class="select-search"
          v-if="tradeStatusSelect"
          :type="tradeStatusType"
          :options="statusOptions"
          :onChange="statusChangeEvent" />
        <select-search1 ref="j-trade-status" placeholder="状态" class="select-search"
          v-if="!tradeStatusSelect"
          :type="tradeStatusType"
          :options="statusOptions"
          :onChange="statusChangeEvent" />
        <select-search ref="j-begin-date" placeholder="创建时间" class="select-search"
          :status="createDateStatus"
          type="year-month"
          :pickerTitle="{title: '请选择查询日期' }"
          :onChange="createDateChangeEvent"
          :onClear="createDateClearEvent" />
        <select-search ref="j-end-date" placeholder="完成时间" class="select-search"
          :status="complateDateStatus"
          type="year-month"
          :pickerTitle="{title: '请选择查询日期' }"
          :onChange="complateDateChangeEvent"
          :onClear="complateDateClearEvent" />
      </div>
      <data-set :dataset="dataset"
        dataComponent="bill-assets-list"
        scrollClass="bill-assets-scroll"
        :onScrollBottom="scrollBottomEvent">
        <div class="bill-assets-null" slot="dataset-null">暂无账单记录</div>
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
