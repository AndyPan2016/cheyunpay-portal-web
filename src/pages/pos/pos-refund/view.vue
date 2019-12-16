<!--
 * POS退款申请-退款视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月29日17:50:50
-->

<template>
    <div class="page-main page-main-regist">
      <my-forms ref="refMyForms"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">POS机编号</span>
            <span class="form-item-txt">{{formData.posClientNo}}</span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">POS机押金金额</span>
            <span class="form-item-txt">￥{{formData.amount}}</span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">退款说明</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify" placeholder="请输入退款说明" data-key="refundReason" v-model="formData.refundReason" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="form-remark">是否确认对该机具进行退款</div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">退款</a>
          </div>
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
