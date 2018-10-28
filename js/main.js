var count = 0;

$(function(){
	
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
});

function thumbMove(){
	var x = count * 1200 * -1;
	$("#view_point>div").animate({left:x},500);
};

function modalPage(){
	
}