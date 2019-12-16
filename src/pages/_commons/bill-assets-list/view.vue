<!--
 * 账单资产列表视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日16:23:51
-->

<template>
  <div class="bill-assets-list">
    <div class="bill-list-group" v-for="(group, idx) in (dataset || datasetStore)" :key="idx">
      <div class="bill-list-date" v-if="group.groupName">{{group.groupName}}</div>
      <div :class="'bill-list-item ' + (groupItem.status)"
        v-if="group.groups"
        v-for="(groupItem, gidx) in group.groups" :key="gidx">
        <div class="list-item-mask j-item-mask" :data-id="groupItem.id" :data-idx="gidx" v-if="groupItem.mask"></div>
        <div :class="'bill-item-title' + (' ' + groupItem.titleIcon)" v-if="groupItem.title">
          {{groupItem.title}}
          <label class="money" v-if="groupItem.titleRemark">{{groupItem.titleRemark}}</label>
        </div>
        <div :class="'bill-item-date' + (item.value ? ' date-complate' : '') + (' ' + item.status)"
          v-if="groupItem.list"
          v-for="(item, iidx) in groupItem.list"
          :key="iidx">
            {{item.text}}
            <label class="status" v-if="item.value">{{item.value}}</label>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
