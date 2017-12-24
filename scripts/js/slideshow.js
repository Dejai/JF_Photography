sharedFunctions.loadNavBar();

var slideIndex = 0;
var slideshow_images; 
var myPositions;
var theTimer;
$(document).ready(function(){

        newBuildSlideshow();
        $(".slideshow_image").hide();

        if ( Storage !== 'undefined'){
            if (sessionStorage.JFPhotobizSession){
                // console.log("Same session");
                showSlideshow();
            } else {
				document.getElementById("navbar").style.display = "none";
                // console.log("New session");
                showWelcomeMessage();
                sessionStorage.JFPhotobizSession = true;
            }
        } else {
            console.log("I need to check for the cookie");
            showWelcomeMessage();
        }
});

function showWelcomeMessage(){
    setTimeout(function(){
            $("#welcomeMessageHeader").fadeIn();
            setTimeout(function(){
                $("#welcomeSentence-one").fadeIn();
                setTimeout(function(){
                    $("#welcomeSentence-two").fadeIn();
                    setTimeout(function(){
                        $("#enterButtonSection").fadeIn();
                    }, 1000);
                }, 1000)
            }, 1000);
        }, 500);
}
function showSlideshow(time){
    var delayTime = time ? time : 300;
    setTimeout(function(){    		
            $("#welcomeMessageSection").hide();
            document.getElementById("navbar").style.display = window.outerWidth > 768 ? "flex" : "initial";;
            slideshow_images = $(".slideshow_image").toArray();
            myPositions = $(".slideshowPositionIndicator").toArray();
            $(".delayedDisplay").fadeIn(400);
            carousel();
            slideshowEventListeners();
        }, delayTime);
}

function newBuildSlideshow(){
	$.get("/config/albumsJSON.json", function(payload){
		// var pay = JSON.parse(payload);
		var images = payload["slideshow"].images;
		var res = "";
		var posRes = "";
		for (var x = 0; x < images.length; x++){
	    	if (x == 0){ 
	    		var leftArrow = "<p id=\"slideshow_leftButton\" class=\"slideshowArrow \"></p>";
	        	$("#slideshowPositionsSection").append(leftArrow);
	        	var pos = "<p class=\"slideshowPositionIndicator \" data-ron-slide=\"" +(x+1)+"\"></p>";
	        	$("#slideshowPositionsSection").append(pos);
	        	var img = "<img class=\"currentIMG slideshow_image dim-"+images[x].dimension + " selectedImage1 \" data-photo-dimension=\""+images[x].dimension+"\" src=\""+images[x].path+"\">";
	       		$("#slideshowImagesContainer").append(img);
	    	} else if (x == images.length-1) {
	    		var img = "<img class=\"slideshow_image dim-"+images[x].dimension + "\" data-photo-dimension=\""+images[x].dimension+"\" src=\""+images[x].path+"\">";
	       		$("#slideshowImagesContainer").append(img);
	       		var pos = "<p class=\"slideshowPositionIndicator \" data-ron-slide=\"" +(x+1)+"\"></p>";
	        	$("#slideshowPositionsSection").append(pos);
	       		var rightArrow = "<p id=\"slideshow_rightButton\" class=\"slideshowArrow \"></p>";
	    		$("#slideshowPositionsSection").append(rightArrow);
	    		res += img;
	    	} else{
	    		var img = "<img class=\"slideshow_image dim-"+images[x].dimension + "\" data-photo-dimension=\""+images[x].dimension+"\" src=\""+images[x].path+"\">";
	       		$("#slideshowImagesContainer").append(img);
	       		var pos = "<p class=\"slideshowPositionIndicator \" data-ron-slide=\"" +(x+1)+"\"></p>";
	        	$("#slideshowPositionsSection").append(pos);
	    	}
		}
		// $(".slideshow_image").hide();

	});
}


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
	sharedFunctions.swipedetect(slideSection, function(swipedir){
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
