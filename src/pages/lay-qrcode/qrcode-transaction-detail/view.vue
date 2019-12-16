<!--
 * 摆牌二维码交易详情视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月28日15:22:56
-->

<template>
  <div class="page-main page-bill-detail">
    <bill-form class="bill-form">
      <div slot="form-block" class="ui-form-block">
        <div class="ui-form-item txt-status-default">
          <span class="form-item-lab">金额</span>
          <span class="form-item-txt">+9,000.00</span>
        </div>
        <div class="ui-form-item txt-status-error">
          <span class="form-item-lab">金额</span>
          <span class="form-item-txt">-9,000.00</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">状态</span>
          <span class="form-item-txt">交易成功</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">订单号</span>
          <span class="form-item-txt">1234567890123456</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">手续费</span>
          <span class="form-item-txt">￥0.00</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">分润</span>
          <span class="form-item-txt">￥0.00</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">实际到账金额</span>
          <span class="form-item-txt">￥9,000.00</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">支付方式</span>
          <span class="form-item-txt">微信支付</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">二维码ID</span>
          <span class="form-item-txt">5647 7482 5497 1234</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">二维码名称</span>
          <span class="form-item-txt">同花顺理发店</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">创建时间</span>
          <span class="form-item-txt">2019-08-30 23:00:00</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">完成时间</span>
          <span class="form-item-txt">2019-08-30 23:00:00</span>
        </div>
      </div>
    </bill-form>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
