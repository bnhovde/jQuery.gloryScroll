gloryScroll.js
=====================


Hola! I am a lightweight utility library for animating CSS properties on scroll. 

I can also animate a sprite sheets on scroll, just set the `sprite` property to true.

I rely on jQuery to do my thing.

----------

Installation
---------

```html
<!-- Include js plugin -->
<script src="scripts/jQuery.gloryScroll.js"></script>
```



Usage
---------

Example 1: Animate opacity, fading out element when page is 500px from top.

```html
$('el').gloryScroll({ start: 0, stop: 500, attribute: 'opacity', startVal: '1.0', stopVal: '0.0' });
```

Example 2: Animate 3D transform, moving element down slowly as you scroll, similar to the [medium.com](http://medium.com) headline effect.

```html
$('el').gloryScroll({ start: 0, stop: 600, attribute: 'transform', startVal: 'translate3D( 0px, 0px, 0px )', stopVal: 'translate3D( 0px, 150px, 0px )' });
```

Example 3: Animate a sprite sheet when scrolling.

```html
$('el').gloryScroll({ start: 0, stop: 500, sprite: true, spriteFrames: '16', spriteHeight: '2000' });
```

Parameters
---------

        attribute     : 'top',  // CSS attribute type
        start         : 0,      // px from top to start the animation
        stop          : 200,    // px from top to stop the animation
        startVal      : 100,    // CSS property value at the start of of scrolling area
        stopVal       : 200,    // CSS property value at the end of the scrolling area
        sprite        : false,  // (Optional) Set to true if sprite is to be animated
        spriteFrames  : 16,     // (Optional) Sprite frames
        spriteHeight  : 1985    // (Optional) Height of sprite image (px)


Notes
---------
 
 - When animating multiple values, make sure you leave a space before each value, example: ``` translate3D( 0px, 32px, 0px); ``` and not ``` translate3D(0px,32px,0px); ```
 - There's probably a hundred tools that does this better, but this is what i use for my projects when i need to jazz things up a little, and it has served me well so far. This is why I am sharing it here.
 - Touch device support is a no-go at the moment.
