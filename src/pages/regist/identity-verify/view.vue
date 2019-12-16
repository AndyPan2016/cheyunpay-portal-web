<!--
 * 身份验证页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月14日18:27:54
-->

<template>
  <div class="page-main page-main-regist">
    <div class="indentity-verify-wrap icon-status-success">
      <div class="verify-result">审核成功</div>
      <div class="verify-result-remark">身份验证审核成功，15秒内将自动返回业务平台</div>
    </div>
    <div class="indentity-verify-wrap icon-status-wait">
      <div class="verify-result">等待处理</div>
      <div class="verify-result-remark">已提交申请，请耐心等待审核</div>
    </div>
    <div class="indentity-verify-wrap icon-status-fail">
      <div class="verify-result">审核失败</div>
      <div class="verify-result-remark">失败原因...</div>
    </div>
    <a href="javascript:;" class="ui-button button-reset">修改资料，重新验证身份</a>
    <a href="javascript:;" class="ui-button">完成，返回业务平台</a>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
