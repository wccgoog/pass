var dateTimes;
function onwheel(e) {

    var evt = document.createEvent("MouseEvents");
    evt.initEvent('wheel', true, true);
    evt.deltaMode = e.deltaMode;
    evt.deltaX = e.deltaX;
    evt.deltaY = e.deltaY;
    evt.deltaZ = e.deltaZ;
    evt.wheelDelta = e.wheelDelta;
    evt.wheelDeltaX = e.wheelDeltaX;
    evt.wheelDeltaY = e.wheelDeltaY;
    var result = { deltaMode: e.deltaMode, deltaX: e.deltaX
        , deltaY: e.deltaY,deltaZ: e.deltaZ
        ,wheelDelta:e.wheelDelta,wheelDeltaX: e.wheelDeltaX
        ,wheelDeltaY:e.wheelDeltaY,exemethod:"scroll",dateTime:dateTimes};
    //如果父页面是$('html').niceScroll();用这个
    //parent.dispatchEvent(evt);
    window.parent.postMessage(result, '*');
    //如果要使父页面的某个滚动条触发，则用下面这个，id换一下
    // parent.document.getElementById('content-right').dispatchEvent(evt);
}
$(function () {
    dateTimes = new Date().getTime();
    var pheight = $("p:last").position().top+$("p:last").height();
    var result = { height: $("p:last").position().top+$("p:last").height(), dateTime: dateTimes, exemethod: "afterLoad" };
    window.parent.postMessage(result, '*');    
    window.addEventListener("message", function (e) {
        //新增开始 by王晨驰 20190225
        if (e.data.method == "getFormHeight"){
            var pHeight = 0;
            var tableHeight = 0;
            for(i = 0; i < $('body').children('p').length - 1; i++){
                 pHeight = pHeight + $('body').children('p')[i].scrollHeight +10;
                }
            for(i = 0; i < $('table').length; i++){
                tableHeight = tableHeight + $('table')[i].scrollHeight +10;
                }
            var totalHeight = pHeight + tableHeight;
            result = {height:totalHeight,exemethod:"formHeight"};
            window.parent.postMessage(result, '*');
        }
    //新增结束 by王晨驰 20190225
        if (e.data.method == "submit") {
            var isValid = [];
            var formData = {};
            var checkboxList = "";
            var checkboxPreName = "";
            //input组件
            var TagNames = document.getElementsByTagName("input");
            for (var i = 0; i < TagNames.length; i++) {
                var attributes = TagNames[i].attributes;
                if (TagNames[i].type == "text") {
                    formData[TagNames[i].getAttribute("name")] = document.getElementById(TagNames[i].getAttribute("name")).value;
                    //必填
                    if (TagNames[i].getAttribute("isrequired") == "Y") {
                        //判断是否有值
                        if (document.getElementById(TagNames[i].getAttribute("name")).value == "") {
                            document.getElementById(TagNames[i].getAttribute("name")).style.border = "1px solid red";
                            isValid.push(false);
                        } else {
                            if (TagNames[i].getAttribute("orgtype") == "other") {//自定义正则
                                var re = new RegExp(eval(TagNames[i].getAttribute("regex")));
                                if (re.test(document.getElementById(TagNames[i].getAttribute("name")).value)) {
                                    document.getElementById(TagNames[i].getAttribute("name")).style.border = "";
                                    isValid.push(true);
                                } else {
                                    document.getElementById(TagNames[i].getAttribute("name")).style.border = "1px solid red";
                                    isValid.push(false);
                                }
                            } else if (TagNames[i].getAttribute("orgtype") == "text") {
                                document.getElementById(TagNames[i].getAttribute("name")).style.border = "";
                                isValid.push(true);
                            } else {
                                var re = new RegExp(eval(TagNames[i].getAttribute("orgtype")));
                                if (re.test(document.getElementById(TagNames[i].getAttribute("name")).value)) {
                                    document.getElementById(TagNames[i].getAttribute("name")).style.border = "";
                                    isValid.push(true);
                                } else {
                                    document.getElementById(TagNames[i].getAttribute("name")).style.border = "1px solid red";
                                    isValid.push(false);
                                }
                            }
                        }
                    }
                } else if (TagNames[i].type == "radio") {
                    if (TagNames[i].checked) {
                        formData[TagNames[i].name] = TagNames[i].value;
                    }
                } else if (TagNames[i].type == "checkbox") {
                    if (checkboxPreName != TagNames[i].name) {
                        checkboxList = "";
                    }
                    if (TagNames[i].checked) {
                        checkboxList = checkboxList + TagNames[i].value + ",";
                        formData[TagNames[i].name] = checkboxList;
                        checkboxPreName = TagNames[i].name;
                    }
                }
                else if (TagNames[i].type == "date" || TagNames[i].type == "time" || TagNames[i].type == "datetime-local" || TagNames[i].type == "month" || TagNames[i].type == "week") {
                    formData[TagNames[i].name] = TagNames[i].value;
                }
            }
            //select组件
            var selectTagNames = document.getElementsByTagName("select");
            for (var i = 0; i < selectTagNames.length; i++) {
                formData[selectTagNames[i].name] = selectTagNames[i].value;
            }
            //textarea组件
            var textAreaTagNames = document.getElementsByTagName("textarea");
            for (var i = 0; i < textAreaTagNames.length; i++) {
                formData[textAreaTagNames[i].name] = textAreaTagNames[i].value;
            }
            for (var i = 0; i < textAreaTagNames.length; i++) {
                var attributes = textAreaTagNames[i].attributes;
                formData[textAreaTagNames[i].getAttribute("name")] = document.getElementById(textAreaTagNames[i].getAttribute("name")).value;
                //必填
                if (textAreaTagNames[i].getAttribute("isrequired") == "Y") {
                    //判断是否有值
                    if (document.getElementById(textAreaTagNames[i].getAttribute("name")).value == "") {
                        document.getElementById(textAreaTagNames[i].getAttribute("name")).style.border = "1px solid red";
                        isValid.push(false);
                    } else {
                        document.getElementById(textAreaTagNames[i].getAttribute("name")).style.border = "";
                        isValid.push(true);
                    }
                }
            }
            console.log(isValid)
            console.log(e.data)
            console.log(formData)

//申请表单模板
            if (e.data.type == "applyMaterial") {
                var result = { dateTime: dateTimes, data: formData, exemethod: "applyMaterialForm" };
                window.parent.postMessage(result, '*');
                return;
            }
            for (var i = 0; i < isValid.length; i++) {
                if (isValid[i] == false) {
                    var result = { dateTime: dateTimes, exemethod: "isValidCallback" };
                    window.parent.postMessage(result, '*');
                    return;
                }
            }
            //获取整个html
            var test = document.getElementsByTagName('html')[0].innerHTML;
            $.ajax({
                type: 'POST',
                url: '/customer/rest/customer/usemanager/insert',
                contentType: "application/json;charset=UTF-8",
                async: true,
                data: JSON.stringify({
                    "templateData": {
                        "contentInput": test
                    },
                    "structDataList": formData
                }),
                dataType: 'json',
                success: function (data) {
                    if (data.result = "0001") {
                        var result = { data: data, dateTime: dateTimes, exemethod: "insertCallback" };
                        window.parent.postMessage(result, '*');
                    }
                }.bind(this)
            });

        } else if (e.data.method == "getInitData") {
            $.ajax({
                type: 'GET',
                url: '/customer/rest/customer/usemanager/queryStructDataDto/' + e.data.customerDataId,
                contentType: "application/json;charset=UTF-8",
                async: true,
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        var result = { data: data, dateTime: dateTimes, exemethod: "getInitDataCallback" };
                        window.parent.postMessage(result, '*');
                    }
                }.bind(this)
            });
        } else if (e.data.method == "initData") {//初始化数据
            for (var keyName in e.data.initData) {
                if (e.data.initData.hasOwnProperty(keyName)) {
                    if(document.getElementsByName(keyName).length > 0){
                        if (document.getElementsByName(keyName)[0].type == 'text' || document.getElementsByName(keyName)[0].type == 'textarea') {
                            document.getElementById(keyName).value = e.data.initData[keyName];
                        }
                        if (document.getElementsByName(keyName)[0].type == 'date' || document.getElementsByName(keyName)[0].type == 'time' || document.getElementsByName(keyName)[0].type == 'datetime-local' || document.getElementsByName(keyName)[0].type == 'month' || document.getElementsByName(keyName)[0].type == 'week') {
                            document.getElementById(keyName).value = e.data.initData[keyName];
                        }
                        if (document.getElementsByName(keyName)[0].type == 'select-one') {
                            var ops = document.getElementById(keyName);
                            for (var i = 0; i < ops.options.length; i++) {
                                if (ops.options[i].value == e.data.initData[keyName]) {
                                    ops.options[i].setAttribute("selected", "selected");
                                }
                            }
                        }
                        if (document.getElementsByName(keyName)[0].type == 'radio') {
                            var ops = document.getElementsByName(keyName);
                            for (var i = 0; i < ops.length; i++) {
                                if (ops[i].value == e.data.initData[keyName]) {
                                    ops[i].setAttribute("checked", "true");
                                }
                            }
                        }
                        if (document.getElementsByName(keyName)[0].type == 'checkbox') {
                            var ops = document.getElementsByName(keyName);
                            for (var i = 0; i < ops.length; i++) {
                                for (var j = 0; j < e.data.initData[keyName].length; j++) {
                                    if (ops[i].value == e.data.initData[keyName][j]) {
                                        ops[i].setAttribute("checked", "true");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (e.data.method == "getData") {//父试图获取子试图数据
            var formData = {};
            //input组件
            var TagNames = document.getElementsByTagName("input");
            for (var i = 0; i < TagNames.length; i++) {
                var attributes = TagNames[i].attributes;
                formData[TagNames[i].getAttribute("name")] = document.getElementById(TagNames[i].getAttribute("name")).value;
            }
            //select组件
            var selectTagNames = document.getElementsByTagName("select");
            for (var i = 0; i < selectTagNames.length; i++) {
                formData[selectTagNames[i].name] = selectTagNames[i].value;
            }
            //textarea组件
            var textAreaTagNames = document.getElementsByTagName("textarea");
            for (var i = 0; i < textAreaTagNames.length; i++) {
                formData[textAreaTagNames[i].name] = textAreaTagNames[i].value;
            }
            var result = { formData: formData, dateTime: dateTimes, exemethod: "getData" };
            window.parent.postMessage(result, '*');
        }
    }.bind(this), false);


    document.body.addEventListener("wheel",onwheel);
})
