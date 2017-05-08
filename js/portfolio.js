$(document).ready(function(){
	$(".td").click(function(){
        var albumID = $(this).attr("data-album-id");
        var current = window.location.href; 
        window.location.assign(current + "albums.html?flux="+albumID);
    });
});
