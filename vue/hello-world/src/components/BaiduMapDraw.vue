<template>
  <div>
    <input v-model.number="center.lng" />
    <input v-model.number="center.lat" />
    <input v-model.number="zoom" />
    <baidu-map
      class="map"
      :center="{lng: 116.404, lat: 39.915}"
      :zoom="zoom"
      :scroll-wheel-zoom="scrollWheelZoom"
      @mousemove="syncPolyline"
      @click="paintPolyline"
      @rightclick="newPolyline"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
    >
      <bm-control>
        <button @click="toggle('polyline')">{{ polyline.editing ? '结束绘制' : '开始绘制' }}</button>
      </bm-control>
      <bm-polyline :path="path" v-for="(path,index) of polyline.paths" v-bind:key="index"></bm-polyline>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-city-list>
      <bm-marker
        :position="{lng: 116.404, lat: 39.915}"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
        @click="infoWindowOpen"
      >
        <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">我爱北京天安门</bm-info-window>
        <bm-label
          content="我爱北京天安门"
          :labelStyle="{color: 'red', fontSize : '14px'}"
          :offset="{width: -35, height: 30}"
        />
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 15,
      polyline: {
        editing: false,
        paths: []
      },
      show: false
    };
  },
  props: {
    scrollWheelZoom: Boolean
  },
  methods: {
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
    },
    toggle(name) {
      this[name].editing = !this[name].editing;
    },
    syncPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        return;
      }
      const path = paths[paths.length - 1];
      if (!path.length) {
        return;
      }
      if (path.length === 1) {
        path.push(e.point);
      }
      this.$set(path, path.length - 1, e.point);
    },
    newPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        paths.push([]);
      }
      const path = paths[paths.length - 1];
      path.pop();
      if (path.length) {
        paths.push([]);
      }
    },
    paintPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      !paths.length && paths.push([]);
      paths[paths.length - 1].push(e.point);
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: 500px;
}
</style>