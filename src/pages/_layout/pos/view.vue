<!--
 * Layout POS页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018-06-08 10:40:52
-->

<template>
    <div class="page-main">
        <div class="page-main-body no-header">
            <!-- 自定义动态组件渲染使用 -->
            <component v-bind:is="currentComponent"></component>
            <!-- 路由嵌套使用 -->
            <router-view></router-view>
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
