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
    <div class="orderlist" v-for="item in orderData" :key="item.orderId">
      <van-card
        :price="item.totalPrice | filterPrice"
        :title="item.newBeeMallOrderItemVOS[0].goodsName"
        :thumb="item.newBeeMallOrderItemVOS[0].goodsCoverImg | filterImg"
      >
        <template #tags>
          <van-tag style="margin-top: 5px" plain type="danger"
            >订单时间：{{ item.createTime }}</van-tag
          >
          <van-tag style="margin-top: 5px" plain type="danger"
            >订单状态：{{ item.orderStatusString }}</van-tag
          >
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";
import store from "../../common/js/store";
import { get } from "../../service/http";

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
    let temp = await get("/order?pageNumber=1&status=");
    if (temp.resultCode !== 200) {
      this.$toast(temp.message);
      return;
    }
    //
    this.orderData = temp.data.list;
  },
  filters: {
    filterImg(url) {
      if (url && url.startsWith("http")) {
        return url;
      } else {
        url = `http://47.99.134.126:28019${url}`;
        return url;
      }
    },
    filterPrice(num) {
      return num.toFixed(2);
    },
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