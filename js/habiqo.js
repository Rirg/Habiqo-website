var fixedLogo = $('.sticky-logo');
var finished = false;

if ($(window).scrollTop() !== 0) {
    fixedLogo.attr('src', 'assets/logo6.svg');
    fixedLogo.css('position', 'relative');
    fixedLogo.css('top', '337px');
    finished = true;
    // Disable scroll animations
    AOS.init({
        disable: true
    });
} else {
    // Initiate scroll animations just when the user is on the top of the page
    AOS.init();
}

$(window).scroll(function () {
    // Check collisions just if the finished variable is set to false
    if (!finished) {
        if (collision(fixedLogo, $('.main-div-container'))) {
            fixedLogo.attr('src', 'assets/logo1.svg');
        }

        if (collision(fixedLogo, $('#content-video-container'))) {
            fixedLogo.attr('src', 'assets/logo2.svg');
        }

        if (collision(fixedLogo, $('.our-system-container'))) {
            fixedLogo.attr('src', 'assets/logo3.svg');
        }

        if (collision(fixedLogo, $('.our-technology-container'))) {
            fixedLogo.attr('src', 'assets/logo4.svg');
        }

        if (collision(fixedLogo, $('.projects-opt-images'))) {
            fixedLogo.attr('src', 'assets/logo5.svg');
        }


        if (collision(fixedLogo, $('.team-container'))) {
            fixedLogo.attr('src', 'assets/logo6.svg');
        }

        if (collision(fixedLogo, $('.meet-our-team'))) {
            fixedLogo.css('position', 'relative');
            fixedLogo.css('top', '337px');
            finished = true;
        }
    }

});

// Handle project option selection
$(".option-link").click(function (event) {
    event.preventDefault();
    // Set the corresponding image when the user clicks in the big container
    $(".projects-image-container").css('background', 'url("images/projects_image_'+ $(this).attr("id") +'_cover.jpg") no-repeat center');
    // Remove in all the options the active classes
    $(".option-link").children("div.fade-overlay-active").removeClass('fade-overlay-active');
    $(".opt-title").removeClass('option-link-active');
    // Add the active classes to the clicked option
    $(this).children('.fade-overlay').addClass('fade-overlay-active');
    $(this).children('.opt-title').addClass('option-link-active');
});

// Video modal
$(document).ready(function () {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
});

// Helper method to check collisions
function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    return !(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2);
}


// Get the max value subtracting the main-div-container height because we have no interest in showing the progress bar
// in the first div
var getMax = function () {
    return $(document).height() - $(window).height() - $(".main-div-container").height();
};

// Get the current value subtracting the main-div-container height
var getValue = function () {
    return $(window).scrollTop() - $(".main-div-container").height();
};

if ('max' in document.createElement('progress')) {
    // Browser supports progress element
    var progressBar = $('progress');

    // Set the Max attr for the first time
    progressBar.attr({max: getMax()});

    $(document).on('scroll', function () {
        // On scroll only Value attr needs to be calculated
        progressBar.attr({value: getValue()});
    });

    $(window).resize(function () {
        // On resize, both Max/Value attr needs to be calculated
        progressBar.attr({max: getMax(), value: getValue()});
    });
}
else {
    var progressBar = $('.progress-bar'),
        max = getMax(),
        value, width;

    var getWidth = function () {
        // Calculate width in percentage
        value = getValue();
        width = (value / max) * 100;
        width = width + '%';
        return width;
    };

    var setWidth = function () {
        progressBar.css({width: getWidth()});
    };

    $(document).on('scroll', setWidth);
    $(window).on('resize', function () {
        // Need to reset the Max attr
        max = getMax();
        setWidth();
    });
}

$('#flat').addClass('active');
$('#progressBar').addClass('flat');

$('#flat').on('click', function () {
    $('#progressBar').removeClass().addClass('flat');
    $('a').removeClass();
    $(this).addClass('active');
    $(this).preventDefault();
});

$('#single').on('click', function () {
    $('#progressBar').removeClass().addClass('single');
    $('a').removeClass();
    $(this).addClass('active');
    $(this).preventDefault();
});

$('#multiple').on('click', function () {
    $('#progressBar').removeClass().addClass('multiple');
    $('a').removeClass();
    $(this).addClass('active');
    $(this).preventDefault();
});

$('#semantic').on('click', function () {
    $('#progressBar').removeClass().addClass('semantic');
    $('a').removeClass();
    $(this).addClass('active');
    $(this).preventDefault();
    alert('hello');
});

$(document).on('scroll', function () {

    maxAttr = $('#progressBar').attr('max');
    valueAttr = $('#progressBar').attr('value');
    percentage = (valueAttr / maxAttr) * 100;

    if (percentage < 49) {
        document.styleSheets[0].addRule('.semantic', 'color: #161616');
        document.styleSheets[0].addRule('.semantic::-webkit-progress-value', 'background-color: #161616');
        document.styleSheets[0].addRule('.semantic::-moz-progress-bar', 'background-color: #161616');
    }
    else if (percentage < 98) {
        document.styleSheets[0].addRule('.semantic', 'color: orange');
        document.styleSheets[0].addRule('.semantic::-webkit-progress-value', 'background-color: orange');
        document.styleSheets[0].addRule('.semantic::-moz-progress-bar', 'background-color: orange');
    }
    else {
        document.styleSheets[0].addRule('.semantic', 'color: green');
        document.styleSheets[0].addRule('.semantic::-webkit-progress-value', 'background-color: green');
        document.styleSheets[0].addRule('.semantic::-moz-progress-bar', 'background-color: green');
    }

});