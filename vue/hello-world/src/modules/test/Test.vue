<template>
  <div class="container">
    <BaiduMapDraw :scroll-wheel-zoom="true"></BaiduMapDraw>
    <PropTest :prop-message="false"></PropTest>
    <BaiduMapStyle></BaiduMapStyle>
    <BaiduMapBoundary></BaiduMapBoundary>
  </div>
</template>

<script>
import BaiduMapDraw from "../../components/BaiduMapDraw";
import PropTest from "../../components/PropTest";
import BaiduMapStyle from "../../components/BaiduMapStyle";
import BaiduMapBoundary from "../../components/BaiduMapBoundary";

export default {
  name: "test",
  components: {
    BaiduMapDraw,
    PropTest,
    BaiduMapStyle,
    BaiduMapBoundary
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: 500px;
  width: 100%;
}

.container > * {
  margin-bottom: 150px;
}
</style>