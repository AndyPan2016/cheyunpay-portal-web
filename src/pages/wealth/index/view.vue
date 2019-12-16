<!--
 * 财富页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月29日22:34:39
-->

<template>
  <div class="page-main page-member-center">
    <member-form class="member-form">
      <div slot="form-block" class="ui-form-block">
        <div class="ui-form-item choose">
          <span class="form-item-lab">工新借</span>
          <span class="form-item-txt"></span>
        </div>
        <div class="ui-form-item choose">
          <span class="form-item-lab">车云借</span>
          <span class="form-item-txt"></span>
        </div>
      </div>
    </member-form>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
