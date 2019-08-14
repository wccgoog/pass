$(function () {
    loadMain1();
    loadMain2();
    // loadMain3();
    // loadMain4();
})

function loadMain1() {
    var main1 = echarts.init(document.getElementById("main1"));
    main1.setOption({
        title: {
            text: '电梯品牌数量分析',
            y: 20,
            x: 'center'
        },
        legend: {
            orient: 'vertical',
            right: 30,
            top: 100
        },
        tooltip: {},
        backgroundColor: '#f9f1f1',
        dataset: {
            dimensions: ['product', '2016', '2017', '2018'],
            source: [
                { product: '奥的斯', '2016': 433, '2017': 858, '2018': 937 },
                { product: '三菱', '2016': 831, '2017': 734, '2018': 551 },
                { product: '东芝', '2016': 864, '2017': 652, '2018': 825 },
                { product: '利通', '2016': 724, '2017': 539, '2018': 391 },
                { product: '日立', '2016': 234, '2017': 739, '2018': 456 },
                { product: '康力', '2016': 523, '2017': 512, '2018': 590 },
                { product: '西奥', '2016': 666, '2017': 672, '2018': 791 },
            ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
            {
                name: '2016',
                type: 'bar',
                label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                    }
                }
            },
            {
                name: '2017',
                type: 'bar',
                label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                    }
                }
            },
            {
                name: '2018',
                type: 'bar',
                label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                    }
                }
            },
        ]
    })
}

function loadMain2() {
    var main2 = echarts.init(document.getElementById("main2"));
    main2.setOption({
        title: {
            text: '电梯各品牌增长率分析',
            y: 20,
            x: 'center'
        },
        legend: {
            orient: 'vertical',
            right: 30,
            top: 100
        },
        tooltip: {
            trigger: 'axis',
        },

        backgroundColor: '#f9f1f1',
        dataset: {
            source: [
                ['product', '2016', '2017', '2018'],
                ['奥的斯', 13.3, 13.8, -18.7],
                ['三菱', 13.1, -13.4, 15.1],
                ['东芝', 16.4, 15.2, 12.5],
                ['利通', 22.4, 13.9, 9.1],
                ['日立', 32.4, 11.9, 29.1],
                ['康力', 11.4, -5.5, -19.1],
                ['西奥', -4.4, -3.9, 6.1],
            ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        series: [
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },

        ]
    })
}

function loadMain3() {
    var main1 = echarts.init(document.getElementById("main3"));
    main1.setOption({
        title: {
            text: '电梯品牌数量分析',
            y: 20,
            x: 'center'
        },
        legend: [{
            orient: 'vertical',
            left: 30,
            top: 100,
            data: [
                {
                    name: '奥的斯',
                },
                {
                    name: '三菱'
                },
                {
                    name: '东芝'
                },
                {
                    name: '利通'
                },
                {
                    name: '日立'
                },
                {
                    name: '康力'
                },
                {
                    name: '西奥'
                },
            ]
        }, {
            orient: 'vertical',
            right: 10,
            top: 100,
            data: [
                {
                    name: '奥的斯增长率',
                },
                {
                    name: '三菱增长率'
                },
                {
                    name: '东芝增长率'
                },
                {
                    name: '利通增长率'
                },
                {
                    name: '日立增长率'
                },
                {
                    name: '康力增长率'
                },
                {
                    name: '西奥增长率'
                },
            ]
        },
        ],
        tooltip: {},
        backgroundColor: '#f9f1f1',
        dataset: {
            source: [
                ['product', '奥的斯', '三菱', '东芝', '利通', '日立', '康力', '西奥', '奥的斯增长率', '三菱增长率', '东芝增长率', '利通增长率', '日立增长率', '康力增长率', '西奥增长率'],
                ['2016年', 433, 831, 864, 724, 234, 524, 666, 13.3, 13.1, 16.4, 22.4, 32.4, 11.4, 4.4],
                ['2017年', 858, 734, 652, 539, 739, 512, 672, 13.8, -13.4, 15.2, 13.9, 11.9, -5.5, -3.9],
                ['2018年', 937, 551, 825, 391, 452, 590, 791, -18.7, 15.1, 12.5, 9.1, 29.1, -19.1, 6.1],
            ]
        },
        xAxis: { type: 'category' },
        yAxis: [{
            type: 'value'
        }, {
            type: 'value',
            splitLine: {
                show: false
            }
        }],
        series: [
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' },
            { type: 'bar' },
            {
                type: 'line',
                yAxisIndex: 1,
                smooth: true,
                // lineStyle: {
                //     color: '#333'
                // }
            },
            {
                type: 'line',
                yAxisIndex: 1,
                smooth: true
            },
            {
                type: 'line',
                yAxisIndex: 1,
                smooth: true
            },
            {
                type: 'line',
                yAxisIndex: 1,
                smooth: true
            },
            {
                type: 'line',
                yAxisIndex: 1,
                smooth: true
            },
            {
                type: 'line',
                yAxisIndex: 1,
                smooth: true
            },
            {
                type: 'line',
                yAxisIndex: 1,
                smooth: true
            },

        ]
    })
}

function loadMain4() {
    var dataSet = [
        [
            {
                name: '奥的斯',
                value: 433,
            },
            {
                name: '三菱',
                value: 831,
            },
            {
                name: '东芝',
                value: 864,
            },
            {
                name: '利通',
                value: 724,
            },
            {
                name: '日立',
                value: 234,
            },
            {
                name: '康力',
                value: 523,
            },
            {
                name: '西奥',
                value: 666,
            },
        ], [
            {
                name: '奥的斯',
                value: 858,
            },
            {
                name: '三菱',
                value: 734,
            },
            {
                name: '东芝',
                value: 652,
            },
            {
                name: '利通',
                value: 539,
            },
            {
                name: '日立',
                value: 739,
            },
            {
                name: '康力',
                value: 512,
            },
            {
                name: '西奥',
                value: 672,
            },
        ], [
            {
                name: '奥的斯',
                value: 937,
            },
            {
                name: '三菱',
                value: 551,
            },
            {
                name: '东芝',
                value: 825,
            },
            {
                name: '利通',
                value: 391,
            },
            {
                name: '日立',
                value: 456,
            },
            {
                name: '康力',
                value: 590,
            },
            {
                name: '西奥',
                value: 791,
            },
        ]
    ]
    var main4 = echarts.init(document.getElementById("main4"));
    main4.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 2016;
            main4.setOption({
                series: {
                    id: 'pie',
                    data: dataSet[xAxisInfo.value],
                    label: {
                        formatter: dimension + '年{b}:{c}台'
                    }
                }
            });
        }
    });
    main4.setOption({
        title: {
            text: '电梯各品牌增长率分析',
            y: 20,
            x: 'center'
        },
        legend: [{
            orient: 'vertical',
            right: 30,
            bottom: 200
        }
        ],
        tooltip: {
            trigger: 'axis',
        },

        backgroundColor: '#f9f1f1',
        dataset: {
            source: [
                ['product', '2016', '2017', '2018'],
                ['奥的斯增长率', 13.3, 13.8, -18.7],
                ['三菱增长率', 13.1, -13.4, 15.1],
                ['东芝增长率', 16.4, 15.2, 12.5],
                ['利通增长率', 22.4, 13.9, 9.1],
                ['日立增长率', 32.4, 11.9, 29.1],
                ['康力增长率', 11.4, -5.5, -19.1],
                ['西奥增长率', 4.4, -3.9, 6.1],
            ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            {
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '25%'],
                data: dataSet[0],
                label: {
                    formatter: `2016年{b}:{c}台`
                }
            }

        ]
    })
}