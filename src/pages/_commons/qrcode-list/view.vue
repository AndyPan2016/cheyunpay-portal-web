<!--
 * 二维码列表视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月27日13:48:43
-->

<template>
  <div class="qrcode-list-wrap">
    <div class="qrcode-list-item"
      v-for="(item, idx) in (datasetStore)"
      :key="idx"
      @click="clickEvent(item)">
      <span class="qrcode-thumb">
        <!-- <img :src="item.qrcode" alt="二维码" /> -->
        <span class="thumb" :ref="'qrcode-thumb-' + idx"></span>
      </span>
      <div class="qrcode-cont">
        <span class="cont-item">
          <label class="label">二维码名称</label>
          <label class="value">{{item.name}}</label>
        </span>
        <span class="cont-item">
          <label class="label">二维码ID</label>
          <label class="value">{{item.id}}</label>
        </span>
      </div>
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
