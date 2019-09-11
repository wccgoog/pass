layui.use('table', function () {
    var $ = layui.$;
    var table = layui.table;
    var documentHeight = document.body.clientHeight - 170;
    table.render({
        elem: '#test'
        , url: '/model/test/data.json'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , page: true
        , limit: 10
        , height: documentHeight
        , toolbar: 'default'
        , limits: [10, 20, 30]
        , cols: [[
            { type: 'checkbox' }
            , { field: 'id', width: 80, title: 'ID', sort: true }
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

    // 右侧工具栏
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        localStorage.setItem("data",JSON.stringify(data));
        localStorage.setItem("type",obj.event);
        var html = '/test/add';
        if (obj.event === 'detail') {
            layer.open({
                type: 2,
                content: [html, 'no'],
                area: ['700px', '700px'],
            });
        } else if (obj.event === 'del') {
            layer.confirm('确认删除吗？', function (index) {
                $.ajax({
                    method: 'post',
                    url: '',
                    data: obj.data,
                    success: function (res) {
                        console.log(res);
                        parent.layui.table.reload('test'); //重载表格
                    }
                });
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
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
        }
    });

    // 上方工具栏
    table.on('toolbar(demo)', function (obj) {
        localStorage.setItem("type",obj.event);
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        switch (obj.event) {
            case 'add':
                layer.open({
                    type: 2,
                    content: ['/test/add', 'no'],
                    area: ['700px', '700px'],
                    btn: ['确定', '取消']
                    , yes: function (index, layero) {
                        //点击确认触发 iframe 内容中的按钮提交
                        var submit = layero.find('iframe').contents().find("#layuiadmin-app-form-submit");
                        submit.click();
                    }
                });
                table.reload('test')
                break;
            case 'delete':
                if (data.length == 0) {
                    layer.msg('请选择一行');
                } else {
                    console.log(data);
                    layer.confirm('确认删除吗？', function (index) {
                        var $ = layui.$;
                        $.ajax({
                            method: 'post',
                            url: '',
                            data: data,
                            success: function (res) {
                                console.log(res);
                                parent.layui.table.reload('test'); //重载表格
                            }
                        });
                        layer.close(index);
                    })
                }
                break;
            case 'update':
                if (data.length == 0) {
                    layer.msg('请选择一行');
                } else if (data.length > 1) {
                    layer.msg('只能同时编辑一个');
                } else {
                    var html = '/test/add';
                    localStorage.setItem("data",JSON.stringify(data[0]));
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
                }
                break;
        };
    });

});