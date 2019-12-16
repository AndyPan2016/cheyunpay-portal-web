<!--
 * 银行账户管理-绑定银行账户-委托提现页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
    <div class="page-main page-main-regist">
      <div class="ui-divider">
        <label class="divider-text">请绑定本人的银行账户</label>
      </div>
      <my-forms ref="ref-forms-entrust-bind-card"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">持卡人</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入持卡人姓名" data-key="cardUserName" v-model="formData.cardUserName" />
            </span>
          </div>
          <div class="ui-form-item lab3-txt7">
            <span class="form-item-lab">卡号</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request number bank-number" @change="bankNumberChange" placeholder="请输入银行卡号" data-key="cardNumber" v-model="formData.cardNumber" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">银行</span>
            <span class="form-item-txt">{{bankName}}</span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">身份证号</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request id-card" placeholder="请输入绑定银行账户身份证号" data-key="idNumber" v-model="formData.idNumber" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">预留手机号码</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request phone" ref="j-verify-phone" placeholder="请输入银行卡预留手机号" data-key="phoneNumber" v-model="formData.phoneNumber" />
            </span>
          </div>
          <div class="ui-form-item lab3-txt7-remark">
            <span class="form-item-lab">手机验证码</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request number" placeholder="请输入验证码" data-close="false" data-key="verifyCode" v-model="formData.verifyCode" />
            </span>
            <a href="javascript:;" :class="'ui-button button-inline button-send-code' + (send ? ' button-disabled' : '')" @click="sendSmsCaptcha">{{sendBtnText}}</a>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">下一步</a>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-remark no-line-height">
          <div class="item-remark remark-bold">车云宝</div>
          <div class="item-remark">重庆车云数字科技股份有限公司</div>
          <div class="item-remark">重庆汽摩交易所有限公司</div>
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
