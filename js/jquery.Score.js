/*
此插件基于Jquery
插件名：jquery.Score(评分插件)
开发者 似懂非懂
版本 2.0
Blog：www.xfei.com
*/
(function($){
	$.fn.Score = function(options){
        var opts = $.extend({}, $.fn.Score.defualts, options); 
		$.fn.setList($(this),opts); //调用列表设置
		var thisObj = $(this);
		$.fn.Score.defualtValue($(this),opts);//调用初始值
		//设置
		$("#maskBox").children().bind("click",function(){
			var subWidth = $(this).width();
			var indexValue = $("#maskBox > li").index($(this))+1;
			thisObj.val(indexValue);
			var maskWidth = subWidth*indexValue;
			$("#starBg").css({width:maskWidth});
		})
		
		//鼠标滑过
		$("#maskBox").children().bind("mousemove",function(){
			//alert($("#maskBox > li").index($(this)));
			var subWidth = $(this).width();
			var maskWidth = subWidth*($("#maskBox > li").index($(this))+1);
			$("#starBg").css({width:maskWidth});
		})
		//还原初始值
		$("#maskBox").children().bind("mouseout",function(){
			var subWidth = opts.showWidth;
			var maskWidth = subWidth*thisObj.val();
			$("#starBg").css({width:maskWidth});
		})
	}
	//plugin defaults
	$.fn.Score.defualts ={
		showWidth:20 , //默认显20，也可以手动设置数值
		showHeight:20 , //默认显20，也可以手动设置数值
		showBranch:5, //默认分数为5
		icoBefore:'images/30-30-off.gif', //点亮前的图片地址
		icoAfter:'images/30-30-on.gif' //点亮后的图片地址
	}
	
	//设置初始值
	$.fn.Score.defualtValue = function(thisObj,opts){
		var defaultVal = thisObj.val();
		if(defaultVal <= opts.showBranch){
			$("#starBg").css({width:defaultVal*opts.showWidth});//设置初始值
		}else if(defaultVal > opts.showBranch){
			thisObj.val(opts.showBranch);
			$("#starBg").css({width:opts.showBranch*opts.showWidth});//设置初始值
			alert("默认分数高于总分数！");
		}
		if(defaultVal == ""){
			thisObj.val(0);
			$("#starBg").css({width:thisObj.val()});//设置初始值
		}
	}
	
	//子插件：设置列表参数
	$.fn.setList = function(thisObj,opts){
		var showBranch= opts.showBranch;//获取分数
		var showWidth= opts.showWidth;//获取宽度
		var showHeight= opts.showHeight;//获取高度
		var icoBefore= opts.icoBefore;//点亮前的图片地址
		var icoAfter= opts.icoAfter;//点亮后的图片地址
		var liContent = "";
		var bgContent = "";
		for(i=1;i<=showBranch; i++){
			liContent = liContent+"<li title="+i+"分 style='width:"+showWidth+"px;height:"+showHeight+"px;'></li>";
		}
		var maskWidth = showWidth*showBranch;//计算总体宽度
		thisObj.after("<div class='scoreBox' id='scoreBox' style='width:"+maskWidth+"px;height:"+showHeight+"px;background:url("+icoBefore+") repeat-x;'><ul class='maskBox' id='maskBox' style='width:"+maskWidth+"px;height:"+showHeight+"px;'>"+liContent+"</ul><ul class='starBg' id='starBg' style='width:0px;height:"+showHeight+"px;overflow:hidden; background:url("+icoAfter+") repeat-x;'></ul/div>");
	}
})(jQuery);     