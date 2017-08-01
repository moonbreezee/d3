"use strict";

// changes-in-prices-and-positions.js 
// 用于具体的操作的处理

window.onload = function () {
	console.log('window.onload: ', 'yes');

	function Coordinate(container, params) {
		this.vis = d3.select('#' + container);
		this.params = params;
		return this;
	}

	Coordinate.prototype = {

		constructor: Coordinate,

		extendParams: function extendParams(params) {
			// Object.assign(target, ...sources)
			Object.assign(this.params, params);
			return this;
		},
		// 设置图例的大小位置
		setContainer: function setContainer() {

			var vis = d3.select("#d3Chart").append("svg:svg").attr("width", 750).attr("height", 750).attr("viewBox", "0 0 750 750");

			// 控制显示的范围，如下表示，坐标x轴显示-1 到 5 显示的区域是从 50 到 730
			var xScale = d3.scale.linear().domain([5, -1]).range([700, 50]);
			var yScale = d3.scale.linear().domain([-1, 1]).range([700, 50]);

			// 缩放事件
			var zoom = d3.behavior.zoom().scaleExtent([1, 3]).on("zoom", zoomed);
			vis.call(zoom);
			// y axis
			var yAxis = d3.svg.axis().orient("left") // 控制刻度值显示位置left||right
			.ticks(10).scale(yScale);

			// x axis
			var xAxis = d3.svg.axis().orient("bottom").ticks(10).scale(xScale);

			var xAxisPlot = vis.append("g").attr("class", "axis axis--x")
			// 这里可以控制坐标轴的对齐，需要按照比例来做
			// 控制坐标系的偏移位置就可以了，这里影响参数主要是分段数量和范围的大小，
			// 因此svg所占的空间的位置需要设置为变量，包括宽高和边距
			.attr("transform", "translate(0," + 750 / 2 + ")").call(xAxis) //.tickSize(-height, 0));

			.append("text").text("Price($)").attr("transform", "rotate(0)").attr("text-anchor", "start").attr("dy", "3em").attr("dx", "2em");

			var yAxisPlot = vis.append("g").attr("class", "axis axis--y").attr("transform", "translate(" + (650 / 6 + 50) + ",0)").call(yAxis) //.tickSize(-width, 0));
			// 下边一堆都是用来添加坐标轴名称的
			.append("text").text("Price($)").attr("transform", "rotate(0)").attr("text-anchor", "end").attr("dy", "3em").attr("dx", "2em");

			// 处理点的操作
			var data = d3.range(100).map(function (d) {
				return {
					x: Math.random() > 0.8 ? Math.random() * -1 : Math.random() * 6 - 1,
					y: Math.random() > 0.5 ? Math.random() * -1 : Math.random()
				};
			});

			vis.selectAll(".point").data(data).enter().append("circle")
			// # selection.classed(name[, value]) 这个操作是用来设置class属性值得便捷程序。
			.attr("class", "point").attr("r", 10)
			// # selection.style(name[, value[, priority]])
			.style({ "fill": "yellow" }).attr("cx", function (d) {
				return xScale(d.x);
			}).attr("cy", function (d) {
				return yScale(d.y);
			});

			// 		//监听鼠标事件  
			// 		vis.selectAll(".point") 

			// 		    .on("click",function(d,i){ 
			// 		    	console.log("click"); 
			// 		        d3.select(this)  
			// 		            .style("fill","green")
			// 		      //       .append("div")
			//     				// .text('click');

			// 		    })  
			// 		    .on("mouseover",function(d,i){  
			// 		    	console.log("mouseover"); 

			// 		        d3.select(this)  
			// 		            .style("fill","blue")

			// // 新添加一个圆环在原来的位置
			// // .enter()
			// // .append("circle")
			// // .attr("cx",function(d){
			// // return xScale(d.x);
			// // })
			// // .attr("cy", function(d){
			// // return yScale(d.y);
			// // })
			// // .attr("r", 15)
			// // .attr("fill","black");

			// 		    })  
			// 		    .on("mouseout",function(d,i){  
			// 		    	console.log("mouseout"); 

			// 		        d3.select(this)  
			// 		            .transition()  
			// 		            .duration(500)  
			// 		            // .style("border","10px solid #500");
			// 		            .style("fill","red");  
			// 		    });  

			// 缩放事件


			function zoomed() {
				console.log(d3.event);
				// d3.selectAll('.axis--x').attr("transform", 
				// 	"scale(" + d3.event.scale + ")");
				vis.attr("transform", "scale(" + d3.event.scale + ")");
				var scale = 750 * d3.event.scale;
				console.log(scale);

				vis.attr({ 'width': scale, 'height': scale });
				// vis.attr({'width': scale, 'height': scale})

				// d3.select('.axis--x').attr("transform", "translate(" + (scale / 6 + 50) + ",0)")
			}
		},
		// 绘制纵横坐标

		// 绘制散点，多种类型
		drawPoints: function drawPoints() {
			var vis = this.vis;
		},
		// 提示信息添加

		// 上浮显示提示信息
		// 拖动

		// 缩放
		init: function init() {
			this.setContainer();
			this.drawPoints();
		}
	};

	// 配置参数
	var chartOption = {
		width: 1000,
		height: 400

	};

	// 实例化对象
	var chart = new Coordinate('d3Chart', chartOption).init();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYW5nZXMtaW4tcHJpY2VzLWFuZC1wb3NpdGlvbnMuanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwiY29uc29sZSIsImxvZyIsIkNvb3JkaW5hdGUiLCJjb250YWluZXIiLCJwYXJhbXMiLCJ2aXMiLCJkMyIsInNlbGVjdCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwiZXh0ZW5kUGFyYW1zIiwiT2JqZWN0IiwiYXNzaWduIiwic2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiYXR0ciIsInhTY2FsZSIsInNjYWxlIiwibGluZWFyIiwiZG9tYWluIiwicmFuZ2UiLCJ5U2NhbGUiLCJ6b29tIiwiYmVoYXZpb3IiLCJzY2FsZUV4dGVudCIsIm9uIiwiem9vbWVkIiwiY2FsbCIsInlBeGlzIiwic3ZnIiwiYXhpcyIsIm9yaWVudCIsInRpY2tzIiwieEF4aXMiLCJ4QXhpc1Bsb3QiLCJ0ZXh0IiwieUF4aXNQbG90IiwiZGF0YSIsIm1hcCIsImQiLCJ4IiwiTWF0aCIsInJhbmRvbSIsInkiLCJzZWxlY3RBbGwiLCJlbnRlciIsInN0eWxlIiwiZXZlbnQiLCJkcmF3UG9pbnRzIiwiaW5pdCIsImNoYXJ0T3B0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJjaGFydCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTs7QUFFQUEsT0FBT0MsTUFBUCxHQUFnQixZQUFVO0FBQ3pCQyxTQUFRQyxHQUFSLENBQVksaUJBQVosRUFBOEIsS0FBOUI7O0FBRUEsVUFBU0MsVUFBVCxDQUFvQkMsU0FBcEIsRUFBK0JDLE1BQS9CLEVBQXVDO0FBQ3RDLE9BQUtDLEdBQUwsR0FBV0MsR0FBR0MsTUFBSCxPQUFjSixTQUFkLENBQVg7QUFDQSxPQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFPLElBQVA7QUFDQTs7QUFFREYsWUFBV00sU0FBWCxHQUF1Qjs7QUFFdEJDLGVBQWFQLFVBRlM7O0FBSXRCUSxnQkFBYyxzQkFBU04sTUFBVCxFQUFnQjtBQUM3QjtBQUNBTyxV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R0FBR3lDLEtBQUgsQ0FBUzlCLEtBQTNCO0FBQ0FqQixZQUFRQyxHQUFSLENBQVlnQixLQUFaOztBQUVBWixRQUFJVSxJQUFKLENBQVMsRUFBQyxTQUFTRSxLQUFWLEVBQWlCLFVBQVVBLEtBQTNCLEVBQVQ7QUFDQTs7QUFFQTtBQUVBO0FBQ0QsR0EvSnNCO0FBZ0t0Qjs7QUFFQTtBQUNBK0IsY0FBWSxzQkFBVTtBQUNyQixPQUFJM0MsTUFBTSxLQUFLQSxHQUFmO0FBQ0EsR0FyS3FCO0FBc0t0Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E0QyxRQUFNLGdCQUFVO0FBQ2YsUUFBS3BDLFlBQUw7QUFDQSxRQUFLbUMsVUFBTDtBQUNBO0FBL0txQixFQUF2Qjs7QUFvTEE7QUFDQSxLQUFJRSxjQUFjO0FBQ2pCQyxTQUFPLElBRFU7QUFFakJDLFVBQVE7O0FBRlMsRUFBbEI7O0FBTUE7QUFDQSxLQUFJQyxRQUFRLElBQUluRCxVQUFKLENBQWUsU0FBZixFQUEwQmdELFdBQTFCLEVBQXVDRCxJQUF2QyxFQUFaO0FBQ0EsQ0F0TUQiLCJmaWxlIjoiY2hhbmdlcy1pbi1wcmljZXMtYW5kLXBvc2l0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJzcmMifQ==
