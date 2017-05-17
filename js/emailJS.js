(function(){
  emailjs.init("user_6LgqYqLc1866439iII9Iw");
})();
$(document).ready(function(){
	$("form").submit(function(event){
		event.preventDefault();
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
	});
		
});