<!--
 * 银行卡列表页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月20日11:09:08
-->

<template>
  <div class="page-bank-list">
    <div class="ui-divider">
      <label class="divider-text">若需更换提现银行卡，请先解绑！</label>
    </div>
    <div class="bank-list-wrap" @click="bankClickEvent">
      <div :class="'bank-item ' + (bank.logo)" v-for="(bank, idx) in (bankList)" :key="idx">
        <div class="bank-name-wrap">
          <!-- <img :src="'../../../assets/images/bank/' + bank.logo + '.png'" class="bank-logo" /> -->
          <div class="bank-name">{{bank.name}}</div>
          <div class="bank-type">{{bank.type}}</div>
        </div>
        <a href="javascript:;" class="bank-unbind" :data-key="idx">取消绑定</a>
        <div class="bank-number">{{bank.number}}</div>
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
