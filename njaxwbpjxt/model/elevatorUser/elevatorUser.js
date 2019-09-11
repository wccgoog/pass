layui.use('table', function () {
    var table = layui.table;
    // 新增或编辑页路径
    var updateUrl = '/elevatorUser/add';
    //删除接口
    var delUrl = '/liftUsers/batchdel/';
    //列表页展示数据
    var cols = [[
        {type: 'checkbox'}
        , {field: 'uName', minWidth: 240, title: '单位名称'}
        , {field: 'uAdd', title: '办公地址'}
        , {field: 'uTel', title: '值守电话'}
        , {field: 'uChief', title: '主要负责人'}
        , {field: 'uChiefTel', title: '主要负责人电话'}
        , {title: '操作', width: 160, align: 'center', toolbar: '#barDemo'}
    ]];

    //生成搜索栏位
    var col = cols[0];
    var searchCol = getSearchCol(col);
    creatSearchDiv(searchCol);
    var where = getWhere(searchCol);
    // 列表高度
    var documentHeight = document.body.clientHeight - 285;
    documentHeight = documentHeight > 530 ? documentHeight : 530;
    // 生成列表
    table.render({
        elem: '#test'
        , url: '/liftUsers/search'
        , cellMinWidth: 80
        , where: where
        , page: true
        , limit: 10
        , height: documentHeight
        , toolbar: 'default'
        , limits: [10, 20, 30]
        , cols: cols
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