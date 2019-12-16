<!--
 * 注册页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
    <div class="page-main page-main-apply">
      <my-forms ref="refMyForms"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">会员名称</span>
            <span class="form-item-txt">{{memberInfo.realName}}</span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">会员ID</span>
            <span class="form-item-txt">{{memberInfo.userNo}}</span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item" ref="j-shopName">
            <span class="form-item-lab">店铺名称</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入店铺名称" data-key="shopName" v-model="formData.shopName" />
            </span>
          </div>
          <div class="ui-form-item" ref="j-businessAddress">
            <span class="form-item-lab">营业地址</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request"  placeholder="请输入营业地址" data-key="businessAddress" v-model="formData.businessAddress" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item" ref="j-linkMan">
            <span class="form-item-lab">联系人姓名</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入联系人姓名" data-key="linkMan" v-model="formData.linkMan" />
            </span>
          </div>
          <div class="ui-form-item" ref="j-linkPhone">
            <span class="form-item-lab">联系电话</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request phone" placeholder="请输入联系人手机号码" data-key="linkPhone" v-model="formData.linkPhone" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">下一步，上传证件照片</a>
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
