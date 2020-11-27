<template>
  <van-swipe class="swiperwrap" :autoplay="3000" indicator-color="#F0250F">
    <van-swipe-item v-for="(item, index) in swiperData" :key="index">
      <img :src="item.carouselUrl" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: ["swiperData"],
};
</script>

<style lang="less" scoped>
.swiperwrap {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>