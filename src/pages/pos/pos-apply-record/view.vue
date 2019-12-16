<!--
 * POS申请记录页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日11:33:14
-->

<template>
  <div class="page-main page-main-pos" @click="clickEvent">
    <data-set :dataset="dataset"
      dataComponent="pos-list-item"
      scrollClass="pos-list-scroll"
      :onScrollBottom="scrollBottomEvent">
      <div class="pos-list-null" slot="dataset-null">暂无申请记录</div>
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
