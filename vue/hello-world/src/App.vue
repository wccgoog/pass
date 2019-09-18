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
    <Container></Container>
    <Button></Button>
    <Radio></Radio>
    <Inputvue></Inputvue>
    <Cascader></Cascader>
    <DateTimePicker></DateTimePicker>
    <Upload></Upload>
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
import Cascader from "./components/Cascader";
import DateTimePicker from "./components/DateTimePicker";
import Upload from "./components/Upload";

export default {
  name: "app",
  components: {
    HelloWorld,
    Test,
    Layout,
    Container,
    Button,
    Radio,
    Inputvue,
    Cascader,
    DateTimePicker,
    Upload
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

#app > * {
  margin-top: 40px;
}
</style>
