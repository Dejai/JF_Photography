angular.module("contactForms").service("formServices", function($http, $q, $timeout){


/* EMAIL JS Functionality */
	try{
		// First things first ... Initialize the emailJS object with my account ID. 
		emailjs.init("user_6LgqYqLc1866439iII9Iw");
	} catch (err){
		console.error("Couldn't initiate emailJS!\n"+err);
	} finally {
		// console.log("Moving on .. anyway");
	}

	this.submitForm = function(form){
		let formObject = getFormObject(form);
		let template = (form == "service") ? "new_request" : "new_feedback";

		/* Specifically for testing without sending an email */
			// var deferred = $q.defer();
			// let testCode = 200;
			// $timeout(function(){
			// 	deferred.resolve({status:"test", value:testCode});
			// }, 1000);
			// return deferred.promise;

		return emailjs.send("default_service",template, formObject)
				.then(function(response) {
					console.log("Email sent");
					return response;
				}, function(err) {
					console.log("Email could not be sent");
					return err
				});
	}

	this.clearResults = function(){
		$("#formResultsSection img").remove();
		$("#formStatusSentence").empty();
		$("#formStatusSentence2").empty();
	}

	this.formResults = function(formID, status){
		var firstImage = "<img id=\"successImage\" src=\"/images/assets/icons/successImage.gif\" alt=\"*INSERT CAMERA FLASH*\"/>";
		var oops = "<img src=\"/images/assets/icons/oops.png\" width=\"100\" height=\"100\" style=\"margin-top:2%;\" alt=\"*INSERT SAD FACE*\"/>"
		var firstSentence = formID == "feedback" ? "Thanks for the feedback!" : "Your request has been sent.";
		var secondSentence = formID == "feedback" ? " " : "I will be in touch with you once I've reviewed the details.";
		var count = 2;

		if (status != 200){
			$("#formStatusSection").prepend(oops);
			$("#formStatusSentence").html("Ooops! <br/> Something went wrong!");
			$("#formStatusSentence2").html("You can try again later, or just email me directly at: &nbsp;&nbsp; jfphotobiz@gmail.com");
			$("#formStatusSection").fadeIn("slow");
		} else {	
			$("#counterSection").fadeIn();
			$(".resetAfterSubmit").val('').css("background-color", "white");
			setTimeout(function(){
				$("#countDownNumber").empty().html(count);
				setTimeout(function(){
					count--;
					$("#countDownNumber").empty().html(count);
					setTimeout(function(){
						$("#counterSection").hide();
						$("#formResultsSection").hide().prepend(firstImage).fadeIn("slow");
						setTimeout(function(){
							$("#formResultsSection img").remove();
							$("#formStatusSentence").html(firstSentence);
							$("#formStatusSentence2").html(secondSentence);
							$("#formStatusSection").fadeIn("slow");
						}, 4500)
					}, 1000);
				}, 1000);
			}, 1000);
		}
	}

	var getFormObject = function(form){
		if (form == "service"){
			let full_Name = $("[name='fullName']").val();
			let email_Address = $("[name='emailAddress']").val();
			let  phone_Number = $("[name='phoneNumber']").val() ? $("[name='phoneNumber']").val() : "N/A";
			let dates_List = $(".datePicker").toArray();
			let times_List = $(".timePicker").toArray();
			let dateTimeCombo = ""; 
			for (let x in dates_List){
				let timee = times_List[x].value != '' ? " at " + times_List[x].value : " (time not selected)";
				if (x == 0){
					dateTimeCombo += "<li>" + dates_List[x].value + timee + " <em style='color:redl padding-left:1%;'> << preferred date/time</em></li>";
				} else { 
					dateTimeCombo += "<li>" + dates_List[x].value + timee + "</li>";
				}
			}
			let description = $("[name='description']").val();
			return { 	"name": full_Name, 
						"emailAddress": email_Address,
						"phoneNumber" : phone_Number, 
						"dates" : dateTimeCombo,
						"description" : description
					};

		} else if ( form == "feedback"){
			let date = new Date();
			let anonymousSuffix = date.getFullYear() +""+date.getMonth() + "" + date.getDate()+ "-"+ Math.floor(Math.random()*100)+1;
			let full_Name = $("#feedbackField_Name").val() ? $("#feedbackField_Name").val() : "Anonymous " + anonymousSuffix;
			let feedback = $("[name='feedback']").val();
			return { 	"name": full_Name, 
						"feedback" : feedback
					};
		}
	}
/* DATETIME PICKER Functionality */
	this.dateAndTime = function(dateElement, timeElement){
		$(dateElement).datetimepicker({
		  format:'m/d/y',
		  scrollInput: 'false',
		  scrollMonth: 'false',
		  timepicker:false, 
		  mask:false,
		  scrollMonth: false
		 });
		$(timeElement).datetimepicker({
			datepicker:false,
			timepicker:true,
			step:30,
			format: 'g:i A',
			formatTime: 'g:i a',
		});
	}

});