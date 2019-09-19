<template>
  <div id="app">
    <router-link to="/">home</router-link>
    <router-link :to="{name:'about',query:{id:123,num:4}}">about</router-link>
    <router-view></router-view>
    <Test></Test>
    <Layout></Layout>
    <Container></Container>
    <Button></Button>
    <Radio></Radio>
    <Inputvue></Inputvue>
    <Cascader></Cascader>
    <DateTimePicker></DateTimePicker>
    <Formvue></Formvue>
  </div>
</template>

<script>
import Test from "./components/Test";
import Layout from "./components/Layout";
import Container from "./components/Container";
import Button from "./components/Button";
import Radio from "./components/Radio";
import Inputvue from "./components/Input";
import Cascader from "./components/Cascader";
import DateTimePicker from "./components/DateTimePicker";
import Upload from "./components/Upload";
import Formvue from "./components/Form";

export default {
  name: "app",
  components: {
    Test,
    Layout,
    Container,
    Button,
    Radio,
    Inputvue,
    Cascader,
    DateTimePicker,
    Formvue
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

.el-form {
  width: 700px;
  margin: auto;
}
</style>
