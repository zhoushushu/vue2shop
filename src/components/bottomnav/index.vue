<template>
  <van-tabbar class="bottomnav" v-model="active">
    <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/user" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  props: ["tabActive"],
  data() {
    return {
      active: this.tabActive,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../common/style/mixin";
.bottomnav {
  position: fixed;
  left: 0;
  bottom: 0;
  .wh(100%, 50px);
  .van-tabbar-item--active {
    color: red;
  }
}
</style>