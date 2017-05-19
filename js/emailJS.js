(function(){
  emailjs.init("user_6LgqYqLc1866439iII9Iw");
})();
$(document).ready(function(){
	$("form").submit(function(event){
		event.preventDefault();
		if (event){
			$(".formToSubmit").hide();
			var loadImage =	"<img src=\"/JF_Photography/images/badges/loading.gif\" width=\"200\" height=\"200\" style=\"margin-top:2%; border-color:red;\" alt=\"Sad\"/>"
			$("#formResultsSection").append(loadImage).show();
			var form = $(this).attr("id");
			if (form == "feedbackForm"){
				processFeedback();
			} else if (form == "requestServiceForm"){
				processRequest();
			}
		}
		
		// console.log("Name = " + full_Name 
		// 			+ "\nEmail = " + email_Address 
		// 			+ "\nPhone Number = " + phone_Number 
		// 			// + "\nDates List = " + dates_List
		// 			// + "\nTimes List = " + times_List 
		// 			+  "\nDescription = " + description
		// 			+ "\nDatetime Combo " + dateTimeCombo);
	});
});

function processFeedback(){
		// var full_Name = $("[name='fullName']").val();
		var full_Name = $("#feedbackField_Name").val();
		var email_Address = $("#feedbackField_Email").val();
		var feedback = $("[name='feedback']").val();

		// emailjs.send("default_service","new_feedback",
		// 	{ 	name: full_Name, 
		// 		emailAddress: email_Address,
		// 		feedback : feedback
		// 	}).then(function(response) {
		// 		console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
		// 		$(".formToSubmit").hide();
		// 		$("#formResultsSection").show();
		// 	}, function(err) {
		// 		console.log("FAILED. error=", err);
		// 	});
		console.log("Name = " + full_Name 
					+ "\nEmail = " + email_Address
					+  "\nFeedback = " + feedback);
		formResults("feedbackForm", "success");
		// formResults("feedbackForm", "fail");
}
function processRequest(){
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
	// 		console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
	// 		$(".formToSubmit").hide();
	// 		$("#formResultsSection").show();
	// 	}, function(err) {
	// 		console.log("FAILED. error=", err);
	// 	});
	console.log("Name = " + full_Name 
					+ "\nEmail = " + email_Address 
					+ "\nPhone Number = " + phone_Number 
					// + "\nDates List = " + dates_List
					// + "\nTimes List = " + times_List 
					+  "\nDescription = " + description
					+ "\nDatetime Combo " + dateTimeCombo);
	formResults("requestServiceForm", "success");
	// formResults("requestServiceForm", "fail");

}

function formResults(formID, status){
	$("#formResultsSection img").remove();
	var firstImage = "<img src=\"/JF_Photography/images/badges/camera_flash.gif\" width=\"400\" height=\"400\" style=\"margin-top:2%;\" alt=\"Sad\"/>";
	var oops = "<img src=\"/JF_Photography/images/badges/sadness_emoji.png\" width=\"100\" height=\"100\" style=\"margin-top:2%;\" alt=\"Sad\"/>"
	var firstSentence = formID == "feedbackForm" ? "Thanks for the feedback!" : "Thanks for your request!";
	var secondSentence = formID == "feedbackForm" ? "I greatly appreciate your thoughts." : "I will follow-up with you within the next 48 hours.";
	var count = 2;

	if (status == "fail"){
		$("#formStatusSection").prepend(oops);
		$("#formStatusSentence").html("Ooops! <br/> Something went wrong!");
		$("#formStatusSentence2").html("You can try again, or just reach out to me directly at jf@gmail.com");
		$("#formStatusSection").fadeIn("slow");
	} else {	
		$("#counterSection").fadeIn();
		$(".resetAfterSubmit").val('').css("background-color", "white");
		setTimeout(function(){
			$("#countDowner").empty().html(count);
			setTimeout(function(){
				count--;
				$("#countDowner").empty().html(count);
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
		// <h1 style=\"padding:2%;\" id=\"formStatus\">Your request has been submitted!</h1>
		// <h1 style=\"padding:1%;\" id=\"formStatus\"></h1>
		// <h4 style=\"padding:1%;\" id=\"formStatus_sentenceOne\">I will be in touch with you within the next <em>48 hours</em></h4>
		// <h4 style=\"padding:1%;\" id=\"formStatus_sentenceOne\"></h4>
		// <p>In the meantime, feel free to <a href=\"/JF_Photography/portfolio\">checkout out my portfolio</a></p>


}






