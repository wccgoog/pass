<template>
  <div id="nav">
    <script src="./asserts/js/jquery-3.2.1.min.js"></script>
    <script src="./asserts/layer/layer.js"></script>
    <script src="./asserts/layui/layui.js"></script>
    <link href="./asserts/css/common.css" rel="stylesheet" />
    <div class="jshx-logo">
      <div class="jshx-logo-content">
        <a style="color: rgb(255,255,255)" href="/index.html">南京按需维保评价系统</a>
      </div>
    </div>
    <div class="jshx-nav">
      <ul
        class="layui-nav"
        style="background-color: #001529;border-radius: 0px;height: 64px;z-index: 999"
      >
        <li class="layui-nav-item">
          <a href="/index.html">首页</a>
        </li>

        <li class="layui-nav-item" v-for="(item,index) in nav" v-bind:key="index">
          <a href="javascript:;">{{ item.title }}</a>
          <dl class="layui-nav-child">
            <dd v-for="(items,indexs) in item.children" v-bind:key="indexs">
              <a v-bind:href="items.url">{{ items.title }}</a>
            </dd>
          </dl>
        </li>

        <li class="layui-nav-item" style="float: right;margin-right: 20px;">
          <a>
            <cite>{{ userName }}</cite>
            <span class="layui-nav-more"></span>
          </a>
          <dl class="layui-nav-child layui-anim layui-anim-upbit">
            <dd>
              <a layui-href>基本资料</a>
            </dd>
            <dd>
              <a layui-href>修改密码</a>
            </dd>
            <hr />
            <dd>
              <a href="/loginOut">退出</a>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: Head,
  data() {
    return {
      nav: [
        {
          title: "基础数据",
          url: null,
          disabled: false,
          children: [
            {
              title: "电梯管理",
              url: "/elevator",
              disabled: false,
              children: []
            },
            {
              title: "维保单位",
              url: "/maintenance",
              disabled: false,
              children: []
            },
            {
              title: "使用单位",
              url: "/elevatorUser",
              disabled: false,
              children: []
            }
          ]
        },
        {
          title: "工单管理",
          url: null,
          disabled: false,
          children: [
            {
              title: "应急工单",
              url: "/emergency",
              disabled: false,
              children: []
            },
            {
              title: "维保工单",
              url: "/wbRecord",
              disabled: false,
              children: []
            },
            { title: "检验", url: null, disabled: false, children: [] }
          ]
        },
        {
          title: "系统管理",
          url: null,
          disabled: false,
          children: [
            {
              title: "用户管理",
              url: "/sysuser",
              disabled: false,
              children: []
            },
            { title: "权限管理", url: "/acl", disabled: false, children: [] },
            { title: "角色管理", url: "/role", disabled: false, children: [] },
            {
              title: "表单功能",
              url: "/code/produce",
              disabled: false,
              children: []
            },
            { title: "空白页", url: "/1.html", disabled: false, children: [] }
          ]
        }
      ],
      userName: "test"
    };
  }
};
</script>