<!--
 * 会员中心页面视图 Vue
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日14:02:24
-->

<template>
  <div class="page-main page-member-center">
    <member-form class="member-form" :onClick="formClick">
      <div slot="form-block" class="ui-form-block">
        <div class="ui-form-item lab3-txt7">
          <span class="form-item-lab">会员名称</span>
          <span class="form-item-txt">{{memberInfo.memberType === 'PERSON' ? memberInfo.realName : memberInfo.comName}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">会员类型</span>
          <span class="form-item-txt">{{memberInfo.memberTypeText}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">登录账号</span>
          <span class="form-item-txt">{{memberInfo.userName}}</span>
        </div>
        <div class="ui-form-item lab3-txt7">
          <span class="form-item-lab">会员ID</span>
          <span class="form-item-txt">{{memberInfo.userNo}}</span>
        </div>
        <!-- <div class="ui-form-item choose lab3-txt7"> -->
        <div class="ui-form-item lab3-txt7">
          <span class="form-item-lab">账户ID</span>
          <span class="form-item-txt">{{accountNo}}</span>
        </div>
        <div class="ui-form-item">
          <span class="form-item-lab">注册来源</span>
          <span class="form-item-txt">{{memberInfo.registTypeText}}</span>
        </div>
      </div>
      <div slot="form-block" class="ui-form-block">
        <div class="ui-form-item choose" data-key="resetLoginPassword">
          <span class="form-item-lab">重置登录密码</span>
          <span class="form-item-txt"></span>
        </div>
        <div class="ui-form-item choose" data-key="resetPayPassword">
          <span class="form-item-lab">重置支付密码</span>
          <span class="form-item-txt"></span>
        </div>
        <div class="ui-form-item choose" data-key="resetBindPhone">
          <span class="form-item-lab">重置绑定手机号</span>
          <span class="form-item-txt"></span>
        </div>
        <div class="ui-form-item choose" data-key="bankManage">
          <span class="form-item-lab">银行卡管理</span>
          <span class="form-item-txt"></span>
        </div>
        <!-- <div class="ui-form-item choose" data-key="thirdAccountBind">
          <span class="form-item-lab">第三方账号绑定</span>
          <span class="form-item-txt"></span>
        </div> -->
        <div class="ui-form-item choose" data-key="about">
          <span class="form-item-lab">关于车云宝</span>
          <span class="form-item-txt"></span>
        </div>
      </div>
    </member-form>
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
