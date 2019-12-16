<!--
 * 摆牌二维码物料申请视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月1日21:49:57
-->

<template>
    <div class="page-main page-main-apply">
      <my-forms ref="j-ref-form"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block no-margin">
          <div class="form-item-title">个体户申请聚合支付</div>
          <div class="ui-form-item lab3-txt7">
            <span class="form-item-lab">企业名称</span>
            <span class="form-item-txt">{{memberInfo.comName}}</span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">统一社会信用代码</span>
            <span class="form-item-txt">{{licenceNo}}</span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">经营者</span>
            <span class="form-item-txt">{{memberInfo.realName}}</span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">身份证</span>
            <span class="form-item-txt">{{certNo}}</span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block no-margin">
          <div class="form-item-title">填写店铺信息</div>
          <div class="ui-form-item">
            <span class="form-item-lab">店铺名称</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入店铺名称" data-key="shopName" v-model="formData.shopName" />
            </span>
          </div>
          <div class="ui-form-item choose lab3-txt7" @click="chooseCity">
            <span class="form-item-lab">店铺地址</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" ref="j-choose-address" readonly placeholder="请选择您的店铺地址" data-key="shopAddressStr" v-model="formData.shopAddressStr" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">街道信息</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入具体地址" data-key="shopAddress" v-model="formData.shopAddress" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">下一步，上传照片</a>
          </div>
        </div>
      </my-forms>
      <picker-popup ref="j-picker-city" type="picker" :title="false"
        :secondTitle="pickerCityTitle"
        :onSure="pickerCitySure"
        :cityLinkage="true"
        :onCancel="pickerCityCancel" />
    </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
