/**
 * Created by Administrator on 2019/3/18.
 */
$(function(){
    $.ajax({
        type:"get",
        url:"/mini/api/Index/total",
        dataType:"json",
        data:{
            'id' : webData.id
        },
        success:function(data) {
            addTitle(data.data.name);
            addLb(data.data.category);
            addQljbbm(data.data.no);
            addSszt(data.data.im_sub);
            addXscj(data.data.level);
            addBz(data.data.remarks);
            addSsyj(data.data.im_bas);
            addList(data.data.second_list)
        }
    })
});

function getRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
var webData = getRequest();

function addTitle(result) {
    $(".head").append("<div class='headTitle'>"+result+"</div>" +
        "<div class='greenLine'></div>");
}

function addLb(result) {
    $(".partOne").append("<div class='partOneSingle'><div>类别：</div><div class='right'>"+result+"</div></div>");
}

function addQljbbm(result) {
    $(".partOne").append("<div class='partOneSingle'><div>权利基本编码：</div><div>"+result+"</div></div>");
}

function addSszt(result) {
    $(".partOne").append("<div class='partOneSingle'><div>实施主体：</div><div>"+result+"</div></div>");
}

function addXscj(result) {
    $(".partOne").append("<div class='partOneSingle'><div>行使层级：</div><div>"+result+"</div></div>");
}

function addBz(result) {
    $(".partOne").append("<div class='partOneSingle'><div>备注：</div><div>"+result+"</div></div>");
}

function addSsyj(result) {
    $(".partOne").append("<div class='partOneSingleLookAll'><div>实施依据：</div><div class='lookAll' onclick='add()'>查看全部<text>&nbsp;</text><img mode='widthFix' style='height:15px' class='img3' src='image/arrow.png'/></div></div>" +
        "<div class='doDetail flod' id='doDetail'>"+result+"</div>");
}

function addList(result) {
    $.each(result,function(index,obj) {
        $(".ListTwo").append("<div class='listTwoSingle' onclick='goContDetail(this)' data_id="+obj['id']+"><div class='leftWords'><div class='greenPoint'></div>"+obj['name']+"</div><img class='img4' src='image/arrow.png' style='height:14px'/></div>")
    })
}

function add(){
    if($(".doDetail").hasClass("flod"))
    {
        $(".doDetail").removeClass("flod");
        $(".doDetail").addClass("extend");
    }
    else if($(".doDetail").hasClass("extend")){
        $(".doDetail").removeClass("extend");
        $(".doDetail").addClass("flod");
    }
}

function goContDetail(e) {
    window.location.href = 'contentDetail.html?id=' + e.getAttribute("data_id");
}