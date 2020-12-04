<template>
  <div class="aboutwrap">
    <!-- 头部 -->
    <m-subheader title="关于我们" :loginShow="true"></m-subheader>
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";

export default {
  components: {
    mSubheader,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.aboutwrap {
}
</style>