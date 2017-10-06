(function(){
  emailjs.init("user_6LgqYqLc1866439iII9Iw");
})();

$(document).ready(function(){

	AddDateTimePicker();
	addNewDateTimeRow();
	displayDelayed();
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
			var loadImage =	"<img src=\"/images/assets/icons/loading.gif\" width=\"200\" height=\"200\" style=\"margin-top:2%; border-color:red;\" alt=\"Sad\"/>"
			$("#formResultsSection").append(loadImage).show();
			var form = $(this).attr("id");
			if (form == "feedbackForm"){
				processFeedback();
			} else if (form == "requestServiceForm"){
				processRequest();
			}
		}
	});

	var formQueryVal = location.search.split("=")[1]; 
	whichForm(formQueryVal);

});

function whichForm(formValue){
	switch(formValue){
		case "service":
			$("#contactQuestion").hide();
			$("#requestServiceButtom").click();
			break;
		case "feedback":
			$("#contactQuestion").hide();
			$("#sendFeedbackButton").click();
			break;
		default:
			console.log("Default form selection view");
	}
}
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

function removeDateTimeRow(){
	$(".removeNewDateTimeButton").click(function(){
		// $(this).remove();
		var addButton = document.createElement("a");
		addButton.className = "addNewDateTimeButton glyphicon glyphicon-plus-sign";
		var addButtonTooltip = document.createElement("span");
		addButtonTooltip.className += "addNewDateTimeButtonTooltip";
		addButtonTooltip.append(document.createTextNode("Add alternate date"));
		addButton.append(addButtonTooltip);
		// console.log(addButton);
		var resetAddButton = false; 

		var rowToDelete = $(this).parent().parent();
		var labelRowToDelete = rowToDelete.prev();

		var sibling = $(this).prev();
		if (sibling.length > 0){
			resetAddButton = true;		
		}
		
		labelRowToDelete.remove();
		rowToDelete.remove();

		var parent = $("#newTableForDates .fieldsRow");
		var lastRow = parent[parent.length-1];
		var buttonCol = lastRow.querySelectorAll(".addOrRemoveDates")[0];
		// console.log(addButton);
		// console.log(lastRow);
		if (resetAddButton && buttonCol.querySelectorAll(".addNewDateTimeButton").length < 1){
			buttonCol.prepend(addButton);
			addNewDateTimeRow();
		}
		// removeDateTimeRow();
	});
}
function addNewDateTimeRow(){
	$(".addNewDateTimeButton").click(function(){
		// $(".addNewDateTimeSection").remove();
		// var nextOne = buildAnotherDate();
		// $("#datetimePickerSection").append(nextOne);
		// AddDateTimePicker();
		// addNewDateTimeRow();
		// var removeButton = "<a class='removeNewDateTimeButton glyphicon glyphicon-minus-sign' style='color:red; line-height:100%; font-size:22px;'></a>";
		var removeButton = document.createElement("a");
		removeButton.className += "removeNewDateTimeButton glyphicon glyphicon-minus-sign";
		var removeButtonTooltip = document.createElement("span");
		removeButtonTooltip.className += "removeNewDateTimeButtonTooltip";
		removeButtonTooltip.append(document.createTextNode("Remove this date/time."));
		removeButton.append(removeButtonTooltip);
		// removeButton.style.color = "red";
		// removeButton.style.fontSize = "22px";
		// removeButton.style.cursor = "pointer";

		// removeButton.setAttribute("class", "glyphicon-minus-sign");
		// removeButton.setAttribute("style", "color:red; line-height:100%; font-size:22px;");
		var theRow = $(this).parent().parent();
		var sibling = $(this).next();
		// console.log(sibling.length);

		var newRow = theRow.clone();
		if (sibling.length < 1){
			newRow[0].querySelectorAll(".addOrRemoveDates")[0].append(removeButton);
		}
		// .children[2].append(removeButton);
		// console.log(newRow[0].children[2]);
		var theTable = theRow.parent();
		var newLabelRow = "<tr style='margin-top:10px;'>"
						 + "<td><label class=\"requiredField\">Alternate Date</label><br/></td>"
						 + "<td><label>Time</label><br/></td>"
						 + "<td>&nbsp;</td>"
						 + "</tr>";
		$(this).remove();
		theTable.append(newLabelRow);
		theTable.append(newRow);
		AddDateTimePicker();
		addNewDateTimeRow();
		removeDateTimeRow();
		// console.log(theRow);
		// console.log(theLabelRow);
	});
}


function processFeedback(){
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

	emailjs.send("default_service","new_request",
		{ 	name: full_Name, 
			emailAddress: email_Address,
			phoneNumber : phone_Number, 
			dates : dateTimeCombo,
			description : description
		}).then(function(response) {
			formResults("requestServiceForm", response.status);
		}, function(err) {
			formResults("requestServiceForm", err);
		});
	// console.log("Name = " + full_Name 
	// 				+ "\nEmail = " + email_Address 
	// 				+ "\nPhone Number = " + phone_Number
	// 				+  "\nDescription = " + description
	// 				+ "\nDatetime Combo " + dateTimeCombo);
	// formResults("requestServiceForm", 200);
	// formResults("requestServiceForm", "fail");
}

function formResults(formID, status){
	$("#formResultsSection img").remove();
	var firstImage = "<img id=\"successImage\" src=\"/images/assets/icons/successImage.gif\" alt=\"*INSERT CAMERA FLASH*\"/>";
	var oops = "<img src=\"/images/assets/icons/oops.png\" width=\"100\" height=\"100\" style=\"margin-top:2%;\" alt=\"*INSERT SAD FACE*\"/>"
	var firstSentence = formID == "feedbackForm" ? "Thanks for the feedback!" : "Your request has been sent.";
	var secondSentence = formID == "feedbackForm" ? " " : "I will be in touch with you once I've reviewed the details.";
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
