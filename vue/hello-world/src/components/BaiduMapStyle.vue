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
    <input v-model.number="center.lng" />
    <input v-model.number="center.lat" />
    <input v-model.number="zoom" />
    <baidu-map
      class="map"
      :scroll-wheel-zoom="true"
      :center="{lng: 118.8508, lat: 32.044286}"
      :zoom="12"
      :mapStyle="mapStyle"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
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
      center: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 15,
      mapStyle: {
        styleJson: mapStyle
      },
      location: "北京",
      keyword: ""
    };
  },
  methods: {
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: 500px;
}
</style>