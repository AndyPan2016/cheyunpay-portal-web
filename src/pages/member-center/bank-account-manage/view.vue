<!--
 * 银行账户管理 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月18日22:16:53
-->

<template>
    <div class="page-main page-main-accountmanage">
      <div class="tab-hd">
        <div class="tab-hd-wrap" @click="tabClickEvent">
          <a :class="'tab-route-item' + (route.active ? ' active' : '')"
            v-for="(route, idx) in tabRoutes" :key="idx"
            :data-route="route.path">{{route.text}}</a>
        </div>
      </div>
      <div class="route-view-wrap">
        <!-- 自定义动态组件渲染使用 -->
        <component :is="currentComponent"></component>
        <!-- 路由嵌套使用 -->
        <router-view></router-view>
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
