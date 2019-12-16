<!--
 * pos列表页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日11:40:05
-->

<template>
  <div class="page-block-pos-list">
    <div class="pos-list-item" v-for="(item, idx) in (datasetStore)" :key="idx" :data-id="item.id">
      <div class="list-item-mask j-item-mask" :data-id="item.id" :data-idx="idx" v-if="item.mask"></div>
      <div class="pos-item-hd" v-if="item.head">
        <div :class="'hd-item ' + (item.head.icon) + (' ' + item.head.fontSize) + (item.head.status ? ' no-split' : '')" v-if="item.head">
          <label class="text">{{item.head.text}}</label>
          <label :class="'status j-head-status' + (' ' + item.head.status.key)" v-if="item.head.status" :data-id="item.head.status.id">{{item.head.status.text}}</label>
        </div>
      </div>
      <div class="pos-item-split" v-if="item.split !== false"><i></i></div>
      <div :class="'pos-item-fd' + (item.body.type === 'list' ? ' fd-item-list' : '') + (!item.head && item.split === false ? ' border-radius' : '')"
        v-if="item.body">
        <div class="fd-item" v-if="item.body.type === 'input'"
          v-for="(group, gidx) in item.body.groups" :key="gidx">
          <label class="fd-item-lab">{{group.label}}</label>
          <span class="fd-item-inp">
            <input :type="group.modelType || 'text'" v-model="group.vModel" :placeholder="group.modelPlaceHolder" />
          </span>
          <label class="fd-item-remark">{{group.remark}}</label>
        </div>
        <div class="fd-item" v-if="item.body.type === 'input-txt'"
          v-for="(group, gidx) in item.body.groups" :key="gidx">
          <label class="fd-item-lab">{{group.label}}</label>
          <span class="fd-item-inp txt">{{group.text}}</span>
          <label class="fd-item-remark">{{group.remark}}</label>
        </div>
        <div class="fd-item" v-if="item.body.type === 'list'"
          v-for="(group, gidx) in item.body.groups" :key="gidx">
          <label class="fd-item-lab">{{group.label}}</label>
          <label class="fd-item-txt">{{group.text}}</label>
        </div>
        <div class="fd-item qr-item" v-if="item.body.type === 'qr-detail'">
          <span class="qr-code-wrap">
            <!-- <img :src="item.body.qrCode" /> -->
            <span class="thumb" :ref="'qrcode-thumb-' + idx"></span>
          </span>
          <div class="qr-detail-cont">
            <div class="qr-code-lab">
              <span class="lab">POS机编号</span>
              <span class="span">{{item.body.name}}</span>
            </div>
            <div class="pos-qr-code">{{item.body.code}}</div>
          </div>
        </div>
      </div>
      <div :class="'pos-item-status ' + item.status.state" v-if="item.status">
        <div :class="'status-cont' + (' ' + item.status.fontSize)" v-for="(group, gidx) in item.status.groups" :key="gidx">
          <label class="cont-label" v-if="group.label">{{group.label}}</label>
          <label class="cont-value" v-if="group.value">{{group.value}}</label>
        </div>
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
