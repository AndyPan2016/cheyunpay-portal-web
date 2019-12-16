<!--
 * 密码框 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日15:50:53
-->

<template>
  <div class="ui-password-box" ref="passwordBox">
    <span class="password-box-wrap" :class="'box-' + length">
      <input type="password" class="password-box-item" maxlength="1" v-for="idx in length" v-bind:key="idx" />
      <input :type="type" class="box-hidden" :maxlength="length"
        autocomplete="false"
        :autofocus="autofocus"
        @keypress="keypressEvent"
        v-model="passwordModel" @keydown="keydownEvent" />
    </span>
  </div>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
