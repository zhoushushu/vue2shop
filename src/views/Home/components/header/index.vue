<template>
  <header class="headerwrap">
    <router-link class="lefticon" tag="span" to="/category">
      <van-icon name="apps-o" />
    </router-link>
    <div class="headersearch">
      <van-icon name="search" class="iconsearch" />
      <span class="searchtitle">搜索想要的商品</span>
    </div>
    <router-link class="righticon" tag="span" to="/user">
      <van-icon name="user-o" />
    </router-link>
  </header>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../../../common/style/mixin";
.headerwrap {
  position: fixed;
  left: 0;
  top: 0;
  .wh(100%, 50px);
  display: flex;
  align-items: center;
  line-height: 50px;
  .boxSizing();
  color: #fff;
  z-index: 10000;
  background: @primary;
  .lefticon {
    width: 50px;
    .flexcenter();
    color: #fff;
    font-size: 16px;
  }
  .righticon {
    width: 50px;
    .flexcenter();
    color: #fff;
    font-size: 16px;
  }
  .headersearch {
    flex: 1;
    display: flex;
    align-items: center;
    height: 28px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 28px;
    .iconsearch {
      padding: 0 10px;
      font-size: 18px;
      color: #666;
    }
    .searchtitle {
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
