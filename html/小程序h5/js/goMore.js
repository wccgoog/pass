//获取url中"?"符后的字串  
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
    console.log(webData.type);  

    //获取主题列表
    function getThemeList(type){
        var theme = '';
        $.ajax({
            type:"get",
            url:"/mini/api/Index/topicList?type="+type,
            success:function(res){
                console.log(res);
                len=res.data.length
                for(i=0;i<len;i++){
                    theme+='<div class="single" data-id="d'+res.data[i].id+'" onclick="goListDetail(this)">'
                        +'<img class="left" src="'+res.data[i].logo+'"/><div class="right">'
                        +res.data[i].name
                        +'</div></div>'
                }
                $(".body").append(theme);
            }
        })
    }
    getThemeList(webData.type);
    
    $(".back").click(function(){
        history.go(-1);
    })
})
