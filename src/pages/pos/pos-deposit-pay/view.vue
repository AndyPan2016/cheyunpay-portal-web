<!--
 * POS押金缴纳页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月25日16:06:17
-->

<template>
  <div class="page-main page-main-pos">
    <pos-list-item :dataset="posList" />
    <a href="javascript:;" class="ui-button" @click="submitApply">提交申请</a>
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
