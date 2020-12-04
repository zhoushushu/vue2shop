<template>
  <div class="infowrap">
    <!-- 头部 -->
    <m-subheader title="帐号管理" :loginShow="true"></m-subheader>
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
.infowrap {
}
</style>