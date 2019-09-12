layui.use(['table', 'laydate', 'colorpicker', 'element'], function () {
    var $ = layui.$;
    var laydate = layui.laydate;
    var element = layui.element;
    element.progress('progress', '50%');
    //一些事件监听
    element.on('tab(demo)', function (data) {
        console.log(data);
    });
    var colorpicker = layui.colorpicker;
    colorpicker.render({
        elem: '#color'  //绑定元素
        , predefine: true
        , colors: ['#F00', '#0F0', '#00F', 'rgb(255, 69, 0)', 'rgba(255, 69, 0, 0.5)']
        , size: 'lg'
    });
    var ins = laydate.render({
        elem: '#dateDemo'
        , type: 'datetime'
        , theme: 'molv'
        , calendar: true
        , value: '2019-09-03'
        , mark: {
            '0-8-16': '生日'
        }
        // , change: function (value, date, endDate) {
        //     ins.hint(value); //在控件上弹出value值
        // }
    });

    var table = layui.table;
    var documentHeight = document.body.clientHeight;
    documentHeight = documentHeight > 530 ? documentHeight : 530;
    table.render({
        elem: '#test'
        , url: './js/data.json'
        , page: true
        , limit: 10
        , height: documentHeight
        // , even: true
        , toolbar: 'default'
        , limits: [10, 20, 30]
        , cols: [[
            { type: 'checkbox' }
            , {
                field: 'id', title: 'ID', sort: true, templet: function (data) {
                    return data.id.x;
                }
            }
            , { field: 'username', title: '用户名' }
            , { field: 'sex', title: '性别', sort: true }
            , { field: 'city', title: '城市' }
            , { field: 'sign', title: '签名', minWidth: 200 } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            , { field: 'experience', title: '积分', sort: true }
            , { field: 'score', title: '评分', sort: true }
            , { field: 'classify', title: '职业' }
            , { field: 'wealth', width: 137, title: '财富', sort: true }
            , { title: '操作', minWidth: 200, toolbar: '#barDemo' }
        ]]
    });

    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        var html = 'add.html?args=' + encodeURI(JSON.stringify(data)) + '&type=' + obj.event;
        if (obj.event === 'detail') {
            layer.open({
                type: 2,
                content: [html, 'no'],
                area: ['1000px', '700px'],
            });
        } else if (obj.event === 'del') {
            layer.confirm('确认删除吗？', function (index) {
                var $ = layui.$;
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
                area: ['1000px', '700px'],
                btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#layuiadmin-app-form-edit");
                    submit.click();
                }
            });
        }
    });

    table.on('row(demo)', function (obj) {
        console.log(obj.tr); //得到当前行元素对象
        console.log(obj.data);//得到当前行数据
        //obj.del(); //删除当前行
        //obj.update(fields) //修改当前行数据 
    });

    table.on('toolbar(demo)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data;
        switch (obj.event) {
            case 'add':
                layer.msg('添加');
                layer.open({
                    type: 2,
                    content: ['add.html', 'no'],
                    area: ['1000px', '700px'],
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
                    });
                }
                break;
            case 'update':
                if (data.length == 0) {
                    layer.msg('请选择一行');
                } else if (data.length > 1) {
                    layer.msg('只能同时编辑一个');
                } else {
                    var html = 'add.html?args=' + encodeURI(JSON.stringify(data[0])) + '&type=' + obj.event;
                    layer.open({
                        type: 2,
                        content: [html, 'no'],
                        area: ['1000px', '700px'],
                        btn: ['确定', '取消']
                        , yes: function (index, layero) {
                            //点击确认触发 iframe 内容中的按钮提交
                            var submit = layero.find('iframe').contents().find("#layuiadmin-app-form-edit");
                            submit.click();
                        }
                    });
                }
                break;
        }
    });
    $("#searchDeviceUser").click(function () {
        installAdd = $("#installAdd").val();
        dateDemo = $("#dateDemo").val();
        table.reload('test', {
            where: {
                installAdd: installAdd,
                dateDemo: dateDemo
            }
        });
    });
});