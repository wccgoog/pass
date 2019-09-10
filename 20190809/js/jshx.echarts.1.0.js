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
        var calendar = echarts.init(document.getElementById(this.id));
        if (!calendar._$handlers.click) {
            calendar.on('click', function (param) {
                callback(param);
            });
        } else {
            calendar._$handlers.click[0].h = function (param) {
                callback(param)
            };
        }
    },
    // 修改图表字体大小
    setSize: function (size) {
        switch (size) {
            case 'l':
                // this.option.calendar.width = this.width[0];
                // this.option.calendar.height = this.height[0];
                this.option.calendar.yearLabel.fontSize = this.titleFontSize[0];
                this.option.textStyle.fontSize = this.fontSize[0];
                this.option.title.textStyle.fontSize = this.titleFontSize[0];
                break;
            case 'm':
                // this.option.calendar.width = this.width[1];
                // this.option.calendar.height = this.height[1];
                this.option.calendar.yearLabel.fontSize = this.titleFontSize[1];
                this.option.textStyle.fontSize = this.fontSize[1];
                this.option.title.textStyle.fontSize = this.titleFontSize[1];
                break;
            case 's':
                // this.option.calendar.width = this.width[2];
                // this.option.calendar.height = this.height[2];
                this.option.calendar.yearLabel.fontSize = this.titleFontSize[2];
                this.option.textStyle.fontSize = this.fontSize[2];
                this.option.title.textStyle.fontSize = this.titleFontSize[2];
                break;
        }
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    }
}

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
            formatter: '{a},{b},{c},{d},{e}'
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
                    radius: '50%',
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
                    radius: '35%',
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
                    radius: '25%',
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
                    radius: '25%',
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
}