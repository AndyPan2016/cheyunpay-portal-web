<!--
 * 注册页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
    <div class="page-main page-main-regist">
      <div class="ui-divider">
        <label class="divider-text">请确认是本人验证，验证成功后不可修改</label>
      </div>
      <my-forms ref="ref-forms-regist"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">注册手机号码</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request phone" ref="j-verify-phone" placeholder="请输入手机号码" data-key="phoneNumber" v-model="formData.phoneNumber" />
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
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">个体商户名称</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入商户名称" data-key="individualName" v-model="formData.individualName" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">统一社会信用代码</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入统一社会信用代码" data-key="creditCode" v-model="formData.creditCode" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">法人姓名</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入法人姓名" data-key="legalName" v-model="formData.legalName" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">法人身份证号码</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request id-card" placeholder="请输入法人身份证号码" data-key="legalIDNumber" v-model="formData.legalIDNumber" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">法人银行卡号</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request bank-number" placeholder="请输入法人银行卡号" data-key="legalBankNumber" v-model="formData.legalBankNumber" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">法人银行卡预留手机号</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request phone" placeholder="请输入银行卡预留手机号" data-key="legalPhoneNumber" v-model="formData.legalPhoneNumber" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">下一步，上传证件照片</a>
          </div>
        </div>
      </my-forms>
      <tip-popup ref="tip-popup"  />
    </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
