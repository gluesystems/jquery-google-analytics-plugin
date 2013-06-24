/*!
 * jQuery Google Analytics Plugin
 * Examples and documentation at:
 * Copyright (c) 2010 glue Isobar
 * Version: 0.1 (24-NOV-2010)
 * Requires: jQuery v1.4.3 or later
 *
 * gaAccountID - string - Google Analytics ID. Change this to the ID given to you during the analytics setup for your site
 * embedGACode - boolean - Whether to embed the analytics code for you.
 * trackClassPage - string - Alternative class name to be used for page view tracking
 * trackClassEvent - string - Alternative class name to be used for event tracking
 *
 *
 * **** BIG NOTE: ****
 * To test, this MUST be run from a server, not file://
 * see https://www.google.com/support/forum/p/Google+Analytics/thread?tid=609b8363027f80a4&hl=en
 *
 *
 * Note:
 * Pass event tracking string via data-ga attribute
 * View generated source to see the ga.js code being incldued (by the head tag)
 * when embedGACode = true. This IS working when you see the GA script tag.
 *
 */
(function($) {

	var settings = {
		'gaAccountID' : '',
		'embedGACode' : true,
		'trackClassPage' : '.track',
		'trackClassEvent' : '.track-event'
	};

	var methods = {
		init : function(options) {
			if (options) {
				$.extend(settings, options);
			}

			if (settings.gaAccountID == '') {
				$.error('Please provide a Google Analytics ID to jQuery.gaTracking');
				return false;
			}
			else {
				if (settings.embedGACode) {
					methods.insertGACode();
				}
				return this.each(function() {
					methods.attachTracking();
				});
			}
		},

		/// insert the javascript required for asyc google analytics tracking
		insertGACode: function() {
			var trackingCode = '<script type="text/javascript">' +
				'var _gaq = _gaq || [];' +
				' _gaq.push(["_setAccount", "' + settings.gaAccountID + '"]);' +
				' _gaq.push(["_trackPageview"]);' +
				'(function() {' +
				'var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;' +
				'ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";' +
				'var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);' +
				' })();' +
				'</script>';

			$('head').append(trackingCode);
		},



		/// attach tracking to appropriate elements click event
		/// .track = default class for tracking page views
		/// .track-event = default class for tracking events
		/// use custom ga-data attr to define .track-event action being carried out
		attachTracking: function() {
			$(settings.trackClassPage).click(function(e) {
				methods.track('page', { 'url': $(this).attr('href') });
			});

			$(settings.trackClassEvent).click(function(e) {
				var action = $(this).attr('data-ga')
				methods.track('event', {
					'action': action,
					'url': $(this).attr('href')
				});
			});
		},

		/// pass a tracking value to google analytics
		/// input:
		/// type - page / event
		/// trackingData - object containing data relevant to tracking type
		track: function(type, trackingData) {
			if (typeof(_gaq) == 'undefined') {
				$.error('Google Analytics code not found on web page for jQuery.gaTracking');
				return false;
			}

			switch(type) {
				case 'page':
					if (typeof(trackingData.url) != 'undefined') {
						//alert('track : page : url=' + trackingData.url);
						_gaq.push(['_trackPageview', trackingData.url]);
					}
					return true;
					break;

				case 'event':
					/// Note, event data sent as URL / action where URL is used as the GA category
					/// Shouldn't be any reason why you couldn't do it the other way though,
					/// Consisitancy of use is probably foremost.
					if (typeof(trackingData.url) != 'undefined' &&
						typeof(trackingData.action) != 'undefined') {
						//alert('track : event : url=' + trackingData.url + ' : action=' + trackingData.action);
						_gaq.push(['_trackEvent', trackingData.url, trackingData.action]);
					}
					return true;
					break;
			}
		}
	};

	$.fn.gaTracking = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + 'does not exist on jQuery.gaTracking');
		}
	};

})(jQuery);