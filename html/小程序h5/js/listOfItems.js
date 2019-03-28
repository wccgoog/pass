/**
 * Created by Administrator on 2019/3/28.
 */

// 跳转指定页面
function go(e){
    console.log(e.getAttribute("data-id"));
    var id = e.getAttribute("data-id");
    if(id==1){
        console.log("进入1");
        location.href="./index.html"
    } else if (id == 2) {
        console.log("进入2");
        location.href= "./scan.html"
    } else if (id == 3) {
        console.log("进入3");
        location.href= "./numSearch.html"
    }
}



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
var options=getRequest();
console.log(options);

if(options.q) {
    var scan_url = decodeURIComponent(options.q);
    var str = scan_url;
    var p = str.lastIndexOf("/");
    var id = str.substring(p + 1,str.length);
    $.ajax({
        url:"/mini/api/window/affairList",
        data:{
            window_id: id
        },
        type:"get",
        header: {
            'content-type': 'application/json' // 默认值
        },
        success:function(data){
            addSquare(data.data.window_info.name);
            addIntro(data.data.window_info.intro)
        }
    })
}else{
    $.ajax({
        url:"/mini/api/window/affairList",
        data:{
            window_id: options.window_id
        },
        type:"get",
        header: {
            'content-type': 'application/json' // 默认值
        },
        success:function(data){
            addSquare(data.data.window_info.name);
            addIntro(data.data.window_info.intro);
            addList(data.data.list);
            console.log(data.data.list)
        }
    })
}

function addSquare(result) {
    $(".header").append("<div>"+result+"窗口</div>")
}

function addIntro(result) {
    $(".bodyList").append("<div class='intro flod' id='intro'>"+result+"</div><div class='bottomButton'><button onclick='add()'>展开</button></div>")
}

function add() {
    if($(".intro").hasClass("flod"))
    {
        $(".bottomButton button").html("收起");
        $(".intro").removeClass("flod");
        $(".intro").addClass("extend");
    }
    else if($(".intro").hasClass("extend")){
        $(".bottomButton button").html("展开");
        $(".intro").removeClass("extend");
        $(".intro").addClass("flod");
    }
}

function addList(result){
    $.each(result,function(index,obj) {
        var x=index+1;
        $(".bodyList").append("<div class='singleList' data-id="+obj['id']+" onclick='gotoContentDetail(this)'>"+x+'、'+obj['name']+"</div>")
    })
}

function gotoContentDetail(e) {
    window.location.href="./contentDetail.html?id=" + e.getAttribute("data-id")
}