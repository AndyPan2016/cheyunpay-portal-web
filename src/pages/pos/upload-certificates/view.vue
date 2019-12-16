<!--
 * 上传证件页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月25日15:47:59
-->

<template>
  <div class="page-main page-main-certificates">
    <upload-certificates
      ref="j-upload-certificates"
      :uploadList="uploadLists"
      :buttons="uploadButtons"
      :uploadFail="uploadFail" />
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
