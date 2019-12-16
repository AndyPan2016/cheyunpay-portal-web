<!--
 * Checkbox Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018年8月21日15:46:42
-->

<template>
  <span
    :class="('ui-' + (chkType)) + (className ? ' '+className : '') + (isActive ? ' active' : '')"
    @click="chkBoxClick" ref="myBox" :name="name">
    <span class="box-status" v-if="type == 'radio'"></span>
    {{chkText}}
    <slot name="checkbox-text"></slot>
  </span>
</template>

<script>
import {render} from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
