<template>
  <div>
    <div>
      <el-radio v-model="radio1" label="1" border>备选项1</el-radio>
      <el-radio v-model="radio1" label="2" border>备选项2</el-radio>
    </div>
    <div style="margin-top: 20px">
      <el-radio v-model="radio2" label="1" border size="medium">备选项1</el-radio>
      <el-radio v-model="radio2" label="2" border size="medium">备选项2</el-radio>
    </div>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio3" size="small" @change="radioChange">
        <el-radio label="1" border>备选项1</el-radio>
        <el-radio label="2" border>备选项2</el-radio>
      </el-radio-group>
    </div>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio4" size="mini" disabled>
        <el-radio label="1" border>备选项1</el-radio>
        <el-radio label="2" border>备选项2</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio1: "1",
      radio2: "1",
      radio3: "1",
      radio4: "1"
    };
  },
  methods: {
    radioChange(params) {
      console.log(params);
    }
  },
  created: function() {
    console.log("Radio.vue:created");
  },
  mounted: function() {
    console.log("Radio.vue:mounted");
    this.radio1 = "2";
    this.$axios({
      method: "get",
      url: "/"
    }).then(res => {
      console.log(res);
    });
  }
};
</script>