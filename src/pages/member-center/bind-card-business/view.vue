<!--
 * 银行账户管理-绑定银行账户页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
    <div class="page-main page-main-regist">
      <div class="ui-divider">
        <label class="divider-text">请绑定本人的银行账户</label>
      </div>
      <my-forms ref="refMyForms"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item lab3-txt7">
            <span class="form-item-lab">账户名</span>
            <span class="form-item-txt">{{formData.accountName}}</span>
          </div>
          <div class="ui-form-item lab3-txt7">
            <span class="form-item-lab">账号</span>
            <span class="form-item-inp">
              <!-- <input type="number" class="form-inp j-verify request bank-number" placeholder="请输入银行账号" @change="bankNumberChange" data-key="bankNumber" v-model="formData.bankNumber" /> -->
              <input type="number" class="form-inp j-verify request" placeholder="请输入银行账号" data-key="bankNumber" v-model="formData.bankNumber" />
            </span>
          </div>
          <div class="ui-form-item choose" @click="chooseBankCode">
            <span class="form-item-lab">银行</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请选择银行" readonly="true" data-key="openingBank" v-model="formData.openingBank" />
            </span>
            <picker-popup ref="j-bankcode-popup" type="picker" :title="false"
              :picker="bankCodeList"
              secondTitle="请选择银行简称"
              :onSure="bankPickerSure"
              :onCancel="bankPickerCancel" />
            <!-- <span class="form-item-lab">银行</span>
            <span class="form-item-txt">{{formData.openingBank}}</span> -->
            <!-- <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" readonly placeholder="请选择您的开户行" data-key="openingBank" v-model="formData.openingBank" />
            </span> -->
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">支行名称</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入开户支行全称" data-key="bankName" v-model="formData.bankName" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">下一步，提交</a>
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
