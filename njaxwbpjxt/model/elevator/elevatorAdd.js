layui.use(['form', 'laydate'], function () {
    var form = layui.form;
    var type = localStorage.getItem('type');
    var data = localStorage.getItem('data');
    var liftUsers = JSON.parse(localStorage.getItem('liftUsers'));
    var liftarea = JSON.parse(localStorage.getItem('liftarea'));
    var liftmaintenance = JSON.parse(localStorage.getItem('liftmaintenance'));
    var uNameList = JSON.parse(localStorage.getItem('uNameList'));
    var mNameList = JSON.parse(localStorage.getItem('mNameList'));
    var areaInfoList = JSON.parse(localStorage.getItem('areaInfoList'));
    var areaCode = '';
    var maintId = '';
    var userId = '';
    data = JSON.parse(data);


    //新增接口
    var addUrl = '/liftInformation';
    //修改接口
    var updateUrl = '/liftInformation/update/';

    var cols = [
        {field: 'maintDate', title: '下次维保日期'},
        {field: 'installDate', title: '安装日期'},
        {field: 'liftNo', title: '档案号'},
        {field: 'liftType', title: '电梯类别'},
        {field: 'idCode', title: '电梯救援识别码'},
        {field: 'regCode', title: '设备代码'},
        {field: 'uName', title: '使用单位'},
        {field: 'mName', title: '维保单位'},
        {field: 'installAdd', title: '电梯安装地址'},
        {field: 'placeType', title: '场所类别'},
        {field: 'areaInfo', title: '所在区域'},
        {field: 'factoryId', title: '出厂编号'},
        {field: 'manufacturer', title: '制造单位'},
        {field: 'brand', title: '电梯品牌'},
        {field: 'state', title: '电梯使用状态'}
    ];

    //生详情页的各字段div
    createDetailDiv(cols);
    createDatalist('mName', mNameList);
    createDatalist('uName', uNameList);
    createDatalist('areaInfo', areaInfoList);
    var laydate = layui.laydate;
    laydate.render({
        elem: '#maintDate'
    });
    laydate.render({
        elem: '#installDate'
    });

    if ('add' == type) {
        // 新增
    } else {
        var objectList = ['uName', 'mName', 'areaInfo'];
        cols.forEach(function (value) {
            if (!(value.field in objectList)) {
                document.getElementById(value.field).value = data[value.field];
            }
        });
        document.getElementById('uName').value = data['liftUsers'].uName;
        document.getElementById('mName').value = data['liftMaintenance'].mName;
        document.getElementById('areaInfo').value = data['liftarea'].areaInfo;

        //如果点击的按钮是查看，则不能修改
        if ('detail' == type) {
            cols.forEach(function (value) {
                document.getElementById(value.field).disabled = true;
            });
        }
    }

    document.getElementById("uName").setAttribute("lay-verify", "uName");
    document.getElementById("mName").setAttribute("lay-verify", "mName");
    document.getElementById("areaInfo").setAttribute("lay-verify", "areaInfo");
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
        areaInfo: function (param) {
            var flag = 0;
            liftarea.forEach(function (value) {
                if (value.areaInfo == param) {
                    flag = 1;
                    areaCode = value.areaCode;
                }
            });
            if (flag == 0) {
                return '区域不存在'
            }
        }
    });

    //提交(新增或修改)按钮点击事件
    //监听提交
    form.on('submit(layuiadmin-app-form-submit)', function (data) {
        var field = data.field; //获取提交的字段
        field.userId = userId;
        field.maintId = maintId;
        field.areaCode = areaCode;
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
        field.areaCode = areaCode;
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