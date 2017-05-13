$(document).ready(function(){
	AddDateTimePicker();
	$("#dateRangeOption").click(function(){
		var nextOne = buildAnotherDate();
		$("#startDate").append(nextOne);
		AddDateTimePicker();
	});	
	var placeholder;
	$(".placer").focus(function(){
		placeholder = $(this).attr('placeholder');
		$(this).attr('placeholder', '');
	});
	$(".placer").blur(function(){
		if ($(this).text() == ''){
			$(this).attr('placeholder', placeholder);
		}
	});
	
	$(".selectFormOption").click(function(){
		var option = $(this).attr("data-jf-form-option");
		$(".selectFormOption").css("background-color", "black").css("color","white").css("border", "1px solid white");
		$(this).css("background-color", "white").css("color","black").css("border", "1px solid black");
		$("#question").css("font-size", "0%").css("margin-bottom", "0%").css("padding", "0%");
		$(".selectFormOption").css("font-size", 16);
		$("#selectForm").css("padding", "1%");
		switch(option){
			case "service":
				$("#feedbackForm").hide();
				$("#contactForm").show();
				break;
			case "feedback":
				$("#contactForm").hide();
				$("#feedbackForm").show();
				break;
			default:
				alert("Ehhh");
		}
	})
});

function buildAnotherDate(){
	var otherDate = "<br style=\"clear:both;\"/><br style=\"clear:both;\"/>"
					+" <div style=\"width:50%;float:left;\">"
					+"<label>Alternate Date</label><br/>"
					+"<input class=\"date_timepicker\" type=\"text\" placeholder=\"mm/dd/yy\" style=\"color:black;width:100%;float:left;\">"
					+"</div>"
					+"<div id=\"endy2\" style=\"width:30%; float:left;\">"
					+"<label>Time</label><br/>"
					+"<input class=\"timeselect\" placeholder=\"h:mm\" style=\"color:black; width:100%;float:left;\">"
					+"</div>";

	return otherDate;
}

function AddDateTimePicker(){
	$(".timeselect").datetimepicker({
		datepicker:false,
		timepicker:true,
		step:30,
		format: 'g:i A',
		formatTime: 'g:i a',
	});
	$('.date_timepicker').datetimepicker({
	  format:'m/d/y',
	  scrollInput: 'false',
	  scrollMonth: 'false',
	  timepicker:false, 
	  mask:false,
	  scrollMonth: false
	 });
}