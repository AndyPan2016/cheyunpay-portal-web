<!--
 * 我的摆牌二维码 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月27日11:34:14
-->

<template>
  <div class="page-main page-qrcode-detail">
    <card-block title="欢迎使用二维码">
      <div class="qrcode-detail" slot="block-body-slot">
        <div class="qrcode-name">{{qrcodeRemark}}</div>
        <div class="qrcode-date">绑定时间：{{bindTime}}</div>
        <div class="qrcode-wrap">
          <span class="qrcode-thumb" ref="j-qrcode-thumb"></span>
        </div>
        <div class="qrcode-number-wrap">
          <span class="number">{{barcodeNo}}</span>
        </div>
        <div class="qrcode-bottom">
          <!-- <a href="javascript:;" class="ui-button button-inline" @click="editRemark">编辑备注</a> -->
        </div>
      </div>
    </card-block>
    <base-popup ref="base-popup" />
    <tip-popup ref="tip-popup" />
    <a href="javascript:;" ref="j-download-qrcode" class="ui-button download-qrcode" @click="downloadQRCode">下载二维码图片</a>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
