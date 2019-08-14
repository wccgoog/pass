$(function () {
    loadChartsBar();
    loadChartsPie();
    loadLocationAnalysis();
    loadTimeAnalysis();
});

function loadChartsBar() {
    var xData = ['奥的斯', '三菱', '东芝', '利通', '日立', '康力', '西奥'];
    var yData = [820, 932, 901, 934, 1290, 1330, 1320];
    var pieChart = echarts.init(document.getElementById('manitLine'));
    pieChart.setOption({
        title: {
            text: '电梯品牌分析',
            y: 20,
            x: 'center'
        },
        backgroundColor: '#f9f1f1',
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
        },
        xAxis: {
            type: 'category',
            data: xData
        },
        yAxis: {
            name: '数量(台)',
            type: 'value'
        },
        series: [{
            name: '电梯品牌',
            data: yData,
            barWidth: '40%',
            type: 'bar',
            label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                    color: 'black',
                }
            }
        }]
    });
}

function loadChartsPie() {
    var legendData = ['人为原因', '门系统', '曳引系统', '控制系统', '安全保护装置'];
    var yData = [
        { value: 335, name: '人为原因' },
        { value: 310, name: '门系统' },
        { value: 234, name: '曳引系统' },
        { value: 135, name: '控制系统' },
        { value: 1548, name: '安全保护装置' }
    ];
    var pieChart = echarts.init(document.getElementById('manitPie'));
    pieChart.setOption({
        title: {
            text: '电梯故障原因统计',
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
                name: '故障原因',
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
                },
                label: {
                    show: true
                }
            }
        ]
    });
}

function loadLocationAnalysis() {
    var legendData = ['住宅', '办公楼宇', '宾馆饭店', '交通场所', '医院', '学校', '文体娱场馆', '其他场所'];
    var yData = [
        { value: 2300, name: '住宅' },
        { value: 932, name: '办公楼宇' },
        { value: 1222, name: '宾馆饭店' },
        { value: 142, name: '交通场所' },
        { value: 1123, name: '医院' },
        { value: 752, name: '学校' },
        { value: 500, name: '文体娱场馆' },
        { value: 556, name: '其他场所' },
    ];
    var pieChart = echarts.init(document.getElementById('locationAnalysis'));
    pieChart.setOption({
        title: {
            text: '电梯场所分析',
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
                name: '应用场景',
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

function loadTimeAnalysis() {
    var legendData = ['0-5年', '5-10年', '10-15年', '15-20年', '20年以上'];
    var yData = [
        { value: 2467, name: '0-5年' },
        { value: 1324, name: '5-10年' },
        { value: 1422, name: '10-15年' },
        { value: 1670, name: '15-20年' },
        { value: 644, name: '20年以上' },
    ];
    var pieChart = echarts.init(document.getElementById('timeAnalysis'));
    pieChart.setOption({
        title: {
            text: '电梯年限分析',
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
                name: '电梯使用年限',
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