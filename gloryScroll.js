
(function ($, window, document, undefined) {

  'use strict';

    /**
    * gloryScroll.js Scroll-to-animate Utility Library
    * Animates CSS properties based on scrolltop
    * Can also animate spritesheets - use sprite setting.
    *
    * Example usage:
    *
    * $('el').gloryScroll({ start: 0, stop: 300, attribute: 'opacity', startVal: '1.0', stopVal: '0.0' });
    *
    */

  $.fn.gloryScroll = function(options) {

    // Default settings

    var settings = $.extend({
        element       : $(this), // Element selector
        attribute     : 'top',   // CSS attribute type
        start         : 0,      // px from top to start the animation
        stop          : 200,    // px from top to stop the animation
        startVal      : 100,    // CSS property value at the start of of scrolling area
        stopVal       : 200,    // CSS property value at the end of the scrolling area
        sprite        : false,  // Set to true if sprite is to be animated
        spriteFrames  : 16,     // (Optional) Sprite frames
        spriteHeight  : 1985    // (Optional) Height of sprite image (px)
    }, options);

    var that = this,
      startArr = [],
      stopArr = [];

    /**
    * Transpose value into a new range of numbers, keeping the ratio from the old range.
    */

    this.transpose = function(scrollTop, oldMin, oldMax, newMin, newMax){

      var oldRange = (oldMax - oldMin);
      return((((scrollTop - oldMin) * (newMax - newMin)) / oldRange) + newMin);
    };


    /**
    * Generate an array for the CSS attributes to be animated
    */

    this.generateCssArr = function(string){

      var arr = string.split(" ");
      var output = [];

      // Loop through each css attribute and determine if value is to be animated

      for (var i = 0; i < arr.length; i++) {

        var string = arr[i];

        if (string.match(/^-|\d/i)) {

          // String starts with a number (including negatives) and ends in px, em, % or rem

          var attr = string.replace(/\.|\d|-/ig, '');
          var number = parseFloat(string);

          output[i] = {
            'animate' : true,
            'attr'    : attr,
            'number'  : number
          }

        } else {

          // String does not contain any attributes to be animated

          output[i] = {
            'animate' : false,
            'string'  : string
          }

        };
      };

      return output;
    };

    /**
    * Generate CSS value to be animated
    */

    this.generateCssString = function(top){

      var output = [];

      for (var i = 0; i < startArr.length; i++) {

        var obj = startArr[i];

        if (obj.animate) {

          // Object needs animation

          var value = that.transpose(top, settings.start, settings.stop, obj.number, stopArr[i].number);
          output.push(value + obj.attr);

        } else {

          // nothing to animate, move along!
          output.push(obj.string);

        };
      };

      return output.join(' ');
    };


    /**
    * Animate the element - will be called on scroll and load
    */

    this.animate = function(){

      var top = $(window).scrollTop();
      var target = settings.element;
      var frameHeight = settings.spriteHeight / settings.spriteFrames;

      if (top > settings.start ) {

        if ( top < settings.stop ) {

          // Scrolltop is not yet beyond the end of settings.stop

          if (settings.sprite) {
            var spritePos = that.transpose(top, settings.start, settings.stop, 0, settings.spriteFrames);
            target.css( 'background-position', '0 -' + (Math.floor(spritePos) * frameHeight) + 'px' );
          } else { 

            // Animate value
            var cssValue = that.generateCssString(top);
            target.css( settings.attribute, cssValue );

          };

        } else {

          // Scrolltop is now below the stop point, set the end frame for all elements

          if (settings.sprite) {

            target.css( 'background-position', '0 -' + (settings.spriteHeight - frameHeight) + 'px' );

          } else { 

            target.css( settings.attribute, settings.stopVal );

          }
        };

      } else {

          // Scrolltop is now above the start point, set the start frame for all elements

          if (settings.sprite) {

            target.css( 'background-position', '0px 0px' );

          } else { 

            target.css( settings.attribute, settings.startVal);

          }
        };
    };


    /**
    * Return listener IF element exists in the DOM
    */

    return this.each( function() {

      var elementExists = $(settings.element).length;

      if (elementExists) {

        // Setup CSS attribute arrays for the animate function

        startArr = that.generateCssArr(settings.startVal);
        stopArr = that.generateCssArr(settings.stopVal);

        that.animate();

        $(window).scroll(function() { 
          that.animate();
        });

      }
    });

  }

})(jQuery, window, document);