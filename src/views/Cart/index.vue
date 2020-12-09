<template>
  <div class="categorywrap">
    <!-- 头部 -->
    <m-subheader title="购物车" :loginShow="true"></m-subheader>
    <!-- 底部导航 -->
    <bottom-nav></bottom-nav>
    <!-- 购物车数据 -->
    <template v-for="(item, index) in cartData">
      <div class="item">
        <van-card
          :key="item.goodsId"
          :num="item.num"
          :price="item.sellingPrice | filterPrice"
          :desc="item.goodsIntro"
          :title="item.goodsName"
          :thumb="item.goodsCoverImg | filterImg"
        >
          <template #footer>
            <van-button
              @click="minus(index)"
              icon="minus"
              size="mini"
              :disabled="item.num === 1"
            ></van-button>
            <van-button
              @click="plus(index)"
              icon="plus"
              size="mini"
            ></van-button>
            <van-button
              @click="remove(index)"
              icon="cross"
              size="mini"
            ></van-button>
          </template>
        </van-card>
      </div>
    </template>
    <van-submit-bar
      :disabled="cartData.length === 0"
      :price="totalPirce"
      button-text="结算"
      @submit="onSubmit"
    >
      <template #tip v-if="tipShow">
        尚未设置收货地址,
        <span style="color: #000" @click="gotoAddress">添加地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";
import bottomNav from "../../components/bottomnav/index";
import { get } from "../../service/http";

export default {
  components: {
    mSubheader,
    bottomNav,
  },
  data() {
    return {
      tipShow: false,
    };
  },
  methods: {
    async onSubmit() {
      let temp = await get("/address");
      this.addressData = temp.data;
      if (temp.data.length === 0) {
        this.tipShow = true;
        return;
      }
      this.$router.push("/book");
    },
    plus(index) {
      this.$store.commit("plusCart", index);
    },
    minus(index) {
      this.$store.commit("minusCart", index);
    },
    remove(index) {
      this.$store.commit("removeCart", index);
    },
    gotoAddress() {
      this.$router.push("/address");
    },
  },
  computed: {
    cartData() {
      return this.$store.state.cartData;
    },
    totalPirce() {
      return this.$store.getters.totalPirce;
    },
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
.categorywrap {
  padding-top: 50px;
  .item {
    position: relative;
    margin-bottom: 10px;
  }
}
</style>