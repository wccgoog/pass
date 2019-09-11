layui.use(['form', 'laydate'], function () {
    var form = layui.form;
    var type = localStorage.getItem("type");
    var data = localStorage.getItem("data");
    var liftUsers = JSON.parse(localStorage.getItem('liftUsers'));
    var liftmaintenance = JSON.parse(localStorage.getItem('liftmaintenance'));
    var liftInformation = JSON.parse(localStorage.getItem('liftInformation'));
    var faulttype = JSON.parse(localStorage.getItem('faulttype'));
    var uNameList = JSON.parse(localStorage.getItem('uNameList'));
    var mNameList = JSON.parse(localStorage.getItem('mNameList'));
    var regCodeList = JSON.parse(localStorage.getItem('regCodeList'));
    var faultInfoList = JSON.parse(localStorage.getItem('faultInfoList'));
    var maintId = '';
    var userId = '';
    var liftId = '';
    var faultCode = '';
    data = JSON.parse(data);

    //新增接口
    var addUrl = '/liftForm';
    //修改接口
    var updateUrl = '/liftForm/update/';
    var cols = [
        {field: 'resArrTime', title: '响应人员到达时间'}
        , {field: 'resSucTime', title: '解救成功时间'}
        , {field: 'helperTime', title: '救援人回访时间'}
        , {field: 'visitTime', title: '救援单位回访时间'}
        , {field: 'formNo', title: '工单编号'}
        , {field: 'regCode', title: '设备注册代码'}
        , {field: 'forhelper', title: '求援人'}
        , {field: 'forhelpTel', title: '求援电话'}
        , {field: 'resUnit', title: '救援响应单位'}
        , {field: 'resPer', title: '救援人员'}
        , {field: 'resTel', title: '救援人员手机'}
        , {field: 'resLev', title: '响应级别'}
        , {field: 'uName', title: '使用单位'}
        , {field: 'mName', title: '维保单位'}
        , {field: 'faultInfo', title: '故障原因'}

    ];

    //生成详情页的各字段div
    createDetailDiv(cols);
    createDatalist('mName', mNameList);
    createDatalist('uName', uNameList);
    createDatalist('regCode', regCodeList);
    createDatalist('faultInfo', faultInfoList);
    var laydate = layui.laydate;
    laydate.render({
        elem: '#resArrTime'
        , type: 'datetime'
    });

    laydate.render({
        elem: '#resSucTime'
        , type: 'datetime'
    });

    laydate.render({
        elem: '#helperTime'
    });

    laydate.render({
        elem: '#visitTime'
    });

    if ('add' == type) {
        // 新增
    } else {
        var objectList = ['uName', 'mName', 'faultInfo', 'regCode'];
        cols.forEach(function (value) {
            if (!(value.field in objectList)) {
                document.getElementById(value.field).value = data[value.field];
            }
        });
        document.getElementById('uName').value = data['liftUsers'].uName;
        document.getElementById('mName').value = data['liftMaintenance'].mName;
        document.getElementById('faultInfo').value = data['faulttype'].faultInfo;
        document.getElementById('regCode').value = data['liftInformation'].regCode;

        //如果点击的按钮是查看，则不能修改
        if ('detail' == type) {
            cols.forEach(function (value) {
                document.getElementById(value.field).disabled = true;
            });
        }
    }

    document.getElementById("uName").setAttribute("lay-verify", "uName");
    document.getElementById("mName").setAttribute("lay-verify", "mName");
    document.getElementById("faultInfo").setAttribute("lay-verify", "faultInfo");
    document.getElementById("regCode").setAttribute("lay-verify", "regCode");

    // 输入框验证
    form.verify({
        uName: function (param) {
            var flag = 0;
            liftUsers.forEach(function (value) {
                if (value.uName == param) {
                    flag = 1;
                    userId = value.rowId;
                }
            });
            if (flag == 0) {
                return '使用单位不存在'
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
        },
        faultInfo: function (param) {
            var flag = 0;
            faulttype.forEach(function (value) {
                if (value.faultInfo == param) {
                    flag = 1;
                    faultCode = value.faultCode;
                }
            });
            if (flag == 0) {
                return '故障原因不存在'
            }
        },
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
        }
    });


    //提交(新增或修改)按钮点击事件
    //监听提交
    form.on('submit(layuiadmin-app-form-submit)', function (data) {
        var field = data.field; //获取提交的字段
        field.userId = userId;
        field.maintId = maintId;
        field.faultCode = faultCode;
        field.liftId = liftId;
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
        field.userId = userId;
        field.maintId = maintId;
        field.faultCode = faultCode;
        field.liftId = liftId;
    debugger
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