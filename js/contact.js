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
	
	$(".typeOfContact").click(function(){
		var option = $(this).attr("data-jf-contact-option");
		$(".typeOfContact").css("background-color", "black").css("color","white").css("border", "1px solid white");
		$(this).css("background-color", "white").css("color","black").css("border", "1px solid black");
		$("#contactQuestion").css("font-size", "0%").css("margin-bottom", "0%").css("padding", "0%");
		$(".typeOfContact").css("font-size", 16);
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