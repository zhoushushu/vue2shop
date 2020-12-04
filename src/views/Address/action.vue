<template>
  <div class="addressactionwrap">
    <!-- 头部 -->
    <m-subheader
      :title="type === 'add' ? '新增地址' : '编辑地址'"
    ></m-subheader>
    <!-- 新增地址 -->
    <div v-if="type === 'add'">
      <van-address-edit
        :area-list="areaList"
        save-button-text="新增"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
    <!-- 编辑地址 -->
    <div v-if="type === 'edit'">
      <van-address-edit
        show-delete
        :area-list="areaList"
        save-button-text="编辑"
        :address-info="addressInfo"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onEdit"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";
import store from "../../common/js/store";
import { get, post, put, del } from "../../service/http";
import area from "../../common/js/area";

export default {
  components: {
    mSubheader,
  },
  data() {
    return {
      type: "",
      areaList: area,
      editId: "",
      addressInfo: {},
    };
  },
  async created() {
    let type = this.$route.params.type;
    this.type = type;
    if (this.type === "edit") {
      let editId = this.$route.query.id;
      this.editId = editId;
      //
      let temp = await get(`/address/${editId}`);
      console.log(temp.data);
      let tempObj = {};
      tempObj.id = temp.data.addressId;
      tempObj.city = temp.data.cityName;
      tempObj.isDefault = temp.data.defaultFlag ? true : false;
      tempObj.addressDetail = temp.data.detailAddress;
      tempObj.province = temp.data.provinceName;
      tempObj.county = temp.data.regionName;
      tempObj.name = temp.data.userName;
      tempObj.tel = temp.data.userPhone;
      tempObj.areaCode = "130821";
      this.addressInfo = tempObj;
    }
  },
  methods: {
    async onSave(content) {
      let obj = {
        cityName: content.city,
        defaultFlag: content.isDefault ? 1 : 0,
        detailAddress: content.addressDetail,
        provinceName: content.province,
        regionName: content.county,
        userName: content.name,
        userPhone: content.tel,
      };
      let temp = await post("/address", obj);
      if (temp.resultCode !== 200) {
        this.$toast(temp.message);
        return;
      }
      this.$toast("新增成功");
      setTimeout(() => {
        this.$router.replace("/address");
      }, 500);
    },
    async onEdit(content) {
      let obj = {
        addressId: this.editId,
        cityName: content.city,
        defaultFlag: content.isDefault ? 1 : 0,
        detailAddress: content.addressDetail,
        provinceName: content.province,
        regionName: content.county,
        userName: content.name,
        userPhone: content.tel,
      };
      let temp = await put(`/address`, obj);
      if (temp.resultCode !== 200) {
        this.$toast(temp.message);
        return;
      }
      this.$toast("修改成功");
      setTimeout(() => {
        this.$router.replace("/address");
      }, 500);
    },
    async onDelete() {
      let temp = await del(`/address/${this.editId}`);
      if (temp.resultCode !== 200) {
        this.$toast(temp.message);
        return;
      }
      this.$toast("删除成功");
      setTimeout(() => {
        this.$router.replace("/address");
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
.addressactionwrap {
  padding-top: 58px;
}
</style>