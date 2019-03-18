function addBox(result) {
    $.each(result,function(index,obj){
        $(".body").append("<div class='single' onclick='goListDetail(this)' data_id="+obj['id']+">"+
            "<div class='inner left' data_id="+obj['id']+">"+obj['name']+"</div></div>");
    });
}

function goListDetail(e){
    console.log(e);
    window.location.href = '../listDetail.html?firstCatalog=1&secondCatalog=' + e.getAttribute("data_id");
}

$(function(){
    $.ajax({
        type:"get",
        url:"/mini/api/index/departmentList",
        dataType:"json",
        data:{},
        success:function(data) {
            console.log(data.data);
            addBox(data.data);
        }
    });
    
    $(".back").click(function(){
        history.go(-1);
    })

})
