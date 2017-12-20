const portfolioApp = angular.module("portfolioApp", []);

portfolioApp.controller("portfolioController", function($scope, $http){


	$scope.albumTitle = "My Albums";
	// var query = window.location.search;
	// var queryName = query.split("=")[0].substring(1);
	// var albumName = query.substring(query.lastIndexOf("=")+1); // Check the URL for a query search (specifically a value for the name of the album);
	// if (query && (albumName !== "Studio") ) {
	// 	$scope.photosNotFound = true; 
	// } else if (query && albumName && queryName == "album"){
	// 	$scope.photosNotFound = false; 
	// 	$scope.test = true;
	// } else {
	// 	$scope.test = false;
	// }
	$http.get("/config/albumsJSON.txt")
		.then(function(payload){
			$scope.albums = payload.data;
			console.log(payload.data);
		}, function(error){
			console.err(error);
		});

	// $scope.albums = [ 
	// 		{name: "Studio", folderName: "Studio", coverImg: "images/gallery/Studio/image1.jpg" },
	// 		{name: "Studio 2", folderName: "Studio", coverImg: "images/gallery/Studio/image1.jpg" },
	// 		{name: "Studio 3", folderName: "Studio", coverImg: "images/gallery/Studio/image1.jpg" },
	// 		{name: "Studio 4", folderName: "Studio", coverImg: "images/gallery/Studio/image1.jpg" },
	// 		{name: "The Second Album", folderName: "The Second Album", coverImg: "images/gallery/The Second Album/image2.jpg" },
	// 		{name: "The Second Album", folderName: "The Second Album", coverImg: "images/gallery/The Second Album/image2.jpg" },
	// 		{name: "The Second Album", folderName: "The Second Album", coverImg: "images/gallery/The Second Album/image2.jpg" },
	// 		{name: "The Second Album", folderName: "The Second Album", coverImg: "images/gallery/The Second Album/image2.jpg" }
	// 		];



	$scope.albumLength = 0;
	$scope.testFunc = function(ele){

		var albumName = ele.target.innerHTML ? ele.target.innerHTML : false;
		$scope.albumTitle = albumName
		console.log($scope.albums[albumName].images.length);
		$scope.albumLength = $scope.albums[albumName].images.length;
		$scope.singleAlbum = $scope.albums[albumName].images;
		$scope.singleAlbumView = true;

	}

	$scope.backToAlbums = function (){
		$scope.singleAlbumView = false;
		$scope.albumTitle = "My Albums"
	}


	$scope.viewedImage;
	$scope.viewingIndex;
	$scope.openImage = function(index){
		// console.log(ele.target.style);
		$scope.viewingIndex = index;
		$scope.modalOpen = true;
		// getCurrentIndex(index);
		document.getElementById("viewingImage").innerHTML = index+1;


		console.log("New Index = photo-0" + index);

		var thisWidth = $scope.singleAlbum[index].width;
		var thisHeight = $scope.singleAlbum[index].height;
		console.log(thisWidth);
		// var targetWidth = thisWidth > 2000 ? thisWidth / 6 : thisWidth / 4; 
		var targetWidth = thisWidth / 4; 
		var targetHeight = (thisHeight / thisWidth ) * targetWidth;
		var element = document.getElementById("photo-0"+index);
		element.scrollIntoView();
		$scope.viewedImage = element;
		element.classList.remove("imgTest");
		element.classList.remove("imgTestLoad");
		element.classList.add("galleryImgViewed");
		element.style.width = targetWidth+"px";
		element.style.height = targetHeight+"px";
		element.style.marginTop = "-"+(targetHeight/2)+"px";
		element.style.marginLeft = "-"+(targetWidth/2)+"px";
		document.getElementById("galleryModal-x").style.display = "block";
	}

	$scope.closeImage = function(){
		console.log("Inside closeImg");
		// var element = document.getElementById("photo-0"+$scope.viewingIndex);
		$scope.viewedImage.style.width = "100%";
		$scope.viewedImage.style.height = "100%";
		$scope.viewedImage.style.marginTop = "0px";
		$scope.viewedImage.style.marginLeft = "0px";
		$scope.viewedImage.classList.add("imgTest");
		$scope.viewedImage.classList.remove("galleryImgViewed");

	}

	$scope.closeModal = function(){
		document.getElementById("galleryModal-x").style.display = "none";
		$scope.modalOpen = false;
		console.log("Inside closeModal");
		$scope.closeImage();
	}	

	$scope.keyboardListener = function(){
		window.onkeyup = function(event){

			var nextImage = $scope.viewingIndex == $scope.albumLength-1 ? 0 : $scope.viewingIndex+1;
			var prevImage = $scope.viewingIndex == 0 ? $scope.albumLength-1 : $scope.viewingIndex-1;
			if ($scope.modalOpen){
				switch(event.which){
					case 37:   //left arrow
						// console.log($scope.viewingIndex);
						// console.log(prevImage);
						$scope.closeImage();
						$scope.openImage(prevImage);
						break;
					case 39:   // right arrow
						// console.log(nextImage);
						$scope.closeImage();
						$scope.openImage(nextImage);
						break;
					case 27: //Escape button
						$scope.closeModal();
						break;
					default:
						event.preventDefault();
				}
			}
	    }
	}
	$scope.keyboardListener();


});

portfolioApp.directive("albumPhoto", function(){
	return {
		restrict: "EA",
		template: "<img id=\"photo-0{{$index}}\" class=\"imgTest galleryImage imgTestLoad\" src=\"{{y.path}}\" alt=\"{{y.path}}\" ng-click=\"openImage($index)\">",
		link: function($scope, $element, $attr){
			if($scope.$last){
				var theImgs = document.getElementsByClassName("imgTest");
				angular.forEach(theImgs, function(val, key, obj){
					// console.log(val);
					setTimeout(function(){
						val.style.width="100%";
						val.style.height="100%";
					}, 300);
				});
				// document.getElementById("ngApp").style.visibility = "visible";
				// document.getElementById("ngApp").style.opacity =  1;
			}
			// $timeout(function($element){
			// 	var theImage = $element[0].querySelectorAll("img")[0];
			// 	theImage.style.width = "100%";
			// 	theImage.style.height = "100%";
			// 	// $element.style.width = "100%";
			// 	// $element.style.height = "100%";
			// },2000);
		}
	}
});

portfolioApp.directive("galleryModal", function(){
	return{
		restrict: 'AE', 
		templateUrl: "/pages/shared/galleryModal.html"
	}
});

portfolioApp.directive("photosNotFound", function(){
	return {
		restrict: "AE",
		templateUrl: "/pages/shared/photosNotFound.html"
	}
});

portfolioApp.directive("testDir", function(){
	return{
		template: "<div style=\"width:100%;\"><h3>Hello</h3></div>"
	}
});


