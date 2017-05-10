$(document).ready(function(){
	var query = window.location.search;
    if (query){
    	var query_folder_name = query.slice(6);
    	getAlbumPhotos(query_folder_name);
    } else {
    	getAlbumCovers();
    }
});

// @desc -- Makes the ajax call to retrieve information about the different albums
function getAlbumCovers(){
	$.get("/JF_Photography/config/albumCovers.txt", function(results){
    	var album_covers_info = results.split("\n");
    	var album_covers_listing = ""; 

    	for (var x = 1; x < album_covers_info.length; x++){
    		var folder_name = album_covers_info[x].split(", ")[0];
    		var album_name = album_covers_info[x].split(", ")[1];
    		var album_cover_img = album_covers_info[x].split(", ")[2];
    		if (x == 1){
    			album_covers_listing = album_covers_listing + buildAlbumCover(folder_name, album_name, album_cover_img, 1);
    		} else if ( (x % 3) == 0 && x != album_covers_info.length-1){
    			album_covers_listing = album_covers_listing + buildAlbumCover(folder_name, album_name, album_cover_img, 2);
    		} else if ( x == album_covers_info.length-1){
    			album_covers_listing = album_covers_listing + buildAlbumCover(folder_name, album_name, album_cover_img, 3);
    		} else {
    			album_covers_listing = album_covers_listing + buildAlbumCover(folder_name, album_name, album_cover_img, 4);
    		}
    	}
    	$("#albumTable").append(album_covers_listing);
    	$(".album_cover_td").click(function(){
	        var albumID = $(this).attr("data-album-id").replace(" ", "").toLowerCase();
	        var portfolioPath= window.location.href; 
	        window.location.assign(portfolioPath + "albums.html?name="+albumID);
	    });
    });
}
// @desc -- Used to build each album cover and return the element
// @params -- Name of the album, the image for the album, which number in the row is it (i.e. type)
function buildAlbumCover(folderName, albumName, coverImg, type){
	var open_td, close_td;
	var innerOpen = "<div class=\"inner\">";
	var innerClose = "</div>";
	var img = "<img class='album_image' src='/JF_Photography/images/gallery/"+folderName+"/"+ coverImg + "'/>";
	switch(type){
		case 1:
			open_td = "<div class=\"album_cover_tr\">\n\t<div data-album-id=\""+folderName+"\" class=\"album_cover_td\">"; 
			close_td = "</div>";
			break;
		case 2:
			open_td = "\n\t<div data-album-id=\""+folderName+"\" class=\"album_cover_td\">";
			close_td = "</div>\n</div>\n<div class=\"album_cover_tr\">";
			break;
		case 3:
			open_td = "\n\t<div data-album-id=\""+folderName+"\" class=\"album_cover_td\">" ;
			close_td = "</div>\n</tr>";
			break;
		case 4:
			open_td = "\n\t<div data-album-id=\""+folderName+"\" class=\"album_cover_td\">";
			close_td = "</div>";
			break;
		default:
			open_td = "<div style='display:hidden'>";
			closng = "</div>";
	}
	return open_td  + img + innerOpen  + albumName + innerClose + close_td; 
}

