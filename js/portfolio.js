$(document).ready(function(){
	var url = window.location.pathname;
	displayDelayed();
	// var filename = url.substring(url.lastIndexOf('/')+1);
	// if (filename == "albums.html"){
	// 	var query = window.location.search
	// 	var albumName = query.substring(query.lastIndexOf("=")+1); // Check the URL for a query search (specifically a value for the name of the album);
	//     getAlbumPhotos(albumName);
	// } else {
	//     getAlbumCovers();
	// }
});


/*
	@desc -- Makes a GET call to retrieve information about the different albums from the config file.
*/
function getAlbumCovers(){
	$.get("/config/albumCovers.txt", function(results){
    	var albumCovers_config = results.split("\n");
    	var albumCovers_element = ""; 
    	var clientWidth = window.innerWidth;
    	var endOfRow = clientWidth >= 760 ? 3 : 2;
    	for (var x = 1; x < albumCovers_config.length; x++){
    		var folderName = albumCovers_config[x].split(", ")[0];
    		var albumName = albumCovers_config[x].split(", ")[1];
    		var albumCoverImage = albumCovers_config[x].split(", ")[2];
    		if (x == 1){
    			albumCovers_element +=  buildAlbumCover(folderName, albumName, albumCoverImage, "firstCellInRow");
    		} else if ( (x % endOfRow) == 0 && x != albumCovers_config.length-1){
    			albumCovers_element +=  buildAlbumCover(folderName, albumName, albumCoverImage, "lastCellInRow");
    		} else if ( x == albumCovers_config.length-1){
    			albumCovers_element +=  buildAlbumCover(folderName, albumName, albumCoverImage, "lastCell");
    		} else {
    			albumCovers_element +=  buildAlbumCover(folderName, albumName, albumCoverImage, "middleCell");
    		}
    	}
    	$("#albumCoversTable").append(albumCovers_element);

    	//NOTE: This is where I could add a handler for what to do if the album value is not valid. 

    	// ADDING A LISTENER FOR EACH ALBUM COVER
    	$(".albumCoversSingleCell").click(function(){
	        var albumID = $(this).attr("data-album-id");
	        var portfolioPath= window.location.href; 
	        window.location.assign(portfolioPath + "albums.html?name="+albumID);
	    });
});
}

/*
	@desc -- Used to build each album cover and return the element
	@params -- Name of the album, the image for the album, which number in the row is it (i.e. type)
*/
function buildAlbumCover(folderName, albumName, coverImage, typeOfCell){
	var openCell, closeCell;
	var openCoverDesc = "<div class=\"albumCoverDescription\">";
	var closeCoverDesc = "</div>";
	var img = "<img class='albumCoverPhoto imageHover' src='/images/gallery/"+folderName+"/"+ coverImage + "'/>";
	switch(typeOfCell){
		case "firstCellInRow":
			openCell = "<div class=\"albumCoversRow\">\n\t<div data-album-id=\""+folderName+"\" class=\"albumCoversSingleCell\">"; 
			closeCell = "</div>";
			break;
		case "lastCellInRow":
			openCell = "\n\t<div data-album-id=\""+folderName+"\" class=\"albumCoversSingleCell\">";
			closeCell = "</div>\n</div>\n<div class=\"albumCoversRow\">";
			break;
		case "lastCell":
			openCell = "\n\t<div data-album-id=\""+folderName+"\" class=\"albumCoversSingleCell\">" ;
			closeCell = "</div>";
				break;
		case "middleCell":
			openCell = "\n\t<div data-album-id=\""+folderName+"\" class=\"albumCoversSingleCell\">";
			closeCell = "</div>";
			break;
		default:
			openCell = "<div style='display:hidden'>";
			closng = "</div>";
	}
	return openCell  + img + openCoverDesc  + albumName + closeCoverDesc + closeCell; 
}


