/*
 * http://love.hackerzhou.me
 */

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

// Call timeElapse function to start the clock
// Call timeElapse function to start the clock
// Call timeElapse function to start the clock
// Call timeElapse function to start the clock
// Set the start date and time - March 5, 2023, 6:15 PM
var startDate = new Date("2023-03-05T18:15:00");

// Call timeElapse function to start the clock
// Set the start date and time - March 5, 2023, 6:15 PM
var startDate = new Date("2023-03-05T18:15:00");

// Call timeElapse function to start the clock
// Set the start date and time - March 5, 2023, 6:15 PM
var startDate = new Date("2023-03-05T18:15:00");

// Call timeElapse function to start the clock
// Set the start date and time - March 5, 2023, 6:15 PM
var startDate = new Date("2023-03-05T18:15:00");

// Call timeElapse function to start the clock
timeElapse();

function timeElapse() {
    // Update the clock immediately
    updateTime(startDate);

    // Update the clock every second (1000 milliseconds)
    setInterval(function() {
        updateTime(startDate);
    }, 1000);
}

function updateTime(startDate) {
    var currentDate = new Date(); // Current date and time
    
    // Calculate the time difference in milliseconds
    var timeDifference = currentDate.getTime() - startDate.getTime();
    
    // Convert time difference to days, hours, minutes, and seconds
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Format the elapsed time with leading zeros
    var formattedDays = ("0" + days).slice(-3); // Updated to handle up to 3 digits
    var formattedHours = ("0" + hours).slice(-2);
    var formattedMinutes = ("0" + minutes).slice(-2);
    var formattedSeconds = ("0" + seconds).slice(-2);
    
    // Update the display with the formatted time
    var formattedTime = "<span class=\"digit\">" + formattedDays + "</span> days <span class=\"digit\">" + 
                        formattedHours + "</span> hours <span class=\"digit\">" + formattedMinutes + 
                        "</span> minutes <span class=\"digit\">" + formattedSeconds + "</span> seconds";
    $("#clock").html(formattedTime);
}







