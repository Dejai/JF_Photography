	// <!-- The latest AngularJS minified JavaScript -->
	// <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>


var contactForms = angular.module("contactForms", []);

contactForms.controller("contactFormsController", function($scope, dateTime){

	// First things first ... Initialize the emailJS object with my account ID. 
	emailjs.init("user_6LgqYqLc1866439iII9Iw");

	// Second .... Initialize the datetime parts of the form?
	dateTime.dateAndTime();



});
