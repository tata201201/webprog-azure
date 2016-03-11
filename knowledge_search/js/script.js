$(document).ready(function(){
	$("#search-value").focus();
	$("#search").click(function(e){
		var SearchValue = $("#search-value").val().trim();
		var url = "https://kgsearch.googleapis.com/v1/entities:search?query=" + SearchValue + "&key=AIzaSyCkRGmf7MapQ94zNmpxnCwWaGNlXrgn_QQ";
		
		$("#result-display").html("<img src='image/loading.gif'/><br/><br/>Loading...");
		e.preventDefault();
		$.ajax({
			url: url,
			type: "get",
			dataType: "json",
			success: display
		});
	});
});

function display(result){
	console.log(result);
	console.log(result.itemListElement);
	var all_items = result.itemListElement;
	$("#result-display").empty();

	$.each(all_items,function(idx, val){
		var this_item = val.result;
		console.log(this_item);

		var newNode = document.createElement("div");
		var this_item_display = "";
		try{
			this_item_display = this_item_display + "<div class='image' style='background-image:url(" + this_item.image.contentUrl + ")'></div>";
		}catch(e){
			this_item_display = this_item_display + "<div class='image'>no image</div>";
		}
		
		this_item_display = this_item_display + "<div class='title'>" + this_item.name + "</div>";
		this_item_display = this_item_display + "<div class='description'>" + this_item.description + "</div>";
		this_item_display = "<a href='" + this_item.detailedDescription.url + "' target='_blank'>" + this_item_display + "</a>"
		$(newNode).addClass("result-element").attr({"id":"ITEMS_" + idx}).html(this_item_display).appendTo("#result-display");

	});
}