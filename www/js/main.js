$(document).ready(function(){
	var hatch = hatachFly();
	var wHeight = $(window).height();
	var wWidth = $(window).width();
	var vPositionRatio = 0.60790273556231;
	var vPosition = vPositionRatio * wHeight;
	$("body").css("height", wHeight);
	
	polygonPosition(vPosition, wHeight, wWidth);

	$( window ).resize(function() {
		var wHeight = $(window).height();
		var wWidth = $(window).width();
		var vPositionRatio = 0.60790273556231;
		var vPosition = vPositionRatio * wHeight;		
		polygonPosition(vPosition, wHeight, wWidth);
	});
	fishRise(hatch);
	castLine();
	flyBox();
	menuActivated();
	move();
});

function menuActivated() {
	$(".home nav > li:first").click(function(){
		console.log("clicked");
		$(this).parent().toggleClass("expanded");
	});
}

function hatachFly() {
	var hatchArray = [];
	$(".dialog_fly_box ol li").each(function(){
		hatchArray.push($(this).children("span").text());
	});
	var hatch = hatchArray[Math.floor(Math.random() * hatchArray.length)];
	console.log("hatchArray "+hatch);
	return hatch;
}

function selectFly() {
	$(".dialog_fly_box ol li").click(function(){
		$(".dialog_fly_box ol li.active").removeClass("active");
		$(this).addClass("active");
		console.log("text "+$(this).text());
		$("nav li:last-of-type div span").text($(this).text());

	});
}

function move() {
	$(".move").click(function(){
		$(".dialog_locations").removeClass("disabled");
		$(".shadow_overlay").removeClass("disabled");
		$(".dialog_locations ol li").click(function(){
			$(".dialog_locations ol li").removeClass("active");
			$(this).addClass("active");
			var backgroundImg = $(this).attr("value");
			console.log("backgroundImg "+backgroundImg);
			document.body.style.backgroundImage="url('../../css/img/"+backgroundImg+"')";
			//$("body").attr("style", "background: transparent url(img/andamans"+backgroundImg+") no-repeat center center;");
			$(".dialog_locations").addClass("disabled");
			$(".shadow_overlay").addClass("disabled");	
			$("#flyline").replaceWith("<svg id='flyline'></svg>");		
		});
	});
}

function flyBox() {
	selectFly();
	$(".flybox").click(function(){
		$(".dialog_fly_box").removeClass("disabled");
		$(".shadow_overlay").removeClass("disabled");
		$(".continue").click(function(){
			$(".dialog_fly_box").addClass("disabled");
			$(".shadow_overlay").addClass("disabled");			
		});
	});
}

function castLine() {
	$("#fisharea").click(function(e){
		var wHeight = $(window).height();
		var wWidth = $(window).width();
		var vPositionRatio = 0.60790273556231;
		var vPosition = vPositionRatio * wHeight;		
		var orginPointX = $(window).width()/2;
		var orginPointY = $(window).height() - vPosition;
		var pHeight = wHeight - vPosition;	
		var dX = e.pageX;
		var dY = e.pageY - vPosition;
		var flyLine = '<svg id="flyline" height="'+pHeight+'" width="'+wWidth+'">'
  		+'<polyline points="'+orginPointX+','+orginPointY+' '+dX+','+dY+'"'
  		+'style="fill:none;stroke:black;stroke-width:3" />'
  		+'Sorry, your browser does not support inline SVG.</svg>';
  		$("#flyline").replaceWith(flyLine);
  		$("#flyline").css("top",vPosition);
	});
}

function fishRise(hatch) {
	if ($("body").hasClass("trip")) {
		setInterval(function(){
			//Math.floor(Math.random() * 6) + 1
			if ($("#flyline polyline").length > 0) {
				var flyX = $("#flyline polyline").attr("points").split(" ")[1].split(",")[0];
				var flyY = $("#flyline polyline").attr("points").split(" ")[1].split(",")[1];			
			} else {
				var flyX = 0;
				var flyY = 0;
			}
			var fishHatch = hatch;
			var wHeight = $(window).height();
			var wWidth = $(window).width();
			var vPositionRatio = 0.60790273556231;
			var vPosition = vPositionRatio * wHeight;		
			var fHorizontalPosition = Math.floor(Math.random() * wWidth) + 0 -100;
			//var fHorizontalPosition = 200;
			if (fHorizontalPosition < 10) {fHorizontalPosition = 10;}
			var fVerticalPosition = Math.floor(Math.random() * wHeight);
			//var fVerticalPosition = 500;
			if (fVerticalPosition < vPosition) {fVerticalPosition = vPosition + 10;}
			if (fVerticalPosition > wHeight) {fVerticalPosition = wHeight + -10;}
			$("div.fish").css("left", fHorizontalPosition+"px");
			$("div.fish").css("top", fVerticalPosition+"px");
			console.log("fish "+fHorizontalPosition+", "+fVerticalPosition);
			$("div.fish").show();
			//console.log("flyX > fHorizontalPosition "+flyX+" "+fHorizontalPosition);
			if ((flyX > fHorizontalPosition) && (flyX < fHorizontalPosition + 50)) {
				console.log("x coordinates match");
				if ((flyY > fVerticalPosition - vPosition) && (flyY < fVerticalPosition - vPosition + 50)) {
					console.log("fishHatch "+fishHatch);
					console.log("active fly "+$(".dialog_fly_box li.active").text());
					if ($(".dialog_fly_box li.active").text() === fishHatch) {				
						console.log("y matches");
						//alert("y matches!");
						$(".dialog_caught_fish").removeClass("disabled");
						$("#shadow_overlay").removeClass("disabled");					
						$(".continue").click(function(){
								$(".dialog_caught_fish").addClass("disabled");
								$("#shadow_overlay").addClass("disabled");						
								$("#flyline").replaceWith("<svg id='flyline'></svg>");
						});
					}
				}
			}

			setTimeout(function(){
				console.log("div.fish hide");
				$("div.fish").hide();
			}, 5000);
		}, 6000);
	}
}

function polygonPosition(vPosition, wHeight, wWidth) {
	var pHeight = wHeight - vPosition;
	
	var polygon = '<svg id="fisharea" height="'+pHeight+'" width="'+wWidth+'"><polygon points="0,0 '+wWidth+',0 '
	+wWidth+','+wHeight+' 0,'+wHeight
	+'" style="fill:transparent;" /></svg>';
	console.log("polygon "+polygon);
	$("#fisharea").replaceWith(polygon);
	$("#fisharea").css("top", vPosition);
}