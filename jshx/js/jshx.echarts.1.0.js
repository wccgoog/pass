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
                data: []
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
        this.option.calendar.top = 40;
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

var iconWork = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFiUlEQVRoQ+1aW2xUVRRd65w7fQi1RYoFRcNDDLaUgiURImAfGMYHKpSSKFHhpwkhBoFOIP6UJn6UhzF+mAgJ+mGCwYISEpu2KS2gkWDSRGir8tFaoAG00hQV6XTmnm3ulKll+phHmw4m3b9nn7XXOnvffR4zxBhbT+FLcyzjzxYym0A2AFsojQBaLNE/s77q8liG5FiBeVe9mK2N7AbkjZExecRWrEisq2oai9hjIsAucO8WYDeA1AhJ3SJQoeurKyL0H9Zt1AL8Be4vARSHRLgtwE8UXATgBZAJIAvEtBC/Squ+esNoRIxKQCh5AtcAHFIuOcSamuuhxOx8dwmIEgFyB4yNSkTMAoZY+Urtkm1DER8kpMBdJsCesRARkwB/gdspGad0ghb1KtqhIkQ2Wg01R6Itp9gEFLpPQPBqIJjgV+0yS1lb+3u0wf35q4+BLArMI76xTlW/HC1G1AKk8IVMW6QlGIiUd/Wpmo+iDez4+wpXr6DwbHCuz2B28unq9miwohbQW+DepIDP7gaJunRCyfnz3Q0g8vqSgD26vro8ZgFSvOtxv9hzwgHQezsNNEoSUrrC+UYyLrdvPEWYBzHpkfPh/C3qNlbuvdJfAYEyLipdaISfgve0t3BY8RtXvKCMeYvHD1ykrC192Cj+xkSxkePXyDDxIxYuspfATUIaXQFPZSSDpshzTIAita4HSJdwEPfFuLRpSF0CmCR1tItLr3CWeYyreiMiJ9dVX9dLN0DfQozKgngBkCSAUyKrAEeAdOhO2kUeYa4PzPWPSERaNXBJ/y0denK/43z7jlrZmxyzgisapjrh3ukPmTt81pfMGSMLkUYrUEqRC6hKsHFDt9H4l7Lywy7f+tI8RZ5kQW8K59gxaZCaRMhVdovN7aKkXUFlQuRjPmnfYl7viCfbqAWYQ8kwlHz80QwSZSIo11Ozy5BuFnGdNy0WBQ4mRPaYruYzDiYUDjJ14aNIMOVqc8+kkTD7BZgNnq/FxmuREHAEsKt5B4A1AD5n2oJWkAMPZZHAhPhwi3RfXAxBCYFWk5q1RSlVGwkQU+Uc5fX3Mvw+X44ysmz4SbyujK7liYp2f4G7r1UJTsvUBeUUzKRgbiQBQ32EaBWigzeby4K7sZ4xL9X2Jq2mEecOMawpxUYYV2PUR4mBAqyG6vxYiIfOGXicsOqro+JEe11pGclc6SuLIY0KnaJ4VB/d985AATo9a6tovi8+ro1FiCTghPbhsH2zaWcwA44AU+Q5CSAlHKaInKbZ4GnEIt/Tck07h6lhzenXd7+BtwFsAvgJ0xak4AEpZqY/pBeGC313/LLulk6Wo7tllkC2AahkWnYdiINc49xER7B2fVWarN6I22iwY+ivDpQ7lxHn1GiKS1uQIZlhgw3DQ6oS/pEO/aU+vn9zENMuKt3HZGznmz1WRF0ouJGhcBZMTgn0WedlZPAmYn6wgB9dgbbnAJPMEyCPy31g5sib4HBE5JKGnHGSJ4chuApwJpOxBFm+RWE31tCNDM8/AbN4K3TDDsD4Bsf0EXLOgrRpH3rpQqLYnG1rrhzCN8IKCjSzRgvo0HdgwwsFCxlmMpeFxxy0kYUVEAWp8XCdEDAeqxzdRxzuG4g345D4EyUU74RMZOC+y4Cz88m0HLDzQry5RRR/cAk9Nx2StRHq/N6IAOLtNPhK+YwLMmUe2On8JnH/W9R34vtN0oSAeGdkIgMTGRjlCvz3sFXs6cJ8/xTnavh/MvnOBfxiddGs93wvaWaJKvaOwVvz+C2B+SLpT/7FJsraXcuNMt8yyw/MtcHpkT1vjx/VeyPJDQW0akiLBWXUisBTkL3eUwrB/niRiiku4dHH9h/of8uS4p25xqiVBF6JCXCcJglwUilzlpUfOH/hwb8Y+PWlyh19igAAAABJRU5ErkJggg==';

