// "use strict";

// // changes-in-prices-and-positions.js 
// // 用于具体的操作的处理

// window.onload = function(){
// 	console.log('window.onload: ','yes');

// 	function Coordinate(container, params) {
// 		this.vis = d3.select(`#${container}`);
// 		this.params = params;
// 		return this;
// 	}

// 	Coordinate.prototype = {

// 		constructor: Coordinate,

// 		extendParams: function(params){
// 			// Object.assign(target, ...sources)
// 			Object.assign(this.params, params);
// 			return this;
// 		},
// 		// 设置图例的大小位置
// 		setContainer: function setContainer() {

// 		var vis = d3.select("#d3Chart")
// 		    .append("svg:svg")
// 			.attr("width", 750)
// 			.attr("height", 750)
// 			.attr("viewBox", "0 0 750 750")


// 			// 控制显示的范围，如下表示，坐标x轴显示-1 到 5 显示的区域是从 50 到 730
//     var xScale = d3.scale.linear().domain([5, -1]).range([700, 50]);
//     var yScale = d3.scale.linear().domain([-1, 1]).range([700, 50]);

// // 缩放事件
// var zoom = d3.behavior.zoom()
// 			.scaleExtent([1, 3])
// 			.on("zoom", zoomed);
// vis.call(zoom)
//     // y axis
//     var yAxis = d3.svg.axis()
//       .orient("left") // 控制刻度值显示位置left||right
//       .ticks(10)      
//       .scale(yScale);

//     // x axis
//     var xAxis = d3.svg.axis()
//       .orient("bottom")
//       .ticks(10)
//       .scale(xScale);			

//     var xAxisPlot = vis.append("g")

//       .attr("class", "axis axis--x")      
//       // 这里可以控制坐标轴的对齐，需要按照比例来做
//       // 控制坐标系的偏移位置就可以了，这里影响参数主要是分段数量和范围的大小，
//       // 因此svg所占的空间的位置需要设置为变量，包括宽高和边距
//       .attr("transform", "translate(0," + (750 / 2) + ")")
//       .call(xAxis) //.tickSize(-height, 0));
      
//       .append("text")  
//       .text("Price($)")  
//       .attr("transform","rotate(0)")  
//       .attr("text-anchor","start")  
//       .attr("dy","3em") 
//       .attr("dx","2em") 


//     var yAxisPlot = vis.append("g")
//       .attr("class", "axis axis--y")
//       .attr("transform", "translate(" + (650 / 6 + 50) + ",0)")
//       .call(yAxis) //.tickSize(-width, 0));
//       // 下边一堆都是用来添加坐标轴名称的
//       .append("text")  
//       .text("Price($)")  
//       .attr("transform","rotate(0)")  
//       .attr("text-anchor","end")  
//       .attr("dy","3em") 
//       .attr("dx","2em")



//     // 处理点的操作
// 	    var data = d3.range(100).map(function(d){
// 	      return {
// 	       x: Math.random() > 0.8 ? Math.random() * -1 : Math.random() * 6 -1,
// 	       y: Math.random() > 0.5 ? Math.random() * -1 : Math.random()
// 	      };
// 	    });
	    
// 	    vis.selectAll(".point")
// 	      .data(data)
// 	      .enter()


// 	      .append("circle")
// 	      // # selection.classed(name[, value]) 这个操作是用来设置class属性值得便捷程序。
// 	      .attr("class", "point")
// 	      .attr("r", 10)
// 	      // # selection.style(name[, value[, priority]])
// 	      .style({"fill": "yellow"})
// 	      .attr("cx", function(d){
// 	        return xScale(d.x);
// 	      })
// 	      .attr("cy", function(d){
// 	        return yScale(d.y);
// 	      })




// // 		//监听鼠标事件  
// // 		vis.selectAll(".point") 

// // 		    .on("click",function(d,i){ 
// // 		    	console.log("click"); 
// // 		        d3.select(this)  
// // 		            .style("fill","green")
// // 		      //       .append("div")
// //     				// .text('click');
  					  
