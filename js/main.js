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

var rollz = 0;


$(function(){
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

	
	$(".contents_wrap").on("mousewheel DOMMouseScroll", function(e){
		var y = event.deltaY;
		rollz += parseInt(y);
		console.log(rollz);
		if(rollz <= 0) rollz = 0;
		if(rollz >= 9000) rollz = 9000;

		console.log(rollz);

		$(".contents_wrap").css("left", rollz *-1);

		$(".line").stop().animate({width: rollz *5},500);
	})



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