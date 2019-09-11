//获取搜索字段
function getSearchCol(col) {
    var searchCol = [];
    for (var i = 0; i < col.length; i++) {
        if (col[i].field && col[i].title) {
            searchCol.push(col[i]);
        }
    }
    return searchCol;
}

// 生成搜索div
function creatSearchDiv(searchCol) {
    var colHtml = '';
    for (var i = 0; i < searchCol.length; i++) {
        colHtml = colHtml + '<div class="layui-col-xs6 layui-col-sm6 layui-col-md3">' +
            '                <div class="layui-row layui-col-space20">' +
            '                    <div class="layui-col-xs5 layui-col-sm5 layui-col-md5 layui-elip" style="margin-top: 5px;">' + searchCol[i].title + ':</div>' +
            '                    <div class="layui-col-xs7 layui-col-sm7 layui-col-md7">' +
            '                        <input type="text" name="' + searchCol[i].field + '" id="' + searchCol[i].field + '" lay-verify="' + searchCol[i].field + '" autocomplete="off" class="layui-input">' +
            '                    </div>' +
            '                </div>' +
            '            </div>'
    }
    $("#search").prepend(colHtml);
}

// 获取查询字段
function getWhere(searchCol) {
    var where = {};
    for (var i = 0; i < searchCol.length; i++) {
        where[searchCol[i].field] = $("#" + searchCol[i].field).val();
    }
    return where;
}

//清空搜索框
function clearSearch(searchCol) {
    for (var i = 0; i < searchCol.length; i++) {
        $("#" + searchCol[i].field).val("");
    }
}

//右侧工具栏点击事件
function createRightTool(obj, updateUrl, delUrl, width, height) {
    var data = obj.data;
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("type", obj.event);
    if (obj.event === 'detail') {
        layer.open({
            type: 2,
            content: [updateUrl, 'no'],
            area: [width, height]
        });
    } else if (obj.event === 'delete') {
        layer.confirm('确认删除吗？', function (index) {
            $.ajax({
                method: 'delete',
                url: delUrl + data.rowId,
                data: obj.data,
                success: function (res) {
                    parent.layui.table.reload('test'); //重载表格
                }
            });
            layer.close(index);
        });
    } else if (obj.event === 'update') {
        layer.open({
            type: 2,
            content: [updateUrl, 'no'],
            area: [width, height],
            btn: ['确定', '取消']
            , yes: function (index, layero) {
                //点击确认触发 iframe 内容中的按钮提交
                var submit = layero.find('iframe').contents().find("#layuiadmin-app-form-edit");
                submit.click();
            }
        });
    }
}

//上方工具栏点击事件
function createTopTool(table, obj, updateUrl, delUrl, width, height) {
    localStorage.setItem("type", obj.event);
    var checkStatus = table.checkStatus(obj.config.id);
    var data = checkStatus.data;
    switch (obj.event) {
        case 'add':
            layer.open({
                type: 2,
                content: [updateUrl, 'no'],
                area: [width, height],
                btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#layuiadmin-app-form-submit");
                    submit.click();
                }
            });
            break;
        case 'delete':
            if (data.length == 0) {
                layer.msg('请选择一行');
            } else {
                layer.confirm('确认删除吗？', function (index) {
                    var rowId = "";
                    for (var i = 0; i < data.length; i++) {
                        rowId = rowId + data[i].rowId + "|";
                        if (i == data.length - 1) {
                            rowId = rowId.substring(0, rowId.length - 1);
                        }
                    }
                    $.ajax({
                        method: 'delete',
                        url: delUrl + rowId,
                        success: function (res) {
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
                localStorage.setItem("data", JSON.stringify(data[0]));
                layer.open({
                    type: 2,
                    content: [updateUrl, 'no'],
                    area: [width, height],
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
}

//查询和重置按钮的点击事件
function createSearchButton(table, searchCol) {
    //点击查询按钮
    $("#searchDiv").click(function () {
        var where = getWhere(searchCol);
        table.reload('test', {
            where: where
        })
    });

    // 点击重置按钮
    $("#clearSearch").click(function () {
        clearSearch(searchCol);
        var where = getWhere(searchCol);
        table.reload('test', {
            where: where
        });
    })
}

//生成详情页的各字段
function createDetailDiv(cols) {
    var colsHtml = '';
    cols.forEach(function (value) {
        colsHtml += '<div class="layui-col-xs6 layui-col-sm6 layui-col-md6">' +
            '            <div class="layui-row">' +
            '                <label class="layui-col-xs4 layui-col-sm4 layui-col-md4"  style="margin-top: 9px;">' + value.title + '：</label>' +
            '                <div class="layui-col-xs8 layui-col-sm8 layui-col-md8">' +
            '                    <input type="text" id="' + value.field + '" name="' + value.field + '" lay-verify="required" autocomplete="off" class="layui-input layui-form-danger">' +
            '                </div>' +
            '            </div>' +
            '        </div>';
    });
    $("#layuiadmin-app-form-list").append(colsHtml);
}

//详情页提交点击事件
function createSubmit(form, addUrl, updateUrl) {
    //监听提交
    form.on('submit(layuiadmin-app-form-submit)', function (data) {
        var field = data.field; //获取提交的字段
        field = JSON.stringify(field);
    debugger
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
        field = JSON.stringify(field);
        var id = JSON.parse(localStorage.getItem('data')).rowId; //跳转带入的id加入field中
    debugger
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
}

//移到table单元格显示全部内容
function tdTitle() {
    $('th').each(function (index, element) {
        $(element).attr('title', $(element).text());
    });
    $('td').each(function (index, element) {
        $(element).attr('title', $(element).text());
    });
}

// 生成下拉框
function createDatalist(id, list) {
    var listId = id + 'List';
    document.getElementById(id).setAttribute("list", listId);
    var listHtml = '';
    list.forEach(function (value) {
        listHtml += '<option>' + value + '</option>';
    });
    listHtml = '<datalist id="' + listId + '">' + listHtml + '</datalist>';
    $('#' + id).after(listHtml);
}