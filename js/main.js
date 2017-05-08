$(document).ready(function(){
        var current = window.location.href;
        var slideIndex = 0;
        var slideshow_image; 
        var myPositions;
        var theTimer;
        $.get(current+"config/slideshowImages.txt", function(results){
            var all = results.split("\n");
            for (var x in all){
                var img = "<img class=\"slideshow_image\" src=\""+current+"images/"+all[x]+"\">";
                $("#slideshowImagesContainer").append(img);
                var pos = "<p class=\"slideshow_position\" data-ron-slide=\"" +x+"\"></p>";
                $("#slideshowPositionsSection").append(pos);
            }
            slideshow_image = $(".slideshow_image").toArray();
        	myPositions = $(".slideshow_position").toArray();
	        carousel();
	        $(".slideshow_position").click(function(){
				clearTimeout(theTimer);
				var goToSlide = Number($(this).attr('data-ron-slide'));
				slideIndex = goToSlide;
				carousel();
			});
        });
        function carousel() {
        	$(".slideshow_image").hide();
        	$(".slideshow_position").removeClass("currentSlidePosition");
		    slideIndex++;
		    if (slideIndex > slideshow_image.length) { slideIndex = 1} 
		    $(slideshow_image[slideIndex-1]).show(); 
		    $(myPositions[slideIndex-1]).addClass("currentSlidePosition"); 
		    theTimer = setTimeout(carousel, 7000);
		}
		
		$("#slideshow_leftButton").click(function(){
        	clearTimeout(theTimer);
		    $(this).blur();
		    if (slideIndex == 1){
		    	slideIndex = slideshow_image.length-1;
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
		
		// Test for touch events - will need to be updated to account for couresel behavior (if it works);

        // var slideshowImages = document.getElementsByClassName("slideshow_image");
		var slideSection = document.getElementById("slideshowSection");
		swipedetect(slideSection, function(swipedir){
		    if (swipedir =='right') {
		    	clearTimeout(theTimer);
			    $(this).blur();
			    if (slideIndex == 1){
			    	slideIndex = slideshow_image.length-1;
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
});