var iconTick = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADy0lEQVRoQ+2ZUWgUVxSG/zNDq4I1oO4kIbWJVo0pSpNoCmYnpioEfCjurOCDii8BWyStPmhAUREVhdiCbRVRsE8VBTGTgCgUqobsrqCSKCIaC01bRc1ssCY+SIg7R3aT4nZ3dvfO7CzJgPN8zn//b869d+6cS/D4Qx73j/cAE11BVytQ+vvFcnMqVbNJ80FUDPB0AmIM/AvGE1PmPphyz6C69pVb4HkD+MJ6NTFvYOArAi0SMkaIMOOSLOPc8+XaX0I5GYIcAyhdHfWQuRXA2nwMAHyWR+n76ErtjhMdRwC+sH6MGNucDJg5h44aaiD+Qmw9tgCU7vbPIdEvYNTaGkUwmIFbkkTNA/WBe4Ip4tuoEtabALoA5hmi4o7iCEN4g/VGo/abSL5QBZQuvQkyrgCQRERdiDFBWGP4c0PkBCiOdCxh5m4wilwwJi5BNAzTXGE0BO9mS8oJ4AvpNwmoEx/ZxUhCj+HXljoGUEIdbQDvdNGSbSkm/Bj1a9szJWasgO+aXk0foNf2iIVIiJHfaAxErKQzAiih9l8B2lgIPw40Ow1VCwgDlNzQK8wY+h0MVLAUJtRE/elfa8sK+EL6LgIOF8zNuPAUScaIGRMcho8aajDtS20JoIT1MBj1gsqOwmqLZuG7uZ9h+/2beDk6klODwQ+jarAqNTANYHao8yMJ5nBOxTwC1JnFaKtallAI3r6K5yOvhdTkEbPi2ep1fycHpwNE2hslk64LKToIavKVYf/C6kTmnr4eXB18JqxCxIEBf7AzK4DSrW8B4ZSwqo3AQEk5Wj9d7Mh8Iomxw2jQfsgOENIPANhrw5dQ6IayeWipGJvCdt/8uwHSj9xpU6g4pP/MQIuIq5Ip03BiyXJcHniCM48fZUxpnrMQzZ8syNN8Iv2koWpbs1bADoDy4TR01K1K6J355w9LCBfNx8/+xwdU7VtXp9Cq2aU4VDn2f5MK4ab5cdMHDVXb5/oitoIogPn4Iv7aaNBOF2QbTYboHXqBmqKZbsz5/60rU+IvB+uDXdkB8viQJUPkt9tY7wcmpBmpPSXXjxLflFdi88fzcf7pn/ip/4HIZiYWQ4gYfs2fGjyhhzkx52NRDOyOqtoRIYDJeJyWZMy16uJ55IeGzxpqcJNVxTzxS8mjqMnUeszalZgMP/VA9pbjpG6rxFuNUVX7IttizwkwcY0tDBFRQ64+aU6AOP2EtBZjWCPSHxUCSEB4ubn73xz0dHs9eSF59oIjGcLTV0wp1fDmJZ/V3uzJa1Y7J8pCxApvo4UY3A3N9wBuvMV8NN4C+1qgQIqT9M8AAAAASUVORK5CYII=';

