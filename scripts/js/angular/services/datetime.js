angular.module("contactForms").service("dateTime", function(){

	this.dateAndTime = function(){
		console.log("DateTime presences");
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
});