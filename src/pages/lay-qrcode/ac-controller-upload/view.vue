<!--
 * 实际控制人非法人照片上传视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月1日22:39:13
-->

<template>
  <div class="page-main page-main-certificates">
    <upload-certificates
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