/*	
	@desc -- Makes the ajax call to retrieve information about the different albums. 
			Also sets some event listeners for the images and related buttons (i.e. directional buttons)
	@params -- The name of the album; Used to get the photos from the correct config file
*/
function getAlbumPhotos(folderName){
	$.get("/config/"+folderName+".txt", function(results){
    	var albumPhotos_config = results.split("\n");
    	var albumPhotos_element = ""; 

    	for (var counter = 1; counter < albumPhotos_config.length; counter++){
    		var photo = albumPhotos_config[counter].split(", ")[0];
    		// var description = albumPhotos_config[counter].split(", ")[1];
    		var dimension = albumPhotos_config[counter].split(", ")[1];

    		if (counter == 1){
    			albumPhotos_element += buildAlbumPhoto(folderName, photo, counter, "firstCellInRow");
    		} else if ( (counter % 3) == 0 && counter != albumPhotos_config.length-1){
    			albumPhotos_element += buildAlbumPhoto(folderName, photo, counter, "lastCellInRow");
    		} else if ( counter == albumPhotos_config.length-1){
    			albumPhotos_element += buildAlbumPhoto(folderName, photo, counter, "lastCell");
    		} else {
    			albumPhotos_element += buildAlbumPhoto(folderName, photo, counter, "middleCell");
    		}
            $("#galleryModalImageContainer").append("<img class=\"galleryModalImage\" data-photo-dimension=\""+dimension+"\" src='/images/gallery/"+folderName+"/" + photo + "'/>");
            // $("#galleryModalImageDescriptions").append("<p class=\"galleryDescription\">" + description + "</p>");

    	}
    	$("#albumPhotosTable").append(albumPhotos_element);
    	galleryModalEventListeners();
    	setTimeout(function(){
    		$(".backToAlbums").fadeIn();
    		var arr = $(".albumPhoto").toArray();
    		for (var x in arr){
    			// $(arr[x]).css("width", "33.333%").css("height","200px");
    			$(arr[x]).css("width", "95%").css("height","inherit");
    		}
    	}, 70);
    });
}

/*
	@desc -- Used to build each photo in the list for the album
	@params -- Name of the album, the image for the album, the number in the loop, which number in the row is it (i.e. type)
*/
function buildAlbumPhoto(folderName, photo, photoIndex, typeOfCell){
	var openCell, closeCell;
	var img = "<img class='albumPhoto imageHover' src='/images/gallery/"+folderName+"/" + photo + "'/>";

	switch(typeOfCell){
		case "firstCellInRow":
			openCell = "<div class=\"albumPhotosRow\">\n\t<div data-photo-index=\""+photoIndex+"\" class=\"albumPhotosSingleCell\">"; 
			closeCell = "</div>";
			break;
		case "lastCellInRow":
			openCell = "\n\t<div data-photo-index=\""+photoIndex+"\"  class=\"albumPhotosSingleCell\">";
			closeCell = "</div>\n</div>\n<div class=\"albumPhotosRow\">";
			break;
		case "lastCell":
			openCell = "\n\t<div data-photo-index=\""+photoIndex+"\" class=\"albumPhotosSingleCell\">" ;
			closeCell = "</div>";
			break;
		case "middleCell":
			openCell = "\n\t<div data-photo-index=\""+photoIndex+"\" class=\"albumPhotosSingleCell\">";
			closeCell = "</div>";
			break;
		default:
			openCell = "<div style='display:hidden'>";
			closng = "</div>";
	}
	return openCell  + img + closeCell; 
}


/*
	@desc -- Adds a set of listeners to different elements related to the gallery modal; including opening, closing and moving in slideshow
*/
function galleryModalEventListeners(){
	var galleryModalPhotos_array, galleryDescriptions_array;
    galleryModalPhotos_array = $(".galleryModalImage").toArray();
    galleryDescriptions_array = $(".galleryDescription").toArray();
    
    // SET THE NUMBER OF PHOTOS IN THIS SLIDESHOW
    $("#numberOfGalleryModalImages").html(galleryModalPhotos_array.length);
    
    // THE LISTENER FOR AN IMAGE IN THE LIST OF PHOTOS; OPENS THE MODAL
    $(".albumPhotosSingleCell").click(function(){
	    $("#albumSection").css("opacity", "0.0");
		$("#navbar-navigation-section").css("opacity", "0.0");
		$("#navbar-social-links-section").css("opacity", "0.0");
		$("#navbar-logo-section").css("opacity", "0.0").css("z-index", -10);
		// $("#navbar-logo-section").css("position", "fixed").css("z-index", 10);

		$("#galleryModal").show().css("z-index", 10);
		$("body").css("overflow", "hidden");
		var photoIndex = Number($(this).attr("data-photo-index"));
		var photoIndex = Number($(this).attr("data-photo-index"));
		$("#currentGalleryModalImage").html(photoIndex-1);
		nextGalleryImage(galleryModalPhotos_array, "right");
    });

    // THE LISTENER TO CLOSE THE MODAL
     $("#closeGalleryModal").click(function(){
    	closeGallery();

    });
    $(window).click(function(event){
    	if (event.target.id == "galleryModal"){
    		closeGallery();
    	}
    });

    // THE LISTENERS FOR MOVING THE SLIDESHOW LEFT OR RIGHT
    $("#galleryModalLeftButton").click(function(){
    	nextGalleryImage(galleryModalPhotos_array, "left");
    });
    $("#galleryModalRightButton").click(function(){
    	nextGalleryImage(galleryModalPhotos_array, "right");
    });
	var galleryModalImageContainer = document.getElementById("galleryModalImageContainer");
	swipedetect(galleryModalImageContainer, function(swipedir){
	    if (swipedir == "left") {
    		nextGalleryImage(galleryModalPhotos_array, "right");
	    } else if (swipedir == "right"){
    		nextGalleryImage(galleryModalPhotos_array , "left");
	    }
	});
    $(document).keydown(function(event){
    	if(event.which == 37){
    		nextGalleryImage(galleryModalPhotos_array, "left");
    	} else if (event.which == 39){
	    	nextGalleryImage(galleryModalPhotos_array, "right");
    	} else if (event.which == 27){
    		closeGallery();
    	}
    });
}


