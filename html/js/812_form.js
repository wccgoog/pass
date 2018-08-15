function creatForm(selectRegion,selectProduct,n){     //创建右侧表
    document.getElementById("right-table").innerHTML = "";   //右侧区域清空
    var head = "";
    if(n == 1){
        head = '<th>地区</th><th>产品</th>';
    }
    else{                
        head = '<th>产品</th><th>地区</th>';
    }
    for(var i = 1; i <= 12;i++){
        head += '<th>' + i + "月</th>";
    }
    head = '<tr>' + head + '</tr>';
    document.getElementById("right-table").innerHTML = head;
    var body = "";
    for(var i = 0;i < sourceData.length;i++){
        if(selectRegion.indexOf(sourceData[i].region) > -1){
            if(selectProduct.indexOf(sourceData[i].product) > -1){
                body += getData(sourceData[i],n);
            }
        }
    }
    document.getElementById("right-table").innerHTML += body;
    if(n == 1){
        var tdRegion = document.getElementsByName('td' + selectRegion[0]);
        while(tdRegion.length > 1){
            tdRegion[0].rowSpan += 1;
            tdRegion[1].outerHTML = "";
        }
    }
    else{
        for(var j = 0; j < selectProduct.length; j++){
            var tdProduct = document.getElementsByName('td' + selectProduct[j]);
            while(tdProduct.length > 1){
                tdProduct[0].rowSpan += 1;
                tdProduct[1].outerHTML = "";
            }
        }
    }
}

function getData(json,n){     //从json获取数据到表中,n用来判断列的位置
    var body = "";
    if(n == 1){
        body = '<td name="td' + json.region + '">' +
            json.region + '</td>' +
            '<td>' + json.product + '</td>';
    }
    else{
        body = '<td name="td' + json.product + '">' +
            json.product + '</td>' +
            '<td>' + json.region + '</td>';
    }
    for(var j = 0; j < json.sale.length; j++){
        body += '<td>' +
            json.sale[j] +
            '</td>';
    }
    body = '<tr>' + body + '</tr>';
    return body;
}

function getDistinct(json,key){     //从json获取类型
    var arr = [];
    for(var i = 0; i < json.length; i++){
        if(arr.indexOf(json[i][key]) == -1){
            arr.push(json[i][key]);
        }
    }
    return arr;
}

