<!--
 * 上传证件页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月20日11:34:59
-->

<template>
  <div class="page-upload-certificates">
    <div class="regist-upload-wrap">
      <a href="javascript:;" :class="'upload-item ' + (item.status)"
        v-for="(item, idx) in uploadListData" :key="idx">
        <label class="upload-label icon-upload-idcard">{{item.text}}</label>
        <!-- <img :src="'../../../assets/images/background/' + item.background" class="upload-item-thumb" /> -->
        <img :src="item.file || item.background" class="upload-item-thumb" />
        <input type="file" class="upload-inp" @change="fileInpChange" :data-idx="idx" accept="image/png,image/gif,image/jpeg" />
      </a>
    </div>
    <div class="button-wrap" @click="buttonsClickEvent">
      <a href="javascript:;" :class="'ui-button ' + (button.class || '')"
        v-for="(button, idx) in buttons"
        :key="idx"
        :data-idx="idx">
        {{button.text}}
      </a>
    </div>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
