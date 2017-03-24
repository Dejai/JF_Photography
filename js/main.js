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

        // var slideshowImages = document.getElementsByClassName("slideshow_image");
		var box1 = document.getElementById("slideshowSection");

        var startx = 0, dist = 0; 
        box1.addEventListener('touchstart', function(e){
            var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
            startx = parseInt(touchobj.clientX) // get x position of touch point relative to left edge of browser
            // alert('Status: touchstart<br> ClientX: ' + startx + 'px');
        }, false)
     
        // box1.addEventListener('touchmove', function(e){
        //     var touchobj = e.changedTouches[0] // reference first touch point for this event
        //     dist = parseInt(touchobj.clientX) - startx;
        //     alert('Status: touchmove<br> Horizontal distance traveled: ' + dist + 'px');
        // }, false)
     
        box1.addEventListener('touchend', function(e){
            var touchobj = e.changedTouches[0] // reference first touch point for this event
            var end = parseInt(touchObj.clientX);
            if (end < startx){
                alert("The end is less");
            } else if (end > startx) {
                alert ("The end is greater");
            } else {
                alert ('ehhh');
            }
            // alert('Status: touchend<br> Resting x coordinate: ' + touchobj.clientX + 'px');
        }, false) 

});