<!--
 * 滚动视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月23日13:49:50
-->

<template>
    <div class="ui-scroll" :ref="uiScroll" @scroll="scrollEvent">
        <div class="ui-scroll-wrap" :ref="uiScrollWrap">
            <slot name="scroll-cont"></slot>
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
