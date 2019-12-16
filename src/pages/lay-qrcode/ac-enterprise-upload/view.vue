<!--
 * 摆牌二维码物料申请-企业-上传照片视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月1日22:09:29
-->

<template>
    <div class="page-main page-main-apply">
      <my-forms ref="refMyForms"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item choose" @click="manageUploadEvent">
            <span class="form-item-lab">经营场所照片</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" readonly placeholder="待上传" data-key="manageUpload" v-model="formData.manageUpload" />
            </span>
          </div>
          <div class="ui-form-item choose" @click="controllerUploadEvent">
            <span class="form-item-lab">实际控制人非法人（可选）</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp" readonly placeholder="待上传" data-key="controllerUpload" v-model="formData.controllerUpload" />
            </span>
          </div>
          <div class="ui-form-item choose" @click="ownerUpload">
            <span class="form-item-lab">收益所有人非法人（可选）</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp" readonly placeholder="待上传" data-key="ownerUpload" v-model="formData.ownerUpload" />
            </span>
          </div>
        </div>
        <div slot="form-block" class="ui-form-block form-block-button">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">提交审核</a>
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
