<!--
 * 重置绑定手机号页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
    <div class="page-main page-reset-phone">
      <div class="reset-pay-pwd">
        <div class="pwd-wrap">
          <div class="pwd-panel-remark">为了您账户的安全</div>
          <div class="pwd-panel-remark">请联系客服重置联系人绑定手机号</div>
          <div class="panel-phone">
            <label class="phone icon-reset-phone">400-023-9555</label>
          </div>
        </div>
        <div class="btn-wrap">
          <a href="javascript:;" class="ui-button" @click="complateReset">完成</a>
        </div>
      </div>
    </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
