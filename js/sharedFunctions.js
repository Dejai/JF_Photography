$(function(){
    $("#navbar").load("/JF_Photography/views/navbar.html", function(){
        var currentPath = window.location.pathname, page;
        if (currentPath.indexOf("portfolio") > 0){
            page = "portfolio";
        } else if (currentPath.indexOf("contact") > 0){
            page = "contact"; 
        } else if (currentPath.indexOf("about") > 0){
            page = "about";
        } else {
            page = "home"; 
        }
        $("[data-ron-nav-link]").each(function(){
            if ($(this)[0].attributes[1].value == page){
                $(this).css("border-top", "2px solid red");
                $(this).css("border-bottom", "2px solid red");
                $(this).css("padding-top", "0.5%");
                $(this).css("padding-bottom", "0.5%");
            }
        });
        mobileMenu();
    });
    $("#footer").load("/JF_Photography/views/footer.html");

});

$(function(){
    setTimeout(function(){
        $(".delayedDisplay").fadeIn();
    }, 100);
});

function mobileMenu(){
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
}

function setImageDimensions(container, dimension){
    var ele = "#"+container;
    resetDimensionClasses($(ele));
    switch (dimension.trim()){
        case "portrait":
            $(ele).addClass("dim-portrait");
            break;
        case "landscape":
            $(ele).addClass("dim-landscape");
            break;
        case "square":
            $(ele).addClass("dim-square");
            break;
        default:
            $(ele).addClass("dim-square");
    }

}
function resetDimensionClasses(element){
    var classes = element[0].classList;
    for (var x = 0; x < classes.length; x++){
        if (classes[x].indexOf("dim-") > -1){
            classes.remove(classes[x]);
        }
    }
}


function swipedetect(el, callback){
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
  
//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
    swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir =='left')
        alert('You just swiped left!')
})
*/