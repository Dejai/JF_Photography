angular.module("contactForms").service("email", function($http){

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
		formResults(form, 200);

		// emailjs.send("default_service",template, formObject)
		// 		.then(function(response) {
		// 			// formResults("feedbackForm", response.status);
		// 			console.log("Email sent");
		// 		}, function(err) {
		// 			console.log("Email could not be sent");
		// 			// formResults("feedbackForm", err);
		// 		});
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
			let full_Name = $("#feedbackField_Name").val() ? $("#feedbackField_Name").val() : "Anonymous" ;
			let feedback = $("[name='feedback']").val();
			return { 	"name": full_Name, 
						"feedback" : feedback
					};
		}
	}

	this.processRequest = function(){
		var full_Name = $("[name='fullName']").val();
		var email_Address = $("[name='emailAddress']").val();
		var  phone_Number = $("[name='phoneNumber']").val() ? $("[name='phoneNumber']").val() : "N/A";
		var dates_List = $(".datePicker").toArray();
		var times_List = $(".timePicker").toArray();
		var dateTimeCombo = ""; 
		for (var x in dates_List){
			var timee = times_List[x].value != '' ? times_List[x].value : " N/A "
			if (x == 0){
				dateTimeCombo += dates_List[x].value + " at " + timee + " ( preferred date / time )\t|| ";
			} else { 
				dateTimeCombo += dates_List[x].value + " at " + timee + "\t|| ";
			}
		}
		var description = $("[name='description']").val();
		// emailjs.send("default_service","new_request",
		// 	{ 	name: full_Name, 
		// 		emailAddress: email_Address,
		// 		phoneNumber : phone_Number, 
		// 		dates : dateTimeCombo,
		// 		description : description
		// 	}).then(function(response) {
		// 		formResults("requestServiceForm", response.status);
		// 	}, function(err) {
		// 		formResults("requestServiceForm", err);
		// 	});
		console.log("Name = " + full_Name 
						+ "\nEmail = " + email_Address 
						+ "\nPhone Number = " + phone_Number
						+  "\nDescription = " + description
						+ "\nDatetime Combo " + dateTimeCombo);
		formResults("requestServiceForm", 200);
		formResults("requestServiceForm", "fail");
	}

	this.processFeedback = function(){
		var full_Name = $("#feedbackField_Name").val() ? $("#feedbackField_Name").val() : "Anonymous" ;
		var feedback = $("[name='feedback']").val();
		emailjs.send("default_service","new_feedback",
			{ 	name: full_Name, 
				feedback : feedback
			}).then(function(response) {
				formResults("feedbackForm", response.status);
			}, function(err) {
				formResults("feedbackForm", err);
			});
		// console.log("Name = " + full_Name +  "\nFeedback = " + feedback);
		// formResults("feedbackForm", "fail");
	}

	function formResults(formID, status){
		$("#formResultsSection img").remove();
		$("#formStatusSentence").html("");
		$("#formStatusSentence2").html("");
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
						$("#formResultsSection").hide().append(firstImage).fadeIn("slow");
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

});