// // 		    })  
// // 		    .on("mouseover",function(d,i){  
// // 		    	console.log("mouseover"); 

// // 		        d3.select(this)  
// // 		            .style("fill","blue")

// // // 新添加一个圆环在原来的位置
// // // .enter()
// // // .append("circle")
// // // .attr("cx",function(d){
// // // return xScale(d.x);
// // // })
// // // .attr("cy", function(d){
// // // return yScale(d.y);
// // // })
// // // .attr("r", 15)
// // // .attr("fill","black");

// // 		    })  
// // 		    .on("mouseout",function(d,i){  
// // 		    	console.log("mouseout"); 

// // 		        d3.select(this)  
// // 		            .transition()  
// // 		            .duration(500)  
// // 		            // .style("border","10px solid #500");
// // 		            .style("fill","red");  
// // 		    });  

// // 缩放事件

		


// 		function zoomed() {
// 			console.log(d3.event)
// 			// d3.selectAll('.axis--x').attr("transform", 
// 			// 	"scale(" + d3.event.scale + ")");
// 			vis.attr("transform", "scale(" + d3.event.scale + ")");
// 			var scale = 750 * d3.event.scale;
// 			console.log(scale)

// 			vis.attr({'width': scale, 'height': scale})
// 			// vis.attr({'width': scale, 'height': scale})

// 			// d3.select('.axis--x').attr("transform", "translate(" + (scale / 6 + 50) + ",0)")

// 		}
// 	},
// 		// 绘制纵横坐标

// 		// 绘制散点，多种类型
// 		drawPoints: function(){
// 			let vis = this.vis;
// 		},
// 		// 提示信息添加

// 		// 上浮显示提示信息
// 		// 拖动

// 		// 缩放
// 		init: function(){
// 			this.setContainer();
// 			this.drawPoints();
// 		}
// 	};



// 	// 配置参数
// 	let chartOption = {
// 		width: 1000,
// 		height: 400,

// 	};

// 	// 实例化对象
// 	let chart = new Coordinate('d3Chart', chartOption).init();
// }



let config = {
	container: '#d3Chart',
	width: 750,
	height: 750,
	padding: 50,
}


// 设置svg图的宽高，以及获取svg对象
var vis = d3.select(config.container)
    .append("svg:svg")
	.attr("width", config.width)
	.attr("height", config.height)


// 绘制比例尺
// 控制显示的范围，如下表示，坐标x轴显示-1 到 5 显示的区域是从 50 到 730
var xScale = d3.scale.linear().domain([5, -1]).range([config.width - config.padding, config.padding]);
var yScale = d3.scale.linear().domain([-1, 1]).range([config.width - config.padding, config.padding]);

// x axis
var xAxis = d3.svg.axis()
	.orient("bottom")
	.ticks(10)
	.scale(xScale);	

// y axis
var yAxis = d3.svg.axis()
	.orient("left") // 控制刻度值显示位置left||right
	.ticks(10)      
	.scale(yScale);

		

var xAxisPlot = vis.append("g")
	.attr("class", "axis axis--x")      
	// 这里可以控制坐标轴的对齐，需要按照比例来做
	// 控制坐标系的偏移位置就可以了，这里影响参数主要是分段数量和范围的大小，
	// 因此svg所占的空间的位置需要设置为变量，包括宽高和边距
	.attr("transform", "translate(0," + (config.width / 2) + ")")
	.call(xAxis)

	.append("text")  
	.text("增仓率%")  
	.attr("transform","rotate(0)")  
	.attr("text-anchor","start")  
	.attr("dy","3em") 
	.attr("dx","2em") 


var yAxisPlot = vis.append("g")
	.attr("class", "axis axis--y")
	.attr("transform", "translate(" + (config.width - 2 * config.padding / 6 + config.padding) + ",0)")
	.call(yAxis) //.tickSize(-width, 0));
	// 下边一堆都是用来添加坐标轴名称的
	.append("text")  
	.text("涨跌幅%")  
	.attr("transform","rotate(0)")  
	.attr("text-anchor","end")  
	.attr("dy","3em") 
	.attr("dx","2em")