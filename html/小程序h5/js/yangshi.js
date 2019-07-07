//获取url中"?"符后的字串  
function getRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function goListDetail(e) {
    console.log(e);
    window.location.href = 'listDetail.html?type=' + webData.type + '&sid=' + e.getAttribute("data-id");
}

var webData = getRequest();

$(function () {
    $.ajax({
        type: "get",
        url: "/mininew/api/index/departmentList",
        dataType: "json",
        data: {
            type: webData.type
        },
        success: function (data) {
            console.log(data.data);
            addBox(data.data);
        }
    });

    webData = getRequest();

    function addBox(result) {
        $.each(result, function (index, obj) {
            $(".body").append("<div class='single' onclick='goListDetail(this)' data-id=d" + obj['id'] + ">" +
                "<div class='inner left' data-id=" + obj['id'] + ">" + obj['name'] + "</div></div>");
        });
    }

    $(".back").click(function () {
        history.go(-1);
    })

})
