Vue.component('nav-head', {
    data: function () {
        var navList = [];
        var name = '';
        $.ajax({
            url: '/test/test',
            async: false,
            success: function (res) {
                console.log(res);
                name = res.msg;
                navList = res.data;
            }
        });
        return {
            nav: navList,
            userName: name
        };
    },
    template: `<div>    <div class="jshx-logo">      <div class="jshx-logo-content">        <a style="color: rgb(255,255,255)" href="/index.html">南京按需维保评价系统</a>      </div>    </div>    <div class="jshx-nav">      <ul        class="layui-nav"        style="background-color: #001529;border-radius: 0px;height: 64px;z-index: 999"      >        <li class="layui-nav-item">          <a href="/index.html">首页</a>        </li>        <li class="layui-nav-item" v-for="(item,index) in nav" v-bind:key="index">          <a href="javascript:;">{{ item.title }}</a>          <dl class="layui-nav-child">            <dd v-for="(items,indexs) in item.children" v-bind:key="indexs">              <a v-bind:href="items.url">{{ items.title }}</a>            </dd>          </dl>        </li>        <li class="layui-nav-item" style="float: right;margin-right: 20px;">          <a>            <cite>{{ userName }}</cite>            <span class="layui-nav-more"></span>          </a>          <dl class="layui-nav-child layui-anim layui-anim-upbit">            <dd>              <a layui-href>基本资料</a>            </dd>            <dd>              <a layui-href>修改密码</a>            </dd>            <hr />            <dd>              <a href="/loginOut">退出</a>            </dd>          </dl>        </li>      </ul>    </div></div>`
});

new Vue({ el: '#nav' });