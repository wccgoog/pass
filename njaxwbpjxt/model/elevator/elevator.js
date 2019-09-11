layui.use('table', function () {
    var table = layui.table;

    // 新增或编辑页路径
    var updateUrl = '/elevator/add';
    //删除接口
    var delUrl = '/liftInformation/batchdel/';
    //列表页展示数据
    var cols = [[
        {type: 'checkbox'}
        , {field: 'liftNo', width: 80, title: '档案号'}
        , {field: 'idCode', width: 100, title: '电梯识别码'}
        , {field: 'regCode', title: '设备代码'}
        , {
            field: 'uName', title: '使用单位', templet: function (data) {
                return data.liftUsers.uName;
            }
        }
        , {
            field: 'mName', title: '维保单位', templet: function (data) {
                return data.liftMaintenance.mName;
            }
        }
        , {field: 'installAdd', title: '电梯安装地址'}
        , {title: '操作', width: 160, align: 'center', toolbar: '#barDemo'}
    ]];
    //生成搜索栏位
    var col = cols[0];
    var searchCol = getSearchCol(col);
    creatSearchDiv(searchCol);
    var where = getWhere(searchCol);

    // 获取维保单位
    var mNameList = [];
    $.ajax({
        url: '/liftMaintenance/searchAll',
        success: function (res) {
            localStorage.setItem('liftmaintenance', JSON.stringify(res.data));
            res.data.forEach(function (value) {
                mNameList.push(value.mName);
            });
            localStorage.setItem('mNameList', JSON.stringify(mNameList));
            // 搜索栏生成下拉框
            createDatalist('mName', mNameList);
        }
    });
    // 获取使用单位
    var uNameList = [];
    $.ajax({
        url: '/liftUsers/searchAll',
        success: function (res) {
            localStorage.setItem('liftUsers', JSON.stringify(res.data));
            res.data.forEach(function (value) {
                uNameList.push(value.uName);
            });
            localStorage.setItem('uNameList', JSON.stringify(uNameList));
            createDatalist('uName', uNameList);
        }
    });
    // 获取区域
    var areaInfoList = [];
    $.ajax({
        url: '/liftarea/searchAll',
        success: function (res) {
            localStorage.setItem('liftarea', JSON.stringify(res.data));
            res.data.forEach(function (value) {
                areaInfoList.push(value.areaInfo);
            });
            localStorage.setItem('areaInfoList', JSON.stringify(areaInfoList));
        }
    });

    // 列表高度
    var documentHeight = document.body.clientHeight - 285;
    documentHeight = documentHeight > 530 ? documentHeight : 530;
    // 生成列表

    table.render({
        elem: '#test'
        , url: '/liftInformation/search'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , where: where
        , page: true
        , limit: 10
        , height: documentHeight
        , toolbar: 'default'
        , limits: [10, 20, 30]
        , cols: cols
        // , done: function (res) {
        //     tdTitle();
        // }
    });

    // 右侧工具栏
    table.on('tool(demo)', function (obj) {
        createRightTool(obj, updateUrl, delUrl, '900px', '600px');
    });

    // 上方工具栏
    table.on('toolbar(demo)', function (obj) {
        createTopTool(table, obj, updateUrl, delUrl, '900px', '600px');
    });

    //查询按钮和重置按钮
    createSearchButton(table, searchCol);
});