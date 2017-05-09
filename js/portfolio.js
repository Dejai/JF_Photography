$(document).ready(function(){
	var query = window.location.search;
    if (query){
    	var query_album = query.slice(6);
    	getAlbumPhotos(query_album);
    } else {
    	getAlbumCovers();
    }
});

function getAlbumCovers(){
	$.get("/JF_Photography/config/_albumCovers.txt", function(results){
    	var album_covers_info = results.split("\n");
    	var album_covers_listing = ""; 

    	for (var x = 1; x < album_covers_info.length; x++){
    		var album_name = album_covers_info[x].split(", ")[0];
    		var album_cover_img = album_covers_info[x].split(", ")[1];
    		if (x == 1){
    			album_covers_listing = album_covers_listing + buildAlbumCover(album_name, album_cover_img, 1);
    		} else if ( (x % 3) == 0 && x != album_covers_info.length-1){
    			album_covers_listing = album_covers_listing + buildAlbumCover(album_name, album_cover_img, 2);
    		} else if ( x == album_covers_info.length-1){
    			album_covers_listing = album_covers_listing + buildAlbumCover(album_name, album_cover_img, 3);
    		} else {
    			album_covers_listing = album_covers_listing + buildAlbumCover(album_name, album_cover_img, 4);
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
function buildAlbumCover(albumName, coverImg, type){
	var open_td, close_td;
	var innerOpen = "<div class=\"inner\">";
	var innerClose = "</div>";
	var img = "<img class='album_image' src='/JF_Photography/images/slideshow/" + coverImg + "'/>";
	switch(type){
		case 1:
			open_td = "<div class=\"album_cover_tr\">\n\t<div data-album-id=\""+albumName+"\" class=\"album_cover_td\">"; 
			close_td = "</div>";
			break;
		case 2:
			open_td = "\n\t<div data-album-id=\""+albumName+"\" class=\"album_cover_td\">";
			close_td = "</div>\n</div>\n<div class=\"album_cover_tr\">";
			break;
		case 3:
			open_td = "\n\t<div data-album-id=\""+albumName+"\" class=\"album_cover_td\">" ;
			close_td = "</div>\n</tr>";
			break;
		case 4:
			open_td = "\n\t<div data-album-id=\""+albumName+"\" class=\"album_cover_td\">";
			close_td = "</div>";
			break;
		default:
			open_td = "<div style='display:hidden'>";
			closng = "</div>";
	}
	return open_td  + img + innerOpen  + albumName + innerClose + close_td; 
}


function getAlbumPhotos(album){
	$.get("/JF_Photography/config/"+album+".txt", function(results){
    	var album_photos = results.split("\n");
    	var album_photos_listing = ""; 

    	for (var x = 1; x < album_photos.length; x++){
    		var photo = album_photos[x]
    		if (x == 1){
    			// console.log("<tr>\n\t<td>" + albumCover + "</td>");
    			album_photos_listing = album_photos_listing + buildAlbumPhoto(album, photo, 1);
    		} else if ( (x % 3) == 0 && x != album_photos.length-1){
    			// console.log("\n\t<td>" + albumCover + "</td>\n</tr>\n<tr>");
    			album_photos_listing = album_photos_listing + buildAlbumPhoto(album, photo, 2);
    		} else if ( x == album_photos.length-1){
    			// console.log("\n\t<td>" + albumCover + "</td>\n</tr>");
    			album_photos_listing = album_photos_listing + buildAlbumPhoto(album, photo, 3);
    		} else {
    			// console.log("\n\t<td>" + albumCover + "</td>");
    			album_photos_listing = album_photos_listing + buildAlbumPhoto(album, photo, 4);
    		}
    	}
    	$("#albumTable").append(album_photos_listing);
    	// $(".album_photos_td").click(function(){
	    //     var photoID = $(this).attr("data-photo-id").replace(" ", "").toLowerCase();
	    //     var albumPath = window.location.href; 
	    //     window.location.assign(albumPath + "albums.html?name="+albumID);
	    // });
    });
}
function buildAlbumPhoto(album, photo, type){
	var open_td, close_td;
	var img = "<img class='album_image' src='/JF_Photography/images/gallery/"+album+"/" + photo + "'/>";
	switch(type){
		case 1:
			open_td = "<div class=\"album_photos_tr\">\n\t<div data-photo-id=\""+album+"\" class=\"album_photos_td\">"; 
			close_td = "</div>";
			break;
		case 2:
			open_td = "\n\t<div data-photo-id=\""+album+"\" class=\"album_photos_td\">";
			close_td = "</div>\n</div>\n<div class=\"album_photos_tr\">";
			break;
		case 3:
			open_td = "\n\t<div data-photo-id=\""+album+"\" class=\"album_photos_td\">" ;
			close_td = "</div>\n</tr>";
			break;
		case 4:
			open_td = "\n\t<div data-photo-id=\""+album+"\" class=\"album_photos_td\">";
			close_td = "</div>";
			break;
		default:
			open_td = "<div style='display:hidden'>";
			closng = "</div>";
	}
	return open_td  + img + close_td; 
}