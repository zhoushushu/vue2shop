<template>
  <div class="bookwrap">
    <m-subheader title="确认支付"></m-subheader>
    <!-- 地址选择 -->
    <div class="addresschoose">
      <van-contact-card
        v-if="addressData.length"
        type="edit"
        :name="addressObj.name"
        :tel="addressObj.tel"
        @click="changeAddress"
      />
    </div>
    <!-- 地址选择弹窗 -->
    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div class="wrapper" @click.stop>
        <div class="block">123</div>
      </div>
    </van-overlay>
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
        </van-card>
      </div>
    </template>
    <van-submit-bar
      :price="totalPirce"
      button-text="确认支付"
      @submit="onSubmit"
    >
    </van-submit-bar>
    <!-- 确认支付 -->
    <van-popup v-model="showPay" position="bottom" :style="{ height: '118px' }">
      <div class="buttonwrap">
        <van-button @click="pay" style="margin: 10px 0" type="primary" block
          >支付宝</van-button
        >
        <van-button @click="pay" type="info" block>微信</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";
import { get, post } from "../../service/http";

export default {
  components: {
    mSubheader,
  },
  data() {
    return {
      addressData: [],
      addressObj: {},
      showOverlay: false,
      showPay: false,
    };
  },
  async created() {
    let temp = await get("/address");
    this.addressData = temp.data;
    if (temp.data.length) {
      if (temp.data.length === 1) {
        let obj = {};
        obj.name = temp.data[0].userName;
        obj.tel = temp.data[0].userPhone;
        this.addressObj = obj;
      } else {
        let find = temp.data.find((item) => {
          return item.defaultFlag === 1;
        });
        if (find) {
          let obj = {};
          obj.name = find.userName;
          obj.tel = find.userPhone;
          this.addressObj = obj;
        } else {
          let obj = {};
          obj.name = temp.data[0].userName;
          obj.tel = temp.data[0].userPhone;
          this.addressObj = obj;
        }
      }
    }
  },
  methods: {
    changeAddress() {
      this.showOverlay = true;
    },
    async onSubmit() {
      let obj = {};
      obj.addressId = 1122;
      obj.cartItemIds = [3686];
      let temp = await post("/saveOrder", obj);
      console.log(temp.data);
      this.showPay = true;
    },
    async pay() {
      let temp = get("/paySuccess?orderNo=16074115783901258&payType=1");
      console.log(temp);
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
.bookwrap {
  padding-top: 50px;
  .addresschoose {
    margin-bottom: 10px;
  }
  .item {
    margin-bottom: 10px;
  }
  .van-overlay {
    z-index: 10000;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .block {
    width: 90%;
    height: 400px;
    background-color: #fff;
    border-radius: 20px;
  }
  .buttonwrap {
    padding: 0 10px;
  }
}
</style>