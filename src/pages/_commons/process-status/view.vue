<!--
 * 流程状态页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月19日15:30:38
-->

<template>
  <div class="page-main page-main-regist">
    <div :class="'indentity-verify-wrap icon-status-' + $store.state.ProcessStatusStore.status">
      <div class="verify-result" v-if="$store.state.ProcessStatusStore.result">{{$store.state.ProcessStatusStore.result}}</div>
      <div class="verify-result-remark" v-if="$store.state.ProcessStatusStore.remark">{{$store.state.ProcessStatusStore.remark}}</div>
    </div>
    <div class="button-wrap" @click="buttonsClickEvent">
      <a href="javascript:;" :class="'ui-button ' + (button.class || '')"
        v-for="(button, idx) in processStatusButtons"
        :key="idx"
        :data-key="idx">
        {{button.text}}
      </a>
    </div>
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
