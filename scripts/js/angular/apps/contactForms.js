const contactForms = angular.module("contactForms", []);

contactForms.controller("contactFormsController", function($scope, $timeout, email, dateTime){

	$scope.checkQueryString = function(){
		var search = window.location.search;
		var query = search ? search.replace("?", "").trim().split("=") : false;
		if (query != false) {
			if (query[0] == "ref" && query[1] == "a"){
				$scope.selectForm("service");
			}
		}
	}

	$scope.selectForm = function(event){		
		let formValue = typeof(event) === "string" ? event : event.srcElement.dataset.jfContactOption;
		$scope.hiddenFormQuestion = "font-size:0%; margin-bottom: 0%; padding: 0%;";
		var selectedButton = "background-color:white; color: black; border: 1px solid black;";
		if (formValue == "service"){
			$scope.serviceStyle = selectedButton;
			$scope.showServiceForm = true;
			$scope.showFeedbackForm = false;
			$scope.feedbackStyle = "";
			dateTime.dateAndTime();
		} else {
			$scope.feedbackStyle = selectedButton;
			$scope.showFeedbackForm = true;
			$scope.showServiceForm = false;
			$scope.serviceStyle = "";
		}
	};
	
	$scope.checkQueryString();



	$scope.submitForm = function(form){
		$scope.showServiceForm = $scope.showFeedbackForm = false;
		$scope.submittingForm = true;
		setTimeout(function(form){
			$scope.submittingForm = false;
			// $scope.formSubmitted = true;
			email.submitForm(form);
		}, 5000, form);
	}

});


// The Directives


contactForms.directive("navBar", function(){
	return {
		restrict: 'EA',
		link: function(scope, element, index){
			sharedFunctions.highlightCurrentPage(element);
		},
		templateUrl: '/pages/shared/navbar.html'		
	};
});

contactForms.directive("serviceForm", function(){
	return {
		restrict: 'AE',
		templateUrl: "/pages/shared/form_service.html"
	};
});
contactForms.directive("feedbackForm", function(){
	return {
		restrict: 'AE',
		templateUrl: "/pages/shared/form_feedback.html"
	};
});
