<!--
 * 银行账户管理-托管提现页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月18日22:50:15
-->

<template>
  <div class="page-main page-manage-entrustwithdrawal">
    <dataset :dataset="dataset"
      scrollClass="bank-list-scroll"
      nullPlaceComponent="process-status"
      dataComponent="bank-list"
      :onScrollBottom="scrollBottomEvent" />
    <tip-popup ref="tip-popup" cancelText="再想想"  />
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
