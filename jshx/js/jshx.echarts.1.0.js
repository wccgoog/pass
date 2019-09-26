//日历封装
function HxChartCalendar(id, range, title) {
    this.id = id || '';
    if (typeof (range) == 'object') {
        this.range = range[0];
    } else {
        this.range = range;
    }
    this.title = title || '';
    this.graphData = [[]];
    // series[0]使用的data,既日期
    this.list = getDateListFromRange(this.range);
    // 大中小字体,对应size为l,m,s
    this.fontSize = [24, 16, 12];
    this.titleFontSize = [30, 24, 18];

    this.option = {
        textStyle: {
            fontSize: this.fontSize[1]
        },
        // 如果开启动画,则showImg效果会有问题
        animation: false,
        tooltip: {
            formatter: function (params) {
                if (params.data[1] > 0) {
                    return params.data[1];
                } else {
                    return;
                }
            }
        },
        title: {
            text: this.title,
            left: 'center',
            textStyle: {
                fontSize: this.titleFontSize[1]
            }
        },
        calendar: {
            orient: 'vertical',
            yearLabel: {
                margin: 40,
                position: 'bottom',
                fontSize: this.titleFontSize[1]
            },
            monthLabel: {
                nameMap: 'cn',
                margin: 20
            },
            dayLabel: {
                firstDay: 1,
                nameMap: 'cn',
                margin: 10,
            },
            range: this.range,
            cellSize: [70, 70],
            top: 100,
            bottom: 100,
            left: '10%',
            right: '10%'
        },
        visualMap: [
            {
                show: false,
                min: 0,
                max: 300,
                calculable: true,
                seriesIndex: [0],
                dimension: 1,
                orient: 'horizontal',
                left: 'center',
                bottom: 20,
                inRange: {
                    color: ['#fff', '#006edd'],
                    opacity: 1
                },
                controller: {
                    inRange: {
                        opacity: 0.5
                    }
                }
            },
            // 如果有数据,则覆盖上方的heatmap
            {
                show: false,
                min: 0,
                max: 300,
                calculable: true,
                seriesIndex: [2],
                dimension: 1,
                orient: 'horizontal',
                left: 'center',
                bottom: 20,
                inRange: {
                    color: ['#e0ffff', '#006edd'],
                    opacity: 0.3
                },
                controller: {
                    inRange: {
                        opacity: 0.5
                    }
                }
            }
        ],
        series: [
            // 使用heatmap是为了方便点击
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                symbolSize: 60,
                itemStyle: {
                    color: 'rgba(128, 128, 128, 0)'
                },
                label: {
                    show: true,
                    formatter: function (params) {
                        var d = echarts.number.parseDate(params.value[0]);
                        return d.getDate();
                    },
                    color: '#000',
                },
                data: this.list
            },
            // 当日数据显示为红字
            {
                type: 'scatter',
                coordinateSystem: 'calendar',
                symbolSize: 1,
                itemStyle: {
                    color: 'rgba(128, 128, 128, 0)'
                },
                label: {
                    show: true,
                    formatter: function (params) {
                        return '\n\n\n' + (params.value[1] || '');
                    },
                    fontWeight: 700,
                    color: '#a00'
                },
                data: this.graphData
            },
            // 背景色根据当日数据改变
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: this.graphData,
            },
            {
                type: 'scatter',
                coordinateSystem: 'calendar',
                symbolSize: 20,
                symbolOffset: [0, '80%'],
                data: [
                    {
                        value: [1564617600000, 0],
                        symbol: 'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
                    }
                ]
            }
        ]
    };

}

