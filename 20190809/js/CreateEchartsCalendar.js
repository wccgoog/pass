//一般日历
function CreateEchartCalendar(id, range, title, graphData) {
    this.id = id || '';
    this.range = range || '2019-1';
    this.title = title || '';
    this.graphData = graphData || [['2019-8-3', 300]];
    this.type = 'graph';
    this.list = getDateListFromRange(this.range);



    this.option = {
        title: {
            text: this.title,
            x: 'center'
        },
        tooltip: {
            show: false
        },
        calendar: {
            orient: 'vertical',
            yearLabel: {
                margin: 40,
                position: 'bottom'
            },
            monthLabel: {
                nameMap: 'cn',
                margin: 20
            },
            dayLabel: {
                firstDay: 1,
                nameMap: 'cn',
                margin: 10
            },
            cellSize: [70, 70],
            range: this.range,
        },

        visualMap: {
            show: true,
            min: 0,
            max: 300,
            calculable: true,
            seriesIndex: [1],
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
        },
        series: [{
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            itemStyle: {
                color: 'rgba(128, 128, 128, 0)'
            },
            label: {
                normal: {
                    show: true,
                    formatter: function (params) {
                        var d = echarts.number.parseDate(params.value);
                        return d.getDate();
                    },
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            data: this.list
        },
        {
            type: 'heatmap',
            tooltip: {
                show: true
            },
            coordinateSystem: 'calendar',
            data: this.graphData
        }
        ]
    };
}

CreateEchartCalendar.prototype = {
    constructor: CreateEchartCalendar,
    //初始化图表
    init: function () {
        var calendar = echarts.init(document.getElementById(this.id));
        calendar.setOption(this.option);
    },
    // set标题并重载图表
    setTitle: function (text) {
        this.option.title.text = text;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set数值并重载图表,数值以时间戳毫秒格式显示在日历中
    setData: function (data) {
        this.option.series.data = data;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set背景并重载图表
    setBackground: function (color) {
        this.option.backgroundColor = color;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set年月并重载图表
    setRange: function (range) {
        this.option.calendar.range = range;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题位置并重载图表
    setTitleX: function (x) {
        this.option.title.x = x;
        echarts.init(document.getElementById(this.id)).setOption(this.option);
    },
    // set标题左边距并重载set
    setTitleLeft: function (left) {
        this.option.title.left = left;
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
    test: function () {
        alert('test')
    }
}

function createDateList(startTime, endTime) {
    var list = [];
    while (startTime < endTime) {
        list.push(startTime);
        startTime += 3600 * 24 * 1000;
    }
    return list;
}

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