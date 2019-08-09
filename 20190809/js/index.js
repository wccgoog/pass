layui.use('table', function () {
    var table = layui.table;

    table.render({
        elem: '#test'
        , url: './js/data.json'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , page: true
        , limit: 5
        , limits: [3, 5, 10]
        , cols: [[
            { field: 'id', width: 80, title: 'ID', sort: true }
            , { field: 'username', width: 80, title: '用户名' }
            , { field: 'sex', width: 80, title: '性别', sort: true }
            , { field: 'city', width: 80, title: '城市' }
            , { field: 'sign', title: '签名', width: '30%', minWidth: 100 } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            , { field: 'experience', title: '积分', sort: true }
            , { field: 'score', title: '评分', sort: true }
            , { field: 'classify', title: '职业' }
            , { field: 'wealth', width: 137, title: '财富', sort: true }
            , { title: '操作', toolbar: '#barDemo' }
        ]]
    });

    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {
            layer.msg('ID：' + data.id + ' 的查看操作');
        } else if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var html = 'add.html?args=' + encodeURI(JSON.stringify(data))
            // layer.alert('编辑行：<br>' + JSON.stringify(data))
            layer.open({
                type: 2,
                content: [html, 'no'],
                area: ['700px', '700px'],
                btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#layuiadmin-app-form-edit");
                    submit.click();
                }
            });
            table.reload('test')
        }
    });

    var $ = layui.$, active = {
        addData: function () {
            layer.open({
                type: 2,
                content: ['add.html', 'no'],
                area: ['700px', '700px'],
                btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#layuiadmin-app-form-submit");
                    submit.click();
                }
            });
            table.reload('test')
        }
    };

    $('.layui-card-body .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});