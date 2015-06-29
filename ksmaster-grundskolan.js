var KS = KS || {};
var dates = dates || [];
var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
var DAY_NAMES = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
var NUMER_OF_ENTRIES = 3;

var bodyOuterWidth = 0;

$(document).ready(function() {
    if (!hasCSSFeature("transition")) {
        $("html").addClass("noCSSTransitions");
    }
    //var dates = dates || [];
    /*var dates = dates || [
     {year:"2011",month:"5",day:"08",startHour:"15",startMinute:"30",endHour:"15",endMinute:"30",cssClasses:"",svid:"1"},
    {year:"2017",month:"2",day:"10",startHour:"15",startMinute:"14",endHour:"15",endMinute:"30",cssClasses:"",svid:"2"},
    {year:"2011",month:"1",day:"17",startHour:"16",startMinute:"29",endHour:"15",endMinute:"30",cssClasses:"",svid:"3"},
    {year:"2016",month:"11",day:"22",startHour:"15",startMinute:"29",endHour:"15",endMinute:"30",cssClasses:"",svid:"3"}
    ];
    */

    KS.oppethus = (function($, dates, undefined) {
        var _context,
            _now,
            _pastDates,
            _upcommingDates,
            _settings,
            _dates;

        _context = this;
        _dates = dates;
        _now = new Date();
        _settings = {
            anchorClass: 'bv-js-oppethus-anchor',
            dateEntryClasses: 'bv-oppethus-entry sv-column-' + (12 / NUMER_OF_ENTRIES),
            iconClasses: 'fa fa-calendar-o',
            dateEntryTextClasses: 'bv-oppethus-text',
            activeClass: 'active'
        }

        var _init = function() {
            _dates.forEach(function(el) {
                el.date = new Date(el.year, (parseInt(el.month)-1), el.day, el.startHour, el.startMinute);
                el.dayOfWeek = el.date.getDay();
                el.jqElement = $("<div></div>")
                    .attr("id", "de-" + el.svid)
                    .addClass(_settings.dateEntryClasses);
            });
            _dates.sort(_sortByDate);
            _pastDates = _dates.filter(function(el) {
                return el.date < _now;
            });
            _upcommingDates = _dates.filter(function(el) {
                return el.date >= _now;
            }).map(function(el) {
                el.cssClasses = _settings.activeClass;
                return el;
            }).slice(0, NUMER_OF_ENTRIES + 1);

            _build(_getRelevantDates());
            //alert(_dates[2].year);
            //alert(_pastDates[1].year);
        };

        var _getRelevantDates = function() {
            if (_upcommingDates.length < NUMER_OF_ENTRIES) {
                var diff = NUMER_OF_ENTRIES - _upcommingDates.length;
                diff = (diff > _pastDates.length) ? _pastDates.length : diff;
                return _pastDates.slice(-diff).concat(_upcommingDates);
            }
            return _upcommingDates;
        };

        var _build = function(relevantDates) {
            //relevantDates.reverse();
            var $anchor = $("." + _settings.anchorClass + "");
            var $icon = $("<span></span>").addClass(_settings.iconClasses);
            var $text = $("<div></div>").addClass(_settings.dateEntryTextClasses);

            relevantDates.forEach(function(el) {
                el.startHour = (parseInt(el.startHour) < 10) ? "0" + el.startHour : el.startHour;
                el.startMinute = (parseInt(el.startMinute) < 10) ? "0" + el.startMinute : el.startMinute;
                el.endHour = (parseInt(el.endHour) < 10) ? "0" + el.endHour : el.endHour;
                el.endMinute = (parseInt(el.endMinute) < 10) ? "0" + el.endMinute : el.endMinute;                
                
                var innerHtml = "<div><h2>" + DAY_NAMES[el.dayOfWeek] + " " + el.day + " " + MONTH_NAMES[(parseInt(el.month)-1)] + "</h2></div><div class='thedate'>" + el.startHour + ":" + el.startMinute + "-" + el.endHour + ":" + el.endMinute + "</div>";
                var $currentIcon = $icon.clone();
                var $currentText = $text.clone();

                //alert(innerText);
                $currentText.html(innerHtml);
                el.jqElement.addClass(el.cssClasses);
                $currentIcon.appendTo(el.jqElement);
                $currentText.appendTo(el.jqElement);
                el.jqElement.appendTo($anchor);
            });
        };

        var _sortByDate = function(a, b) {
            return a.date - b.date;
        }

        return {
            init: _init
        };
    })(jQuery, dates);

     /* FUNCTIONALITY THAT IS USED IN MORE THAN ONE PLACES */

    KS.utils = (function($, undefined){
      var _makeEntireParentClickable = function($parentEl) {
         $parentEl.on("click", function(e){  
            if($(e.target).is("a")){
              window.location.href = $(e.target).attr("href");
              return false;
            }
            var $link = $(this).find("a").first();
            if($link.length > 0)
               window.location.href = $link.attr("href");
            return false;
         }); 
      };
      
       return {
         makeEntireParentClickable: _makeEntireParentClickable        
       };

    })(jQuery);
    
    var $navItems = $(".bv-navitems");
    var $searchBox = $(".bv-nav .bv-navsearch");
    var $searchCloseButton = $(".bv-nav .bv-closesearch");
    var $navLi = $(".bv-navitems .global-navigation-links");
    var $navLiA = $(".bv-navitems .global-navigation-links.bv-js-navigation");
    var $searchLi = $(".bv-nav .bv-desktopsearch");
    var $schoolButtonDesktop = $(".bv-nav .bv-select-school-button");
    var $schoolButtonMobile = $(".bv-nav .bv-select-school-button-mobile");
    var $hamburgerMenu = $(".bv-mobile-button");
    var $linkRowLinks = $(".bv-js-international-links");
    var $linkRowMenuLi = $(".bv-international-menu");
    
    bodyOuterWidth = $("body").outerWidth();
       
    /* Länkmeny för skola */

    //var $mainLis = $(".bv-school-link-block ul li");

    KS.oppethus.init();
    KS.utils.makeEntireParentClickable($navLiA);
    KS.utils.makeEntireParentClickable($(".bv-image-link-module"));
    KS.utils.makeEntireParentClickable($(".bv-school-menu-navitems .global-navigation-links"));
    KS.utils.makeEntireParentClickable($(".bv-herobanner-subpage-wrapper"));
    KS.utils.makeEntireParentClickable($(".bv-school-link-block .bv-js-linkable"));

    $("<div></div>").addClass("bv-js-mq-checker").appendTo($("body"));
    $linkRowLinks.clone().appendTo($linkRowMenuLi);

    var windowEvents = "resize";
    
    /*if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
      windowEvents += " orientationchange";
     }*/
    
    
    $(window).on(windowEvents, function() {
      if(bodyOuterWidth == $("body").outerWidth())
         return;
      
      bodyOuterWidth = $("body").outerWidth();
      
      var $dialog = $(".bv-nav .bv-schoolmenu");
      var $menuOptions = $(".bv-nav .bv-menuoptions");
      
      $dialog.removeClass("animate");
      $menuOptions.removeClass("open-height animate");
                   
        if (checkMediaQuery() === "'default'") {
           
            if ($navItems.css("display") == "none")
                $navItems.css('display', '');
        } else {
            if ($searchBox.css("display") !== "none")
                $searchCloseButton.click();
        }
    });

    $searchLi.on("click", function() {
        $searchBox.css("display", "block");
        $searchCloseButton.css("display", "block");
        $navLi.each(function() {
            $(this).css("display", "none");
        });
    });

    $searchCloseButton.on("click", function() {
        $searchBox.css("display", "");
        $searchCloseButton.css("display", "");
        $navLi.each(function() {
            $(this).css("display", "");
        });
    });

    $schoolButtonDesktop.on("click", function() {
        var $dialog = $(".bv-nav .bv-schoolmenu");
        if ($dialog.hasClass("bv-superhide"))
            $dialog.removeClass("bv-superhide");
        $dialog.toggleClass("animate");
    });

    $schoolButtonMobile.on("click", function() {
        var $dialog = $(".bv-nav .bv-schoolmenu");
        var $menuOptions = $(".bv-nav .bv-menuoptions");
        if ($dialog.hasClass("bv-superhide"))
            $dialog.removeClass("bv-superhide");
        $dialog.toggleClass("animate");
        //$menuOptions.toggleClass("open-height");
        $menuOptions.toggleClass("animate");
        if ($navItems.css("display") == "none")
          $navItems.css('display', 'block'); 
    });

    $hamburgerMenu.on("click", function() {
        var $menuOptions = $(".bv-nav .bv-menuoptions");
        
        $menuOptions.toggleClass("open");
        
        if($menuOptions.hasClass("animate")){
          $menuOptions.removeClass("animate");
          $menuOptions.removeClass("onego");
          $menuOptions.removeClass("open-height");
          $menuOptions.attr("data-animate","true");
        }
        
        if($menuOptions.hasClass("open"))
          $menuOptions.addClass("open-height");
        else
          $menuOptions.removeClass("open-height");
          
        $navItems.slideToggle(200, function() {
          
          if($menuOptions.is("[data-animate=true]") && $menuOptions.hasClass("open-height")){
            $menuOptions.addClass("animate");
            $menuOptions.addClass("onego");
            $menuOptions.attr("data-animate","false");
          }
        });
    });




    /* Länkblockmenyn */

    /*$mainLis.on("click", function(e) {
        if ($(e.target).is("a"))
            window.location.href = $(e.target).attr("href");

        var $link = $(this).find("a").first();
        $link.click();
    });*/

    var $moreButton = $('.bv-js-more-button'); // This is a li-element

    $moreButton.on('click', function() {
        var $parentUl = $(this).parent();

        $parentUl.toggleClass('animate');

        if ($parentUl.hasClass('animate')) {
            $(this).html('<span class="bv-more-plus">-</span>Göm');
        } else {
            $(this).html('<span class="bv-more-plus">+</span>Mer');
        }
    });


    $(".bv-accordion > div > :first-child").on("click", function(e) {
        e.preventDefault();
        var $item = $(this).getAccordionItem();
        if ($item.is(".open")) {
            $(this).siblings().autoHeightTransition(
                function() {
                    $item.removeClass("open");
                }, null, 0
            );
        } else {
            $(this).siblings().autoHeightTransition(
                function() {
                    $item.addClass("open");
                    if( $item.closest(".bv-accordion").is(".js-accordion-autoclose-siblings") ) {
                      $item.siblings(".open").children(":first").click();
                    }
                }, null
            );
        }
    });
});


