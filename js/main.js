var count = 0;
var rollNum = 0;
var playState = true;

var imgAlt,	// gallery 이미지의 alt 값 반환
	imgLen,	// gallery 이미지의 alt 값의 length 반환
	imgNum,	// gallery 이미지의 alt 값의 length의 뒷 번호 num으로 반환
	modalImg,	// click된 이미지의 modal 이미지의 부모자 선택
	modalNavImg,	//click된 이미지의 modal nav 이미지의 부모자 선택
	rollOn;	// main rolling image setInterval 합수 변수

$(function(){
	// rollingOn();
	//------------------------------------------------------------------
	//-------------------- jeep main page jquery -----------------------
	//------------------------------------------------------------------
	$(".prev_btn").click(function(e){
		e.preventDefault();
		if(rollNum >= 0){
			rollNum--;
			if(rollNum == -1) rollNum = 8;
			 rollingMove();
		};
	});
	$(".next_btn").click(function(e){
		e.preventDefault();
		if(rollNum <= 9){
			rollNum++;
			if(rollNum == 9) rollNum = 0;
			 rollingMove();
		};
	});
	$(".stop_play_btn").click(function(e){
		e.preventDefault();
		if(playState == true){
			clearInterval(rollOn);
			playState = false;
		}else{
			rollingOn();
			playState = true;
		}
		
	});

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

	
	// main functions---------------------

	function rollingMove(){  
		var x = (rollNum * 100 * -1)+"vw";
		$(".rolling_bg>ul").animate({left:x},1000);
	};

	function rollingOn(){
		rollOn = setInterval(function(){
			$(".next_btn").trigger("click")
		},6000);
	};
});