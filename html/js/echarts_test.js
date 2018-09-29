function InitEmpState() {
    AjaxLabel2({ name: "AFXGBoard", Action: "EmpState", SearchDate: SearchDate, DataType: "json" }, function (result) {
        var LegendData = ['未上班', '上班-正常', '上班-信号中断', '上班-GPS异常', '上班-GPS未开', '下班'];
        var LegendDataColor = ['#F45B5B', '#8085E9', '#7CB5EC', '#90ED7D', '#E4D354', '#F7A35C'];
        var data = [];
        for (var d = 0; d < LegendData.length; d++) {
            var IsInsert = false;
            for (var j = 0; j < result.data.length; j++) {
                if (result.data[j].State == LegendData[d]) {
                    data.push({ value: result.data[j].StateCount, name: LegendData[d], itemStyle: { normal: { color: LegendDataColor[d] } } });
                    IsInsert = true;
                    break;
                }
            }
            if (!IsInsert) {//不存在时增加
                data.push({ value: 0, name: LegendData[d], itemStyle: { normal: { color: LegendDataColor[d] } } });
            }
        }
        // 基于准备好的dom，初始化echarts图表
        var myChart = echarts.init(document.getElementById("EmpState"));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                x: 'center',
                y: 'bottom',
                width: 400,
                height: 20,
                backgroundColor: '#1574b1',
                borderColor: '#1574b1',
                borderWidth: 1,
                padding: 5,
                itemGap: 5,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    width: 10,
                    height: 10,
                    lineHeight: 10,
                    color: '#fff',
                    rich: {
                        a: {
                            width: 0,
                            height: 0
                        }
                    }
                },
                data: LegendData
            },
            calculable: true,
            series: [
                {
                    type: 'pie',
                    center: ['50%', '40%'],
                    radius: [10, 75],
                    roseType: 'radius',
                    label: {
                        formatter: '{b}: {c}',
                    },
                    data: data
                }
            ]
        };
        // 为echarts对象加载数据 
        myChart.setOption(option);
    });
}