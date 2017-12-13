const contactForms = angular.module("contactForms", []);

contactForms.controller("contactFormsController", function($scope, email, dateTime){

	$scope.selectForm = function(event){
		var selectedButton = "background-color:white; color: black; border: 1px solid black;";
		if (event.srcElement.dataset.jfContactOption == "service"){
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
		$scope.hiddenFormQuestion = "font-size:0%; margin-bottom: 0%; padding: 0%;";
	};

	$scope.submitForm = function(form){
		$scope.showServiceForm = $scope.showFeedbackForm = false;
		$scope.submittingForm = true;
		email.submitForm(form);
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
