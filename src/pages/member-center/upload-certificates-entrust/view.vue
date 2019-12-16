<!--
 * 委托提现-绑定银行卡-上传证件照页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月20日11:50:04
-->

<template>
  <div class="page-main">
    <upload-certificates
      :uploadList="uploadLists"
      :buttons="uploadButtons"
      :uploadSuccess="uploadSuccess"
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
