"use strict";$(function(){function t(t,e){return this.container=d3.select(t),this.params=e,this.svg={},this.wrap={},this.store={},this}function e(t,e){var a=echarts.init(document.getElementById(t)),r={color:["#1d9bff","f00"],tooltip:{show:!0,trigger:"axis"},grid:{borderWidth:0,container:!1,top:"30px",left:"80px",right:"30px",bottom:"100px"},xAxis:{type:"category",data:e.name,nameTextStyle:{color:"#333"},axisLine:{onZero:!0,lineStyle:{color:"#797979"}},axisTick:{length:3,lineStyle:{color:"#797979"},alignWithLabel:!0},axisLabel:{margin:15,interval:0,textStyle:{color:"#dbdbd"},rotate:45},boundaryGap:!0},yAxis:{type:"value",scale:!0,nameTextStyle:{color:"#333"},splitNumber:10,axisLine:{lineStyle:{color:"#797979"}},axisTick:{length:3,lineStyle:{color:"#797979"}},axisLabel:{textStyle:{color:"#797979"}},splitLine:{show:!1}},series:[{name:"成交量(万)",type:"bar",data:e.data3,itemStyle:{normal:{color:function(t){return t.value>=0?"#c23531":"#4bb1a6"}}},barWidth:"16"}]};console.log(r),a.setOption(r)}var a=Mock.mock({"data|4":[{"list|20-30":[{"x|-20-50.1-10":50,"y|-20-30.1-10":30,name:"@cname",jc:"@string","zdf|1-100.2":100,"zcb|1-200.2":200,"q5|5000-10000":1e4,"q10|2000-5000":5e3,"q20|1000-2000":2e3}],color:"@color",title:"@string"}]});t.prototype={constructor:t,init:function(){var t=this.params,e=this;return this.svg=this.container.append("svg:svg").attr("width",t.width).attr("height",t.height),this.wrap=this.svg.append("g").classed("zoom-drag-wrap",!0),this.getData(function(t){e.extend({data:t}),e.renderScale().drawCoordinate().drawCircle().bindZoom().bindMouseOver().drawLegend().bindReset()}),this.extend({ns:{k:t.scale,x:.5*t.width,y:.5*t.height}}),this},extend:function(t){return Object.assign(this.store,t),this},getData:function(t){t(a)},renderScale:function(t){var e=this,a=this.params,r=this.store,i=void 0,n=void 0;t?(i=r.maxAndMin,n=t.k):(i=this.getMaxAndMin(),n=a.scale);var o=a.width*n,s=a.height*n,l=d3.scaleLinear().domain([i.xMax,i.xMin]).range([o-a.paddingHorizontal,a.paddingHorizontal]),c=d3.scaleLinear().domain([i.yMin,i.yMax]).range([s-a.paddingVertical,a.paddingVertical]),d=d3.axisBottom(l).ticks(a.ticks),h=d3.axisLeft(c).ticks(a.ticks),p=i.yMax/(i.yMax-i.yMin)*(s-2*a.paddingVertical)+a.paddingVertical,x=-i.xMin/(i.xMax-i.xMin)*(o-2*a.paddingHorizontal)+a.paddingHorizontal,y=o-a.paddingHorizontal;return e.extend({renderScale:{xScale:l,yScale:c,xAxis:d,yAxis:h,xOffset:p,yOffset:x,right:y}}),this},drawCoordinate:function(){this.params;var t=this,e=this.store.renderScale;t.wrap.append("g").attr("class","axis axis-x").attr("transform","translate(0,"+e.xOffset+")").call(e.xAxis).append("text").text("涨跌幅%").attr("text-anchor","start").attr("dy","3em").attr("dx","3em");d3.select(".axis-x").append("path").attr("d","M0,0L0,7L7,0L0,-7L0,0").style("stroke-width",0).classed("arrow",!0).attr("transform","translate("+e.right+", 0)");t.wrap.append("g").attr("class","axis axis-y").attr("transform","translate("+e.yOffset+", 0)").call(e.yAxis).append("text").text("增仓率%").attr("text-anchor","end").attr("dy","3em").attr("dx","2em");return d3.select(".axis-y").append("path").attr("d","M0,14L7,7L14,14L0,14").style("stroke-width",0).attr("transform","translate(-7, 37)"),this},drawCircle:function(){function t(t,r,i){var n=e.wrap.append("g").classed("point-groups",!0).classed("type-"+i,!0).selectAll(".point").data(r).enter().append("g").classed("circle-title-point",!0);n.append("circle").classed("point",!0).attr("r",a.circleR).style("fill",t).style("stroke",t).style("stroke-opacity",.7).attr("cx",function(t){return s.xScale(t.x)}).attr("cy",function(t){return s.yScale(t.y)}).datum(function(t){return JSON.stringify(t)}),n.append("text").attr("transform",function(t){return"translate("+s.xScale(t.x)+", \n\t\t  \t\t\t\t"+(s.yScale(t.y)-a.circleR-a.circleStrokeWidth)+")"}).text(function(t){return t.name}).attr("text-anchor","middle").classed("name",!0).datum(function(t){return JSON.stringify({x:t.x,y:t.y})})}var e=this,a=this.params,r=this.store,i=this.store.data.data,n=void 0,o=void 0,s=r.renderScale;return i.forEach(function(e,a){n=e.color,o=e.list,t(n,o,a)}),this},zoomUpdateSvg:function(t){var e=this,a=(t.k,this.params),r=e.store.renderScale;e.wrap.selectAll(".point").each(function(){d3.select(this).attr("cx",function(t){var e=JSON.parse(d3.select(this).datum());return r.xScale(e.x)}).attr("cy",function(t){var e=JSON.parse(d3.select(this).datum());return r.yScale(e.y)})}),e.wrap.selectAll(".name").each(function(){d3.select(this).attr("transform",function(t){var e=JSON.parse(d3.select(this).datum());return"translate("+r.xScale(e.x)+", \n\t\t  \t\t\t\t"+(r.yScale(e.y)-a.circleR-a.circleStrokeWidth)+")"})});d3.select(".axis-x").call(r.xAxis).attr("transform","translate(0,"+r.xOffset+")").select(".arrow").attr("transform","translate("+r.right+", 0)"),d3.select(".axis-y").call(r.yAxis).attr("transform","translate("+r.yOffset+", 0)")},getMaxAndMin:function(){var t=this,e=[],a=[];t.store.data.data.forEach(function(t){t.list.forEach(function(t){e.push(t.x),a.push(t.y)})});var r={xMax:Math.max.apply(Math,e),xMin:Math.min.apply(Math,e),yMax:Math.max.apply(Math,a),yMin:Math.min.apply(Math,a)};return t.extend({maxAndMin:r}),r},bindZoom:function(){var t=this,e=(this.store,d3.zoom().scaleExtent([1,10]).on("zoom",function(){var e=d3.event.transform;t.wrap.attr("transform","translate("+e.x+", "+e.y+")"),t.changeZoomAndTransform(e)}));return t.svg.call(e).transition().duration(1500),this},changeZoomAndTransform:function(t){var e=this;console.log("changeZoomAndTransform",t);var a=Object.assign({},e.store.ns,t);this.store.ns=a,e.renderScale(a).zoomUpdateSvg(a)},bindDrag:function(){this.wrap.call(d3.drag().on("drag",function(a){t=d3.event.x-d3.event.subject.x,e=d3.event.y-d3.event.subject.y}));var t=void 0,e=void 0;return this},bindMouseOver:function(){var t=this.params,e=void 0;return d3.selectAll(".point").on("mouseover",function(a,r){console.log(t);var i=$("body").width()>1200?.5*($("body").width()-1200):0;e=JSON.parse(d3.select(this).datum()),$("#tips").show(300).css({left:+d3.event.pageX-i+t.circleR+t.circleStrokeWidth,top:+d3.event.pageY-80}).find(".pzjc").text(e.jc).end().find(".zdf").text(e.zdf).end().find(".zcb").text(e.zcb).end().find(".q5").text(e.q5).end().find(".q10").text(e.q10).end().find(".q20").text(e.q20),d3.select(this).attr("r",t.circleR).style("stroke-width",t.circleStrokeWidth)}).on("mouseout",function(e,a){d3.select(this).attr("r",t.circleR).style("stroke-width",0).transition().duration(300),$("#tips").hide(300)}),this},bindReset:function(){d3.zoomIdentity;return this},drawLegend:function(){var t=this.params,e=this.store.data.data,a=void 0,r=d3.select("#SvgChartRight").append("svg:svg").attr("width",t.rightWidth).attr("height",t.height).append("g").classed("legend-wrap",!0).attr("transform","translate(30, "+.3*t.height+")").selectAll(".legend").data(e).enter().append("g").classed("legend",!0).attr("width",150).attr("height",20).on("click",function(t,e){(a=d3.select(this)).classed("hide")?a.classed("hide",!1).select("circle").style("fill",function(t,e){return t.color}).call(function(){d3.select(".zoom-drag-wrap").select(".type-"+e).style("display","block")},t,e):a.classed("hide",!0).select("circle").style("fill","grey").call(function(){d3.select(".zoom-drag-wrap").select(".type-"+e).style("display","none")},t,e)}).attr("cursor","pointer");return r.append("circle").style("fill",function(t){return t.color}).attr("r",t.circleR).attr("cx",function(t,e){return 10}).attr("cy",function(t,e){return 30*(e+1)-1}),r.append("text").text(function(t){return t.title}).attr("transform","rotate(0)").attr("text-anchor","start").attr("x",30).attr("y",function(t,e){return 30*(e+1)+3}).attr("font-family","sans-serif").attr("font-size","11px"),this}};var r=new t("#SvgChartLeft",{width:1e3,height:460,paddingHorizontal:50,paddingVertical:50,scale:1,ticks:10,circleR:10,circleStrokeWidth:8,rightWidth:200}).init();console.log(r),$(".hide").click(function(t){var e=$(this);e.toggleClass("show"),e.hasClass("show")?d3.selectAll(".name").style("display","none"):d3.selectAll(".name").style("display","block")}),$(".reset").click(function(t){$("#SvgChartLeft").html(""),$("#SvgChartRight").html(""),r.init()});var i=Mock.mock({"data1|20":["@natural(3000, 10000)"],"data2|20":["@natural(60000, 100000)"],"date|20":['@date("yyyy/MM/dd")'],"name|20":["@name"],"data3|20":["@natural(-60000, 100000)"]});!function(t,e){var a=echarts.init(document.getElementById(t)),r={color:["#1d9bff"],tooltip:{show:!0,trigger:"axis"},legend:{data:["成交量(万)","持仓量(万)"],bottom:"10px",textStyle:{color:"#18529e"},width:"100%",left:"80px"},grid:{borderWidth:0,container:!1,top:"30px",left:"80px",right:"30px",bottom:"100px"},xAxis:{type:"category",data:e.date,nameTextStyle:{color:"#333"},axisLine:{onZero:!1,lineStyle:{color:"#797979"}},axisTick:{length:3,lineStyle:{color:"#797979"},alignWithLabel:!0},axisLabel:{margin:15,interval:0,textStyle:{color:"#dbdbd"},rotate:45},boundaryGap:!0},yAxis:{type:"value",name:"(万)手",scale:!0,nameTextStyle:{color:"#333"},splitNumber:10,axisLine:{lineStyle:{color:"#797979"}},axisTick:{length:3,lineStyle:{color:"#797979"}},axisLabel:{textStyle:{color:"#797979"}},splitLine:{show:!1}},series:[{name:"成交量(万)",type:"bar",data:e.data1,itemStyle:{normal:{color:"#c23531"}},barWidth:"16"},{name:"持仓量(万)",type:"line",data:e.data2,itemStyle:{normal:{color:"#2f4554"}}}]};a.setOption(r)}("Echarts2",i),function(t,e){var a=echarts.init(document.getElementById(t)),r={color:["#1d9bff"],tooltip:{show:!0,trigger:"axis"},grid:{borderWidth:0,container:!1,top:"30px",left:"80px",right:"30px",bottom:"100px"},xAxis:{type:"category",data:e.name,nameTextStyle:{color:"#333"},axisLine:{onZero:!1,lineStyle:{color:"#797979"}},axisTick:{length:3,lineStyle:{color:"#797979"},alignWithLabel:!0},axisLabel:{margin:15,interval:0,textStyle:{color:"#dbdbd"},rotate:45},boundaryGap:!0},yAxis:{type:"log",scale:!0,nameTextStyle:{color:"#333"},axisLine:{lineStyle:{color:"#797979"}},axisTick:{length:3,lineStyle:{color:"#797979"}},axisLabel:{textStyle:{color:"#797979"}},splitLine:{show:!1}},series:[{name:"成交量(万)",type:"bar",data:e.data1,itemStyle:{normal:{color:"#c23531"}},barWidth:"16"}]};a.setOption(r)}("Echarts3",i),e("Echarts4",i),e("Echarts5",i)}),$.get("/thsft/iFindService/Realty/industry-overview/get-map-data",function(t){console.log(t.data)},"json");