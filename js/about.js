$(document).ready(function(){

	$.get("/config/aboutMe.txt", function(results){
		var paragraphs = results.split("\n");
		for (var x in paragraphs){
			$("#aboutMeParagraphs").append(paragraphs[x] + "<br/>");
		}
		displayDelayed();
	});
});