<template>
  <div>
    <label>
      关键词：
      <input v-model="keyword" />
    </label>
    <label>
      地区：
      <input v-model="location" />
    </label>
    <baidu-map
      class="map"
      :scroll-wheel-zoom="true"
      :center="{lng: 116.404, lat: 39.915}"
      :zoom="15"
      :mapStyle="mapStyle"
    >
      <bm-view class="map"></bm-view>
      <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
    </baidu-map>
  </div>
</template>

<script>
import { mapStyle } from "../assets/mapStyle";
export default {
  data() {
    return {
      mapStyle: {
        styleJson: mapStyle
      },
      location: "北京",
      keyword: "百度"
    };
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: 500px;
}
</style>