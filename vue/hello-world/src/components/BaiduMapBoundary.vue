<template>
  <baidu-map class="map" :center="{lng: 116.403765, lat: 39.914850}" :zoom="11">
    <bm-boundary name="北京市海淀区" :strokeWeight="2" strokeColor="blue" :fillOpacity="0.1"></bm-boundary>
  </baidu-map>
</template>

<script>
export default {
  data() {
    return {
      x: 0
    };
  }
};
</script>