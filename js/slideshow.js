var slideIndex = 0;
var slideshow_images; 
var myPositions;
var theTimer;
$(document).ready(function(){
	
	$.get("/config/slideshowImages.txt", function(results){
        buildSlideshow(results);
        slideshow_images = $(".slideshow_image").toArray();
    	myPositions = $(".slideshowPositionIndicator").toArray();
        carousel();
        slideshowEventListeners();
    });	
});


function buildSlideshow(results){
	var slideshow_images_array = results.split("\n");
    for (var x = 0; x < slideshow_images_array.length; x++){
    	var imageDetails = slideshow_images_array[x].split(",");
    	if (x == 0){ 
    		var leftArrow = "<p id=\"slideshow_leftButton\" class=\"slideshowArrow\"></p>";
        	$("#slideshowPositionsSection").append(leftArrow);
    	} else if (x == slideshow_images_array.length-1) {
    		var img = "<img class=\"slideshow_image\" data-photo-dimension=\""+imageDetails[1]+"\" src=\"/images/slideshow/"+imageDetails[0]+"\">";
       		$("#slideshowImagesContainer").append(img);
       		var pos = "<p class=\"slideshowPositionIndicator\" data-ron-slide=\"" +x+"\"></p>";
        	$("#slideshowPositionsSection").append(pos);
       		var rightArrow = "<p id=\"slideshow_rightButton\" class=\"slideshowArrow\"></p>";
    		$("#slideshowPositionsSection").append(rightArrow);
    	} else{
    		var img = "<img class=\"slideshow_image\" data-photo-dimension=\""+imageDetails[1]+"\" src=\"/images/slideshow/"+imageDetails[0]+"\">";
       		$("#slideshowImagesContainer").append(img);
       		var pos = "<p class=\"slideshowPositionIndicator\" data-ron-slide=\"" +x+"\"></p>";
        	$("#slideshowPositionsSection").append(pos);
    	}
    }
}

function carousel() {
	$(".slideshow_image").hide();
	$(".slideshowPositionIndicator").removeClass("currentSlidePosition");
    slideIndex++;
    if (slideIndex > slideshow_images.length) { slideIndex = 1} 

    // GOING DOWN THE RIGHT PATH WITH THIS ONE.
	var dimm = $(slideshow_images[slideIndex-1]).attr("data-photo-dimension");
	// setImageDimensions("slideshowImagesContainer", dimm);
	setImageDimensions("slideshowSection", dimm);
	

    $(slideshow_images[slideIndex-1]).show();
    $(myPositions[slideIndex-1]).addClass("currentSlidePosition"); 
    theTimer = setTimeout(carousel, 4000);
}

function slideshowEventListeners(){
    $(".slideshowPositionIndicator").click(function(){
		clearTimeout(theTimer);
		var goToSlide = Number($(this).attr('data-ron-slide'));
		slideIndex = goToSlide-1;
		carousel();
	});
	$("#slideshow_leftButton").click(function(){
    	clearTimeout(theTimer);
	    $(this).blur();
	    if (slideIndex == 1){
	    	slideIndex = slideshow_images.length-1;
	    }  else { 
	    	slideIndex -= 2; 
	    }
	    carousel();
	});
	$("#slideshow_rightButton").click(function(){
    	clearTimeout(theTimer);
    	$(this).blur();
	    carousel();
	});

	$(document).keydown(function(event){
    	if(event.which == 37){
    		clearTimeout(theTimer);
		    $(this).blur();
		    if (slideIndex == 1){
		    	slideIndex = slideshow_images.length-1;
		    }  else { 
		    	slideIndex -= 2; 
		    }
		    carousel();
    	} else if (event.which == 39){
	    	clearTimeout(theTimer);
    		$(this).blur();
	    	carousel();
    	} 
    });
	// Test for touch events - will need to be updated to account for couresel behavior (if it works);

    // var slideshowImages = document.getElementsByClassName("slideshow_image");
	var slideSection = document.getElementById("slideshowSection");
	swipedetect(slideSection, function(swipedir){
	    if (swipedir =='right') {
	    	clearTimeout(theTimer);
		    $(this).blur();
		    if (slideIndex == 1){
		    	slideIndex = slideshow_images.length-1;
		    }  else { 
		    	slideIndex -= 2; 
		    }
		    carousel();
	    } else if (swipedir == 'left'){
	    	clearTimeout(theTimer);
        	$(this).blur();
		    carousel();
	    }
	});
}
