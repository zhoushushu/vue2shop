<template>
  <div class="registerwrap">
    <m-subheader title="用户注册" :loginShow="false"></m-subheader>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="identifyCode"
        name="验证码"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #extra>
          <m-identify :upValidCodeData.sync="validCode"></m-identify>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div class="tips">
      <router-link tag="span" to="/login">已有帐号，立即登录</router-link>
    </div>
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";
import { Toast } from "vant";
import { post } from "@/service/http";
import md5 from "js-md5";
import mIdentify from "./components/identify/index";

export default {
  components: {
    mSubheader,
    mIdentify,
  },
  data() {
    return {
      username: "",
      password: "",
      identifyCode: "",
      validCode: "",
    };
  },
  methods: {
    async onSubmit() {
      // if (this.identifyCode !== this.validCode) {
      //   Toast("验证码不正确");
      //   return;
      // }
      let obj = {};
      obj.loginName = this.username;
      obj.password = this.password;
      let temp = await post("/user/register", obj);
      if (temp.resultCode !== 200) {
        Toast(temp.message);
        return;
      }
      Toast("注册成功，请登录");
      // token
      let token = temp.data;
      store.set("token", token);
      //
      Toast("注册成功");
      setTimeout(() => {
        this.$router.push("/login");
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../common/style/mixin.less");

.registerwrap {
  padding-top: 70px;
  .tips {
    height: 40px;
    line-height: 40px;
    text-align: center;
    span {
      color: @primary;
      font-size: 14px;
    }
  }
}
</style>
