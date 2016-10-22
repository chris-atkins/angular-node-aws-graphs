'use strict';

angular.module('app')

.controller('TopicCorrelationsCtrl', function ($scope, topicCorrelationDataService) {
	
	$scope.lastSelectedPoint = '';
	
	$scope.plotlyEvents = function (graph) {
		graph.on('plotly_click', function (event) {
			if (event) {
				var xIndex = event.points[0].x;
				var yIndex = event.points[0].y;
				console.log('clicked on ', xIndex, yIndex);
				$scope.lastSelectedPoint = event.points[0].data.text[xIndex - 1];
				$scope.$apply();
			}
		});
		// graph.on('plotly_beforehover', function(event) {console.log('plotly_beforehover', event);});
		// graph.on('plotly_hover', function(event) {console.log('plotly_hover', event);});
		// graph.on('plotly_unhover', function(event) {console.log('plotly_unhover', event);});
		// graph.on('plotly_relayout', function(event) {console.log('plotly_relayout', event);});
		// graph.on('plotly_selecting', function(event) {console.log('plotly_selecting', event);});
		// graph.on('plotly_deselect', function(event) {console.log('plotly_deselect', event);});
		// graph.on('plotly_doubleclick', function(event) {console.log('plotly_doubleclick', event);});
		// graph.on('plotly_beforeexport', function(event) {console.log('plotly_beforeexport', event);});
		// graph.on('plotly_afterexport', function(event) {console.log('plotly_afterexport', event);});
		// graph.on('plotly_afterplot', function(event) {console.log('plotly_afterplot', event);});
		// graph.on('plotly_redraw', function(event) {console.log('plotly_redraw', event);});
		// graph.on('plotly_clickannotation', function(event) {console.log('plotly_clickannotation', event);});
		
	};
	
	var white = 'rgb(255, 255, 255)';
	var blue = 'rgb(93, 164, 214)';
	var red = 'rgb(255, 65, 54)';
	
	var randomColor = function () {
		var randomNumber = Math.random() * 2;
		return (randomNumber < 1) ? red : blue;
	};
	
	var randomSize = function () {
		var randomNumber = Math.random() * 95;
		return Math.ceil(randomNumber) + 5;
	};
	
	var negativeString = function (color) {
		return color === red ? '-' : '';
	};
	
	var xLabels = ['production war were', 'america today country', 'health children care', 'public federal system', 'president states members', 'know american work', 'nation shall country', 'farm per farmers', 'energy oil national', 'help program work', 'billion dollars budget', 'act necessary legislation', 'against any labor', 'government states federal', 'too know your', 'house two some', 'tax economy security', 'her america help', 'america tonight nation', 'nations peace united', 'national policy state', 'government law federal', 'forces military war', 'peace freedom free', 'government such intro'];
	var yLabels = xLabels.slice(0).reverse();
	
	var traces = [];
	
	for (var y = 1; y <= 25; y++) {
		var trace = {
			x: [],
			y: [],
			text: [],
			mode: 'markers',
			hoverinfo: 'text',
			marker: {
				color: [],
				size: [],
				sizemode: 'area'
			}
		};
		
		for (var x = 1; x <= 25; x++) {
			var size = randomSize();
			var color = randomColor();
			trace.x[x - 1] = x;
			trace.y[x - 1] = y;
			trace.text[x - 1] = yLabels[y - 1] + ' / ' + xLabels[x - 1] + ' : ' + negativeString(color) + (size / 100);
			trace.marker.color[x - 1] = color;
			trace.marker.size[x - 1] = size;
		}
		
		trace.marker.color[25 - y] = white;
		trace.marker.size[25 - y] = 0;
		trace.text[25 - y] = '';
		
		traces[y - 1] = trace;
	}
	
	// console.log(JSON.stringify(traces, null, '  '));
	
	var data = traces;
	
	var layout = {
		title: 'Topic Correlations',
		showlegend: false,
		height: 600,
		width: 600,
		hovermode: 'closest',
		xaxis: {
			tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
			ticktext: xLabels,
			
			autorange: false,
			range: [0.5, 26],
			showgrid: false,
			zeroline: false,
			showline: false,
			ticks: '',
			showticklabels: true
		},
		yaxis: {
			tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
			ticktext: yLabels,
			
			autorange: false,
			range: [0.5, 25.5],
			showgrid: false,
			zeroline: false,
			showline: false,
			ticks: '',
			showticklabels: true,
			side: 'right'
		},
		font: {
			size: 10
		},
		margin: {
			r: 150,
			l: 0,
			b: 150,
			t: 30,
			pad: 0,
			autoexpand: true
		}
	};
	
	var options = {
		modeBarButtonsToRemove: ['sendDataToCloud', 'zoom2d', 'pan2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'select2d'],
		displaylogo: false
	};
	
	$scope.graphData = undefined;
	$scope.graphLayout = undefined;
	$scope.graphOptions = undefined;
	
	topicCorrelationDataService.getData().then(function (data) {
		$scope.graphData = data;
		$scope.graphLayout = layout;
		$scope.graphOptions = options;
	});
});