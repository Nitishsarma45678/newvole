
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

// Helper to calculate "st", "nd", "rd", "th" for the anniversary number
function getOrdinal(n) {
    var s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
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
    var formattedDays = days.toString(); 
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

  // --- NEW: AUTOMATED FOREVER ANNIVERSARY SEQUENCE ---
    var startYear = 2023;
    var currentYear = currentDate.getFullYear();
    var yearsTogether = currentYear - startYear;
    
    // Dynamically set the target for the CURRENT year's March 5th at 6:15 PM
    var targetTime = new Date(currentYear, 2, 5, 13, 20, 0).getTime(); 
    var endTime = new Date(currentYear, 2, 6, 18, 15, 0).getTime(); // Exactly 24 hours later
    var now = currentDate.getTime();
    
    // Triggers exactly during the 24-hour anniversary window, dynamically every year
    if (yearsTogether > 0 && now >= targetTime && now < endTime && !window.anniTriggered) {
        window.anniTriggered = true;

        // Dynamic Text Generation for the Sequence
        var ordinalYear = getOrdinal(yearsTogether);
        var guess1 = Math.max(1, yearsTogether - 2); 
        var guess2 = Math.max(2, yearsTogether - 1); 
        
        var strGuess1 = guess1 + (guess1 === 1 ? " year? 🤔" : " years? 🤔");
        var strGuess2 = guess2 + " years? 🤨";
        var strFinal = "It's " + yearsTogether + " yearsss! 🎉";

        // Dynamically load anime.js
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js", function() {
            
            var clockBox = $("#clock-box");
            var offset = clockBox.offset();

            // Calculate true document size
            var pageW = Math.max($(document).width(), window.innerWidth, 1100);
            var pageH = Math.max($(document).height(), window.innerHeight, 680);
            
            // Calculate coordinates
            var cx = offset.left + clockBox.width() / 2;
            var cy = offset.top + clockBox.height() / 2;
            var screenCenterX = pageW / 2;
            var screenCenterY = pageH / 2;
            var toCenterX = screenCenterX - cx;
            var toCenterY = screenCenterY - cy;

            // Mobile responsive variables
            var isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
            var fontNormal = isMobile ? "35px" : "60px";
            var fontGiant = isMobile ? "45px" : "80px";
            var fontSub = isMobile ? "24px" : "34px"; // Slightly larger for the elegant font
            var actionText = isMobile ? "TAP" : "CLICK";
            
            // THE MAGICAL TEXT STYLING
            var strSubtext = 
                "<div class='dreamy-text' style='font-family: \"Georgia\", \"Times New Roman\", serif; font-style: italic; font-size: " + fontSub + "; background: linear-gradient(45deg, #FFD700, #ff69b4, #FFD700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0px 0px 5px rgba(255, 105, 180, 0.6)); padding-bottom: 10px;'>" +
                "Happy " + ordinalYear + " Anniversary, Lee 𐙚</div>" +
                "<div style='font-size: 12px; color: #666; font-family: sans-serif; letter-spacing: 4px; text-transform: uppercase; margin-top: 15px;'>" +
                "(" + actionText + " ANYWHERE TO CLOSE)</div>";

            // Hide the clock instantly
            clockBox.css("visibility", "hidden");

            // --- 3-LAYER SANDBOX STRUCTURE ---
            var overlayBg = $("<div id='anni-bg' style='position: absolute; top: 0; left: 0; width: 100%; height: 100%; min-width: " + pageW + "px; min-height: " + pageH + "px; background: radial-gradient(circle, rgba(40,0,0,0.85) 0%, rgba(0,0,0,0.98) 100%); z-index: 9999; opacity: 0;'></div>");
            var particleWrapper = $("<div id='particle-wrapper' style='position: absolute; top: 0; left: 0; width: 100%; height: 100%; min-width: " + pageW + "px; min-height: " + pageH + "px; overflow: hidden; z-index: 10000; pointer-events: none;'></div>");
            var overlayText = $("<div id='anni-overlay' style='position: absolute; top: 0; left: 0; width: 100%; height: 100%; min-width: " + pageW + "px; min-height: " + pageH + "px; z-index: 10001; display: flex; justify-content: center; align-items: center; flex-direction: column;'></div>");

            var textContainer = $("<div id='anni-text' style='color: #fff; text-align: center; font-family: sans-serif; position: relative; width: 100%;'></div>");
            var subText = $("<div id='anni-subtext' style='margin-top: 40px; opacity: 0; text-align: center; cursor: pointer;'>" + strSubtext + "</div>");

            overlayText.append(textContainer).append(subText);
            $("body").append(overlayBg).append(particleWrapper).append(overlayText);

            var colors = ['#BE1A25', '#FFD700', '#ff69b4', '#ffffff', '#ffb3b3'];
            for (var i = 0; i < 150; i++) {
                var color = colors[Math.floor(Math.random() * colors.length)];
                var size = Math.random() * 3 + 1; 
                var p = $("<div class='clock-particle' style='position:absolute; width:"+size+"px; height:"+size+"px; background:"+color+"; border-radius:50%; top:"+cy+"px; left:"+cx+"px; box-shadow: 0 0 6px "+color+";'></div>");
                particleWrapper.append(p);
            }

            function setAnimatedText(text, size, color, shadow) {
                var html = Array.from(text).map(function(char) {
                    if (char === ' ') return '&nbsp;';
                    return "<span class='letter' style='display:inline-block;'>" + char + "</span>";
                }).join('');
                textContainer.html(html).css({
                    "font-size": size,
                    "font-weight": "bold",
                    "color": color || "#fff",
                    "text-shadow": shadow || "none"
                });
            }

            var tl = anime.timeline({ loop: false });

            tl.add({
                targets: '.clock-particle',
                translateX: function() { return anime.random(-pageW, pageW); },
                translateY: function() { return anime.random(-pageH, pageH); },
                scale: function() { return anime.random(1, 2.5); },
                opacity: [1, 0.6],
                easing: 'easeOutCubic', 
                duration: 3500 
            });

            tl.add({
                targets: '#anni-bg',
                opacity: 1,
                duration: 2500,
                easing: 'linear'
            }, '-=3500');

            tl.add({
                targets: '.clock-particle',
                translateX: toCenterX,
                translateY: toCenterY,
                scale: 0.1,
                opacity: 1,
                easing: 'easeInOutExpo', 
                duration: 1500
            });

            tl.add({
                targets: '.clock-particle',
                opacity: 0,
                duration: 50,
                complete: function() { $('.clock-particle').remove(); }
            }).add({
                targets: '#anni-text',
                update: function() { setAnimatedText(strGuess1, fontNormal); },
                duration: 10
            }, '-=50').add({
                targets: '.letter',
                scale: [5, 1],
                opacity: [0, 1],
                filter: ['blur(10px)', 'blur(0px)'],
                translateZ: 0,
                easing: "easeOutElastic(1, .5)",
                duration: 1500,
                delay: anime.stagger(50) 
            });

            tl.add({
                targets: '.letter',
                opacity: 0,
                scale: 0,
                easing: "easeInExpo",
                duration: 600,
                delay: anime.stagger(30)
            }).add({
                targets: '#anni-text',
                update: function() { setAnimatedText(strGuess2, fontNormal); },
                duration: 10
            }).add({
                targets: '.letter',
                translateY: [-100, 0],
                opacity: [0, 1],
                easing: "easeOutElastic(1, .6)",
                duration: 1500,
                delay: anime.stagger(50)
            });

            tl.add({
                targets: '.letter',
                opacity: 0,
                easing: "easeInExpo",
                duration: 500,
                delay: anime.stagger(20)
            }).add({
                targets: '#anni-text',
                update: function() { setAnimatedText("Nopeee... 🤭", fontNormal, "#ff9999"); },
                duration: 10
            }).add({
                targets: '.letter',
                scale: [0, 1],
                rotateZ: [-20, 20, 0],
                opacity: [0, 1],
                easing: "easeOutBack",
                duration: 1000,
                delay: anime.stagger(80)
            });

            tl.add({
                targets: '.letter',
                opacity: 0,
                duration: 400
            }).add({
                targets: '#anni-text',
                update: function() { setAnimatedText(strFinal, fontGiant, "#FFD700", "0 0 30px rgba(255,215,0,0.6)"); },
                duration: 10
            }).add({
                targets: '.letter',
                scale: [4, 1],
                opacity: [0, 1],
                easing: "easeOutElastic(1, .4)",
                duration: 2500,
                delay: anime.stagger(80)
            });

            // The dreamy subtext floats in gently
            tl.add({
                targets: '#anni-subtext',
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0.95, 1],
                easing: "easeOutCubic",
                duration: 2500,
                offset: '-=1000'
            });

            // Start the infinite magical breathing effect AFTER the timeline finishes
            tl.finished.then(function() {
                anime({
                    targets: '.dreamy-text',
                    scale: [1, 1.03],
                    filter: [
                        'drop-shadow(0px 0px 5px rgba(255, 105, 180, 0.6))', 
                        'drop-shadow(0px 0px 20px rgba(255, 215, 0, 0.9))'
                    ],
                    direction: 'alternate',
                    loop: true,
                    easing: 'easeInOutSine',
                    duration: 2000
                });
            });

            // Dismiss Logic
            overlayText.on("click", function() {
                anime({
                    targets: ['#anni-bg', '#anni-overlay'],
                    opacity: 0,
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    complete: function() {
                        overlayBg.remove(); 
                        particleWrapper.remove();
                        overlayText.remove();
                        $("#clock-box").css("visibility", "visible"); // Bring the clock back
                    }
                });
            });
        });
    }
    // --- END NEW ---

}
