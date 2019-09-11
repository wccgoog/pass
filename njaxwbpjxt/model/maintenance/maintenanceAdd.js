layui.use('form', function () {
    var form = layui.form;
    var type = localStorage.getItem("type");
    var data = localStorage.getItem("data");
    data = JSON.parse(data);

    //新增接口
    var addUrl = '/liftMaintenance';
    //修改接口
    var updateUrl = '/liftMaintenance/update/';
    var cols = [
        {field: 'maintUscc', width: 180, title: '统一信用代码'}
        , {field: 'mName', width: 200, title: '单位名称'}
        , {field: 'mAdd', width: 240, title: '办公地址'}
        , {field: 'mTel', width: 240, title: '值守电话'}
        , {field: 'mChief', width: 240, title: '主要负责人'}
        , {field: 'mChiefTel', title: '主要负责人电话'}
    ];

    //生成详情页的各字段div
    createDetailDiv(cols);

    if ('add' == type) {
        // 新增
    } else {
        id = data.id;
        cols.forEach(function (value) {
            document.getElementById(value.field).value = data[value.field];
        });

        //如果点击的按钮是查看，则不能修改
        if ('detail' == type) {
            cols.forEach(function (value) {
                document.getElementById(value.field).disabled = true;
            });
        }
    }

    // 输入框验证
    form.verify({
        liftNo: function (value) {
            if (value.length < 6) {
                return '用户名至少6个字符'
            }
        }
    });

    //提交(新增或修改)按钮点击事件
    createSubmit(form, addUrl, updateUrl);
});