$(function () {
    loadTimeAnalysis();
});

function loadTimeAnalysis() {
    var legendData = ['1星', '2星', '3星', '4星', '5星'];
    var yData = [
        { value: 67, name: '1星' },
        { value: 24, name: '2星' },
        { value: 22, name: '3星' },
        { value: 70, name: '4星' },
        { value: 44, name: '5星' },
    ];
    var pieChart = echarts.init(document.getElementById('timeAnalysis'));
    pieChart.setOption({
        title: {
            text: '维保单位星级分析',
            y: 20,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        backgroundColor: '#f9f1f1',
        legend: {
            orient: 'vertical',
            left: '100',
            y: 20,
            data: legendData
        },
        series: [
            {
                name: '维保单位',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: yData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
}