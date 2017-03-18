$(document).ready(function(){

        $("#navbar").load("./views/navbar.html", function(){
        	// $("[data-ron-nav-link='home']").css("background-color", "red");
        	highlightCurrentPage('home');
	        mobileMenu();
        });
        $("#footer").load("./views/footer.html");

        var slideIndex = 0;
        var slideshow_image = $(".slideshow_image").toArray();
        var myPositions = $(".slideshow_position").toArray();
        var theTimer;
        carousel();

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
		
		$(".slideshow_position").click(function(){
			// console.log($(this).attr('data-ron-slide'));
			clearTimeout(theTimer);
			var goToSlide = Number($(this).attr('data-ron-slide'));
			slideIndex = goToSlide-1;
			carousel();
		});

		// Test for touch events - will need to be updated to account for couresel behavior (if it works);

		var slideshowSection = document.getElementById("slideshowSection");
        slideshowSection.addEventListener("touchstart", function(e){
            e.preventDefault();
            var touchObj = e.changedTouches[0];
            var start = parseInt(touchObj.clientX);
        }, false);
        // slideshowSection.addEventListener("touchmove", function(e){
        //     e.preventDefault();
        //     var touchObj = e.changedTouches[0];
        //     var dist = parseInt(touchobj.clientX) - start;
        //     alert('Status: touchmove<br> Horizontal distance traveled: ' + dist + 'px');

        // }, false);
        slideshowSection.addEventListener("touchend", function(e){
            e.preventDefault();
            var touchObj = e.changedTouches[0];
            var end = parseInt(touchObj.clientX);
            if ( (end - start) < -29){
                clearTimeout(theTimer);
                if (slideIndex == 1){
                    slideIndex = slideshow_image.length-1;
                }  else { 
                    slideIndex -= 2; 
                }
                carousel();
            } else if ( (end - start) > 29){
                clearTimeout(theTimer);
                carousel();
            }
        }, false);

});