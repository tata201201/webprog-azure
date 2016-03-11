$(document).ready(function(){
    $("#camera-control button").click(take_photo);
    $(".draggable").attr({
    	 "draggable":"true",
    	 "ondragstart":"drag(event)"
    });
    $("body").keydown(manage_key_down);
});

function take_photo(){
    CameraTool.initCameraOn("camera");
    setTimeout(function(){$("#countdown").html("3");},1000);
    setTimeout(function(){$("#countdown").html("2");},2000);
    setTimeout(function(){$("#countdown").html("1");},3000);
    setTimeout(function(){$("#countdown").html("");},4000);
    setTimeout(function(){CameraTool.captureTo("photo");},4000);
    setTimeout(function(){CameraTool.hideCamera();},4000);
}

var COUNT_IMAGE_ID = 0;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("src", ev.target.currentSrc);
    ev.dataTransfer.setData("offsetX", ev.offsetX);
    ev.dataTransfer.setData("offsetY", ev.offsetY);
    console.log(ev);
}

function drop(ev) {
    ev.preventDefault();
    var src = ev.dataTransfer.getData("src");
    var offsetX = ev.dataTransfer.getData("offsetX");
    var offsetY = ev.dataTransfer.getData("offsetY");

    if(src == "") return;

    console.log(ev);

	var newNode = document.createElement("img");
	newNode.setAttribute("id","ITEMS_" + COUNT_IMAGE_ID);
	ev.target.appendChild(newNode);
	console.log(ev.x);

	var item_id = "ITEMS_"+COUNT_IMAGE_ID;

	$("#"+item_id).attr({"src":src,"class":"sticker","data-rotation":0}).css({"width":"150px", "height":"auto","position":"absolute","top":ev.offsetY - offsetY,"left":ev.offsetX - offsetX});

	$("#"+item_id).click(select_sticker);

	select_last_sticker();

	COUNT_IMAGE_ID ++;

}

function select_sticker(){
	console.log(this);
	if($("#" + this.id).hasClass("selected")) $("#" + this.id).removeClass("selected");
	else{
		deselect_all_sticker();
		$("#" + this.id).addClass("selected");
	}
}

function select_last_sticker(){
	$("#overlay > .sticker").each(function(){
		deselect_all_sticker();
		$("#" + this.id).addClass("selected");
	});
}

function deselect_all_sticker(){
	$("#overlay > .sticker").each(function(){
		$("#" + this.id).removeClass("selected");
	});
}

function manage_key_down(ev){
	var move_px = 4;
	var resize_px = 3;
	var rotate_deg = 2;
	console.log(ev);
	if(ev.which==37 && ev.shiftKey == false){
		$(".selected.sticker").each(function(){
			$(this).css("left","-=" + move_px +"px");
		});
	}else if(ev.which==38 && ev.shiftKey == false){
		$(".selected.sticker").each(function(){
			$(this).css("top","-=" + move_px +"px");
		});
	}else if(ev.which==39 && ev.shiftKey == false){
		$(".selected.sticker").each(function(){
			$(this).css("left","+=" + move_px +"px");
		});
	}else if(ev.which==40 && ev.shiftKey == false){
		$(".selected.sticker").each(function(){
			$(this).css("top","+=" + move_px +"px");
		});
	}else if(ev.which==187){
		$(".selected.sticker").each(function(){
			$(this).css("width","+=" + resize_px +"px");
		});
	}else if(ev.which==189){
		$(".selected.sticker").each(function(){
			$(this).css("width","-=" + resize_px +"px");
		});
	}else if(ev.which==37 && ev.shiftKey == true){
		$(".selected.sticker").each(function(){
			console.log($(this).context.dataset.rotation);
			$(this).context.dataset.rotation -= rotate_deg;
			$(this).css("transform","rotate(" + $(this).context.dataset.rotation + "deg)");
		});
	}else if(ev.which==39 && ev.shiftKey == true){
		$(".selected.sticker").each(function(){
			console.log($(this).context.dataset.rotation);
			$(this).context.dataset.rotation += rotate_deg;
			$(this).css("transform","rotate(" + $(this).context.dataset.rotation + "deg)");
		});
	}else if(ev.which==68 || ev.which==46){
		$(".selected.sticker").each(function(){
			$(this).remove();
		});
	}
}
