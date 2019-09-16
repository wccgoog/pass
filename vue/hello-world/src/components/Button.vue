<template>
  <div>
    <el-button-group style="margin-right:30px;">
      <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
      <el-button type="primary" :loading="true">
        下一页
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </el-button-group>
    <el-button-group>
      <el-button type="success" icon="el-icon-edit" :disabled="false"></el-button>
      <el-button type="primary" icon="el-icon-share" :disabled="true"></el-button>
      <el-button type="primary" icon="el-icon-delete"></el-button>
    </el-button-group>
    <div style="margin-top:40px;">
      <el-link icon="el-icon-edit">编辑</el-link>
      <el-link :href="url">
        查看
        <i class="el-icon-view el-icon--right"></i>
      </el-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "#"
    };
  }
};
</script>