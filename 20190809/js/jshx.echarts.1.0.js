//一般日历
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
    // 大中小,对应size为l,m,s
    this.width = [1200, 600, 450];
    this.height = [800, 400, 300];
    this.fontSize = [24, 16, 12];
    this.titleFontSize = [30, 24, 18]

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
    // 修改图表大小
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

function HxChartLine(id, category) {
    this.id = id;
    this.category = category;
    this.series = [];
    for (var i = 0; i < this.category[0].length; i++) {
        this.series[i] = {
            name: this.category[0][i],
            type: 'line',
            data: []
        }
    }

    this.option = {
        title: {
            text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.category[1]
        },
        yAxis: {
            type: 'value'
        },
        series: this.series
    };
}

HxChartLine.prototype = {
    constructor: HxChartLine,
    init: function () {
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    putData: function (data) {
        var lastData = this.option.series;
        for (var i = 0; i < lastData.length; i++) {
            lastData[i].data = lastData[i].data.concat(data[i]);
        }
        this.option.series = lastData;
        echarts.init(document.getElementById(this.id)).setOption(this.option);;
    }
}