<!--
 * 页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018-06-08 10:40:52
-->

<template>
    <div class="page-main">
        <div class="page-main-body no-header" @click="pageClickEvent">
            <!-- <div class="route-group" v-for="(group, idx) in routeOptions" :key="idx" v-if="group.remark">
                <div class="groute-item">{{group.remark}}</div>
                <div class="route-list"
                    v-for="(page, pidx) in group.pages" :key="pidx"
                    :data-page="page.key" :data-route="group.path">{{page.text}}</div>
            </div> -->
            <form-list>
                <div slot="form-block" class="ui-form-block no-margin" v-for="(group, idx) in routeOptions" :key="idx" v-if="group.remark">
                    <div class="form-item-title">{{group.remark}}</div>
                    <div class="ui-form-item choose full"
                        v-for="(page, pidx) in group.pages" :key="pidx">
                        <span class="form-item-lab"
                            :data-filekey="pidx"
                            :data-page="page.key"
                            :data-route="group.path"
                            :data-key="group.key">{{page.text}}</span>
                    </div>
                </div>
            </form-list>
        </div>
    </div>
</template>

<script>
import {render} from './index.js'
export default render
</script>
<style lang="less">
@import './view.less';
</style>