function closeGallery(){
	$("#albumSection").css("opacity", "1.0");
	$("#navbar-navigation-section").css("opacity", "1.0");
	$("#navbar-social-links-section").css("opacity", "1.0");
	$("#navbar-logo-section").css("opacity", "1.0").css("z-index", 10);

	// $("#navbar-logo-section").css("position", "fixed").css("z-index", 10);
	$("#galleryModal").css("z-index", -10).hide();
	$(".galleryModalImage").hide();
	$(".galleryDescription").hide();
	$("body").css("overflow", "scroll");

	$("#galleryModal").hide();
	$("#albumSection").css("opacity", "1.0");
	$("#navbar").css("opacity", "1.0");
	$(".galleryModalImage").hide();
	$(".galleryDescription").hide();
	$("body").css("overflow", "scroll");
}

/*
	@desc -- Shows the next image in the gallery slideshow (accounts for direction)
	@params -- The array of photos, the array of descriptions for the photos, the direction to go in the slideshow. 
*/
function nextGalleryImage(galleryPhotos, direction){
	var currentID = Number($("#currentGalleryModalImage").html());
	var limitID = Number($("#numberOfGalleryModalImages").html())
	var nextID; 
	if (currentID == 1 && direction == "left" ){
		nextID = limitID;
		$(".galleryModalImage").hide();
		$("#currentGalleryModalImage").empty().html(nextID);
		var dimm = $(galleryPhotos[nextID-1]).attr("data-photo-dimension");
		setImageDimensions("galleryModalImageContainer", dimm);
		// $(galleryPhotos[nextID-1]).show();
		$(galleryPhotos[nextID-1]).fadeIn();
	} else if (currentID == limitID && direction == "right" ){
		nextID = 1;
		$(".galleryModalImage").hide();
		$("#currentGalleryModalImage").empty().html(nextID);
		var dimm = $(galleryPhotos[nextID-1]).attr("data-photo-dimension");
		setImageDimensions("galleryModalImageContainer", dimm);
		// $(galleryPhotos[nextID-1]).show();
		$(galleryPhotos[nextID-1]).fadeIn();
	} else {
		nextID = direction == "right" ? currentID + 1 : currentID - 1;
		$(".galleryModalImage").hide();
		$("#currentGalleryModalImage").empty().html(nextID);
		var dimm = $(galleryPhotos[nextID-1]).attr("data-photo-dimension");
		setImageDimensions("galleryModalImageContainer", dimm);
		// $(galleryPhotos[nextID-1]).show();
		$(galleryPhotos[nextID-1]).fadeIn();
	}
    // $("#galleryModalImageContainer").scrollTop();
	
}

// function setImageDimensions(container, dimension){
// 	var ele = "#"+container;
// 	switch (dimension){
// 		case "portrait":
// 			// $("#galleryModalImageContainer").css("width", "35%").css("height", "380px").css("border", "1px solid green");
// 			$(ele).css("width", "400px").css("height", "450px");
// 			// .css("border", "1px solid green");
// 			break;
// 		case "landscape":
// 			// $("#galleryModalImageContainer").css("width", "60%").css("height", "350px").css("border", "1px solid yellow");
// 			$(ele).css("width", "850px").css("height", "450px");
// 			// .css("border", "1px solid yellow");
// 			break;
// 		case "square":
// 			// $("#galleryModalImageContainer").css("width", "50%").css("height", "350px").css("border", "1px solid purple");
// 			$(ele).css("width", "450px").css("height", "450px");
// 			// .css("border", "1px solid purple");
// 			break;
// 		default:
// 			// $("#galleryModalImageContainer").css("width", "50%").css("height", "350px").css("border", "1px solid red");
// 			$(ele).css("width", "50%").css("height", "350px");
// 			// .css("border", "1px solid red");
// 	}
// }
