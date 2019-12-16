<!--
 * 页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年8月21日14:03:40
-->

<template>
    <div class="page-header">
      <a class="head-back" href="javascript:;" @click="goBack" v-if="back && back !== 'false'">{{$store.state.HeaderStore.backText}}</a>
      <div class="head-title" v-if="title && title !== 'false'">{{title}}</div>
      <slot name="head-title"></slot>
    </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
