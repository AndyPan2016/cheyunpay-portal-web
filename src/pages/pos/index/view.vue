<!--
 * POS管理页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日09:57:59
-->

<template>
  <div class="page-main page-main-pos">
    <Forms class="wallet-cell-wrap" :dataset="formsDataset" :onClick="formClick"></Forms>
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
