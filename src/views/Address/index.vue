<template>
  <div class="addresswrap">
    <!-- 头部 -->
    <m-subheader title="地址管理" :loginShow="true"></m-subheader>
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
.addresswrap {
}
</style>