var iconCross = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD0UlEQVRoQ+2ZXUhUURCAx0gtfyq1NBdcdTVFTQvKzCiyF8NSikIhCNIgQyuj6MF6UV/KhyiyUjJIgyBQikJL8iWjyMyCylQ0XXUFTUut/Ck12piFa7t3794z53p3Y8ED+7J3zsx8M2fOuWeui9FoNIITD5cFgP+cPdUyMDvcD+Mva2Ba/xFmhw0wO2SAmSGDCc8tQAuu+PPXgrtuLXhvSQNX/yBV0OcF8LPjLUw218NEcz1MvmvgcshzfRJ4xSeDZ3wyLI3cwDXXXFgRADo+VlNu+qkxfNKyAX9KQLgBBi4eVc1xMTxCaM7c4IoJF0DP8W0w1fKCywCvsEfsVgi99pw8jQzQmRFsKkxHDCz4iKo+kikSQOt2F5IytYVinrHPWCZA1+F1MN39QW3fSPrcw+Ig/NZ7WVlZgP6CDPjRUE0yZi+hZUnpEFRUZVO9TQB77ja8sHK7kyQA7vP67I28duwqryt/I3lOSAJQou+fVWg6fMZfP4GB4ixFzmvyK8B7007TuTJcUSirw1YWrACo0Q+/3QruIdEmo1gnWC88A9c1rm8c071t0HUohjldKgtWAF8qi5jRQEsYPZ+UzDmjPBDmzqOCsbpKUhYx66syCyxArQB6cjbDVFsTMxooIHaEAqFkjuCMR3QChJa9sg0wM6CHTwfCSM4LQjwO8cjacmLN3W5w0+jmHltkYOTeVfhckscFQM2EGs6jrdV5JeC3/4Q0wOClXBh9WMYNwIJQy3m047snBwJPl0oDGPJTYbzxkSIAWxD4v7DbKN2xzB3yTtwN2uJaaYDurDj4pW9RDCAFYa6MUuQs40t0sRBW8e/dzKIG2netgD+T31k6mM/FS0aNyAtGF3kuh6jH36Qz4PQATr+EnL6InX4bHX1QCoOXjzGLVCxA2ecpMhTDgaeug+/eXOkixu5aZ7qWomdOhscxHllbTkRUGyy6elYvc70nd5C7bEocUjJHgMFuXsiVpxZsVgBf71yAoZvnmFkQp5LnkBJDUJduwJHzsPLgWXkA6oUm8v4ALPYLNCnjcV6wbg7xe2QQOvZpmEEjXWhQC/VKie842NRVUvhoB7OIywIDoNqVEhVTs8AMmYoCXJd6ahZU9E9WFXdbRdDmiGYuKwisZi+ztejIpq4YhtLkZQKgUqdu7gpRcWSTl9LUFfwiZUAQdkSzl9XMFS8zLgB77052/8Qk0Dv1Rz7zFCLIRGMtTDTVkbt5wnzssnklpIBXYqqir5OKakBuz8auHrZkZvraZT90uwVHAbZGzLtrrLNA7jl3DczHmD3mLgDYI6o8Ov8CB/Cxjy6vbhgAAAAASUVORK5CYII=';

