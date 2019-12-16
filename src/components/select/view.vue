<!--
 * 下拉组件视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月22日17:26:39
-->

<template>
    <a href="javascript:;" :class="'ui-select ' + (selectStatus || status || '')"
        @click="selectClickEvent">
        {{selectText || placeholder}}
        <select-popup :ref="ref" type="downup" title="visible"
            v-if="type === 'default'"
            :content="false"
            :downupButton="options"
            model="simple">
            <div slot="popup-ft-downup" class="popup-ft-downup-slot">
                <a href="javascript:;" class="ui-button j-popup-btn">取消</a>
            </div>
        </select-popup>
        <select-popup :ref="ref" type="picker"
            v-else-if="type === 'group-picker'"
            :title="false"
            :picker="options"
            :secondTitle="pickerTitle"
            :onSure="pickerSure"
            sureText="确定"
            cancelText="清除"
            :onCancel="pickerCancel" />
        <select-popup :ref="ref" type="picker"
            v-else
            :title="false"
            :pickerType="type"
            :pickerFormatter="pickerFormatterEvent"
            :secondTitle="pickerTitle"
            :onSure="pickerSure"
            sureText="确定"
            cancelText="清除"
            :onCancel="pickerCancel" />
    </a>
</template>

<script>
import render from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
