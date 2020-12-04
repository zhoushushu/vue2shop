<template>
  <div class="addresswrap">
    <!-- 头部 -->
    <m-subheader title="地址管理"></m-subheader>
    <!-- 地址 -->
    <div>
      <van-address-list
        v-model="addressId"
        :list="addressData"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        :switchable="false"
      />
    </div>
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";
import store from "../../common/js/store";
import { get } from "../../service/http";

export default {
  components: {
    mSubheader,
  },
  data() {
    return {
      addressData: [],
      addressId: "",
    };
  },
  async created() {
    if (!store.get("token") || store.get("token") === "") {
      this.$toast("尚未登录");
      this.$router.replace("/login");
    }
    let temp = await get("/address");
    if (temp.resultCode !== 200) {
      this.$toast(temp.message);
      return;
    }
    let tempData = temp.data.map((item) => {
      let obj = {};
      obj.id = item.addressId;
      obj.name = item.userName;
      obj.tel = item.userPhone;
      obj.address = `${item.provinceName}${item.cityName}${item.regionName}${item.detailAddress}`;
      obj.isDefault = item.defaultFlag === 1 ? true : false;
      return obj;
    });
    //
    this.addressData = tempData;
  },
  methods: {
    onAdd() {
      this.$router.push("/address/add");
    },
    onEdit(item) {
      this.$router.push(`/address/edit?id=${item.id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.addresswrap {
  padding-top: 58px;
}
</style>