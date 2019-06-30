<template>
  <div id="app">
    <h1 v-for="[item,key] in msg" v-bind:key="key">{{ item }}</h1>
    <img src="./img/logo.jpg" />
    <input type="text" v-model="msg" />
    <select v-model="selected">
      <option
        v-for="(item, index) in selection"
        v-bind:key="index"
        v-bind:value="item.value"
      >{{ item.text }}</option>
    </select>
    <h1>Selected: {{selected}}</h1>
  </div>
</template>

<script>
import getData from "./util";

export default {
  name: "app",
  data() {
    return {
      msg: "hello",
      selection: [
        { text: "One", value: "A" },
        { text: "Two", value: "B" },
        { text: "Three", value: "C" }
      ],
      selected: ""
    };
  },
  created() {
    this.fetchData();
    console.log(123);
  },
  methods: {
    async fetchData() {
      const data = await getData();
      this.msg = data;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  h1 {
    color: green;
  }
}
</style>