/* UTILITY FUNCTIONS */
function checkMediaQuery() {
    var $mqChecker = $(".bv-js-mq-checker");
    return $mqChecker.css("content");
}

/**
 * Small jquery plugin that finds the elements item within an accordion.
 * @return {jQuery}
 */
$.fn.getAccordionItem = function() {
    var parents = this.parentsUntil(".bv-accordion");
    return parents.eq(parents.length - 1);
}

/**
 * jqueryExtension for transitioning from any height
 * to a new height: auto
 * @param  {Function}   fn              The function to run before starting a transition (i.e. for adding new elements)
 * @param  {Function}   fnAfter         The function to run after the transition has ended
 * @param  {string}     specifiedHeight Specify your own height, defaults to "auto"
 * @param  {bool}       useSwitch       If set to true, height will not be reset for transition.      
 * @return {jQuery}                     Returns a jqueryobject for chainability.
 */
$.fn.autoHeightTransition = function(fn, fnAfter, specifiedHeight, useSwitch) {
    var browserTransitions = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
    //Get the elements current height (i.e. 0 if it's hidden)

    var curHeight = !($(this).css('display') == 'none') || !!useSwitch ? this.outerHeight() : 0,
        newHeight = 0;

    //If we have a function that could change the dom-layout we call it here.
    if (typeof fn === "function") {
        fn.call(this);
    }

    if (!isNaN(specifiedHeight) && specifiedHeight !== '' && specifiedHeight !== null) {
        newHeight = specifiedHeight;
    } else {
        // if a new height isn't specified set height to auto and check what it should be after the transition
        this.css("height", "auto");
        newHeight = this.outerHeight();
    }

    //explicitly set current height and flush styles
    this.css("min-height", "").css("height", curHeight + "px");
    window.getComputedStyle(this[0]).height;

    //if we have a function supplied that should be run after the transition is complete
    //then set this up with browser transitions. If IE 9, which doesn't support transitions, or the cur height is equal to the new height
    //we run the function manually instead of after the transition
    if (typeof fnAfter === "function") {
        if ($('html').hasClass('noCSSTransitions') || curHeight == newHeight) {
            setTimeout(fnAfter.bind(this), 10);
        } else {
            this.off(browserTransitions).on(browserTransitions, function(e) {
                //Start by ensuring that the event originates from the intended target, not from child-elements.
                //in case any other transitions were occurin, We also check that it is the height transition that 
                //has completed
                if (this === e.originalEvent.target && e.originalEvent.propertyName === "height") {
                    //call the after-function
                    fnAfter.call(this);
                    //remove the transition-listener
                    $(this).off(browserTransitions);
                }
            }).data("new-height", '');
        }
    }

    // set the new height and the transition will start!
    this.css("height", newHeight).data("new-height", newHeight);
    return this;
}

/**
 * Utility that enables detection of specific css properties.
 * Nice replacement of modernizr if only a few css checks are needed.
 * @param  {string} The feature name (e.g. "transition")
 * @return {boolean}
 */
function hasCSSFeature(featurename) {
    var feature = false,
        domPrefixes = 'Webkit Moz ms O'.split(' '),
        elm = document.createElement('div'),
        featurenameCapital = null;

    featurename = featurename.toLowerCase();

    if (elm.style[featurename] !== undefined) {
        feature = true;
    }

    if (feature === false) {
        featurenameCapital = featurename.charAt(0).toUpperCase() + featurename.substr(1);
        for (var i = 0; i < domPrefixes.length; i++) {
            if (elm.style[domPrefixes[i] + featurenameCapital] !== undefined) {
                feature = true;
                break;
            }
        }
    }
    return feature;
}
