<!--
 * 表单元素及验证 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018年8月25日16:15:09
-->

<template>
  <form action="" class="ui-form"
    @click="formClick">
    <slot name="form-block"></slot>
    <div class="ui-form-block" v-for="(group, gidx) in dataset" v-bind:key="gidx">
      <div class="ui-form-item" :class="item.type || 'choose'" v-for="(item, idx) in group" v-bind:key="idx" :data-key="item.key">
        <label :class="'form-item-lab ' + item.icon">{{item.text}}</label>
      </div>
    </div>
  </form>
</template>

<script>
import {render} from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
