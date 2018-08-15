document.getElementById("right-table").innerHTML = "";
var head = '<th>产品</th><th>地区</th>';
for(var i = 1; i <= 12;i++){
    head += '<th>' + i + "月</th>";
}
head = '<tr>' + head + '</tr>';
document.getElementById("right-table").innerHTML = head;
creatCheckBox(sourceData,"product");
creatCheckBox(sourceData,"region");
document.getElementById("allproduct").onchange = function(){
    checkAll("product");
    var region = getCheckedItems("region");
    var product = getCheckedItems("product");
    creatForm(region,product,region.length);
};
document.getElementById("allregion").onchange = function(){
    checkAll("region");
    var region = getCheckedItems("region");
    var product = getCheckedItems("product");
    creatForm(region,product,region.length);
};
addOnchange("product");
addOnchange("region");

