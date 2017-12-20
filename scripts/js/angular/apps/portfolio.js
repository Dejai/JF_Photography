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


	$scope.testFunc = function(ele){

		var albumName = ele.target.innerHTML ? ele.target.innerHTML : false;
		$scope.albumTitle = albumName
		console.log($scope.albums[albumName].images);
		$scope.singleAlbum = $scope.albums[albumName].images;
		$scope.singleAlbumView = true;

	}

	$scope.backToAlbums = function (){
		$scope.singleAlbumView = false;
		$scope.albumTitle = "My Albums"
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


