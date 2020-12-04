<template>
  <header class="subheader">
    <span class="lefticon" @click="goHome"
      ><van-icon />
      <van-icon v-if="goHomeShow" name="wap-home-o" />
    </span>
    <div class="headertitle">{{ title }}</div>
    <span class="righticon"
      ><van-icon @click="goUser" v-if="loginShow" name="user-o"
    /></span>
  </header>
</template>

<script>
export default {
  props: ["title"],
  props: {
    goHomeShow: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "标题",
    },
    loginShow: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goUser() {
      this.$router.push("/user");
    },
  },
};
</script>


<style lang="less" scoped>
@import "../../common/style/mixin";
.subheader {
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
  border-bottom: 1px solid #ebedf0;
  background: #fff;
  .lefticon {
    width: 50px;
    .flexcenter();
    color: @primary;
    font-size: 16px;
  }
  .righticon {
    width: 50px;
    .flexcenter();
    color: @primary;
    font-size: 16px;
  }
  .headertitle {
    flex: 1;
    color: @primary;
    line-height: 50px;
    height: 50px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
  }
}
</style>