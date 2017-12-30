const contactForms = angular.module("contactForms", []);

contactForms.controller("contactFormsController", function($scope, $timeout, formServices){

	// sharedFunctions.functions(); // Show the available functions for sharedFunctions in the console log
	// sharedFunctions.mobileMenu();

	$scope.mobileMenu = function(action){
		sharedFunctions.mobileMenu(action);
	}

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
		formServices.clearResults();	
		let formValue = typeof(event) === "string" ? event : event.srcElement.dataset.jfContactOption;
		let selectedButton = "background-color:white; color: black; border: 1px solid black;";
		$scope.hiddenFormQuestion = "font-size:0%; margin-bottom: 0%; padding: 0%;";
		if ($scope.submittingForm){
			return null;  //Do not allow users to select another form while the form is being processed
		} else if (formValue == "service"){
			$scope.dates = [0];
			$scope.serviceStyle = selectedButton;
			$scope.feedbackStyle = "";
			$scope.showServiceForm = true;
			$scope.showFeedbackForm = false;
		} else {
			$scope.feedbackStyle = selectedButton;
			$scope.serviceStyle = "";
			$scope.showFeedbackForm = true;
			$scope.showServiceForm = false;
		}
	};
	
	$scope.checkQueryString();

	$scope.validateForm = function(form){
		let formId = form == "service" ? "requestServiceForm" : "feedbackForm";
		let requiredFields = document.getElementById(formId).querySelectorAll("[required]");
		let notReady = 0;
		angular.forEach(requiredFields, function(value, key, obj){
			if (!value.value){
				notReady++;
			}
		});
		return (notReady == 0);
	}

	$scope.submitForm = function(form){
		if ($scope.validateForm(form)){
			console.log("Form is ready.");
			$scope.showServiceForm = $scope.showFeedbackForm = false;
			$scope.submittingForm = true;
			formServices.submitForm(form)
						.then(function(payload){	
							if (payload.status == "test"){
								$scope.submittingForm = false;
								$scope.formSubmitted = true;
								formServices.formResults(form, payload.value);
							} else if (payload.status == 200){
								var scope = angular.element(document.getElementById('formProcessingGif')).scope();
								scope.$apply(function(){
									scope.submittingForm = false;
								});
								var scope2 = angular.element(document.getElementById('formResultsSection')).scope();
								scope2.$apply(function(){
									$scope.formSubmitted = true;
								});
								formServices.formResults(form, payload.status);
							} else {
								formServices.formResults(form, 400);
							}
						}, function(error){
							formServices.formResults(form, 500);
						});
		} else {
			console.log("Form is not ready!");
		}
	}


	$scope.loadSources = function(){
		var script_emailjs = document.createElement("script");
		script_emailjs.src = "https://cdn.emailjs.com/dist/email.min.js";

		var script_datetime = document.createElement("script");
		script_datetime.src = "/scripts/js/datetimepicker-master/build/jquery.datetimepicker.full.min.js";

		var link_datetime = document.createElement("link");
		link_datetime.rel = "stylesheet";
		link_datetime.href= "/scripts/js/datetimepicker-master/jquery.datetimepicker.css";

		document.getElementsByTagName("head")[0].appendChild(script_emailjs);
		document.getElementsByTagName("head")[0].appendChild(script_datetime);
		document.getElementsByTagName("head")[0].appendChild(link_datetime);

		//  I need to consider a better way of running these "chain" functions
		$timeout(function(){
			$scope.scriptsLoaded = true;
			formServices.initiateEmailJS();
			var newDate = document.getElementById("requestServiceForm").querySelectorAll(".datePicker")[0];
			var newTime = document.getElementById("requestServiceForm").querySelectorAll(".timePicker")[0];
			$scope.setDatetime(newDate, newTime);
		}, 3000);
	}
	
	$scope.dates = [0];
	$scope.addDateTimeRow = function(){
		var lastNum = $scope.dates[$scope.dates.length-1];
		$scope.dates.push(lastNum+1);
	}
	$scope.removeDateTimeRow = function(){
		$scope.dates.pop();
	}
	$scope.setDatetime = function(date, time){
		formServices.dateAndTime(date, time);
	}
});


// The Directives
	contactForms.directive("serviceForm", function(){
		return {
			restrict: 'AE',
			templateUrl: "/pages/shared/form_service.html"
		};
	});
	contactForms.directive("feedbackForm", function(){
		return {
			restrict: 'AE',
			link: function(scope, element, index){
				scope.contactFormOpacity = "opacity:1"; // Ease-in the contact form section with CSS animation
				scope.loadSources();
			},
			templateUrl: "/pages/shared/form_feedback.html"
		};
	});

	contactForms.directive("dateTimeRows", function(){
		return {
			restrict: 'EA',
			link: function(scope, element, index){
				if ( scope.scriptsLoaded ) {
					var newDate = element[0].querySelectorAll(".datePicker")[0];
					var newTime = element[0].querySelectorAll(".timePicker")[0];
					scope.setDatetime(newDate, newTime);
				}
			},
			templateUrl:  "/pages/shared/form_datetimeRows.html"
		}
	})