// @desc -- Makes the ajax call to retrieve information about the different albums. 
// 			Also sets some event listeners for the images and related buttons (i.e. directional buttons)
// @params -- The name of the album; Used to get the photos from the correct config file
function getAlbumPhotos(folderName){
    var gallery_photos_array;
	$.get("/JF_Photography/config/"+folderName+".txt", function(results){
    	var album_photos = results.split("\n");
    	var album_photos_listing = ""; 

    	for (var x = 1; x < album_photos.length; x++){
    		var photo = album_photos[x].split(", ")[0];
    		var description = album_photos[x].split(", ")[1];
    		if (x == 1){
    			album_photos_listing = album_photos_listing + buildAlbumPhoto(folderName, photo, x, 1);
    		} else if ( (x % 3) == 0 && x != album_photos.length-1){
    			album_photos_listing = album_photos_listing + buildAlbumPhoto(folderName, photo, x, 2);
    		} else if ( x == album_photos.length-1){
    			album_photos_listing = album_photos_listing + buildAlbumPhoto(folderName, photo, x, 3);
    		} else {
    			album_photos_listing = album_photos_listing + buildAlbumPhoto(folderName, photo, x, 4);
    		}
            $("#galleryModalImageContainer").append("<img class=\"galleryImage\" src='/JF_Photography/images/gallery/"+folderName+"/" + photo + "'/>");
            $("#galleryModalImageDescriptions").append("<p class=\"galleryDescription\">" + description + "</p>");

    	}
    	$("#albumTable").append(album_photos_listing);
    	$(".galleryImage").hide();
    	$(".galleryDescription").hide();
    	gallery_photos_array = $(".galleryImage").toArray();
    	gallery_descriptions_array = $(".galleryDescription").toArray();
    	$("#numberOfGalleryImages").html(gallery_photos_array.length);
    	$(".album_photos_td").click(function(){
    		$("#galleryModal").show().css("z-index", 10);
    		$("body").css("overflow", "hidden");
    		var photoID = Number($(this).attr("data-photo-id"));
    		$("#currentGalleryImage").html(photoID);
    		$(gallery_photos_array[photoID-1]).show();
    		$(gallery_descriptions_array[photoID-1]).show();
	    });
	    $("#closeGalleryModal").click(function(){
    		$("#galleryModal").css("z-index", -10).hide();
    		$(".galleryImage").hide();
    		$(".galleryDescription").hide();
    		$("body").css("overflow", "scroll");

	    });
    });
    $("#galleryModalLeftButton").click(function(){
    	nextGalleryImage(gallery_photos_array, gallery_descriptions_array , "left");
    });
    $("#galleryModalRightButton").click(function(){
    	nextGalleryImage(gallery_photos_array, gallery_descriptions_array , "right");
    });
    $(document).keydown(function(event){
    	if(event.which == 37){
    		nextGalleryImage(gallery_photos_array, gallery_descriptions_array , "left");
    	} else if (event.which == 39){
	    	nextGalleryImage(gallery_photos_array, gallery_descriptions_array , "right");
    	} else if (event.which == 27){
    		$("#galleryModal").css("z-index", -10).hide();
    		$(".galleryImage").hide();
    		$(".galleryDescription").hide();
    		$("body").css("overflow", "scroll");
    	}
    });
}
// @desc -- Used to build each photo in the list for the album
// @params -- Name of the album, the image for the album, the number in the loop, which number in the row is it (i.e. type)
function buildAlbumPhoto(folderName, photo, photoID, type){
	var open_td, close_td;
	var img = "<img class='album_image' src='/JF_Photography/images/gallery/"+folderName+"/" + photo + "'/>";
	switch(type){
		case 1:
			open_td = "<div class=\"album_photos_tr\">\n\t<div data-photo-id=\""+photoID+"\" class=\"album_photos_td\">"; 
			close_td = "</div>";
			break;
		case 2:
			open_td = "\n\t<div data-photo-id=\""+photoID+"\" class=\"album_photos_td\">";
			close_td = "</div>\n</div>\n<div class=\"album_photos_tr\">";
			break;
		case 3:
			open_td = "\n\t<div data-photo-id=\""+photoID+"\" class=\"album_photos_td\">" ;
			close_td = "</div>\n</tr>";
			break;
		case 4:
			open_td = "\n\t<div data-photo-id=\""+photoID+"\" class=\"album_photos_td\">";
			close_td = "</div>";
			break;
		default:
			open_td = "<div style='display:hidden'>";
			closng = "</div>";
	}
	return open_td  + img + close_td; 
}

// @desc -- Shows the next image in the gallery slideshow (accounts for direction)
// @params -- The array of photos, the array of descriptions for the photos, the direction to go in the slideshow. 
function nextGalleryImage(galleryPhotos, galleryDescriptions, direction){
	var currentID = Number($("#currentGalleryImage").html());
	var limitID = Number($("#numberOfGalleryImages").html())
	var nextID; 
	if (currentID == 1 && direction == "left" ){
		nextID = limitID;
		$(".galleryImage").hide();
		$(".galleryDescription").hide();
		$("#currentGalleryImage").empty().html(nextID);
		$(galleryPhotos[nextID-1]).show();
		$(galleryDescriptions[nextID-1]).show();
	} else if (currentID == limitID && direction == "right" ){
		nextID = 1;
		$(".galleryImage").hide();
		$(".galleryDescription").hide();
		$("#currentGalleryImage").empty().html(nextID);
		$(galleryPhotos[nextID-1]).show();
		$(galleryDescriptions[nextID-1]).show();
	} else {
		nextID = direction == "right" ? currentID + 1 : currentID - 1;
		$(".galleryImage").hide();
		$(".galleryDescription").hide();
		$("#currentGalleryImage").empty().html(nextID);
		$(galleryPhotos[nextID-1]).show();
		$(galleryDescriptions[nextID-1]).show();
	}
}

