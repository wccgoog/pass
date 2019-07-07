function goListDetail(e) {
    window.location.href = 'guide.html?id=' + e.getAttribute("data-id");
}

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

$(function () {
    var webData = getRequest();
    console.log(webData)
    if (webData.sid.includes('t')) {
        $.ajax({
            type: "get",
            url: "/mininew/api/topic/totalList",
            dataType: "json",
            data: {
                'topic_id': webData.sid.slice(1),
                'page_num': 1,
                'limit': 100,
            },
            success: function (data) {
                if (data.data.total_list.length == 0) {
                    addTitle(data.data.title);
                    $("#none").show();
                }
                else {
                    addTitle(data.data.title);
                    addList(data.data.total_list);
                }

                console.log(data)
            }
        })
    } else if (webData.sid.includes('d')) {
        $.ajax({
            type: "get",
            url: "/mininew/api/department/totalList",
            dataType: "json",
            data: {
                'dep_id': webData.sid.slice(1),
                'page_num': 1,
                'limit': 100,
            },
            success: function (data) {
                if (data.data.total_list.length == 0) {
                    addTitle(data.data.title);
                    $("#none").show();
                }
                else {
                    addTitle(data.data.title);
                    addList(data.data.total_list);
                }

                console.log(data)
            }
        })
    }





    function addTitle(result) {
        $(".themeTitle").prepend("<div class='themeTitleWords'>" + getCaption(result) + "</div>");
    }

    function addList(result) {
        $.each(result, function (index, obj) {
            $(".variousList").append("<div class='listSingle' onclick='goListDetail(this)' data-id=" + obj['id'] + "><div>" + obj['name'] + "</div><img src='./image/arrow.png'</div>");
        });
    }

    function getCaption(obj) {
        var index = obj.lastIndexOf("\>");
        obj = obj.substring(index + 1, obj.length);
        return obj;
    }


});



