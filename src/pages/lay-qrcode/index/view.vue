<!--
 * 摆牌二维码 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日22:06:26
-->

<template>
  <div class="page-main page-lay-qrcode">
    <wall-head :walletHeadData="walletHeadData" />
    <Forms class="qrcode-cell-wrap" :dataset="formsDataset" :onClick="formClick"></Forms>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
