<!--
 * 页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月28日13:19:35
-->

<template>
  <div class="card-block">
    <div class="block-head" v-if="title !== false">
      <span class="head-title">
        <i class="title-line-left"></i>
        <span class="title">{{title}}</span>
        <i class="title-line-right"></i>
      </span>
    </div>
    <div class="block-split">
      <div class="block-split-head"><i></i></div>
      <div class="block-split-body"></div>
    </div>
    <div class="block-body">
      <slot name="block-body-slot"></slot>
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
