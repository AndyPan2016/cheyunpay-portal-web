<!--
 * 总资产页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月23日15:47:50
-->

<template>
  <div class="page-main page-total-assets">
    <div class="assets-hd">
      <div class="total-assets-wrap">
        <div class="assets-label">总资产（元）</div>
        <div class="assets-value">{{accountInfo.balance}}</div>
      </div>
      <div class="total-assets-detail">
        <div class="balance">
          <div class="assets-detail-label">可用余额</div>
          <div class="assets-detail-money"><label>{{accountInfo.availableBalance}}</label></div>
        </div>
        <div class="en-route">
          <div class="assets-detail-label">在途资金</div>
          <div class="assets-detail-money"><label>{{accountInfo.freeze}}</label></div>
        </div>
      </div>
    </div>
    <div class="assets-report">
      <div class="report-data">
        <div class="data-item balance">
          <div class="data-item-label">可用余额</div>
          <div class="data-item-money">{{accountInfo.availableBalance}}</div>
        </div>
        <div class="data-item en-route">
          <div class="data-item-label">在途资金</div>
          <div class="data-item-money">{{accountInfo.freeze}}</div>
        </div>
      </div>
      <div class="report-cont" ref="j-report-cont">
        <!-- <div class="echart-wrap"></div> -->
      </div>
    </div>
    <assets-form>
      <div slot="form-block" class="ui-form-block">
        <div class="ui-form-item choose" @click="toAssetsList">
          <span class="form-item-lab">收支明细</span>
          <span class="form-item-txt"></span>
        </div>
      </div>
    </assets-form>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
