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

$(function(){
    $.ajax({
        type:"get",
        url:"/mini/api/Index/detail",
        dataType:"json",
        data:{
            'id' : webData.id
        },
        success:function(data) {
            getBasicInfo(data);
            console.log(data);
            addTab(data);
        }
    })
});

//获取tab
function addTab(data){
    if(data.data.place_time && data.data.place_time.length != 0){
        $(".scroll").append('<div class="headSingle" data-id=1 onclick="changeTab(this)">办理地点、时间</div>');
        $(".body").append('<div class="flowChart" id="nav-1"><div class="bodyHeader"><img class="headerImg" src="image/流程@2x.png"/><div class="headerText">办理地点、时间</div></div><div class="bodyList flod"></div><div class="bottomButton" onclick="button(this)" data-id="1"><button>展开</button></div></div>')     
        $("#nav-1 .bodyList").append("<div>"+data.data.place_time+"</div>");
    }
    if(data.data.tree_img && data.data.tree_img.length != 0){
        $(".scroll").append('<div class="headSingle" data-id=2 onclick="changeTab(this)">流程图</div>');
        $(".body").append('<div class="flowChart" id="nav-2"><div class="bodyHeader"><img class="headerImg" src="image/流程@2x.png"/><div class="headerText">流程图</div></div><div class="bodyList flod"></div><div class="bottomButton" onclick="button(this)" data-id="2"><button>展开</button></div></div>')     
        $("#nav-2 .bodyList").append("<img class='flowTreeImg' src='"+data.data.tree_img.file_path+"'/>");
    }
    if(data.data.affair_material_list && data.data.affair_material_list.length != 0){
            $(".scroll").append('<div class="headSingle" data-id=3 onclick="changeTab(this)">办理材料</div>');
            $(".body").append('<div class="flowChart" id="nav-3"><div class="bodyHeader"><img class="headerImg" src="image/流程@2x.png"/><div class="headerText">办理材料</div></div><div class="bodyList flod"></div><div class="bottomButton" onclick="button(this)" data-id="3"><button>展开</button></div></div>')
            $("#nav-3 .bodyList").append("<div>" + data.data.affair_material_list[0].name + "</div>");
            console.log(data.data.affair_material_list);
    }
    if(data.data.setting && data.data.setting.length != 0){
        $(".scroll").append('<div class="headSingle" data-id=4 onclick="changeTab(this)">设定依据</div>');
        $(".body").append('<div class="flowChart" id="nav-4"><div class="bodyHeader"><img class="headerImg" src="image/流程@2x.png"/><div class="headerText">设定依据</div></div><div class="bodyList flod"></div><div class="bottomButton" onclick="button(this)" data-id="4"><button>展开</button></div></div>')     
        $("#nav-4 .bodyList").append("<div>"+data.data.setting+"</div>");
    }
    if(data.data.condition && data.data.condition.length != 0){
        $(".scroll").append('<div class="headSingle" data-id=5 onclick="changeTab(this)">办理条件</div>');
        $(".body").append('<div class="flowChart" id="nav-5"><div class="bodyHeader"><img class="headerImg" src="image/流程@2x.png"/><div class="headerText">办理条件</div></div><div class="bodyList flod"></div><div class="bottomButton" onclick="button(this)" data-id="5"><button>展开</button></div></div>')     
        $("#nav-5 .bodyList").append("<div>"+data.data.condition+"</div>");
    }
    if(data.data.outlay_criterion && data.data.outlay_criterion.length != 0){
        $(".scroll").append('<div class="headSingle" data-id=6 onclick="changeTab(this)">收费标准</div>');
        $(".body").append('<div class="flowChart" id="nav-6"><div class="bodyHeader"><img class="headerImg" src="image/流程@2x.png"/><div class="headerText">收费标准</div></div><div class="bodyList flod"></div><div class="bottomButton" onclick="button(this)" data-id="6"><button>展开</button></div></div>')     
        $("#nav-6 .bodyList").append("<div>"+data.data.outlay_criterion+"</div>");
    }
}

//获取基本信息
function getBasicInfo(data){
    if(data.data.name){
        $("#nav-0 .bodyList").append("<div class='bodyListSingle'><div class='bodyListSingleKey'>事项名称：</div><div class='bodyListSingleValue'>"+data.data.name+"</div></div>");
    }
    if( data.data.level){
        $("#nav-0 .bodyList").append("<div class='bodyListSingle'><div class='bodyListSingleKey'>行使层级：</div><div class='bodyListSingleValue'>"+data.data.level+"</div></div>");
    }
    if(data.data.num_limit){
        $("#nav-0 .bodyList").append("<div class='bodyListSingle'><div class='bodyListSingleKey'>数量限制：</div><div class='bodyListSingleValue'>"+data.data.num_limit+"</div></div>");
    }
    if(data.data.transact_type){
        $("#nav-0 .bodyList").append("<div class='bodyListSingle'><div class='bodyListSingleKey'>办件类型：</div><div class='bodyListSingleValue'>"+data.data.transact_type+"</div></div>");
    }
    if(data.data.dec_org){
        $("#nav-0 .bodyList").append("<div class='bodyListSingle'><div class='bodyListSingleKey'>决定机构：</div><div class='bodyListSingleValue'>"+data.data.dec_org+"</div></div>");
    }
    if(data.data.res_send_way){
        $("#nav-0 .bodyList").append("<div class='bodyListSingle'><div class='bodyListSingleKey'>办理结果送达方式：</div><div class='bodyListSingleValue'>"+data.data.res_send_way+"</div></div>");
    }
    if(data.data.rule_do_day){
        $("#nav-0 .bodyList").append("<div class='bodyListSingle'><div class='bodyListSingleKey'>法定办结时限：</div><div class='bodyListSingleValue'>"+data.data.rule_do_day+"</div></div>");
    }
    if(data.data.agree_do_day){
        $("#nav-0 .bodyList").append("<div class='bodyListSingle'><div class='bodyListSingleKey'>承诺办结时限：</div><div class='bodyListSingleValue'>"+data.data.agree_do_day+"</div></div>");
    }
    if(data.data.contact_way){
        $("#nav-0 .bodyList").append("<div class='bodyListSingle'><div class='bodyListSingleKey'>咨询方式：</div><div class='bodyListSingleValue'>"+data.data.contact_way+"</div></div>");
    }
}

function changeTab(e){
    var target=e.getAttribute("data-id");
    $(".headSingle").removeClass("on");
    $(".headSingle").siblings("[data-id="+target+"]").addClass("on");
    document.getElementById("nav-"+target).scrollIntoView(true);
}

var buttonValue="展开"

function button(e){
    if(buttonValue=="展开"){
        buttonValue="收起";
        $("[data-id="+e.getAttribute("data-id")+"]").find("button").html("收起");
        $("[data-id="+e.getAttribute("data-id")+"]").siblings(".bodyList").removeClass("flod").addClass("extend");
    }
    else{
        buttonValue="展开";
        $("[data-id="+e.getAttribute("data-id")+"]").find("button").html("展开");
        $("[data-id="+e.getAttribute("data-id")+"]").siblings(".bodyList").removeClass("extend").addClass("flod");
    }
}  