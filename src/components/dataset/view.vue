<!--
 * 数据状态管理视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月19日16:27:46
-->

<template>
  <div class="ui-dataset">
    <scroll-wrap :onScrollBottom="scrollBottomEvent" :class="scrollClass">
      <div slot="scroll-cont">
        <!-- 自定义数据加载中占位 -->
        <slot name="dataset-common"></slot>
        <div class="dataset-null" v-if="!dataset || !dataset.length">
          <div class="dataset-null-wrap" v-if="nullPlaceDefault">null</div>
          <div class="dataset-null-custom" v-else>
            <!-- 自定义动态空数据占位组件渲染使用 -->
            <component v-bind:is="datasetNullComponent"></component>
            <!-- 自定义数据为空占位 -->
            <slot name="dataset-null"></slot>
          </div>
        </div>
        <div class="dataset-loading" v-else-if="dataset === 'loading'">
          <div class="dataset-loading-wrap" v-if="loadingPlaceDefault">loading</div>
          <div class="dataset-loading-custom" v-else>
            <!-- 自定义动态数据加载中占位组件渲染使用 -->
            <component v-bind:is="datasetLoadingComponent"></component>
            <!-- 自定义数据加载中占位 -->
            <slot name="dataset-loading"></slot>
          </div>
        </div>
        <div class="dataset-wrap" v-else>
          <!-- 自定义数据加载中占位 -->
          <slot name="dataset-list"></slot>
          <!-- 自定义动态数据展示组件渲染使用 -->
          <component v-bind:is="datasetComponent"></component>
        </div>
      </div>
    </scroll-wrap>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
