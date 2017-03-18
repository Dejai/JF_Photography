function mobileMenu(){

	$("#mobile-hamburger-button").click(function(){
		$("#menu-list-section").show();
		$("#mobile-hamburger-button").hide();
		$("#mobile-close-button").show();
	});
	$("#mobile-close-button").click(function(){
		$("#menu-list-section").toggle();
		$("#mobile-hamburger-button").toggle();
		$("#mobile-close-button").toggle();
	});
}

function highlightCurrentPage(page){
	// var element = "\"[data-ron-nav-link='" + page + "']\"";
	$("[data-ron-nav-link]").each(function(){
		if ($(this)[0].attributes[1].value == page){
			console.log("Welcome home");
			$(this).css("background-color", "red");
		}
	});
}