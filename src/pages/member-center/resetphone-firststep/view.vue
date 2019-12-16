<!--
 * 重置绑定手机号页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
    <div class="page-main page-reset-phone">
      <div class="reset-pay-pwd">
        <div class="pwd-wrap">
          <div class="pwd-panel-title">请输入您的支付密码进行验证</div>
          <div class="pwd-panel-remark">支付密码验证失败，最多只能{{verifyPwdNumber}}次</div>
          <password-box :onComplate="pwdComplateEvent" :onChange="pwdChangeEvent" />
          <div class="pwd-panel-remark">请输入6位数字</div>
        </div>
        <div class="btn-wrap">
          <a href="javascript:;" class="ui-button">下一步</a>
        </div>
      </div>
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
