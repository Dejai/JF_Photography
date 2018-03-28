
const sharedFunctions = {
	/*	loadNavBar():
			> Uses jQuery load() function to load an HTML view for the navigation bar
			> Then after loading, calls the shared function highlightCurrentPage() 
	*/
	loadNavBar : function(){
		$("#navbar").load("/pages/shared/navbar.html", function(){
            sharedFunctions.highlightCurrentPage();
        });
	},

	/*	highlightCurrentPage(DOM_Element?):
			> Takes in an optional element from the DOM
			> Then, it checks the URL path to determine the page
			> Based on the values in the path, sets a variable for that page
			> Then, finds the child within the element that has the matching custom data value
	*/
	highlightCurrentPage : function(ele){
		var element = ele ? ele[0] : document.getElementById("navbar");
		var path = window.location.pathname;
		var page = (path == "/") ? 'home' : path.substring(path.search(/pages/g)+5);
		page = page.replace(/\//g, "").trim();
		var link = element.querySelectorAll("[data-ron-nav-link='"+page+"']")[0];
		link.style.borderTop = "2px solid red";
		link.style.borderBottom = "2px solid red";
		link.style.paddingTop = "0.5%";
		link.style.paddingBottom = "0.5%";
	}, 

	/*	displayDelayed(Time?):
			> Takes in an optional time - default is 0
			> Sets a native JS timeout call, with the given time
			> After the delayTime - any element with the right class is loaded (faded in)
	*/
	displayDelayed: function(time){
	    let delayTime = time ? time : 0;
		setTimeout(function(){
	        $(".delayedDisplay").fadeIn();
	    }, delayTime);
	}, 

	/*	calculateAspectRatio(width, height):
			> Determines the proper width and height for an image
	*/
	calculateAspectRatio: function(width, height){
		// var divisor = window.outerWidth > 1400 ? 3 : window.outerWidth < 768 ? 5 : 4;
		var divisor = 12;
		var targetWidth, targetHeight;
		console.log(divisor);
		if ( (width > height) && (window.outerWidth < 500) ){
			var targetWidth = window.innerWidth; 
			var targetHeight = (height / width ) * (width / divisor);
		} else {
			var targetWidth = width / divisor; 
			var targetHeight = (height / width ) * targetWidth;
		}
		return { "width" : targetWidth, "height" : targetHeight }
	},
	mobileMenu : function(action){
		var toHide = document.getElementsByClassName("hideForMobileNav");
		if (action == "open"){
			for (let x = 0; x < toHide.length; x++){
				toHide[x].style.opacity = "0";
			}
			document.getElementById("navbar-navigation-options-section").style.display = "block";
			document.getElementById("navbar-mobile-hamburger-button").style.display = "none";
			document.getElementById("navbar-mobile-close-button").style.display = "flex";
			document.getElementById("navbar-social-links-section").style.display = "block";
		} else {
			for (let x = 0; x < toHide.length; x++){
				toHide[x].style.opacity = "1";
			}
			document.getElementById("navbar-navigation-options-section").style.display = "none";
			document.getElementById("navbar-mobile-hamburger-button").style.display = "flex";
			document.getElementById("navbar-mobile-close-button").style.display = "none";
			document.getElementById("navbar-social-links-section").style.display = "none";

		}
	}, 
	swipedetect: function(el, callback){
	    var touchsurface = el,
	    swipedir,
	    startX,
	    startY,
	    distX,
	    distY,
	    threshold = 150, //required min distance traveled to be considered swipe
	    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
	    allowedTime = 7000, // maximum time allowed to travel that distance
	    elapsedTime,
	    startTime,
	    handleswipe = callback;
	     // || function(swipedir){}
	  
	    touchsurface.addEventListener('touchstart', function(e){
	        var touchobj = e.changedTouches[0];
	        swipedir = 'none';
	        dist = 0;
	        startX = touchobj.pageX;
	        startY = touchobj.pageY;
	        startTime = new Date().getTime(); // record time when finger first makes contact with surface
	        // e.preventDefault();
	    }, false);
	  
	    touchsurface.addEventListener('touchmove', function(e){
	    	// console.log(touchsurface.classList);
	    	if ( touchsurface.classList.contains("albumPhoto-galleryView") 
	    		 || touchsurface.classList.contains("galleryModalElements") ){
	    		e.preventDefault();
	    	}
	        // e.preventDefault(); // prevent scrolling when inside DIV
	    }, false);
	  
	    touchsurface.addEventListener('touchend', function(e){
	        var touchobj = e.changedTouches[0];
	        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
	        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
	        elapsedTime = new Date().getTime() - startTime; // get time elapsed
	        if (elapsedTime <= allowedTime){ // first condition for awipe met
	            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
	                swipedir = (distX < 0)? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
	            }
	        }
	        handleswipe(swipedir);
	    }, false);
	}
};






//USAGE: for the swipe detect
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
    swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir =='left')
        alert('You just swiped left!')
})
*/