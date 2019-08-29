function CreateEchartCalendar(id, range, title, graphData) {
    this.id = id || '';
    this.range = range || '';
    this.title = title || '';
    this.graphData = graphData || [];
    this.type = 'graph';
    this.option = {
        title: {
            text: this.title,
            x: 'center'
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
            cellSize: 40,
            range: this.range,
            // width: 400,
            // height: 400
        },
        series: {
            type: this.type,
            coordinateSystem: 'calendar',
            data: this.graphData
        }
    };
}

CreateEchartCalendar.prototype = {
    constructor: CreateEchartCalendar,
    //初始化图表
    init: function () {
        var calendar = echarts.init(document.getElementById(this.id));

        calendar.getZr().on('click', function (params) {

            var pointInPixel = [params.offsetX, params.offsetY];
            /*此处添加具体执行代码*/
            alert(pointInPixel)
            var pointInGrid = calendar.convertFromPixel({ seriesName: 0 }, pointInPixel);
            alert(pointInGrid)
            //X轴序号
            var xIndex = pointInGrid;
            //获取当前图表的option
            var date = new Date(xIndex)
        })
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
    }
}