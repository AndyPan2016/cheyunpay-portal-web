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
              <input type="text" class="form-inp j-verify request phone" ref="j-verify-phone" placeholder="请输入手机号码" data-key="mobileNo" v-model="formData.mobileNo" />
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
            <span class="form-item-lab">企业名称</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入企业名称" data-key="comName" v-model="formData.comName" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">统一社会信用代码</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入统一社会信用代码" data-key="licenceNo" v-model="formData.licenceNo" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">企业对公户</span>
            <span class="form-item-inp">
              <!-- <input type="number" class="form-inp j-verify request bank-number" @blur="queryCardBin" placeholder="请输入对公户账号" data-key="bankCardNo" v-model="formData.bankCardNo" /> -->
              <input type="number" class="form-inp j-verify request bank-number" placeholder="请输入对公户账号" data-key="bankCardNo" v-model="formData.bankCardNo" />
            </span>
          </div>
          <div class="ui-form-item choose" @click="chooseBankCode">
            <span class="form-item-lab">银行简称</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请选择对公户银行简称" readonly="true" data-key="bankName" v-model="formData.bankName" />
            </span>
            <picker-popup ref="j-bankcode-popup" type="picker" :title="false"
              :picker="bankCodeList"
              secondTitle="请选择银行简称"
              :onSure="bankPickerSure"
              :onCancel="bankPickerCancel" />
            <!-- <span class="form-item-txt">{{formData.bankName}}</span> -->
            <!-- <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入对公户银行简称" data-key="bankCode" v-model="formData.bankCode" />
            </span> -->
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">法人姓名</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入法人姓名" data-key="legalRealName" v-model="formData.legalRealName" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">法人身份证号码</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request id-card" placeholder="请输入法人身份证号码" data-key="legalCertNo" v-model="formData.legalCertNo" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">法人手机号</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request phone" placeholder="请输入法人手机号码" data-key="legalMobileNo" v-model="formData.legalMobileNo" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">联系人姓名</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入联系人姓名" data-key="contactRealName" v-model="formData.contactRealName" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">联系人邮箱</span>
            <span class="form-item-inp">
              <input type="email" class="form-inp j-verify request email" placeholder="请输入联系人邮箱" data-key="contactEmail" v-model="formData.contactEmail" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">联系人手机号码</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request phone" placeholder="请输入联系人手机号码" data-key="contactMobileNo" v-model="formData.contactMobileNo" />
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
