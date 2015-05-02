(function () {
    skrollr.init({
        forceHeight: false,
        beforerender: function (data) {
            return data.curTop > data.lastTop
        }
    });

    (function (elems) {
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.minHeight = window.innerHeight * elems[i].getAttribute("height") / 100 + "px";
        }
    })(document.getElementsByClassName("ch"));

    $('a').smoothScroll({
        offset: 0,

        // one of 'top' or 'left'
        direction: 'top',

        // only use if you want to override default behavior
        scrollTarget: null,

        // fn(opts) function to be called before scrolling occurs.
        // `this` is the element(s) being scrolled
        beforeScroll: function () {
        },

        // fn(opts) function to be called after scrolling occurs.
        // `this` is the triggering element
        afterScroll: function () {
        },
        easing: 'swing',

        // speed can be a number or 'auto'
        // if 'auto', the speed will be calculated based on the formula:
        // (current scroll position - target scroll position) / autoCoeffic
        speed: 800,

        // autoCoefficent: Only used when speed set to "auto".
        // The higher this number, the faster the scroll speed
        autoCoefficient: 2,

        // $.fn.smoothScroll only: whether to prevent the default click action
        preventDefault: true
    });

    /*Moving background*/
    var toMove, ratio;

    (function () {
        var cssBGImage = new Image();
        cssBGImage.src = "../images/skyline.png";

        window.cssMaxWidth = window.innerWidth;
        window.cssXPos = 0;

        setInterval(MoveBackGround, 20);
    })();

    function getWidthOfBackground() {
        ratio = (5000 / 2865) / (window.innerWidth / window.innerHeight);
        return (ratio > 1) ? window.innerHeight * ratio : window.innerWidth;
    }

    function MoveBackGround() {
        window.cssXPos = (window.cssXPos + 1 > getWidthOfBackground()) ? 0 : window.cssXPos + 1;
        toMove = document.getElementsByTagName("header")[0].style.backgroundPosition = window.cssXPos + "px 0px";
    }

    /*Events*/
    window.onscroll = function () {
        document.getElementById("enter-button").style.opacity = (window.pageYOffset > 150) ? 0 : 1;
    };
}());