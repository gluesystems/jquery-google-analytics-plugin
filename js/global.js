var jQueryPluginTracking = function() {
	function init() {
		$(document).gaTracking({
			gaAccountID : 'UA-1352431-7' // ensure you change this to your Google Analytics site tracking ID. This is in JC.
		});
	}

	return {
		init: init
	}
}();

$(document).ready(function(){
	jQueryPluginTracking.init();
});