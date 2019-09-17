<template>
  <div id="app">
    <Test></Test>
    <!-- <img src="./assets/logo.png" /> -->
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Layout></Layout>
    <Container style="margin-top:40px;"></Container>
    <Button style="margin-top:40px;"></Button>
    <Radio style="margin-top:40px;"></Radio>
    <Inputvue></Inputvue>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Test from "./components/Test";
import Layout from "./components/Layout";
import Container from "./components/Container";
import Button from "./components/Button";
import Radio from "./components/Radio";
import Inputvue from "./components/Input";

export default {
  name: "app",
  components: {
    HelloWorld,
    Test,
    Layout,
    Container,
    Button,
    Radio,
    Inputvue
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
