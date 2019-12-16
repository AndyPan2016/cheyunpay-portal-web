<!--
 * 我的摆牌二维码 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月27日11:34:14
-->

<template>
  <div class="page-main page-lay-qrcode">
    <data-set :dataset="qrDataSet"
      dataComponent="qrcode-list"
      scrollClass="qrcode-scroll"
      :onScrollBottom="scrollBottomEvent">
      <div slot="dataset-common">
        <wall-head :walletHeadData="walletHeadData" />
      </div>
      <div class="qrcode-null" slot="dataset-null">暂无记录</div>
    </data-set>
    <tip-popup ref="tip-popup"  />
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
