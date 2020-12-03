<template>
  <div class="categorywrap">
    <!-- 头部 -->
    <m-subheader title="我的" :loginShow="false"></m-subheader>
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
      tabActive: 3,
    };
  },
};
</script>

<style lang="less" scoped>
.categorywrap {
  padding-top: 70px;
}
</style>