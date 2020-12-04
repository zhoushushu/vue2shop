<template>
  <div class="goodwrap">
    <header class="goodheader">{{ title }}</header>
    <div class="goodbox">
      <div
        class="gooditem"
        v-for="item in goodData"
        :key="item.goodsId"
        @click="goToDetail(item)"
      >
        <img :src="filterImg(item.goodsCoverImg)" />
        <div class="gooddesc">
          <div class="title">{{ item.goodsName }}</div>
          <div class="price">¥ {{ item.sellingPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "goodData"],
  methods: {
    filterImg(url) {
      if (url && url.startsWith("http")) {
        return url;
      } else {
        url = `http://47.99.134.126:28019${url}`;
        return url;
      }
    },
    goToDetail(obj) {
      // this.$router.push({
      //   path: `/product/${obj.goodsId}`,
      // });
      this.$router.push(`/item/${obj.goodsId}`);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../common/style/mixin";

.goodwrap {
  .goodheader {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }
  .goodbox {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .gooditem {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1px solid #e9e9e9;
      padding: 10px 10px;
      img {
        display: block;
        width: 100px;
        margin: 0 auto;
      }
      .gooddesc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;
        .title {
          color: #222333;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
</style>
