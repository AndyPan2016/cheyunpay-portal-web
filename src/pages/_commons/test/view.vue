<!--
 * 页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月10日18:25:32
-->

<template>
    <div class="page-test">
      <div class="ui-divider">
        <label class="divider-text">请确认是本人验证，验证成功后不可修改</label>
      </div>
      <div class="ui-divider divider-error">
        <label class="divider-text">请确认是本人验证，验证成功后不可修改</label>
      </div>
      <my-forms ref="refForms" className="test-form">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">用户名</span>
            <span class="form-item-txt j-verify request" data-key="name1" data-value="abc">张三三</span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">数字</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request number" placeholder="请输入数字" data-key="number" />
            </span>
          </div>
          <div class="ui-form-item choose">
            <span class="form-item-lab">请选择</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp" readonly="true" placeholder="请选择" />
            </span>
          </div>
          <div class="ui-form-item choose">
            <span class="form-item-lab">已选择</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp" readonly="true" placeholder="请选择" value="已选择" />
            </span>
          </div>
          <div class="ui-form-item choose error">
            <span class="form-item-lab">错误</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp" readonly="true" placeholder="请选择" />
            </span>
          </div>
          <div class="ui-form-item item-icon icon-radio">
            <span class="form-item-lab">Radio</span>
          </div>
          <div class="ui-form-item item-icon icon-radio icon-radio-checked">
            <span class="form-item-lab">Radio Checked</span>
          </div>
        </div>
      </my-forms>
      <div class="button-wrap">
        <button class="ui-button">大按钮</button>
        <a class="ui-button">大按钮</a>
        <button class="ui-button button-reset">大按钮</button>
        <input type="button" class="ui-button button-reset" value="大按钮" />
        <button class="ui-button button-disabled">禁用</button>
        <a href="javascript:;" class="ui-button button-inline">小按钮-宽度自动</a>
        <a href="javascript:;" class="ui-button button-inline button-reset">小按钮</a>
        <a href="javascript:;" class="ui-button button-inline button-disabled">小按钮</a>
      </div>

      <div class="ui-divider" :class="verifyMsg ? 'divider-error' : ''">
        <label class="divider-text">{{ verifyMsg || '请确认是本人验证，验证成功后不可修改' }}</label>
      </div>
      <my-forms-verify ref="refFormsVerify"
         className="test-form"
         :onVerifyFailure="verifyFailureEvent"
         :onFormVerifySuccess="formVerifySuccessEvent">
        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item">
            <span class="form-item-lab">用户名</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp j-verify request" placeholder="请输入" data-key="userName" v-model="formData.userName" />
            </span>
          </div>
          <div class="ui-form-item">
            <span class="form-item-lab">数字</span>
            <span class="form-item-inp">
              <input type="number" class="form-inp j-verify request number" placeholder="请输入数字" data-key="number" v-model="formData.testNumber" />
            </span>
          </div>
        </div>

        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item choose" @click="openDatePicker">
            <span class="form-item-lab">日期选择</span>
            <span class="form-item-inp">
              <input type="text" ref="j-choose-date" class="form-inp j-verify request" readonly="true" data-key="date" placeholder="请选择" v-model="formData.dateString" />
            </span>
          </div>
          <date-picker-popup ref="j-datepicker-popup" type="picker" pickerType="date"
            :title="false"
            :secondTitle="datePickerTitle"
            :pickerFormatter="pickerFormatter"
            :onSure="datePickerSure"
            :onCancel="pickerCancel" />

          <div class="ui-form-item choose" @click="openPicker">
            <span class="form-item-lab">请选择</span>
            <span class="form-item-inp">
              <input type="text" ref="j-choose-select1" class="form-inp j-verify request" readonly="true" data-key="select1" placeholder="请选择" v-model="formData.select1" />
            </span>
          </div>
          <picker-popup ref="j-picker-popup" type="picker" :title="false"
            :picker="pickerData"
            :secondTitle="pickerTitle"
            :onSure="pickerSure"
            :onCancel="pickerCancel" />

          <div class="ui-form-item choose" @click="openPickerButton">
            <span class="form-item-lab">选择1</span>
            <span class="form-item-inp">
              <input type="text" class="form-inp" readonly="true" placeholder="请选择" />
            </span>
          </div>
          <picker-button-popup ref="j-picker-button-popup" type="downup" title="visible"
            :content="false"
            :downupButton="downupButton"
            model="simple"
            >
            <div slot="popup-ft-downup" class="popup-ft-downup-slot">
              <a href="javascript:;" class="ui-button j-popup-btn">取消</a>
            </div>
          </picker-button-popup>
        </div>

        <div slot="form-block" class="ui-form-block">
          <div class="ui-form-item full">
            <a href="javascript:;" class="ui-button j-verify-submit">验证</a>
          </div>
        </div>
      </my-forms-verify>
      <div class="button-wrap">
        <a href="javascript:;" class="ui-button" @click="alert">alert</a>
        <a href="javascript:;" class="ui-button" @click="confirm">confirm</a>
        <a href="javascript:;" class="ui-button" @click="confirm1">confirm</a>
        <a href="javascript:;" class="ui-button" @click="prompt">prompt</a>
        <a href="javascript:;" class="ui-button" @click="promptTip">prompt tip</a>
        <a href="javascript:;" class="ui-button" @click="tip">tip</a>
        <a href="javascript:;" class="ui-button" @click="toast">toast</a>
      </div>
      <base-popup ref="base-popup" />
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
