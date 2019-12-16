<!--
 * 账单详情页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月22日13:53:24
-->

<template>
  <div class="page-main page-bill-detail">
    <bill-form class="bill-form">
      <!-- 交易类 -->
      <div slot="form-block" class="ui-form-block" v-if="type === 'trade'">
        <div :class="'ui-form-item ' + changeDirectionStatus">
          <span class="form-item-lab">金额</span>
          <span class="form-item-txt">{{changeDirectionSymbol}}{{details.amount}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">状态</span>
          <span class="form-item-txt">{{details.transStatus}}</span>
        </div>
        <div class="ui-form-item lab3-txt7">
          <span class="form-item-lab">订单号</span>
          <span class="form-item-txt">{{details.merchOrderNo}}</span>
        </div>
        <div class="ui-form-item lab3-txt7">
          <span class="form-item-lab">流水号</span>
          <span class="form-item-txt">{{details.tradeNo}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">手续费</span>
          <span class="form-item-txt">￥{{details.profitAmount}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">分润</span>
          <span class="form-item-txt">￥{{details.shareProfitAmount}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">类型</span>
          <span class="form-item-txt">{{changeDirectionType}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">交易名称</span>
          <span class="form-item-txt">{{details.tradeName}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">创建时间</span>
          <span class="form-item-txt">{{details.tradeTime}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">完成时间</span>
          <span class="form-item-txt">{{details.finishTime}}</span>
        </div>
      </div>
      <!-- 资金类 -->
      <div slot="form-block" class="ui-form-block" v-if="type === 'fund'">
        <div :class="'ui-form-item ' + changeDirectionStatus">
          <span class="form-item-lab">金额</span>
          <span class="form-item-txt">{{changeDirectionSymbol}}{{details.amount}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">状态</span>
          <span class="form-item-txt">{{details.transStatus}}</span>
        </div>
        <div class="ui-form-item lab3-txt7">
          <span class="form-item-lab">订单号</span>
          <span class="form-item-txt">{{details.merchOrderNo}}</span>
        </div>
        <div class="ui-form-item lab3-txt7">
          <span class="form-item-lab">流水号</span>
          <span class="form-item-txt">{{details.tradeNo}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">手续费</span>
          <span class="form-item-txt">￥{{details.chargeAmount}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">实际到账金额</span>
          <span class="form-item-txt">￥{{details.actualAmount}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">类型</span>
          <span class="form-item-txt">{{changeDirectionType}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">创建时间</span>
          <span class="form-item-txt">{{details.tradeTime}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">完成时间</span>
          <span class="form-item-txt">{{details.finishTime}}</span>
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
