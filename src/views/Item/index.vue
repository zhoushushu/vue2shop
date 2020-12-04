<template>
  <div class="itemwrap">
    <!-- 头部 -->
    <m-header :title="title"></m-header>
    <!-- 内容 -->
    <div class="detailcontent">
      <!-- 轮播图 -->
      <div class="detailswipewrap">
        <van-swipe class="myswipe" :autoplay="3000" indicator-color="#F0250F">
          <van-swipe-item
            v-for="(item, index) in detail.goodsCarouselList"
            :key="index"
          >
            <img :src="filterImg(item)" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 商品信息 -->
      <div class="productinfo">
        <div class="producttitle">
          {{ detail.goodsName || "" }}
        </div>
        <div class="productdesc">免邮费 顺丰快递</div>
        <div class="productprice">
          <span>¥{{ detail.sellingPrice || "" }}</span>
        </div>
      </div>
      <div class="productintro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div
          class="productcontent"
          v-html="detail.goodsDetailContent || ''"
        ></div>
      </div>
    </div>
    <!-- 底部 -->
    <m-footer></m-footer>
    <!-- 购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        @click="gotoCart"
        icon="cart-o"
        text="购物车"
        badge="0"
      />
      <van-goods-action-button
        @click="addCart"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button @click="gotoOrder" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import mHeader from "../../components/subheader/index";
import mFooter from "../../components/footer/index";
import { get } from "../../service/http";
import store from "../../common/js/store";

export default {
  components: {
    mHeader,
    mFooter,
  },
  data() {
    return {
      id: "",
      title: "",
      detail: {
        goodsCarouselList: [],
      },
    };
  },
  async created() {
    this.id = this.$route.params.id;
    let temp = await get(`/goods/detail/${this.id}`);
    //
    if (temp.resultCode !== 200) {
      store.clearAll();
      this.$toast(temp.message);
      this.$router.replace("/login");
      return;
    }
    //
    this.title = temp.data.goodsName;
    this.detail = temp.data;
  },
  methods: {
    filterImg(url) {
      if (url && url.startsWith("http")) {
        return url;
      } else {
        url = `http://47.99.134.126:28019${url}`;
        return url;
      }
    },
    gotoCart() {
      this.$router.push("/cart");
    },
    addCart() {
      this.$toast("加入购物车");
    },
    gotoOrder() {
      this.$router.push("/order");
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../../common/style/mixin.less");

.itemwrap {
  .detailcontent {
    .detailswipewrap {
      margin-top: 70px;
      .myswipe .van-swipe-item {
        img {
          width: 100%;
        }
      }
    }
    .productinfo {
      padding: 0 10px;
      .producttitle {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .productdesc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .productprice {
        .fj();
        span:nth-child(1) {
          color: #f63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .productintro {
      width: 100%;
      ul {
        display: flex;
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .productcontent {
        padding: 0 20px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>