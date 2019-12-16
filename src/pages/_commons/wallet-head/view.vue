<!--
 * 钱包头部视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月27日10:15:55
-->

<template>
  <div class="wallet-header">
    <div class="account-info">
      <span class="account-name">{{walletData.accountName}}</span>
      <span class="account-type">{{walletData.accountType}}</span>
      <!-- <a href="javascript:;" class="choose-account-type" @click="chooseAccountEvent">选择账户</a> -->
    </div>
    <div class="account-money" @click="accountDetailEvent">{{walletData.accountMoney}}</div>
    <div class="account-num">
      <label class="money-label">可用余额（元）</label>
      <label class="number">账号：{{walletData.accountNumber}}</label>
    </div>
    <tip-popup ref="tip-popup" />
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
