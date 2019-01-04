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

var modalBgCount = 0; //모달 img위치 초기 설정
var sc = 0;

//------------------------------------------------------------------
//-------------------- window resize function ----------------------
//------------------------------------------------------------------
$(window).resize(function(){
	modalSize();
});

//------------------------------------------------------------------
//-------------------- window onload function ----------------------
//------------------------------------------------------------------
$(function(){
	var botNavW = $("#botNav").width();
	$("#botNav").css("left","calc( 50% - "+ botNavW / 2 +"px)"); 

	$(window).scrollTop(0);

	var docH = $(document).height(); //문서의 높이값
	var docW = $(document).width(); //문서의 넓이값
	var winH = $(window).height();
	var winW = $(window).width();
	//------------------------------------------------------------------
	//--------------------- unlink modal function ----------------------
	//------------------------------------------------------------------
	$("#error_modal>div>div>a:nth-of-type(2)").click(function(){
		$("#error_modal").fadeOut();
	})
	$("#subMenu>div:nth-of-type(2)").click(function(){
		$("#error_modal").fadeIn();
	})
	$("#subMenu>div:nth-of-type(3)").click(function(){
		$("#error_modal").fadeIn();
	})
	$("#subMenu>div:nth-of-type(4)").click(function(){
		$("#error_modal").fadeIn();
	})

	//------------------------------------------------------------------
	//-------------------- window scroll function ----------------------
	//------------------------------------------------------------------
	// var brandSc =  setInterval(function(){
	// 	sc+=1;
	// 	// var scp = sc + "px";
	// 	console.log(sc);
	// 	$("body,html").scrollTop(sc);
	// },50);

 	// brandSc;


	$(window).scroll(function(){		
		var scrollPos = $("html,body").scrollTop();
	//	console.log(scrollPos);

		//clearInterval(brandSc);
	//	if(scrollPos >= docH - winH) clearInterval(brandSc);
		//if(scrollPos > sc) clearInterval(brandSc);

		$("#model_wrap").stop().css({left:-1*scrollPos},300,"easeOutSine");
		$("#history_wrap").stop().css({left:-1*scrollPos},300,"easeOutSine");
		$("#spec_wrap").stop().css({left:100 -1*scrollPos},300,"easeOutSine");
	})

	//------------------------------------------------------------------
	//-------------------- jeep test btn jquery ------------------------
	//------------------------------------------------------------------
	$(".sub_title.brand>ul").delay(300).animate({marginTop:0},600,"easeOutSine");
	$(".sub_title.models>ul").delay(300).animate({marginTop:-30},600,"easeOutSine");
	$(".sub_title.spec>ul").delay(300).animate({marginTop:-60},600,"easeOutSine");
	$(".sub_title.gallery>ul").delay(300).animate({marginTop:-90},600,"easeOutSine");
	
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

	$("#model_body.wrangler").css("height",winW*3.5 - winH + 3000);

	carChaW();


	
	//-------------------- jeep models 기본설정값 -----------------------
	


	$("#botNav>ul>li>a").click(function(){
		var ind = $(this).parent().index();
		console.log(ind);
		var subNavWid = $(this).width();
		var subNavOffLeft = $(this).offset().left - $("#botNav>ul>li:nth-child(1)>a").offset().left;

		if(ind > 0){
			$("#botNav>ul>li").removeClass("on");
			$(this).parent().addClass("on");
			$(".selNavTri").stop().animate({left:subNavOffLeft+(subNavWid /2)-5},600,"easeOutBack");
			$(".selNav").stop().animate({width:subNavWid, left:subNavOffLeft},600,"easeOutBack",function(){
				$("#botNav>ul>li:nth-of-type(1)>a").trigger("click");
			});
		}else{
			$("#botNav>ul>li").removeClass("on");
			$(this).parent().addClass("on");
			$(".selNavTri").stop().animate({left:subNavOffLeft+(subNavWid /2)-5},600,"easeOutBack");
			$(".selNav").stop().animate({width:subNavWid, left:subNavOffLeft},600,"easeOutBack");
		}
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
		$(".car_tabs>li").removeClass();
		$(".car_tabs>li").eq(ind).addClass("on");

		curH = $(".car_set>div").eq(ind).find("div:nth-of-type(2)").height();
		$(".car_set>div").eq(ind).find("div:nth-of-type(1)").css("left",0);
		$(".car_set>div").eq(ind).find("div:nth-of-type(1)").stop().animate({left:100},600);
		$(".car_set>div").eq(ind).find("div:nth-of-type(2)").css({height:0, paddingTop:0, paddingBottom:0});
		$(".car_set>div").eq(ind).find("div:nth-of-type(2)").stop().animate({height:curH,paddingTop:25,paddingBottom:25},1000,"easeOutElastic");

		$(".wrangler_colors>li").css("display","none");
		$(".wrangler_colors>li>ul>li").css("opacity",0);
		$(".wrangler_colors>li").eq(ind).css("display","block");
		$(".wrangler_colors>li").eq(ind).find("ul>li").each(function(){
				var liInd = $(this).index();
				$(this).delay(100*liInd).animate({opacity:1});
		})

		if(ind == 0){
			$(".car_info>div").find("img").attr("src","../images/models/wrangler/colorset/sport_01.png");
			$(".car_color.sport>li").removeClass("on");
			$(".car_color.sport>li").eq(0).addClass("on");
		}
		if(ind == 1){
			$(".car_info>div").find("img").attr("src","../images/models/wrangler/colorset/rubicon_06.png");
			$(".car_color.rubicon>li").removeClass("on");
			$(".car_color.rubicon>li").eq(5).addClass("on");
		}
		if(ind == 2){
			$(".car_info>div").find("img").attr("src","../images/models/wrangler/colorset/sahara_01.png");
			$(".car_color.sahara>li").removeClass("on");
			$(".car_color.sahara>li").eq(0).addClass("on");
		}

		carChaD(ind);
		carChaW();
		colorsetInit();
	});

	$(".car_color>li").click(function(){
		var thisAlt = $(this).find("img").attr("alt");

		$(".car_color>li").removeClass();
		$(this).addClass("on");
		$(".car_info>div").find("img").attr("src","../images/models/wrangler/colorset/"+thisAlt+".png");

	});

	$(".ex_02.wrangler>ul:nth-of-type(2)>li").click(function(){
		var ind = $(this).index();
		$(".ex_02_nav.wrangler>div").stop().animate({top:(80*ind)+20},500,"easeOutBack");
		$(".ex_02.wrangler>ul:nth-of-type(1)>li").css("display","none");
		$(".ex_02.wrangler>ul:nth-of-type(1)>li").eq(ind).css("display","block");
	});

	$(".ex_03.wrangler>div").on("mouseenter", function(){
		var ind = $(this).index();
		console.log(ind);
		if(ind == 0){
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(1)").css("display","block");
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(2)").css("display","block");
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(3)").css("display","none");
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(4)").css("display","none");
			$(".ex_03.wrangler>div:nth-of-type(2)").css({paddingTop:150,opacity:0,borderWidth:"2px 2px 2px 0"});
			$(".ex_03.wrangler>div:nth-of-type(2)").stop().animate({paddingTop:120,opacity:1});
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(2)").css("marginTop",30);
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(2)").stop().animate({marginTop:15});
			$("#ex_03_active").stop().animate({left:0});
			console.log(ind);
			$(".ex_03.wrangler>div").removeClass();
			$(this).addClass("active");
		};
		if(ind == 2){
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(1)").css("display","none");
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(2)").css("display","none");
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(3)").css("display","block");
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(4)").css("display","block");
			$(".ex_03.wrangler>div:nth-of-type(2)").css({paddingTop:150,opacity:0,borderWidth:"2px 0 2px 2px"});
			$(".ex_03.wrangler>div:nth-of-type(2)").stop().animate({paddingTop:120,opacity:1});
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(4)").css("marginTop",30);
			$(".ex_03.wrangler>div:nth-of-type(2)>p:nth-of-type(4)").stop().animate({marginTop:15});
			$("#ex_03_active").stop().animate({left:436});
			console.log(ind);
			$(".ex_03.wrangler>div").removeClass();
			$(this).addClass("active");
		};
	})

	//------------------------------------------------------------------
	//-------------------- jeep history page jquery --------------------
	//------------------------------------------------------------------
	var exSwitch = true;
	$(".ex_01_switch").click(function(){
		if(exSwitch){
			$(".ex_01>div:nth-of-type(2)").css("background-image","url(../images/models/wrangler/exterior/exterior02_on.jpg");
			$(".ex_01_switch>div").addClass("on");			
			exSwitch = false;
		}else{
			$(".ex_01>div:nth-of-type(2)").css("background-image","url(../images/models/wrangler/exterior/exterior02.jpg");
			$(".ex_01_switch>div").removeClass();
			exSwitch = true;
		}
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
		$(".thumb_left_btn").animate({opacity:0},300,"easeOutSine");
		$(".thumb_right_btn").animate({opacity:0},300,"easeOutSine");

		imgAlt = $(this).find("img").attr("alt");
		imgLen = imgAlt.length;
		imgNum = parseInt(imgAlt.substr(imgLen-2,2));
		modalImg = $(".modal_photo").find("[alt =" + imgAlt + "]").parent();
		modalNavImg = $(".modal_nav").find("[alt =" + imgAlt + "]").parents("li");

		

		//console.log(imgNum);
		//console.log(imgAlt);
		$("#modal").css("display","block");
		$("#modal").animate({opacity:1},300);
		$(".modal_photo>div").css("display","none");
		modalImg.css("display","block");
		
		$(".modal_nav>ul>li").removeClass();
		modalNavImg.addClass("on");

		$(".modal_nav>ul").stop().animate({left: 720+ (imgNum * 240 * -1)})

		//$(".modal_close>img:nth-of-type(2)").attr("src","./images/gallery/gallery_bg"+imgAlt.substr(imgLen-2,2)+".jpg")
		$("<img src='../images/gallery/gallery_bg"+imgAlt.substr(imgLen-2,2)+".jpg' alt="+imgAlt+">").appendTo(".modal_close");
		
		$(".modal_close>img").animate({opacity:1},600);
		if($(".modal_close>img").length > 2) $(".modal_close>img:first-child").remove();

		$(".logo>a:nth-of-type(1)").animate({opacity:0},400,function(){
			$(".logo>a:nth-of-type(1)").css("display","none")
		})
		$(".logo>a:nth-of-type(2)").css("display","block");
		$(".logo>a:nth-of-type(2)").delay(400).animate({opacity:1},600);

		$(".sub_title>ul").animate({opacity:0},300,function(){
			$(".sub_title>ul>li").css("color","#fff")}
		);
		$(".sub_title>ul").delay(100).animate({opacity:1},300);

		modalSize();
	});

	$(".modal_nav>ul>li").click(function(e){
		e.preventDefault();

		imgAlt = $(this).find("img").attr("alt");
		imgLen = imgAlt.length;
		imgNum = parseInt(imgAlt.substr(imgLen-2,2));
		modalImg = $(".modal_photo").find("[alt =" + imgAlt + "]").parent();
		modalNavImg = $(".modal_nav").find("[alt =" + imgAlt + "]").parents("li");

		$(".modal_photo>div").css("display","none");
		modalImg.css("display","block");

		$(".modal_nav>ul>li").removeClass();
		modalNavImg.addClass("on");

		$(".modal_nav>ul").stop().animate({left: 720+ (imgNum * 240 * -1)},500,"easeOutSine");

		$("<img src='../images/gallery/gallery_bg"+imgAlt.substr(imgLen-2,2)+".jpg' alt="+imgAlt+">").appendTo(".modal_close");
		$(".modal_close>img").animate({opacity:1},600);
		$(".modal_close>img:first-child").remove();
	});

	$(".modal_close").click(function(){
		$("#modal").animate({opacity:0},300,function(){
			$("#modal").css("display","none");
		})		
		$(".thumb_left_btn").animate({opacity:1},300);
		$(".thumb_right_btn").animate({opacity:1},300);
		
		$(".logo>a:nth-of-type(2)").css({display:"none",opacity:0})
		$(".logo>a:nth-of-type(1)").css("display","block");
		$(".logo>a:nth-of-type(1)").delay(400).animate({opacity:1},600);
		
		$(".sub_title>ul").animate({opacity:0},300,function(){
			$(".sub_title>ul>li").css("color","#333")}
		);
		$(".sub_title>ul").delay(100).animate({opacity:1},300);
	});

	$("#spec_wrap>nav>ul>li").mouseenter(function(){
		var ind = $(this).index();
		$("#spec_wrap>nav>ul>li").removeClass();
		$("#spec_wrap>nav>ul>li").eq(ind).addClass("on");

		$("#spec_wrap>ul>li>div:nth-of-type(2)>p").removeClass();
		for(var i=0; i<3; i++){
			$("#spec_wrap>ul>li").eq(i).find("div:nth-of-type(2)>p").eq(ind).addClass("on");
		}
		$(".spec_navbar").stop().animate({left:300 + (180*ind)},400,"easeOutBack");
	});

	$("#spec_wrap>ul>li>div:nth-of-type(2)>p").mouseenter(function(){
		var ind = $(this).index();
		$("#spec_wrap>nav>ul>li").removeClass();
		$("#spec_wrap>nav>ul>li").eq(ind).addClass("on");

		$("#spec_wrap>ul>li>div:nth-of-type(2)>p").removeClass();
		for(var i=0; i<3; i++){
			$("#spec_wrap>ul>li").eq(i).find("div:nth-of-type(2)>p").eq(ind).addClass("on");
		}

		$(".spec_navbar").stop().animate({left:300 + (180*ind)},400,"easeOutBack");
	});

	// $(function(){}); ----------------------END----------------------
});


// $("html,body").animate({scrollTop : winH*2},

function carChaD(ind){
	$(".car_cha").css("display","none");
	$(".car_cha").eq(ind).css("display","block");
	$(".car_cha").attr("data-state","false");
	$(".car_cha").eq(ind).attr("data-state","true");
}

function carChaW(){
	var carchaLen = $(".car_cha[data-state='true']>ul>li").length;
	console.log(carchaLen);
	$(".car_cha>ul").css("padding-left",(1200 - (carchaLen*270 + (carchaLen-1)*20))/2);
}

function modalSize(){
	docH = $(document).height();
	docW = $(document).width();
	$(".modal_close").css({height:docH,width:docW});
}

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