<!--
 * Tabs Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018年8月21日15:46:42
-->

<template>
  <a href="javascript:;" class="ui-switchbox"
    :class="(className ? className : '') + (isActive ? ' active' : '')"
    @click="boxClick" :bind-data="dataId">
  </a>
</template>

<script>
import {render} from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