var iconFlag = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAGCklEQVRoQ9WabWxTVRjH/89t98Je2unW9t42m2bipswoojFsY5vgEGUMzT4YxAQ/kJDMBIOJivrVRHxLJDNxJnMf5AsmJItKEB1sCNFCWFgkwwwFAnO097aF4cbGWOm9x5xL79i6vq2JcHuSk9utzznn+fU5b8/zXELysgHANgCtAPYBeCWe+Ojo6JLc3NxGxlgTY8xDRB7jyeUZYz4i8hlPIjoaDoePlZeXT6cYP+XXlESiAMC5irxC9yqbEwfGfBhXwwcBrOdtfD7fCkEQ1hDRKiJqYYxZU442R4CIIoyxA4yx3zRN6/d4PIOLaW/IJgN4EsDg1w+txGZHJd4bOYWv5L/+DYVCyyKRyA4AO4goN5NBY9swxsIAdlut1t0Oh0NeTJ/JAPIBBBtsruI3pGrsvHQK07YC39DQUATAA4sZZBGyIxxEFMXd6bZJBsD72A6gw+isq6sLra18OSyuyLLMpxz40+/3Y2ZmBoWFhfOqy+VCTU2N0fFhQRDanU7n+VQjpQJAe3v7zs7Ozo95R42NjWhubtZrZWXlgr7Hx8cxMDCA4eHheTWVEsb3oiiivr5eH6ehoeGaJEmvSZLE113CkhRAUZTtXq+3o62tDZ0bNqPrwmkMDv+pd1ZUVAT+q/EaCoUQDAbBAYzy1LLHsNLzIOryS+COWGDXCPZbGmwzqi4ymSNg0kq4biVMCsD5HBW/T13BiXNncWHkki5TW1uL4uLig729vfrGEa8kBFAUZROAvV6vFxxgf8sWNF2N4IRdwEnhJv4J30Dw5hRCkxNYer8DVQV2PEz5WMII9dc0WDUt3R9+gdygWICTbBoD12TsO9YPRVFeFUXxu7QBAoHAE4yxP3iDWICMtcqg4dFSK1oP7OEAIKLlLpfrdGw3CywQDAZFVVVPElG5mQAYY6MWi+UZp9OpzIVYAKAoyo/Rk1eXM4sFokrvF0VxY0IARVH4AfXFXAGTAXDV3pp7TsxaIBQKSaqqHo89pEwIMGKxWGqNE3sWQJblT4jo3dhFYkIAfjn8VJKknVxXHSB6MTse725jUoCwpmm1/AKoAyiK8j6Aj+LtdGYEiOr5gSiKu3SAQCDQyxhbm00ARHTI5XI9T36/v0AQhAkAlmwCAKBqmmYjRVH49ZLv/XGLiacQ13cjB+Bzn6+BbATYRbIsf0tEW7IRgDG2h1vgMIDnshEAQB+3wDARPZKNAIyxs9wCfAcqTgXwetNafMicKAmzRV2MryyxwJ8vwG/R4MctyJEZSNY8uJEDtyrAfVND2fRtJye2zL1OJxj0etoAvINytwdbl9diWU4RHp0GHpjgwYQ7xV9oxakChoHwOAaDPgz+fRaTU1Mpge02G+qra1B/n4gmFOHxidtAaQGkO4U6OjrAnfqhoaGUCpWWlqK6uhpVVVWoqKhAWVmZXh0Ox+zny5cv48yZM3p//Mkrd0t5eXbF09jkroKH3XFo4g1qTKG0FnFPTw/q6up0/2BsbGy25uXloaSkBHa7XX9yxTlAJqW/vx99fX3gz4sXL852wT2yBEVfxGltowZAJopl0saA6e7u1l3KBBbQt9G0DrK7DWAozCMd3LoJyi4KBALrGGM/J5IwrhL3CiCZ9YjoBYpGlicSBWfNCsCDw+Fw2Gb4A98DeCkerVkBAPwgiuLLOoAsy28T0WfZBMAYe0eSpM/TdinNtAZ4OH6eSxm1QlKn3mQA8516DpAqrGIigPhhFQ6RLLBlIoD4gS1jASuKcghAs/G3yXahw6Iozgs+xAvuLtU07QQA/UJjIoCrgiCsjM3axM0PyLL8IhH9ZCYAxtj6eNmaZAkOPT9mEgu8KYril/HOqVQppk1er3cvz9Dcw0WcMDvDgVIm+dra2rb29PR8c7cBeEJDEITWeFmZuZZICcAdJABHuru7vS0tLXWZ3O0zaLNfEIRtsdmYRU+haAMdAMBqRVGW8wx9NiW6OcMsAIBf+YmdLa8aGBabB2D8k+cULBbLOiJazRhbkyg4nGT6qETUzxg7oqrqL//Hyx5JAeYqFo1w8+hebTqv2wA4rmlan9vtvpHB+pjX5D+XhLlPkoUtrQAAAABJRU5ErkJggg==';