$(function(){
    var type = 1;
    //1为个人服务，2为企业服务
    function getTheme(type){
        var theme = '';
        var department= '';
        $.ajax({
            type:"get",
            url:"/mini/api/Index/index?type="+type,
            success:function(res){
                console.log(res)
                len=res.data.topic.length
                for(i=0;i<len;i++){
                    theme+='<div class="content-div flex" data-id="t'+res.data.topic[i].id+'" onclick="goListDetail(this)"><div class="flex-item"><div class="title">'+res.data.topic[i].intro+'</div><div class="sub-title">'+res.data.topic[i].name+'</div></div><img class="icon" src="'+res.data.topic[i].logo+'"/></div>'
                }
                $("#theme").append(theme);
                len=res.data.department.length
                for(i=0;i<len;i++){
                    department+='<div class="departmentSingle" data-id="d'+res.data.department[i].id+'" onclick="goListDetail(this)">'+res.data.department[i].name+'</div>'
                }
                $("#department").append(department);
            }
        })
    }
    getTheme(type);



    $("#type1").click(function(){
        if(type==1){
            return;
        }
        type=1;
        $("#type1").addClass("active");
        $("#type2").removeClass("active");
        $('#theme').empty();
        $('#department').empty();
        getTheme(type);
    })
    $("#type2").click(function(){
        if(type==2){
            return;
        }
        type=2;
        $("#type2").addClass("active");
        $("#type1").removeClass("active");
        $('#theme').empty();
        $('#department').empty();
        getTheme(type);
    })

})
