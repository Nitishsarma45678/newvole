/*
 * http://love.hackerzhou.me
 */

// =========================
// Window resize handling
// =========================
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function () {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth !== clientWidth || newHeight !== clientHeight) {
        location.replace(location);
    }
});

// =========================
// Stopwatch start date
// March 5, 2023, 6:15 PM
// =========================
// Month is 0-based → 2 = March
var LOVE_START_DATE = new Date(2023, 2, 5, 18, 15, 0);

// =========================
// Typewriter effect
// =========================
(function ($) {
    $.fn.typewriter = function () {
        this.each(function () {
            var $ele = $(this);
            var str = $ele.html();
            var progress = 0;

            $ele.html('');

            var timer = setInterval(function () {
                var current = str.substr(progress, 1);
                if (current === '<') {
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

// =========================
// Stopwatch logic
// =========================
function timeElapse() {
    updateTime(LOVE_START_DATE);
}

function updateTime(startDate) {
    var currentDate = new Date();
    var timeDifference = currentDate.getTime() - startDate.getTime();

    // Time calculations
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    var seconds = Math.floor(
        (timeDifference % (1000 * 60)) / 1000
    );

    // Formatting
    var formattedDays = days.toString(); // NO zero padding for days
    var formattedHours = ("0" + hours).slice(-2);
    var formattedMinutes = ("0" + minutes).slice(-2);
    var formattedSeconds = ("0" + seconds).slice(-2);

    // Render
    var formattedTime =
        "<span class=\"digit\">" + formattedDays + "</span> days " +
        "<span class=\"digit\">" + formattedHours + "</span> hours " +
        "<span class=\"digit\">" + formattedMinutes + "</span> minutes " +
        "<span class=\"digit\">" + formattedSeconds + "</span> seconds";

    $("#clock").html(formattedTime);
}
