<!--
 * 账单详情页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月22日13:53:24
-->

<template>
  <div class="page-main page-bill-detail">
    <bill-form class="bill-form">
      <div slot="form-block" class="ui-form-block">
        <div :class="'ui-form-item ' + status">
          <span class="form-item-lab">金额</span>
          <span class="form-item-txt">{{money}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">订单号</span>
          <span class="form-item-txt">{{merchOrderNo}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">流水号</span>
          <span class="form-item-txt">{{ordereNo}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">支付方式</span>
          <span class="form-item-txt">{{payType}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">类型</span>
          <span class="form-item-txt">{{type}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">可用余额</span>
          <span class="form-item-txt">￥{{balance}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">完成时间</span>
          <span class="form-item-txt">{{updateTime}}</span>
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
