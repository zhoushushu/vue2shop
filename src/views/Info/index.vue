<template>
  <div class="infowrap">
    <!-- 头部 -->
    <m-subheader title="帐号管理" :loginShow="true"></m-subheader>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="nickName"
        name="nickName"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="introduceSign"
        name="introduceSign"
        label="个性签名"
        placeholder="个性签名"
        :rules="[{ required: true, message: '请填写个性签名' }]"
      />
      <van-field
        v-model="password"
        name="password"
        label="修改密码"
        placeholder="修改密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      >
      </van-field>
      <van-field
        v-model="identifyCode"
        name="identifyCode"
        label="验证码"
        placeholder="验证码"
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
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";
import mIdentify from "../Register/components/identify/index";
import { get, put } from "../../service/http";
import store from "../../common/js/store";
import md5 from "js-md5";

export default {
  components: {
    mSubheader,
    mIdentify,
  },
  data() {
    return {
      nickName: "",
      introduceSign: "",
      password: "",
      identifyCode: "",
      validCode: "",
    };
  },
  async created() {
    if (!store.get("token") || store.get("token") === "") {
      this.$toast("尚未登录");
      this.$router.replace("/login");
    }
    let temp = await get("/user/info");
    if (temp.resultCode !== 200) {
      store.clearAll();
      this.$toast(temp.message);
      this.$router.replace("/login");
      return;
    }
    //
    this.nickName = temp.data.nickName;
    this.introduceSign = temp.data.introduceSign;
  },
  methods: {
    async onSubmit() {
      // if (this.identifyCode !== this.validCode) {
      //   this.$toast("验证码不正确");
      //   return;
      // }
      const obj = {
        introduceSign: this.introduceSign,
        nickName: this.nickName,
        passwordMd5: md5(this.password),
      };
      let temp = await put("/user/info", obj);
      if (temp.resultCode !== 200) {
        this.$toast(temp.message);
        return;
      }
      //
      this.$toast("修改成功");
      setTimeout(() => {
        this.$router.push("/user");
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.infowrap {
  padding-top: 70px;
}
</style>