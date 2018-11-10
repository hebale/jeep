var count = 0;
var imgAlt,	// gallery 이미지의 alt 값 반환
	imgLen,	// gallery 이미지의 alt 값의 length 반환
	imgNum,	// gallery 이미지의 alt 값의 length의 뒷 번호 num으로 반환
	modalImg,	// click된 이미지의 modal 이미지의 부모자 선택
	modalNavImg,	//click된 이미지의 modal nav 이미지의 부모자 선택
	// mainpage 변수
	rollOn,	// main rolling image setInterval 합수 변수
	rollNext, //main rolling next 인덱스 값
	rollPrev, //main rolling prev 인덱스 값
	rollCurInd; //main rolling 현제 인덱스 값
var toggleState = true; //mainpage toggle state 값
var rollNum = 0; //main rolling 현재 인덱스 초기값
var playState = true; //main rolling stop버튼 상태값
var rollInd = 1; //main rolling z-인덱스 초기값

var subMenuState = true;
var rollz = 0;


$(function(){
	//------------------------------------------------------------------
	//-------------------- jeep gnb menu jquery ------------------------
	//------------------------------------------------------------------
	$("#gnb>ul>li").click(function(e){
		if($(this).index() == 1){
			e.preventDefault();
			if(subMenuState == true){
				$("#subMenu").stop().animate({height:135},600);
				subMenuState = false;
			}else{
				$("#subMenu").stop().animate({height:0},600);
				subMenuState = true;
			}
		}
	})
	//------------------------------------------------------------------
	//-------------------- jeep main page jquery -----------------------
	//------------------------------------------------------------------
	var liSel = $(".rolling_bg>ul>li");
	var liLen = liSel.length;
	
	rollingOn();  //page 로드시 이미지 롤링 스타트

	liSel.eq(0).css("display","block");

	$(".prev_btn").click(function(e){
		e.preventDefault();
		if(rollNum >= 0){
			rollPrev = rollNum -1;
			if(rollPrev == -1) rollPrev = liLen -1;
				rollInd++;
				liSel.eq(rollPrev).css({left:liSel.width()*-1,zIndex : rollInd, display:"block"});
				liSel.eq(rollPrev).stop().animate({left:0},2500,"easeInOutCubic");
				rollNum = rollPrev;
		};
	});

	$(".next_btn").click(function(e){
		e.preventDefault();
		if(rollNum <= liLen-1){
			rollNext = rollNum +1;
			if(rollNext == liLen) rollNext = 0;
				rollInd++;
				liSel.eq(rollNext).css({left:liSel.width(),zIndex : rollInd, display:"block"});
				liSel.eq(rollNext).stop().animate({left:0},2500,"easeInOutCubic");
				rollNum = rollNext;
		};
	});

	$(".stop_btn").click(function(e){
		e.preventDefault();
		if(playState == true){
			clearInterval(rollOn);
			$(".stop_btn>a").html("<i class='fas fa-play'></i>");
			playState = false;
		}else{
			rollingOn();
			$(".stop_btn>a").html("<i class='fas fa-stop'></i>");	
			playState = true;
		}
		
	});
	$("#toggle_btn").click(function(){
		if(toggleState == true){
			$(".toggle").addClass("on");
			$("#gnb").stop().animate({right:0},600);
			toggleState = false;
		
		}else if(toggleState == false){
			$(".toggle").removeClass("on");
			$("#gnb").stop().animate({right:-300},600);
			toggleState = true;
		};
	})

	//------------------------------------------------------------------
	//-------------------- jeep history page jquery --------------------
	//------------------------------------------------------------------
	$(window).scroll(function(){
		
		var scrollL = $("html,body").scrollTop();

		console.log(scrollL);

		$("#model_wrap").stop().animate({left:-1*scrollL},500);
		$("#history_wrap").stop().animate({left:-1*scrollL},500);

	})
	/*$(".contents_wrap").on("mousewheel DOMMouseScroll", function(e){
		var y = event.deltaY;
		rollz += parseInt(y);
		console.log(rollz);
		if(rollz <= 0) rollz = 0;
		if(rollz >= 9000) rollz = 9000;

		console.log(rollz);

		$(".contents_wrap").css("left", rollz *-1);

		$(".line").stop().animate({width: rollz *5},500);
	})*/
	//------------------------------------------------------------------
	//-------------------- jeep models page jquery -----------------------
	//------------------------------------------------------------------
	selNavInit();
	colorsetInit();
	modalsSt(); // -----------------------modals 페이지 onload 함수

	$("#botNav>ul>li>a").click(function(){
		var subNavWid = $(this).width();
		var subNavOffLeft = $(this).offset().left - $("#botNav>ul>li:nth-child(1)>a").offset().left;

		$("#botNav>ul>li").removeClass("on");
		$(this).parent().addClass("on");
		$(".selNavTri").stop().animate({left:subNavOffLeft+(subNavWid /2)-5},600,"easeOutBack");
		$(".selNav").stop().animate({width:subNavWid, left:subNavOffLeft},600,"easeOutBack");
	})

	$(".car_tabs>li").click(function(){
		var ind = $(this).index();
		var curH = 0;
		var selDiv = $(".car_set").find(".on").index();
	
		if(ind == selDiv) return false;

		$(".car_set>div").removeClass("on");
		$(".car_set>div").eq(ind).addClass("on");		
		$(".car_set>div").css("display","none");
		$(".car_set>div").eq(ind).css("display","block");

		curH = $(".car_set>div").eq(ind).find("div:nth-of-type(2)").height();
		$(".car_set>div").eq(ind).find("div:nth-of-type(1)").css("left",0);
		$(".car_set>div").eq(ind).find("div:nth-of-type(1)").stop().animate({left:100},600);
		$(".car_set>div").eq(ind).find("div:nth-of-type(2)").css({height:0, paddingTop:0, paddingBottom:0});
		$(".car_set>div").eq(ind).find("div:nth-of-type(2)").stop().animate({height:curH,paddingTop:25,paddingBottom:25},1000,"easeOutElastic");
	})
	function modalsSt(){                  
		$(".car_set>div").removeClass("on");
		$(".car_set>div").eq(0).addClass("on");		
		$(".car_set>div").eq(0).css("display","block");

		var curH = $(".car_set>div").eq(0).find("div:nth-of-type(2)").height();
		$(".car_set>div").eq(0).find("div:nth-of-type(1)").css("left",0);
		$(".car_set>div").eq(0).find("div:nth-of-type(1)").delay(200).animate({left:100},600);
		$(".car_set>div").eq(0).find("div:nth-of-type(2)").css({height:0, paddingTop:0, paddingBottom:0});
		$(".car_set>div").eq(0).find("div:nth-of-type(2)").delay(200).animate({height:curH,paddingTop:25,paddingBottom:25},1000,"easeOutElastic");
	}
	function selNavInit(){
		var subNavInit = $("#botNav>ul>li:nth-child(1)>a").width();
		$(".selNavTri").css("left",(subNavInit /2)-5);
		$(".selNav").css("width",subNavInit);
	}
	function colorsetInit(){
		var colorSetLen = $(".car_color").length;
		for(var i=0; i<colorSetLen; i++){
			$(".car_color").eq(i).css("margin-left",-1*$(".car_color").eq(i).width() / 2);
		}
	}
	//------------------------------------------------------------------
	//-------------------- jeep gallery page jquery --------------------
	//------------------------------------------------------------------
	$(".thumb_right_btn").click(function(){
		if(count <= 1){
			count++;
			if(count == 2) count = 0;
			thumbMove();
		}
	});
	
	$(".thumb_left_btn").click(function(){
		if(count >= 0){
			count--;
			if(count == -1) count = 1;
			thumbMove();
		}
	});

	$(".thumb_nav>li").click(function(e){
		e.preventDefault();
		$(".thumb_left_btn").css("display","none");
		$(".thumb_right_btn").css("display","none");

		imgAlt = $(this).find("img").attr("alt");
		imgLen = imgAlt.length;
		imgNum = parseInt(imgAlt.substr(imgLen-2,2));
		modalImg = $(".modal_photo").find("[alt =" + imgAlt + "]").parent();
		modalNavImg = $(".modal_nav").find("[alt =" + imgAlt + "]").parents("li");
		
		//console.log(imgNum);
		//console.log(imgAlt);
		
		$("#modal").css("display","block");

		$(".modal_photo>div").css("display","none");
		modalImg.css("display","block");
		
		$(".modal_nav>ul>li").removeClass();
		modalNavImg.addClass("on");

		$(".modal_nav>ul").stop().animate({left: 720+ (imgNum * 240 * -1)})
	});

	$(".modal_nav>ul>li").click(function(){

		imgAlt = $(this).find("img").attr("alt");
		imgLen = imgAlt.length;
		imgNum = parseInt(imgAlt.substr(imgLen-2,2));
		modalImg = $(".modal_photo").find("[alt =" + imgAlt + "]").parent();
		modalNavImg = $(".modal_nav").find("[alt =" + imgAlt + "]").parents("li");

		$(".modal_photo>div").css("display","none");
		modalImg.css("display","block");

		$(".modal_nav>ul>li").removeClass();
		modalNavImg.addClass("on");

		$(".modal_nav>ul").stop().animate({left: 720+ (imgNum * 240 * -1)})
	})

	// 
	// parseInt("03"); 이미지 alt 순번 리스트 num로 가져오기

	$("button").click(function(){
			$("#modal").css("display","none");

			$(".thumb_left_btn").css("display","block");
			$(".thumb_right_btn").css("display","block");
	})



	function thumbMove(){
		var x = count * 1200 * -1;
		$("#view_point>div").stop().animate({left:x},500);
	};

	
	// main rolling function()---------------------

	function rollingOn(){
		rollOn = setInterval(function(){
			$(".next_btn").trigger("click")
		},6500);
	};

	
});
// $("html,body").mousewheel(function(event, delta) {

// 	this.scrollLeft -= (delta * 30);

// 	event.preventDefault();
// 	});