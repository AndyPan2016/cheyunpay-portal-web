<!--
 * 重置绑定手机号页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日18:07:50
-->

<template>
    <div class="page-main page-main-regist">
      <my-forms ref="ref-forms-reset-phone"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">新手机号码</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request phone" :readonly="send" ref="j-verify-phone" placeholder="请输入新手机号码" data-key="phoneNumber" v-model="formData.phoneNumber" />
            </span>
          </div>
          <div class="ui-form-item lab3-txt7-remark">
            <span class="form-item-lab">手机验证码</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request number" data-close="false" placeholder="请输入验证码" data-key="verifyCode" v-model="formData.verifyCode" />
            </span>
            <a href="javascript:;" :class="'ui-button button-inline button-send-code' + (send ? ' button-disabled' : '')" @click="sendSmsCaptcha">{{sendBtnText}}</a>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit" ref="j-verify-submit">下一步</a>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-remark no-line-height">
          <div class="item-remark remark-bold">车云宝</div>
          <div class="item-remark">重庆车云数字科技股份有限公司</div>
          <div class="item-remark">重庆汽摩交易所有限公司</div>
        </div>
      </my-forms>
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
