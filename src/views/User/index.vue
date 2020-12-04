<template>
  <div class="userwrap">
    <!-- 头部 -->
    <m-subheader title="我的" :loginShow="false"></m-subheader>
    <!-- 底部导航 -->
    <bottom-nav></bottom-nav>
    <!-- 个人信息 -->
    <div class="userinfo">
      <div class="info">
        <img src="//s.yezgea02.com/1604040746310/aaaddd.png" />
        <div class="userdesc">
          <span>昵称：{{ user.nickName }}</span>
          <span>登录名：{{ user.loginName }}</span>
          <span class="name">个性签名：{{ user.introduceSign }}</span>
        </div>
      </div>
    </div>
    <!-- 功能 -->
    <div class="funcwrap">
      <van-cell-group>
        <van-cell title="帐号管理" is-link to="/info" />
        <van-cell title="我的订单" is-link to="/order" />
        <van-cell title="地址管理" is-link to="/address" />
        <van-cell title="关于我们" is-link to="/about" />
      </van-cell-group>
    </div>
    <div class="buttonfunc" @click="logout">
      <van-button round type="primary" block>登出商城</van-button>
    </div>
    <!-- 底部 -->
    <m-footer></m-footer>
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";
import bottomNav from "../../components/bottomnav/index";
import store from "../../common/js/store";
import mFooter from "../../components/footer/index";
import { get } from "../../service/http";
import { Dialog } from "vant";

export default {
  components: {
    mSubheader,
    bottomNav,
    mFooter,
  },
  data() {
    return {
      user: {},
    };
  },
  async created() {
    if (!store.get("token") || store.get("token") === "") {
      this.$toast("尚未登录");
      this.$router.replace("/login");
    }
    let temp = await get("/user/info");
    if (temp.resultCode !== 200) {
      store.clearAll();
      this.$toast(temp.message);
      this.$router.replace("/login");
      return;
    }
    //
    this.user = temp.data;
  },
  methods: {
    logout() {
      Dialog.confirm({
        title: "",
        message: "登出商城？",
      })
        .then(() => {
          store.clearAll();
          this.$toast("登出成功");
          setTimeout(() => {
            this.$router.replace("/");
          }, 500);
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../common/style/mixin.less");
.userwrap {
  display: flex;
  flex-direction: column;
  .userinfo {
    height: 115px;
    background: @primary;
    box-shadow: 0 2px 5px @primary;
    border-radius: 6px;
    margin: 70px 10px 0 10px;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      .boxSizing();
      img {
        .wh(60px, 60px);
        border-radius: 50%;
        margin-top: 4px;
      }
      .userdesc {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .funcwrap {
    margin-top: 20px;
  }
  .buttonfunc {
    margin-top: 20px;
    padding: 30px;
  }
  .footer {
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100vw;
    margin-bottom: 0;
  }
}
</style>