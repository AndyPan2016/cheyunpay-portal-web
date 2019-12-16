<!--
 * 钱包页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日09:57:59
-->

<template>
  <div class="page-main page-main-wallet">
    <div class="wallet-wrap">
      <wall-head :walletHeadData="walletHeadData"
        :onChooseAccount="chooseAccountEvent"
        :onAccountClick="accountClickEvent"/>
      <div class="wallet-nav" @click="navClick">
        <a href="javascript:;" v-for="(item, idx) in navDataset" :class="'wallet-nav-item ' + item.icon" :data-key="item.key" :key="idx">
          <label class="nav-item-text">{{item.text}}</label>
        </a>
      </div>
    </div>
    <Forms class="wallet-cell-wrap" :dataset="formsDataset" :onClick="formClick"></Forms>
    <!-- <div class="ad-span">
      <Swiper interval="3600">
        <Slide v-for="(item, index) in adList" :key="index">
          <img :src="item.url" :alt="item.alt" />
        </Slide>
      </Swiper>
    </div> -->
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
