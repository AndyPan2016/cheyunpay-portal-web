<!--
 * POS押金确认支付页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日10:56:20
-->

<template>
  <div class="page-main page-main-pos">
    <pos-list-item :dataset="posList" />
    <a href="javascript:;" class="ui-button">确认支付</a>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
