$(function() {
//Highcharts 3 series with mySQL and PHP – Ajax101.com

var temp = [];
var hum = [];
var pres = [];
var date = [];

var series = 1;

$.get('values.php', function(data) {

	data = data.split('/');
	for (var i in data) {

	switch(series){
	case 1:
		date.push(data[i]);
		series = 2;
		break;
	case 2:
		temp.push(parseFloat(data[i]));
		series = 3;
		break;
	case 3:
		hum.push(parseFloat(data[i]));
		series = 4;
		break;
	case 4:
		pres.push(parseFloat(data[i]));
		series = 1;
		break;
	default:
	//None
	}
	}

	date.pop();

	$('#chart').highcharts({
		chart : {
			type : 'spline'
		},
		title : {
			text : 'Domotique89'
		},
		subtitle : {
			text : 'Terrier Alexis et Lenet Axel'
		},
		xAxis : {
		title : {
			text : 'Date/Heure'
		},
		categories : date
		},
		yAxis : [{
			title : {
				text : 'Pression',
				style: {
                    color: Highcharts.getOptions().colors[2]
                }
			},
			labels : {
				style: {
                    color: Highcharts.getOptions().colors[2]
                },
				formatter : function() {
					return this.value + ' Pa'
				}
			},
			opposite: true
		}, {
			gridLineWidth: 0,
			title : {
				text : 'Temperature',
				style: {
                    color: Highcharts.getOptions().colors[0]
                }
			},
			labels : {
				style: {
                    color: Highcharts.getOptions().colors[0]
                },
				formatter : function() {
					return this.value + ' C'
				}
		}
		}, {
			gridLineWidth: 0,
			title : {
				text : 'Humidite',
				style: {
                    color: Highcharts.getOptions().colors[1]
                }
			},
			labels : {
				style: {
                    color: Highcharts.getOptions().colors[1]
                },
				formatter : function() {
					return this.value + ' %'
				}
			},
			opposite: true
		}],
		tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Temperature',
            type: 'spline',
            yAxis: 1,
            data: temp,
            tooltip: {
                valueSuffix: ' C'
            }

        }, {
            name: 'Humidite',
            type: 'spline',
            yAxis: 2,
            data: hum,
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' %'
            }

        }, {
            name: 'Pression',
            type: 'spline',
            data: pres,
            tooltip: {
                valueSuffix: ' Pa'
            }
            }]
        });
    });
});