function CreateEchartCalendar(id, range, title, graphData) {
    this.id = id || '';
    this.range = range || '';
    this.title = title || '';
    this.graphData = graphData || [];
    this.type = 'graph'
}

CreateEchartCalendar.prototype = {
    constructor: CreateEchartCalendar,
    init: function () {
        var myChart = echarts.init(document.getElementById(this.id));
        var option = {
            tooltip: {
                position: 'top'
            },
            title: {
                text: this.title,
            },
            calendar: [
                {
                    orient: 'vertical',
                    yearLabel: {
                        margin: 40
                    },
                    monthLabel: {
                        nameMap: 'cn',
                        margin: 20
                    },
                    dayLabel: {
                        firstDay: 1,
                        nameMap: 'cn'
                    },
                    cellSize: 40,
                    range: this.range
                }],
            series: {
                type: this.type,
                coordinateSystem: 'calendar',
                data: this.graphData
            }
        };
        myChart.setOption(option);
    }
}