// 电梯品牌top10
var option = {
    title: {
        text: '电梯品牌',
        subtext: 'top10',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['上海三菱', '通力', '日立(中国)', '蒂森', '奥的斯', '西子奥的斯', '沃克斯', '迅达', '东芝', '富士达']
    },
    series: [
        {
            name: '数量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 1335, name: '上海三菱' },
                { value: 1110, name: '通力' },
                { value: 634, name: '日立(中国)' },
                { value: 535, name: '蒂森' },
                { value: 454, name: '奥的斯' },
                { value: 335, name: '西子奥的斯' },
                { value: 310, name: '沃克斯' },
                { value: 234, name: '迅达' },
                { value: 135, name: '东芝' },
                { value: 123, name: '富士达' }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

var elevator1_1 = echarts.init(document.getElementById('elevator1-1'));
elevator1_1.setOption(option);
var elevator4_1 = echarts.init(document.getElementById('elevator4-1'));
elevator4_1.setOption(option);

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{b}<br/>{c}台'
    },
    title: {
        text: '电梯年限',
        x: 'center'
    },
    xAxis: {
        name: '电梯使用年限',
        nameLocation: 'center',
        nameGap: '30',
        axisLabel: { interval: 0 },
        type: 'category',
        data: ['1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年', '10年', '11年', '12年', '13年', '14年', '15年']
    },
    yAxis: {
        name: '电梯数量',
        type: 'value',
        axisLabel: {
            formatter: '{value} 台'
        }
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130, 95, 55, 77, 48, 32, 52, 132, 121],
        type: 'bar',
        animationDelay: function (idx) {
            return idx * 100;
        }
    }],
    animationEasing: 'elasticOut',
};

var elevator1_2 = echarts.init(document.getElementById('elevator1-2'));
elevator1_2.setOption(option);


// 电梯地区分布
var data = [
    { name: '建邺', value: 19 },
    { name: '浦口', value: 22 },
    { name: '鼓楼', value: 32 },
    { name: '玄武', value: 17 },
    { name: '雨花台', value: 8 },
    { name: '江宁', value: 4 },
    { name: '六合', value: 9 },

];
var geoCoordMap = {
    '建邺': [118.734007, 31.999267],
    '浦口': [118.531637, 32.005147],
    '鼓楼': [118.772526, 32.085458],
    '玄武': [118.804147, 32.063428],
    '雨花台': [118.785175, 31.986038],
    '江宁': [118.84784, 31.944376],
    '六合': [118.824269, 32.290319],

};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

var option = {
    title: {
        text: '电梯分布情况',
        textStyle: {
            fontSize: 40
        },
        padding: 20,
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return params.data.name + '电梯数:<br/>' + params.data.value[2] + '台'
        }
    },
    bmap: {
        center: [118.801847, 32.107482],
        zoom: 12,
        roam: true,
        mapStyle: {
            styleJson: [
                {
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                },
                {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#f3f3f3'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fdfdfd'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                },
                {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                },
                // {
                //     'featureType': 'arterial',
                //     'elementType': 'labels',
                //     'stylers': {
                //         'visibility': 'off'
                //     }
                // }, 
                {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                },
                // {
                //     'featureType': 'label',
                //     'elementType': 'labels.text.fill',
                //     'stylers': {
                //         'color': '#999999'
                //     }
                // }
            ]
        }
    },
    series: [
        {
            name: '电梯',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data),
            symbolSize: function (val) {
                return 20;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'purple'
                }
            }
        },
        {
            name: '电梯数量Top 5',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 5)),
            symbolSize: function (val) {
                return 30;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'purple',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};

var elevator1_3 = echarts.init(document.getElementById('elevator1-3'));
elevator1_3.setOption(option);

// 维保年限
option = {
    // visualMap: {
    //     // 不显示 visualMap 组件，只用于明暗度的映射
    //     show: false,
    //     // 映射的最小值为 80
    //     min: 80,
    //     // 映射的最大值为 600
    //     max: 200,
    //     inRange: {
    //         // 明暗度的范围是 0 到 1
    //         colorLightness: [0.2, 0.5]
    //     }
    // },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    title: {
        text: '维保年限',
        x: 'center'
    },
    xAxis: {
        type: 'category',
        data: ['1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年', '10年', '11年', '12年', '13年', '14年', '15年']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130, 95, 55, 77, 48, 32, 52, 132, 121],
        type: 'bar',
        animationDelay: function (idx) {
            return idx * 100;
        }
    }],
    animationEasing: 'elasticOut',
};

var elevator3_1 = echarts.init(document.getElementById('elevator3-1'));
elevator3_1.setOption(option);