HxChartCalendar.prototype = {
    constructor: HxChartCalendar,
    // 初始化图表
    init: function () {
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题并重载图表
    setTitle: function (text) {
        this.option.title.text = text;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set数值并重载图表,数值以时间戳毫秒格式显示在日历中
    putData: function (data) {
        var lastData = this.option.series[1].data;
        lastData = lastData.concat(data);
        this.option.series[1].data = lastData;
        this.option.series[2].data = lastData;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 清楚图表中的数据
    clearData: function () {
        this.option.series[1].data = [[]];
        this.option.series[2].data = [[]];
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set背景并重载图表
    setBackground: function (color) {
        this.option.backgroundColor = color;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set年月并重载图表
    setRange: function (range) {
        if (typeof (range) == 'object') {
            return "请出入yyyy-mm格式的字符串"
        }
        this.option.calendar.range = range;
        this.option.series[0].data = getDateListFromRange(range);
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题位置并重载图表
    setTitleLocation: function (x) {
        switch (x) {
            case 'l':
                this.option.title.left = 'left';
                break;
            case 'c':
                this.option.title.left = 'center';
                break;
            case 'r':
                this.option.title.left = 'right';
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改图表宽度
    setWidth: function (width) {
        this.option.calendar.width = width;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改图表高度
    setHeight: function (height) {
        this.option.calendar.height = height;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改点击日历的回调函数
    setCbClick: function (callback) {
        var chart = echarts.init(document.getElementById(this.id));
        if (!chart._$handlers.click) {
            chart.on('click', function (param) {
                callback(param);
            });
        } else {
            chart._$handlers.click[0].h = function (param) {
                callback(param);
            };
        }
    },
    // 修改图表字体大小
    setSize: function (size) {
        switch (size) {
            case 'l':
                this.option.calendar.yearLabel.fontSize = this.titleFontSize[0];
                this.option.textStyle.fontSize = this.fontSize[0];
                this.option.title.textStyle.fontSize = this.titleFontSize[0];
                break;
            case 'm':
                this.option.calendar.yearLabel.fontSize = this.titleFontSize[1];
                this.option.textStyle.fontSize = this.fontSize[1];
                this.option.title.textStyle.fontSize = this.titleFontSize[1];
                break;
            case 's':
                this.option.calendar.yearLabel.fontSize = this.titleFontSize[2];
                this.option.textStyle.fontSize = this.fontSize[2];
                this.option.title.textStyle.fontSize = this.titleFontSize[2];
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 去除标题等文字
    trim: function () {
        this.option.calendar.yearLabel.show = false;
        this.option.title.show = false;
        this.option.calendar.monthLabel.show = false;
        this.option.calendar.top = 1;
        this.option.calendar.bottom = 1;
        this.option.calendar.left = 1;
        this.option.calendar.right = 1;


        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 显示日期上的图
    setImg: function (dateStr, image) {
        var _this = this;
        var time;
        if (typeof (dateStr) == 'string') {
            time = getDateFromStr(dateStr).getTime();
            console.log(time)
        } else {
            time = dateStr;
        }
        var symbol = 'image://' + image;
        var data = this.option.series[3].data;
        var flag = 0;
        data.forEach(function (value, index) {
            if (time == value.value[0]) {
                // data.splice(index, 1);
                flag = 1;
            }
        });
        if (flag == 0) {
            data.push({ value: [time, 0], symbol: symbol });
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 隐藏日期上的图
    removeImg: function (dateStr) {
        var _this = this;
        var time;
        if (typeof (dateStr) == 'string') {
            time = getDateFromStr(dateStr).getTime();
        } else {
            time = dateStr;
        }
        var data = this.option.series[3].data;
        data.forEach(function (value, index) {
            if (time == value.value[0]) {
                data.splice(index, 1);
                return;
            }
        });
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    }
};

// 获取时间戳list
function createDateList(startTime, endTime) {
    var list = [];
    while (startTime < endTime) {
        list.push([startTime, 0]);
        startTime += 3600 * 24 * 1000;
    }
    return list;
}

// 根据传入的range获取日期
function getDateListFromRange(range) {
    if (typeof (range) == 'string') {
        var year = range.split('-')[0];
        var startTime = Date.parse(year);
        var endTime = startTime + 3600 * 24 * 366 * 1000
        return createDateList(startTime, endTime);
    } else if (typeof (range) == 'object') {
        var startYear = range[0].split('-')[0];
        var endYear = range[1].split('-')[0];
        var startTime = Date.parse(startYear);
        var endTime = Date.parse(parseInt(endYear) + 1);
        return createDateList(startTime, endTime);
    }
}

// 返回年月日
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}

function getDateFromStr(dateStr, separator) {
    if (!separator) {
        separator = "-";
    }
    var dateArr = dateStr.split(separator);
    var year = parseInt(dateArr[0]);
    var month;
    //处理月份为04这样的情况                         
    if (dateArr[1].indexOf("0") == 0) {
        month = parseInt(dateArr[1].substring(1));
    } else {
        month = parseInt(dateArr[1]);
    }
    var day = parseInt(dateArr[2]);
    var date = new Date(year, month - 1, day);
    return date;
}

// 折线图封装
function HxChartLine(id, category, title) {
    this.id = id;
    this.category = category;
    this.title = title || '';
    this.series = [];
    // 大中小字体,对应size为l,m,s
    this.fontSize = [24, 16, 12];
    this.titleFontSize = [30, 24, 18];

    this.option = {
        title: {
            text: this.title,
            left: 'center',
            textStyle: {}
        },
        textStyle: {},
        tooltip: {
            trigger: 'axis',
            textStyle: {}
        },
        legend: {
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: 50,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.category,
            axisLabel: {}
        },
        yAxis: {
            type: 'value',
            axisLabel: {}
        },
        series: this.series
    };
}

HxChartLine.prototype = {
    constructor: HxChartLine,
    init: function () {
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题并重载图表
    setTitle: function (text) {
        this.option.title.text = text;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题位置并重载图表
    setTitleLocation: function (x) {
        switch (x) {
            case 'l':
                this.option.title.left = 'left';
                break;
            case 'c':
                this.option.title.left = 'center';
                break;
            case 'r':
                this.option.title.left = 'right';
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 新增修改数据
    putData: function (data) {
        for (var i = 0; i < data.length; i++) {
            // 判断是否已经有这个类目
            var flag = 0;
            for (var j = 0; j < this.option.series.length; j++) {
                if (data[i][0] == this.option.series[j].name) {
                    this.option.series[j].data = this.option.series[j].data.concat(data[i].slice(1));
                    flag = 1;
                }
            }
            // 若没有这个类目,则新增类目
            if (flag == 0) {
                this.option.series.push({
                    name: data[i][0],
                    type: 'line',
                    data: data[i].slice(1)
                })
            }
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 新增x轴数据
    putCategory: function (data) {
        this.option.xAxis.data = this.option.xAxis.data.concat(data);
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 清空数据
    clearData: function () {
        for (var i = 0; i < this.option.series.length; i++) {
            this.option.series[i].data = [];
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 显示每条线的极值
    showExtreme: function () {
        for (var i = 0; i < this.option.series.length; i++) {
            this.option.series[i].markPoint = {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            }
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 显示每条线的均线
    showAvarage: function () {
        for (var i = 0; i < this.option.series.length; i++) {
            this.option.series[i].markLine = {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            }
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改图表字体大小
    setSize: function (size) {
        switch (size) {
            case 'l':
                this.option.xAxis.axisLabel.fontSize = this.fontSize[0];
                this.option.yAxis.axisLabel.fontSize = this.fontSize[0];
                this.option.textStyle.fontSize = this.fontSize[0];
                this.option.tooltip.textStyle.fontSize = this.fontSize[0];
                this.option.title.textStyle.fontSize = this.titleFontSize[0];
                break;
            case 'm':
                this.option.xAxis.axisLabel.fontSize = this.fontSize[1];
                this.option.yAxis.axisLabel.fontSize = this.fontSize[1];
                this.option.textStyle.fontSize = this.fontSize[1];
                this.option.tooltip.textStyle.fontSize = this.fontSize[1];
                this.option.title.textStyle.fontSize = this.titleFontSize[1];
                break;
            case 's':
                this.option.xAxis.axisLabel.fontSize = this.fontSize[2];
                this.option.yAxis.axisLabel.fontSize = this.fontSize[2];
                this.option.textStyle.fontSize = this.fontSize[2];
                this.option.tooltip.textStyle.fontSize = this.fontSize[2];
                this.option.title.textStyle.fontSize = this.titleFontSize[2];
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set背景并重载图表
    setBackground: function (color) {
        this.option.backgroundColor = color;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
}

// 柱状图封装
function HxChartBar(id, category, title) {
    this.id = id;
    this.category = category;
    this.title = title || '';
    this.series = [];
    // 大中小字体,对应size为l,m,s
    this.fontSize = [24, 16, 12];
    this.titleFontSize = [30, 24, 18];

    this.option = {
        title: {
            text: this.title,
            left: 'center',
            textStyle: {}
        },
        textStyle: {},
        tooltip: {
            trigger: 'axis',
            textStyle: {}
        },
        legend: {
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: 50,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: this.category,
            axisLabel: {}
        },
        yAxis: {
            type: 'value',
            axisLabel: {}
        },
        series: this.series
    };
}

HxChartBar.prototype = {
    constructor: HxChartBar,
    init: function () {
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题并重载图表
    setTitle: function (text) {
        this.option.title.text = text;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题位置并重载图表
    setTitleLocation: function (x) {
        switch (x) {
            case 'l':
                this.option.title.left = 'left';
                break;
            case 'c':
                this.option.title.left = 'center';
                break;
            case 'r':
                this.option.title.left = 'right';
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 新增修改数据
    putData: function (data) {
        for (var i = 0; i < data.length; i++) {
            // 判断是否已经有这个类目
            var flag = 0;
            for (var j = 0; j < this.option.series.length; j++) {
                if (data[i][0] == this.option.series[j].name) {
                    this.option.series[j].data = this.option.series[j].data.concat(data[i].slice(1));
                    flag = 1;
                }
            }
            // 若没有这个类目,则新增类目
            if (flag == 0) {
                this.option.series.push({
                    name: data[i][0],
                    type: 'bar',
                    data: data[i].slice(1)
                })
            }
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 新增x轴数据
    putCategory: function (data) {
        this.option.xAxis.data = this.option.xAxis.data.concat(data);
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 清空数据
    clearData: function () {
        for (var i = 0; i < this.option.series.length; i++) {
            this.option.series[i].data = [];
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 显示每条线的极值
    showExtreme: function () {
        for (var i = 0; i < this.option.series.length; i++) {
            this.option.series[i].markPoint = {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            }
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 显示每条线的均线
    showAvarage: function () {
        for (var i = 0; i < this.option.series.length; i++) {
            this.option.series[i].markLine = {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            }
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改图表字体大小
    setSize: function (size) {
        switch (size) {
            case 'l':
                this.option.xAxis.axisLabel.fontSize = this.fontSize[0];
                this.option.yAxis.axisLabel.fontSize = this.fontSize[0];
                this.option.textStyle.fontSize = this.fontSize[0];
                this.option.tooltip.textStyle.fontSize = this.fontSize[0];
                this.option.title.textStyle.fontSize = this.titleFontSize[0];
                break;
            case 'm':
                this.option.xAxis.axisLabel.fontSize = this.fontSize[1];
                this.option.yAxis.axisLabel.fontSize = this.fontSize[1];
                this.option.textStyle.fontSize = this.fontSize[1];
                this.option.tooltip.textStyle.fontSize = this.fontSize[1];
                this.option.title.textStyle.fontSize = this.titleFontSize[1];
                break;
            case 's':
                this.option.xAxis.axisLabel.fontSize = this.fontSize[2];
                this.option.yAxis.axisLabel.fontSize = this.fontSize[2];
                this.option.textStyle.fontSize = this.fontSize[2];
                this.option.tooltip.textStyle.fontSize = this.fontSize[2];
                this.option.title.textStyle.fontSize = this.titleFontSize[2];
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set背景并重载图表
    setBackground: function (color) {
        this.option.backgroundColor = color;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
}

// 饼状图封装
function HxChartPie(id, title) {
    // 大中小字体,对应size为l,m,s
    this.fontSize = [24, 16, 12];
    this.titleFontSize = [30, 24, 18];
    this.id = id;
    this.data = [];
    this.radius = [0, '70%'];
    this.circular = ['55%', '70%'];
    this.title = title || '';
    this.option = {
        title: {
            text: this.title,
            left: 'center',
            textStyle: {}
        },
        textStyle: {},
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)",
            textStyle: {}
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: '10%'
        },
        series: {
            type: 'pie',
            radius: this.radius,
            data: this.data,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    }
}
HxChartPie.prototype = {
    constructor: HxChartPie,
    init: function () {
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 点击回调
    setCbClick: function (callback) {
        var chart = echarts.init(document.getElementById(this.id));
        if (!chart._$handlers.click) {
            chart.on('click', function (param) {
                callback(param);
            });
        } else {
            chart._$handlers.click[0].h = function (param) {
                callback(param);
            };
        }
    },
    // set标题并重载图表
    setTitle: function (text) {
        this.option.title.text = text;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题位置并重载图表
    setTitleLocation: function (x) {
        switch (x) {
            case 'l':
                this.option.title.left = 'left';
                break;
            case 'c':
                this.option.title.left = 'center';
                break;
            case 'r':
                this.option.title.left = 'right';
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 新增修改数据
    putData: function (data) {
        for (var i = 0; i < data.length; i++) {
            var flag = 0;
            for (var j = 0; j < this.option.series.data.length; j++) {
                if (data[i].name == this.option.series.data[j].name) {
                    this.option.series.data[j].value = data[i].value;
                    flag = 1;
                }
            }
            if (flag == 0) {
                this.option.series.data = this.option.series.data.concat(data[i])
            }
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 清空数据
    clearData: function () {
        this.option.series.data = [];
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 变成圆环
    setCircular: function () {
        this.option.series.radius = this.circular;
        this.option.series.label = {
            show: false,
            position: 'center',
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            }
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改图表字体大小
    setSize: function (size) {
        switch (size) {
            case 'l':
                this.option.textStyle.fontSize = this.fontSize[0];
                this.option.tooltip.textStyle.fontSize = this.fontSize[0];
                this.option.title.textStyle.fontSize = this.titleFontSize[0];
                if (this.option.series.label) {
                    this.option.series.label.emphasis.textStyle.fontSize = this.titleFontSize[0];
                }
                break;
            case 'm':
                this.option.textStyle.fontSize = this.fontSize[1];
                this.option.tooltip.textStyle.fontSize = this.fontSize[1];
                this.option.title.textStyle.fontSize = this.titleFontSize[1];
                if (this.option.series.label) {
                    this.option.series.label.emphasis.textStyle.fontSize = this.titleFontSize[1];
                }
                break;
            case 's':
                this.option.textStyle.fontSize = this.fontSize[2];
                this.option.tooltip.textStyle.fontSize = this.fontSize[2];
                this.option.title.textStyle.fontSize = this.titleFontSize[2];
                if (this.option.series.label) {
                    this.option.series.label.emphasis.textStyle.fontSize = this.titleFontSize[2];
                }
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set背景并重载图表
    setBackground: function (color) {
        this.option.backgroundColor = color;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
}

// 气泡图封装
function HxChartScatter(id, title) {
    // 大中小字体,对应size为l,m,s
    this.fontSize = [24, 16, 12];
    this.titleFontSize = [30, 24, 18];
    this.symbolSize = [50, 40, 30];
    this.itemColor = [
        [{
            offset: 0,
            color: 'rgb(251, 118, 123)'
        }, {
            offset: 1,
            color: 'rgb(204, 46, 72)'
        }],
        [{
            offset: 0,
            color: 'rgb(129, 227, 238)'
        }, {
            offset: 1,
            color: 'rgb(25, 183, 207)'
        }]
    ];
    this.id = id;
    this.title = title || '';
    this.series = [];
    this.option = {
        title: {
            text: this.title,
            left: 'center',
            textStyle: {}
        },
        textStyle: {},
        tooltip: {
            textStyle: {},
            formatter: function (params) {
                return '横轴:' + params.value[0] + ',纵轴:' + params.value[1] + ',值:' + params.value[2]
            }
        },
        legend: {
            right: 10,
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLabel: {}
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true,
            axisLabel: {}
        },
        series: this.series
    };
}

HxChartScatter.prototype = {
    constructor: HxChartScatter,
    init: function () {
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题并重载图表
    setTitle: function (text) {
        this.option.title.text = text;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题位置并重载图表
    setTitleLocation: function (x) {
        switch (x) {
            case 'l':
                this.option.title.left = 'left';
                break;
            case 'c':
                this.option.title.left = 'center';
                break;
            case 'r':
                this.option.title.left = 'right';
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 新增修改数据
    putData: function (data) {
        for (var i = 0; i < data.length; i++) {
            var flag = 0;
            for (var j = 0; j < this.option.series.length; j++) {
                if (data[i][0] == this.option.series[j].name) {
                    this.option.series[j].data = this.option.series[j].data.concat(data[i].slice(1));
                    flag = 1;
                }
            }
            if (flag == 0) {
                this.option.series.push({
                    name: data[i][0],
                    data: data[i].slice(1),
                    type: 'scatter',
                    symbolSize: 50,
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: createRandomRGB()
                        }
                    }
                })
            }
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 清空数据
    clearData: function () {
        for (var i = 0; i < this.option.series.length; i++) {
            this.option.series[i].data = [];
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改影响图形大小的最大值
    setCompareNum: function (compareNum) {
        for (var i = 0; i < this.option.series.length; i++) {
            this.option.series[i].symbolSize = function (data) {
                return data[2] / compareNum * 50 > 50 ? 50 : data[2] / compareNum * 50;
            }
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改图表字体大小
    setSize: function (size) {
        switch (size) {
            case 'l':
                this.option.xAxis.axisLabel.fontSize = this.fontSize[0];
                this.option.yAxis.axisLabel.fontSize = this.fontSize[0];
                this.option.textStyle.fontSize = this.fontSize[0];
                this.option.tooltip.textStyle.fontSize = this.fontSize[0];
                this.option.title.textStyle.fontSize = this.titleFontSize[0];
                for (var i = 0; i < this.option.series.length; i++) {
                    this.option.series[i].label.emphasis.fontSize = this.fontSize[0];
                    this.option.series[i].symbolSize = this.symbolSize[0];
                }
                break;
            case 'm':
                this.option.xAxis.axisLabel.fontSize = this.fontSize[1];
                this.option.yAxis.axisLabel.fontSize = this.fontSize[1];
                this.option.textStyle.fontSize = this.fontSize[1];
                this.option.tooltip.textStyle.fontSize = this.fontSize[1];
                this.option.title.textStyle.fontSize = this.titleFontSize[1];
                for (var i = 0; i < this.option.series.length; i++) {
                    this.option.series[i].label.emphasis.fontSize = this.fontSize[1];
                    this.option.series[i].symbolSize = this.symbolSize[1];
                }
                break;
            case 's':
                this.option.xAxis.axisLabel.fontSize = this.fontSize[2];
                this.option.yAxis.axisLabel.fontSize = this.fontSize[2];
                this.option.textStyle.fontSize = this.fontSize[2];
                this.option.tooltip.textStyle.fontSize = this.fontSize[2];
                this.option.title.textStyle.fontSize = this.titleFontSize[2];
                for (var i = 0; i < this.option.series.length; i++) {
                    this.option.series[i].label.emphasis.fontSize = this.fontSize[2];
                    this.option.series[i].symbolSize = this.symbolSize[2];
                }
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set背景并重载图表
    setBackground: function (color) {
        this.option.backgroundColor = color;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
}

// 随机生成rgb颜色字符串
function createRandomRGB() {
    return 'rgb(' + Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255) + ')';
}

// 雷达图封装
function HxChartRadar(id, indicator, title) {
    // 大中小字体,对应size为l,m,s
    this.fontSize = [24, 16, 12];
    this.titleFontSize = [30, 24, 18];
    this.id = id;
    this.title = title || '';
    this.indicator = indicator;
    this.series = {
        type: 'radar',
        data: []
    };
    this.option = {
        title: {
            text: this.title,
            left: 'center',
            textStyle: {}
        },
        textStyle: {},
        tooltip: {
            textStyle: {}
        },
        legend: {
            bottom: 0
        },
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: this.indicator
        },
        series: this.series
    };
}

HxChartRadar.prototype = {
    constructor: HxChartRadar,
    init: function () {
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题并重载图表
    setTitle: function (text) {
        this.option.title.text = text;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题位置并重载图表
    setTitleLocation: function (x) {
        switch (x) {
            case 'l':
                this.option.title.left = 'left';
                break;
            case 'c':
                this.option.title.left = 'center';
                break;
            case 'r':
                this.option.title.left = 'right';
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改图表字体大小
    setSize: function (size) {
        switch (size) {
            case 'l':
                this.option.textStyle.fontSize = this.fontSize[0];
                this.option.tooltip.textStyle.fontSize = this.fontSize[0];
                this.option.title.textStyle.fontSize = this.titleFontSize[0];
                break;
            case 'm':
                this.option.textStyle.fontSize = this.fontSize[1];
                this.option.tooltip.textStyle.fontSize = this.fontSize[1];
                this.option.title.textStyle.fontSize = this.titleFontSize[1];
                break;
            case 's':
                this.option.textStyle.fontSize = this.fontSize[2];
                this.option.tooltip.textStyle.fontSize = this.fontSize[2];
                this.option.title.textStyle.fontSize = this.titleFontSize[2];
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set背景并重载图表
    setBackground: function (color) {
        this.option.backgroundColor = color;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 新增修改数据
    putData: function (data) {
        for (var i = 0; i < data.length; i++) {
            var flag = 0;
            for (var j = 0; j < this.option.series.data.length; j++) {
                if (data[i].name == this.option.series.data[j].name) {
                    this.option.series.data[j].value = data[i].value;
                    flag = 1;
                }
            }
            if (flag == 0) {
                this.option.series.data = this.option.series.data.concat(data[i])
            }
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 清空数据
    clearData: function () {
        this.option.series.data = [];
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    }
}

// 仪表盘封装
function HxChartGauge(id, title) {
    // 大中小字体,对应size为l,m,s
    this.fontSize = [24, 16, 12];
    this.titleFontSize = [30, 24, 18];
    this.id = id;
    this.title = title || '';
    this.series = []
    this.option = {
        title: {
            text: this.title,
            left: 'center',
            textStyle: {}
        },
        textStyle: {},
        tooltip: {
            textStyle: {},
            formatter: "{b}:{c}"
        },
        series: this.series
    }
}

HxChartGauge.prototype = {
    constructor: HxChartGauge,
    init: function () {
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题并重载图表
    setTitle: function (text) {
        this.option.title.text = text;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题位置并重载图表
    setTitleLocation: function (x) {
        switch (x) {
            case 'l':
                this.option.title.left = 'left';
                break;
            case 'c':
                this.option.title.left = 'center';
                break;
            case 'r':
                this.option.title.left = 'right';
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改图表字体大小
    setSize: function (size) {
        switch (size) {
            case 'l':
                this.option.textStyle.fontSize = this.fontSize[0];
                this.option.series.title.fontSize = this.fontSize[0];
                this.option.series.detail.fontSize = this.titleFontSize[0];
                this.option.tooltip.textStyle.fontSize = this.fontSize[0];
                this.option.title.textStyle.fontSize = this.titleFontSize[0];
                break;
            case 'm':
                this.option.textStyle.fontSize = this.fontSize[1];
                this.option.series.title.fontSize = this.fontSize[1];
                this.option.series.detail.fontSize = this.titleFontSize[1];
                this.option.tooltip.textStyle.fontSize = this.fontSize[1];
                this.option.title.textStyle.fontSize = this.titleFontSize[1];
                break;
            case 's':
                this.option.textStyle.fontSize = this.fontSize[2];
                this.option.series.title.fontSize = this.fontSize[2];
                this.option.series.detail.fontSize = this.titleFontSize[2];
                this.option.tooltip.textStyle.fontSize = this.fontSize[2];
                this.option.title.textStyle.fontSize = this.titleFontSize[2];
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set背景并重载图表
    setBackground: function (color) {
        this.option.backgroundColor = color;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 新增修改数据
    putData: function (data) {
        this.option.series = {
            name: data[0].name,
            type: 'gauge',
            title: {},
            detail: {},
            min: data[0].min,
            max: data[0].max,
            data: data
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 清空数据
    clearData: function () {
        this.option.series.data = [];
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    }
}


function HxChartMultiGauge(id, title) {
    // 大中小字体,对应size为l,m,s
    this.fontSize = [24, 16, 12];
    this.titleFontSize = [30, 24, 18];
    this.id = id;
    this.title = title || '';
    this.series = []
    this.option = {
        title: {
            text: this.title,
            left: 'center',
            textStyle: {}
        },
        textStyle: {},
        tooltip: {
            textStyle: {},
            formatter: "{b}:{c}"
        },
        series: this.series
    }
}

HxChartMultiGauge.prototype = {
    constructor: HxChartMultiGauge,
    init: function () {
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题并重载图表
    setTitle: function (text) {
        this.option.title.text = text;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题位置并重载图表
    setTitleLocation: function (x) {
        switch (x) {
            case 'l':
                this.option.title.left = 'left';
                break;
            case 'c':
                this.option.title.left = 'center';
                break;
            case 'r':
                this.option.title.left = 'right';
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改图表字体大小
    setSize: function (size) {
        switch (size) {
            case 'l':
                this.option.textStyle.fontSize = this.fontSize[0];
                this.option.tooltip.textStyle.fontSize = this.fontSize[0];
                this.option.title.textStyle.fontSize = this.titleFontSize[0];
                this.option.series[0].title.fontSize = this.fontSize[0];
                this.option.series[0].detail.fontSize = this.titleFontSize[0];
                this.option.series[1].title.fontSize = this.fontSize[0];
                this.option.series[1].detail.fontSize = this.titleFontSize[0];
                break;
            case 'm':
                this.option.textStyle.fontSize = this.fontSize[1];
                this.option.tooltip.textStyle.fontSize = this.fontSize[1];
                this.option.title.textStyle.fontSize = this.titleFontSize[1];
                this.option.series[0].title.fontSize = this.fontSize[1];
                this.option.series[0].detail.fontSize = this.titleFontSize[1];
                this.option.series[1].title.fontSize = this.fontSize[1];
                this.option.series[1].detail.fontSize = this.titleFontSize[1];
                break;
            case 's':
                this.option.textStyle.fontSize = this.fontSize[2];
                this.option.tooltip.textStyle.fontSize = this.fontSize[2];
                this.option.title.textStyle.fontSize = this.titleFontSize[2];
                this.option.series[0].title.fontSize = this.fontSize[2];
                this.option.series[0].detail.fontSize = this.titleFontSize[2];
                this.option.series[1].title.fontSize = this.fontSize[2];
                this.option.series[1].detail.fontSize = this.titleFontSize[2];
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set背景并重载图表
    setBackground: function (color) {
        this.option.backgroundColor = color;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 新增修改数据
    putData: function (data) {
        for (var i = 0; i < data.length; i++) {
            var flag = 0;
            for (var j = 0; j < this.option.series.length; j++) {
                if (data[i][0].name == this.option.series[j].name) {
                    flag = 1;
                    this.option.series[j].data = data[i];
                }
            }
            if (flag == 0 && this.option.series.length == 0) {
                this.option.series[0] = {
                    name: data[i][0].name,
                    type: 'gauge',
                    z: 3,
                    min: data[i][0].min,
                    max: data[i][0].max,
                    radius: '70%',
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 10
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 15,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 20,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    axisLabel: {
                        backgroundColor: 'auto',
                        borderRadius: 2,
                        color: '#eee',
                        padding: 3,
                        textShadowBlur: 2,
                        textShadowOffsetX: 1,
                        textShadowOffsetY: 1,
                        textShadowColor: '#222'
                    },
                    title: {
                        fontWeight: 'bolder',
                        fontSize: 20,
                        fontStyle: 'italic'
                    },
                    detail: {
                        fontWeight: 'bolder',
                        borderRadius: 3,
                        backgroundColor: '#444',
                        borderColor: '#aaa',
                        shadowBlur: 5,
                        shadowColor: '#333',
                        shadowOffsetX: 0,
                        shadowOffsetY: 3,
                        borderWidth: 2,
                        textBorderColor: '#000',
                        textBorderWidth: 2,
                        textShadowBlur: 2,
                        textShadowColor: '#fff',
                        textShadowOffsetX: 0,
                        textShadowOffsetY: 0,
                        fontFamily: 'Arial',
                        color: '#eee',
                    },
                    data: data[i]
                };
            } else if (flag == 0 && this.option.series.length == 1) {
                this.option.series[1] = {
                    name: data[i][0].name,
                    type: 'gauge',
                    center: ['20%', '55%'],    // 默认全局居中
                    radius: '50%',
                    min: data[i][0].min,
                    max: data[i][0].max,
                    endAngle: 45,
                    splitNumber: 5,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 8
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 12,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 20,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 5
                    },
                    title: {
                        offsetCenter: [0, '-30%'],       // x, y，单位px
                    },
                    detail: {
                        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder'
                    },
                    data: data[i]
                };
            } else if (flag == 0 && this.option.series.length == 2) {
                var num = 0;
                var name = data[i][0].name;
                this.option.series[2] = {
                    name: data[i][0].name,
                    type: 'gauge',
                    center: ['77%', '50%'],    // 默认全局居中
                    radius: '35%',
                    min: data[i][0].min,
                    max: data[i][0].max,
                    startAngle: 135,
                    endAngle: 45,
                    splitNumber: 2,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 8
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        splitNumber: 5,
                        length: 10,        // 属性length控制线长
                        lineStyle: {        // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    axisLabel: {
                        formatter: function (v) {
                            num++;
                            if (num % 3 == 2) {
                                return name;
                            }
                            return v;
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 15,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 2
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        show: false
                    },
                    data: data[i]
                };
            } else if (flag == 0 && this.option.series.length == 3) {
                var num2 = 0;
                var name2 = data[i][0].name;
                this.option.series[3] = {
                    name: data[i][0].name,
                    type: 'gauge',
                    center: ['77%', '50%'],    // 默认全局居中
                    radius: '35%',
                    min: data[i][0].min,
                    max: data[i][0].max,
                    startAngle: 315,
                    endAngle: 225,
                    splitNumber: 2,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 8
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        show: false
                    },
                    axisLabel: {
                        formatter: function (v) {
                            num2++;
                            if (num2 % 3 == 2) {
                                return name2;
                            }
                            return v;
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 15,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 2
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        show: false
                    },
                    data: data[i]
                }
            }
            echarts.init(document.getElementById(this.id)).setOption(this.option);
        }
    },
    // 清空数据
    clearData: function () {
        for (var i = 0; i < this.option.series.length; i++) {
            this.option.series[i].data = [];
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
}

// 交错正负轴封装
function HxChartCrossBar(id, category, title) {
    // 大中小字体,对应size为l,m,s
    this.fontSize = [24, 16, 12];
    this.titleFontSize = [30, 24, 18];
    this.id = id;
    this.title = title || '';
    this.category = category;
    this.labelRight = {
        normal: {
            position: 'right'
        }
    };
    this.data = [];
    this.option = {
        title: {
            text: this.title,
            left: 'center',
            textStyle: {}
        },
        textStyle: {},
        tooltip: {
            trigger: 'axis',
            textStyle: {},
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: 80,
            bottom: 30
        },
        xAxis: {
            type: 'value',
            position: 'top',
            splitLine: { lineStyle: { type: 'dashed' } },
            axisLabel: {}
        },
        yAxis: {
            type: 'category',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: this.category
        },
        series: {
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    formatter: '{b}'
                }
            },
            data: this.data
        }
    };
}

HxChartCrossBar.prototype = {
    constructor: HxChartCrossBar,
    init: function () {
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 点击回调
    setCbClick: function (callback) {
        var chart = echarts.init(document.getElementById(this.id));
        if (!chart._$handlers.click) {
            chart.on('click', function (param) {
                callback(param);
            });
        } else {
            chart._$handlers.click[0].h = function (param) {
                callback(param);
            };
        }
    },
    // set标题并重载图表
    setTitle: function (text) {
        this.option.title.text = text;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题位置并重载图表
    setTitleLocation: function (x) {
        switch (x) {
            case 'l':
                this.option.title.left = 'left';
                break;
            case 'c':
                this.option.title.left = 'center';
                break;
            case 'r':
                this.option.title.left = 'right';
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 修改图表字体大小
    setSize: function (size) {
        switch (size) {
            case 'l':
                this.option.textStyle.fontSize = this.fontSize[0];
                this.option.tooltip.textStyle.fontSize = this.fontSize[0];
                this.option.xAxis.axisLabel.fontSize = this.fontSize[0];
                this.option.title.textStyle.fontSize = this.titleFontSize[0];
                break;
            case 'm':
                this.option.textStyle.fontSize = this.fontSize[1];
                this.option.tooltip.textStyle.fontSize = this.fontSize[1];
                this.option.xAxis.axisLabel.fontSize = this.fontSize[1];
                this.option.title.textStyle.fontSize = this.titleFontSize[1];
                break;
            case 's':
                this.option.textStyle.fontSize = this.fontSize[2];
                this.option.tooltip.textStyle.fontSize = this.fontSize[2];
                this.option.xAxis.axisLabel.fontSize = this.fontSize[2];
                this.option.title.textStyle.fontSize = this.titleFontSize[2];
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set背景并重载图表
    setBackground: function (color) {
        this.option.backgroundColor = color;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 新增修改数据
    putData: function (data) {
        var labelRight = {
            normal: {
                position: 'right'
            }
        };
        for (var i = 0; i < data.length; i++) {
            if (data[i] < 0) {
                data[i] = { value: data[i], label: labelRight }
            }
        }
        var newData = this.option.series.data.concat(data);
        if (newData.length <= this.option.yAxis.data.length) {
            this.option.series.data = newData;
            echarts.init(document.getElementById(this.id)).setOption(this.option);
        }
    },
    // 新增x轴数据
    putCategory: function (data) {
        this.option.yAxis.data = this.option.yAxis.data.concat(data);
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // 清空数据
    clearData: function () {
        this.option.series.data = [];
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
};

var icon = "data:image/png;base64,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"