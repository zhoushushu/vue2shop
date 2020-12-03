<template>
  <div class="categorywrap">
    <!-- 头部 -->
    <m-subheader title="购物车" :loginShow="true"></m-subheader>
    <!-- 底部导航 -->
    <bottom-nav :tabActive="tabActive"></bottom-nav>
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";
import bottomNav from "../../components/bottomnav/index";

export default {
  components: {
    mSubheader,
    bottomNav,
  },
  data() {
    return {
      tabActive: 2,
    };
  },
};
</script>

<style lang="less" scoped>
.categorywrap {
}
</style>