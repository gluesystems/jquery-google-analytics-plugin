var jQueryPluginTracking = function() {
	function init() {
		$(document).gaTracking({
			// ensure you change this to your Google Analytics site tracking ID. This is in JC.
			// method 1 - pass the analytics id from javascript
			//gaAccountID : 'UA-1352431-7'

			// method 2 - get the analytics id from the web page
			// assumes it is being written to the page by other means (serverside code?)
			gaAccountID : "'" + gaAccountId + "'"


			// method 3 - get the analytics id from the web page, don't embed the GA code for us
			// assumes the GA code AND the account Id have been placed on the html page
//			gaAccountID : "'" + gaAccountId + "'",
//			embedGACode : false




		});
	}

	return {
		init: init
	}
}();

$(document).ready(function(){
	jQueryPluginTracking.init();
});