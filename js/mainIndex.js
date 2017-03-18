$(document).ready(function(){

        $("#ron_navbar").load("./views/navbar.html");
        $("#ron_footer").load("./views/footer.html");

        var slideIndex = 0;
        var mySlides = $(".mySlides").toArray();
        var myPositions = $(".slidePosition").toArray();
        var theTimer;
        carousel();

        function carousel() {
        	$(".mySlides").hide();
        	$(".slidePosition").removeClass("currentSlide");
		    slideIndex++;
		    if (slideIndex > mySlides.length) { slideIndex = 1} 
		    // mySlides[slideIndex-1].style.display = "block";
		    $(mySlides[slideIndex-1]).show(); 
		    $(myPositions[slideIndex-1]).addClass("currentSlide"); 
		    theTimer = setTimeout(carousel, 5000); // Change image every 2 seconds
		}
		
		$(".leftButtonArea").click(function(){
        	clearTimeout(theTimer);
		    $(this).blur();
		    if (slideIndex == 1){
		    	slideIndex = mySlides.length-1;
		    }  else { 
		    	slideIndex -= 2; 
		    }
		    carousel();
		});
		$(".rightButtonArea").click(function(){
        	clearTimeout(theTimer);
        	$(this).blur();
		    carousel();
		});
		
		$(".slidePosition").click(function(){
			// console.log($(this).attr('data-ron-slide'));
			clearTimeout(theTimer);
			var goToSlide = Number($(this).attr('data-ron-slide'));
			slideIndex = goToSlide-1;
			carousel();
		});

		$.ajax({
		    url: "./images/",
		    success: function (data) {
		        console.log("This is a test for getting files dynamically");    
		        console.log("The data: \n " + data);
		    }
		});
});