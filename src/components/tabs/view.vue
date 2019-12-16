<!--
 * Tabs Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018年8月21日15:46:42
-->

<template>
  <div class="ui-tabs"
    :style="(tabHeight !== 'auto' ? 'height:' + tabHeight + ';' : '') + (tabWidth !== 'auto' ? 'width:' + tabWidth : '')"
    :class="(className ? className : '') + (switchAnimation ? ' switch-animation' : '')">
    <div class="ui-tabs-hd" @click="tabSwitchClick">
      <slot name="tabs-hd"></slot>
    </div>
    <div class="ui-tabs-bd">
      <div class="tabs-bd-wrap" :style="'margin-left: ' + marginLeft + 'px;'">
        <slot name="tabs-bd"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {render} from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
