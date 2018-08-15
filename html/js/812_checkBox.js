function creatCheckBox(json,key){
    var distinctKey = getDistinct(json,key);
    var body = '<input type="checkbox" id="all' + key + '"><label for="all' + key +'">' +
        '全部' + '</label>';
    for(var i = 0; i < distinctKey.length; i++){
        body += '<input name="' + key + '" type="checkbox" id="' + distinctKey[i] + 
            '"><label for="' + distinctKey[i] +
            '">' + distinctKey[i] + '</label>';
    }
    body = '<div>' + body + '</div>';
    document.getElementById("left-flex-box").innerHTML += body;
}

function checkAll(key){
    var checkList = document.getElementsByName(key);
    for(var i = 0; i < checkList.length; i++){
        checkList[i].checked = document.getElementById("all"+key).checked;
    }
}

function getCheckedItems(key){
    var checkedList = [];
    var checkList = document.getElementsByName(key);
    for(var i = 0; i < checkList.length; i++){
        if(checkList[i].checked == true){
            checkedList.push(checkList[i].id);
        }
    }
    return checkedList;  //返回勾选的array
}

function addOnchange(key){
    var checkList = document.getElementsByName(key);
    for(var i = 0; i < checkList.length; i++){
        checkList[i].onchange = function(){
            var region = getCheckedItems("region");
            var product = getCheckedItems("product");
            if(getCheckedItems(key).length == checkList.length){
                document.getElementById('all'+key).checked = true;
            }
            else{
                document.getElementById('all'+key).checked = false;
            }
            creatForm(region,product,region.length);
        }
    }
}