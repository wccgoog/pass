function clickButton(totalTimes,secondsPerTime){  //totalTimes为点击次数,secondsPerTime为每次点击间隔秒数
    var millisecondsPerTime = secondsPerTime * 1000;  //每次间隔毫秒数
    var sleepTime = totalTimes * millisecondsPerTime;  //等待时间
    var c = setInterval(function(){
        document.getElementById('liUpFormTableItem').click()
    },millisecondsPerTime); 
    setTimeout(function(){clearInterval(c)},sleepTime);
}
