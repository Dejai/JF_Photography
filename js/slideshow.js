// var slideIndex = 0;
// var slideshow_images; 
// var images; 
// var myPositions;
// var theTimer;
// $(document).ready(function(){
// 	slideshow_images = $(".slideshow_image").toArray();
//    	myPositions = $(".slideshowPositionIndicator").toArray();
//     carousel();
//     slideshowEventListeners();
// 	$.get("/config/slideshowImages.txt", function(results){
//         if (buildSlideshow(results)){
//         	displayDelayed();
//         	slideshow_images = $(".slideshow_image").toArray();
//     		myPositions = $(".slideshowPositionIndicator").toArray();
//         	carousel();
//         	slideshowEventListeners();
//         }
//     });	
// });
// $(document).ready(function(){
// 	newBuildSlideshow();
//     slideshow_images = $(".slideshow_image").toArray();
//     myPositions = $(".slideshowPositionIndicator").toArray();
// 	setTimeout(function(){
//         $(".delayedDisplay").fadeIn(2000);
//     }, 400);
//     // carousel();
// });

function newBuildSlideshow(){
	$.get("/config/slideshowJSON.txt", function(payload){
		var pay = JSON.parse(payload);
		images = pay[0].images;
		var res = "";
		var posRes = "";
		for (var x = 0; x < images.length; x++){
	    	if (x == 0){ 
	    		var leftArrow = "<p id=\"slideshow_leftButton\" class=\"slideshowArrow showMeDel\"></p>";
	        	$("#slideshowPositionsSection").append(leftArrow);
	        	var pos = "<p class=\"slideshowPositionIndicator showMeDel\" data-ron-slide=\"" +(x+1)+"\"></p>";
	        	$("#slideshowPositionsSection").append(pos);
	        	var img = "<img class=\"currentIMG slideshow_image dim-"+images[x].dimension + " selectedImage1 showMeDel2\" data-photo-dimension=\""+images[x].dimension+"\" src=\""+images[x].name+"\">";
	       		$("#slideshowImagesContainer").append(img);
	    	} else if (x == images.length-1) {
	    		var img = "<img class=\"slideshow_image dim-"+images[x].dimension + "\" data-photo-dimension=\""+images[x].dimension+"\" src=\""+images[x].name+"\">";
	       		$("#slideshowImagesContainer").append(img);
	       		var pos = "<p class=\"slideshowPositionIndicator showMeDel\" data-ron-slide=\"" +(x+1)+"\"></p>";
	        	$("#slideshowPositionsSection").append(pos);
	       		var rightArrow = "<p id=\"slideshow_rightButton\" class=\"slideshowArrow showMeDel\"></p>";
	    		$("#slideshowPositionsSection").append(rightArrow);
	    		res += img;
	    	} else{
	    		var img = "<img class=\"slideshow_image dim-"+images[x].dimension + "\" data-photo-dimension=\""+images[x].dimension+"\" src=\""+images[x].name+"\">";
	       		$("#slideshowImagesContainer").append(img);
	       		var pos = "<p class=\"slideshowPositionIndicator showMeDel\" data-ron-slide=\"" +(x+1)+"\"></p>";
	        	$("#slideshowPositionsSection").append(pos);
	    	}
		}
		// $(".slideshow_image").hide();

	});
}
// function buildSlideshow(results){
// 	var slideshow_images_array = results.split("\n");
//     for (var x = 0; x < slideshow_images_array.length; x++){
//     	var imageDetails = slideshow_images_array[x].split(",");
//     	if (x == 0){ 
//     		var leftArrow = "<p id=\"slideshow_leftButton\" class=\"slideshowArrow\"></p>";
//         	$("#slideshowPositionsSection").append(leftArrow);
//     	} else if (x == slideshow_images_array.length-1) {
//     		var img = "<img class=\"slideshow_image\" data-photo-dimension=\""+imageDetails[1]+"\" src=\"/images/slideshow/"+imageDetails[0]+"\">";
//        		$("#slideshowImagesContainer").append(img);
//        		var pos = "<p class=\"slideshowPositionIndicator\" data-ron-slide=\"" +x+"\"></p>";
//         	$("#slideshowPositionsSection").append(pos);
//        		var rightArrow = "<p id=\"slideshow_rightButton\" class=\"slideshowArrow\"></p>";
//     		$("#slideshowPositionsSection").append(rightArrow);
//     	} else{
//     		var img = "<img class=\"slideshow_image\" data-photo-dimension=\""+imageDetails[1]+"\" src=\"/images/slideshow/"+imageDetails[0]+"\">";
//        		$("#slideshowImagesContainer").append(img);
//        		var pos = "<p class=\"slideshowPositionIndicator\" data-ron-slide=\"" +x+"\"></p>";
//         	$("#slideshowPositionsSection").append(pos);
//     	}
//     }
//     return true;
// }

function carousel() {
	$(".slideshow_image").hide();
	$(".slideshowPositionIndicator").removeClass("currentSlidePosition");
    slideIndex++;
    if (slideIndex > slideshow_images.length) { slideIndex = 1} 

    // GOING DOWN THE RIGHT PATH WITH THIS ONE.
	// var dimm = $(slideshow_images[slideIndex-1]).attr("data-photo-dimension");
	// setImageDimensions("slideshowImagesContainer", dimm);
	// setImageDimensions("slideshowSection", dimm);
	

    $(slideshow_images[slideIndex-1]).show().css("display", "block");
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
