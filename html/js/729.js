var arr = [43, 54, 4, -4, 84, 100, 58, 27, 140];
arr.sort((a,b) => b - a);
arr.sort((a,b) => a - b);

var arr = ['apple', 'dog', 'cat', 'car', 'zoo', 'orange', 'airplane'];
arr.sort();
arr.reverse();

var arr = [[10, 14], [16, 60], [7, 44], [26, 35], [22, 63]];
arr.sort((a,b) => b[1] - a[1]);

var arr = [
    {
        id: 1,
        name: 'candy',
        value: 40
    }, {
        id: 2,
        name: 'Simon',
        value: 50
    }, {
        id: 3,
        name: 'Tony',
        value: 45
    }, {
        id: 4,
        name: 'Annie',
        value: 60
    }
];
arr.sort((a,b) => a.value - b.value);

var scoreObject = {
    "Tony": {
        "Math": 95,
        "English": 79,
        "Music": 68
    }, 
    "Simon": {
        "Math": 100,
        "English": 95,
        "Music": 98
    }, 
    "Annie": {
        "Math": 54,
        "English": 65,
        "Music": 88
    }
}
var list = [];
for (var i in scoreObject){
    list.push([i,scoreObject[i].Math,scoreObject[i].English,scoreObject[i].Music]);
}

var menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];
var menuObject = {};
function menuAdd(area){
    if(area[2] == -1){
        menuObject[area[0].toString()] = {name: area[1]};
    }
    else if(area[2] == 1 || area[2] == 2){
        if(typeof menuObject[area[2].toString()].subMenu == "undefined"){
            menuObject[area[2].toString()].subMenu = {};
        }
        menuObject[area[2].toString()].subMenu[area[0].toString()] = {name: area[1]};
    }
    else if(area[2] == 3 || area[2] == 4){
        if(typeof menuObject["1"].subMenu[area[2].toString()].subMenu == "undefined"){
            menuObject["1"].subMenu[area[2].toString()].subMenu = {};
        }
        menuObject["1"].subMenu[area[2].toString()].subMenu[area[0].toString()] =
        {name: area[1]};
    }
    else if(area[2] == 5 || area[2] == 6){
        if(typeof menuObject["2"].subMenu[area[2].toString()].subMenu == "undefined"){
            menuObject["2"].subMenu[area[2].toString()].subMenu = {};
        }
        menuObject["2"].subMenu[area[2].toString()].subMenu[area[0].toString()] =
        {name: area[1]};
    }
    else{
        return;
    }
}
for(var i = 0; i < menuArr.length; i++){
    menuAdd(menuArr[i]);
}