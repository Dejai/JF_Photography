(function(){
  emailjs.init("user_6LgqYqLc1866439iII9Iw");
})();

$(document).ready(function(){

	AddDateTimePicker();
	addNewDateTimeRow();

	var placeholder;
	$(".clearPlaceholder").focus(function(){
		placeholder = $(this).attr('placeholder');
		$(this).attr('placeholder', '');
	});
	$(".clearPlaceholder").blur(function(){
		if ($(this).text() == ''){
			$(this).attr('placeholder', placeholder);
		}
	});
	
	$(".contactOption").click(function(){
		var option = $(this).attr("data-jf-contact-option");
		$(".contactOption").css("background-color", "black").css("color","white").css("border", "1px solid white");
		$(this).css("background-color", "white").css("color","black").css("border", "1px solid black");
		$("#contactQuestion").css("font-size", "0%").css("margin-bottom", "0%").css("padding", "0%");
		var currentSize = $(this).css("font-size");
		var newSize = Number(currentSize) - 2;
		$(".contactOption").css("font-size", newSize);
		$("#contactOptionsSection").css("padding", "1%");
		$(".formSections").hide();
		$("#formStatusSection").hide();
		switch(option){
			case "service":
				$("#requestServiceForm").show();
				break;
			case "feedback":
				$("#feedbackForm").show();
				break;
			default:
				console.log("No section selected");
		}
	});

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
	});

});

function buildAnotherDate(){
	var otherDate = "<br style=\"clear:both;\"/><br style=\"clear:both;\"/>"
					+" <div class=\"dateSelectorSection\">"
					+"<label class=\"requiredField\">Alternate Date</label><br/>"
					+"<input class=\"datePicker inheritWidth resetAfterSubmit\" name=\"dateChoice\" type=\"text\" placeholder=\"mm/dd/yy\" required>"
					+"</div>"
					+"<div class=\"timeSelectorSection\">"
					+"<label>Time</label><br/>"
					+"<input class=\"timePicker inheritWidth resetAfterSubmit\" name=\"timeChoice\" placeholder=\"h:mm\">"
					+"</div>"
					+ "<div class=\"addNewDateTimeSection\">"
					+ "<label>&nbsp;</label><br/>"
					+ "<a class=\"addNewDateTimeButton\"> + Add date / time</a>"
					+ "</div>";

	return otherDate;
}

function AddDateTimePicker(){
	$(".timePicker").datetimepicker({
		datepicker:false,
		timepicker:true,
		step:30,
		format: 'g:i A',
		formatTime: 'g:i a',
	});
	$('.datePicker').datetimepicker({
	  format:'m/d/y',
	  scrollInput: 'false',
	  scrollMonth: 'false',
	  timepicker:false, 
	  mask:false,
	  scrollMonth: false
	 });
}


function addNewDateTimeRow(){
	$(".addNewDateTimeButton").click(function(){
		$(".addNewDateTimeSection").remove();
		var nextOne = buildAnotherDate();
		$("#datetimePickerSection").append(nextOne);
		AddDateTimePicker();
		addNewDateTimeRow();
	});
}


function processFeedback(){
		var full_Name = $("#feedbackField_Name").val() ? $("#feedbackField_Name").val() : "Anonymous" ;
		var feedback = $("[name='feedback']").val();

		// emailjs.send("default_service","new_feedback",
		// 	{ 	name: full_Name, 
		// 		feedback : feedback
		// 	}).then(function(response) {
		// 		// console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
		// 		formResults("feedbackForm", response.status);
		// 	}, function(err) {
		// 		// console.log("FAILED. error=", err);
		// 		formResults("feedbackForm", err);
		// 	});
		console.log("Name = " + full_Name 
					+  "\nFeedback = " + feedback);
		formResults("feedbackForm", 200);
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
	// 		// console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
	// 		// $(".formToSubmit").hide();
	// 		// $("#formResultsSection").show();
	// 		formResults("requestServiceForm", response.status);
	// 	}, function(err) {
	// 		// console.log("FAILED. error=", err);
	// 		formResults("requestServiceForm", err);
	// 	});
	console.log("Name = " + full_Name 
					+ "\nEmail = " + email_Address 
					+ "\nPhone Number = " + phone_Number
					+  "\nDescription = " + description
					+ "\nDatetime Combo " + dateTimeCombo);
	formResults("requestServiceForm", 200);
	// formResults("requestServiceForm", "fail");
}

function formResults(formID, status){
	$("#formResultsSection img").remove();
	var firstImage = "<img id=\"cameraFlash\" src=\"/JF_Photography/images/badges/camera_flash.gif\" alt=\"*INSERT CAMERA FLASH*\"/>";
	var oops = "<img src=\"/JF_Photography/images/badges/sadness_emoji.png\" width=\"100\" height=\"100\" style=\"margin-top:2%;\" alt=\"*INSERT SAD FACE*\"/>"
	var firstSentence = formID == "feedbackForm" ? "Thanks for the feedback!" : "Your request has been sent.";
	var secondSentence = formID == "feedbackForm" ? " " : "I will be in touch with you once I've reviewed the details.";
	var count = 2;

	if (status != 200){
		$("#formStatusSection").prepend(oops);
		$("#formStatusSentence").html("Ooops! <br/> Something went wrong!");
		$("#formStatusSentence2").html("You can try again, or just reach out to me directly at jf@gmail.com");
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
