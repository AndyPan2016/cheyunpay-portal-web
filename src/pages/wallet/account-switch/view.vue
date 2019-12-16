<!--
 * 账号切换页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日11:29:02
-->

<template>
  <div class="page-main page-account-switch">
    <div class="account-item">
      <div class="account-number"><label class="label">账户号码</label>
        <label class="number">5411 1234 4321 7777</label>
      </div>
      <div class="account-money"><label class="label">可用余额</label>
        <label class="money">￥ 146,999.00</label>
      </div>
    </div>
    <div class="account-item current">
      <div class="account-number"><label class="label">账户号码</label>
        <label class="number">5411 1234 4321 7777</label>
      </div>
      <div class="account-money"><label class="label">可用余额</label>
        <label class="money">￥ 146,999.00</label>
      </div>
    </div>
    <div class="account-item">
      <div class="account-number"><label class="label">账户号码</label>
        <label class="number">5411 1234 4321 7777</label>
      </div>
      <div class="account-money"><label class="label">可用余额</label>
        <label class="money">￥ 146,999.00</label>
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
