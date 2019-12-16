<!--
 * 身份验证页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月14日18:27:54
-->

<template>
    <div class="page-main page-main-regist">
      <div :class="'indentity-verify-wrap icon-verify-' + status">
        <div class="verify-result">{{text}}</div>
        <div class="verify-result-remark">{{remark}}</div>
      </div>
      <a href="javascript:;" class="ui-button">{{complateBtnText}}</a>
    </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
