<!--
 * 注册页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:53
-->

<template>
  <div class="page-main page-main-regist">
    <my-forms ref="refMyForms">
      <div slot="form-block" class="ui-form-block">
        <div class="ui-form-item choose">
          <span class="form-item-lab icon-wx-bind">微信登录</span>
          <span class="form-item-inp" @click="toBindWechat">
            <input type="text" class="form-inp" readonly placeholder="未绑定" data-key="wxBind" v-model="formData.wxBind" />
          </span>
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
