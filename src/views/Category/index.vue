<template>
  <div class="categorywrap">
    <!-- 头部 -->
    <m-subheader title="商品分类" :loginShow="true"></m-subheader>
    <!-- 底部导航 -->
    <bottom-nav></bottom-nav>
    <!-- 左侧分类 -->
    <div class="leftwrap">
      <van-sidebar v-model="activeKey" @change="onChange">
        <template v-for="item in categoryData">
          <van-sidebar-item :key="item.categoryId" :title="item.categoryName" />
        </template>
      </van-sidebar>
    </div>
    <!-- 右侧分类 -->
    <div class="rightwrap">
      <template v-for="item in categoryObj.secondLevelCategoryVOS">
        <span :key="item.categoryId">
          <div class="title">{{ item.categoryName }}</div>
          <span class="itemwrap">
            <template v-for="subitem in item.thirdLevelCategoryVOS">
              <span class="item">
                <img
                  src="http://s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png"
                />
                <span class="itemdesc">{{ subitem.categoryName }}</span>
              </span>
            </template>
          </span>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import mSubheader from "../../components/subheader";
import bottomNav from "../../components/bottomnav/index";
import { get } from "@/service/http";

export default {
  components: {
    mSubheader,
    bottomNav,
  },
  data() {
    return {
      activeKey: 0,
      categoryData: [],
      categoryObj: {},
    };
  },
  async created() {
    let data = await get("/categories");
    this.categoryData = data.data;
    this.categoryObj = data.data[0];
  },
  methods: {
    onChange(val) {
      this.categoryObj = this.categoryData[val];
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../common/style/mixin.less");

.categorywrap {
  position: absolute;
  top: 48px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  .leftwrap {
    .van-sidebar {
      width: 116px;
    }
    .van-sidebar-item--select::before {
      height: 60px;
    }
    width: 116px;
    background: #f7f8fa;
  }
  .rightwrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    .footer {
      margin-bottom: 0;
    }
    .title {
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: #233;
      font-size: 14px;
      font-weight: 500;
    }
    .itemwrap {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        box-sizing: border-box;
        width: 33.33%;
        .flexcenter();
        flex-direction: column;
        padding: 10px 0;
        img {
          display: block;
          width: 40px;
          margin: 0 auto;
        }
        .itemdesc {
          text-align: center;
          font-size: 14px;
          padding: 10px 0;
          color: #222333;
        }
      }
    }
  }
}
</style>
