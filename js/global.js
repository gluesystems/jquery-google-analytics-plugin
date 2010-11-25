var GlueProject = function() {
	function init() {
		$(document.body).addClass('js');
		
		pngFix();

		$(document).gaTracking({  // calls the init method
			gaAccountID : 'UA-1352431-7'
		});



	}
	
	function pngFix() {
		if (typeof(jQuery.fn.pngFix) == 'function') {
			$(document).pngFix();
		}	
	}

	return {
		init: init
	}
}();

$(document).ready(function(){
	GlueProject.init();
});