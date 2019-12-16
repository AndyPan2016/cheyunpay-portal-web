<!--
 * 注册页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
  <div class="page-main page-main-regist">
    <upload-certificates
      :uploadList="uploadLists"
      :buttons="uploadButtons"
      :uploadFail="uploadFail"
      :uploadSuccess="uploadSuccess" />
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
