<template>
  <div class="orderwrap">
    <!-- 头部 -->
    <m-subheader title="我的订单"></m-subheader>
    <!-- tabs -->
    <div class="tabswrap">
      <van-tabs>
        <van-tab title="全部" name=""></van-tab>
        <van-tab title="待付款" name="0"></van-tab>
        <van-tab title="待确认" name="1"></van-tab>
        <van-tab title="待发货" name="2"></van-tab>
        <van-tab title="已发货" name="3"></van-tab>
        <van-tab title="交易完成" name="4"></van-tab>
      </van-tabs>
    </div>
    <div class="orderlist">
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      >
        <template #tags>
          <van-tag plain type="danger">订单时间：2020-12-5 12:45:56</van-tag>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";
import store from "../../common/js/store";

export default {
  components: {
    mSubheader,
  },
  data() {
    return {
      orderData: [],
    };
  },
  async created() {
    if (!store.get("token") || store.get("token") === "") {
      this.$toast("尚未登录");
      this.$router.replace("/login");
    }
    // let temp = await get("/address");
    // if (temp.resultCode !== 200) {
    //   this.$toast(temp.message);
    //   return;
    // }
    //
    this.orderData = [];
  },
};
</script>

<style lang="less" scoped>
.orderwrap {
  padding-top: 50px;
  .tabswrap {
    margin-bottom: 10px;
  }
  .orderlist {
    padding: 0 10px;
  }
}
</style>