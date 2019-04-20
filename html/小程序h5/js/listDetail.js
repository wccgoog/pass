function goListDetail(e){
    window.location.href = 'guide.html?id=' + e .getAttribute("data-id");
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

$(function(){
    var webData = getRequest();
    console.log(webData)

    $.ajax({
        type:"get",
        url:"/mini/api/Index/affList",
        dataType:"json",
        data:{
            'type': webData.type,
            'sid' : webData.sid
        },
        success:function(data) {
            if(data.data.list.length == 0){
                addTitle(data.data.title);
                $("#none").show();
            }
            else{
                addTitle(data.data.title);
                addList(data.data.list);
            }

            console.log(data)
        }
    })

    
    

    
    function addTitle(result) {
            $(".themeTitle").prepend("<div class='themeTitleWords'>"+getCaption(result)+"</div>");
    }
    
    function addList(result) {
        $.each(result,function(index,obj){
            $(".variousList").append("<div class='listSingle' onclick='goListDetail(this)' data-id="+obj['id']+"><div>"+obj['name']+"</div><img src='./image/arrow.png'</div>");
        });
    }

    function getCaption(obj){
        var index=obj.lastIndexOf("\>");
        obj=obj.substring(index+1,obj.length);
        return obj;
    }


});



