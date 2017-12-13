
const sharedFunctions = {
	functions: function(){
		console.log("Shared Functions:")
		console.log("Highlight Current Page in Menu:\tsharedFunctions.highlightCurrentPage(element)\n\t" + (this.highlightCurrentPage) );
		console.log("Fade In Elements with '.delayedDisplay' Class:\tsharedFunctions.displayDelayed()\n\t" + (this.displayDelayed) );
		console.log("Hide / Show sections with th designated classes when clicking the mobile menu:\tsharedFunctions.mobileMenu()\n\t" + (this.mobileMenu) );
		console.log("Add swipe detection to given elements on the page.:\tsharedFunctions.swipedetect(element, callback)\n\t" + (this.swipedetect) );
	},
	highlightCurrentPage : function(element){
		var path = window.location.pathname;
		var page = path.substring(path.search(/pages/g)+5);
		page = page.replace(/\//g, "").trim();
		var link = element[0].querySelectorAll("[data-ron-nav-link='"+page+"']")[0];
		link.style.borderTop = "2px solid red";
		link.style.borderBottom = "2px solid red";
		link.style.paddingTop = "0.5%";
		link.style.paddingBottom = "0.5%";
	}, 
	displayDelayed: function(){
		setTimeout(function(){
	        $(".delayedDisplay").fadeIn();
	    }, time);
	}, 
	mobileMenu : function(){
	    $("#navbar-mobile-hamburger-button").click(function(){
	        $(".hideForMobileNav").hide();
	        $("#navbar-navigation-options-section").show();
	        $("#navbar-mobile-hamburger-button").hide();
	        $("#navbar-mobile-close-button").css("display", "block");
	    });
	    $("#navbar-mobile-close-button").click(function(){
	        $("#navbar-navigation-options-section").toggle();
	        $("#navbar-mobile-hamburger-button").toggle();
	        $("#navbar-mobile-close-button").toggle();
	        $(".hideForMobileNav").fadeIn();
	    });
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
	    allowedTime = 300, // maximum time allowed to travel that distance
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
	        e.preventDefault();
	    }, false)
	  
	    touchsurface.addEventListener('touchmove', function(e){
	        e.preventDefault(); // prevent scrolling when inside DIV
	    }, false)
	  
	    touchsurface.addEventListener('touchend', function(e){
	        var touchobj = e.changedTouches[0];
	        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
	        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
	        elapsedTime = new Date().getTime() - startTime; // get time elapsed
	        if (elapsedTime <= allowedTime){ // first condition for awipe met
	            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
	                swipedir = (distX < 0)? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
	            }
	            // else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
	            //     swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
	            // }
	        }
	        handleswipe(swipedir);
	        // e.preventDefault()
	    }, false);
	}
};


