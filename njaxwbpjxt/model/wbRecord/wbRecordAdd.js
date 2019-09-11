layui.use(['form', 'laydate'], function () {
    var form = layui.form;
    var type = localStorage.getItem('type');
    var data = localStorage.getItem('data');
    var liftInformation = JSON.parse(localStorage.getItem('liftInformation'));
    var liftmaintenance = JSON.parse(localStorage.getItem('liftmaintenance'));
    var mNameList = JSON.parse(localStorage.getItem('mNameList'));
    var regCodeList = JSON.parse(localStorage.getItem('regCodeList'));
    var maintId = '';
    data = JSON.parse(data);


    //新增接口
    var addUrl = '/wbRecord';
    //修改接口
    var updateUrl = '/wbRecord/update/';

    var cols = [
        {field: 'planDate', title: '计划维保日期'}
        , {field: 'startTime', title: '维保开始时间'}
        , {field: 'endTime', title: '维保结束时间'}
        , {field: 'regCode', title: '设备代码'}
        , {field: 'mName', title: '维保单位'}
        , {field: 'personAName', title: '维保人员A'}
        , {field: 'personATel', title: '维保人员A联系方式'}
        , {field: 'personBName', title: '维保人员B'}
        , {field: 'personBTel', title: '维保人员B联系方式'}
        , {field: 'isOverDue', title: '是否超期'}
        , {field: 'lon', title: '经度'}
        , {field: 'lat', title: '纬度'}
    ];

    //生详情页的各字段div
    createDetailDiv(cols);
    createDatalist('mName', mNameList);
    createDatalist('regCode', regCodeList);
    createDatalist('isOverDue', ['超期', '未超期']);
    var laydate = layui.laydate;
    laydate.render({
        elem: '#planDate'
    });
    laydate.render({
        elem: '#startTime'
        , type: 'datetime'
    });
    laydate.render({
        elem: '#endTime'
        , type: 'datetime'
    });

    if ('add' == type) {
        // 新增
    } else {
        // 从localstorage中取值填入各字段中
        var objectList = ['regCode', 'mName', 'isOverDue'];
        cols.forEach(function (value) {
            if (!(value.field in objectList)) {
                document.getElementById(value.field).value = data[value.field];
            }
        });
        document.getElementById('mName').value = data['liftMaintenance'].mName;
        document.getElementById('regCode').value = data['liftInformation'].regCode;
        if (data['isOverDue'] == 0) {
            document.getElementById('isOverDue').value = '未超期';
        } else if (data['isOverDue'] == 1) {
            document.getElementById('isOverDue').value = '超期';
        }
        //如果点击的按钮是查看，则不能修改
        if ('detail' == type) {
            cols.forEach(function (value) {
                document.getElementById(value.field).disabled = true;
            });
        }
    }

    document.getElementById("mName").setAttribute("lay-verify", "mName");
    document.getElementById("regCode").setAttribute("lay-verify", "regCode");
    // 输入框验证
    form.verify({
        regCode: function (param) {
            var flag = 0;
            liftInformation.forEach(function (value) {
                if (value.regCode == param) {
                    flag = 1;
                    liftId = value.rowId;
                debugger
                }
            });
            if (flag == 0) {
                return '电梯设备代码不存在'
            }
        },
        mName: function (param) {
            var flag = 0;
            liftmaintenance.forEach(function (value) {
                if (value.mName == param) {
                    flag = 1;
                    maintId = value.rowId;
                }
            });
            if (flag == 0) {
                return '维保单位不存在'
            }
        }
    });

    //提交(新增或修改)按钮点击事件
    //监听提交
    form.on('submit(layuiadmin-app-form-submit)', function (data) {
        var field = data.field; //获取提交的字段
        field.maintId = maintId;
        field.liftId = liftId;
        if (field.isOverDue == '超期') {
            field.isOverDue = 1;
        } else if (field.isOverDue == '未超期') {
            field.isOverDue = 0;
        }
        field = JSON.stringify(field);
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            method: 'post',
            url: addUrl,
            contentType: "application/json",
            async: false,
            data: field,
            success: function (res) {
                parent.layui.table.reload('test'); //重载表格
            }
        });
        parent.layer.close(index); //再执行关闭
    });

    //监听编辑
    form.on('submit(layuiadmin-app-form-edit)', function (data) {
        var field = data.field; //获取提交的字段
        field.maintId = maintId;
        field.liftId = liftId;
        if (field.isOverDue == '超期') {
            field.isOverDue = 1;
        } else if (field.isOverDue == '未超期') {
            field.isOverDue = 0;
        }
        field = JSON.stringify(field);
        var id = JSON.parse(localStorage.getItem('data')).rowId; //跳转带入的id加入field中
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            method: 'put',
            url: updateUrl + id,
            contentType: "application/json",
            async: false,
            data: field,
            success: function (res) {
                parent.layui.table.reload('test'); //重载表格
            }
        });
        parent.layer.close(index); //再执行关闭
    });
});