---
title: imgShufflr, randomised inline and CSS background images plugin
author: Todd Motto
layout: post
permalink: /imgshufflr-randomised-inline-and-css-background-images-plugin/
disqus: http://www.toddmotto.com/imgshufflr-randomised-inline-and-css-background-images-plugin
path: 2012-12-06-imgshufflr-randomised-inline-and-css-background-images-plugin.md
tag: js
---

imgShufflr is quick and lightweight plugin for generating a random image upon page load. Simply load your images onto the server, and include the plugin on your page with a quick call, and you’ll be randomly generating their order with ease.

<div class="toc" markdown="1">
<span class="gamma">Table of contents</span>
{:.no_toc}
* TOC
{:toc}
</div>

imgShufflr started as purely an inline image randomiser, using the  tag, but includes options for using the background-image: property to use it as a background instead, it’s pretty flexible.

<div class="download-box">
  <a href="//www.toddmotto.com/labs/imgshufflr" onclick="_gaq.push(['_trackEvent', 'Click', 'Demo imgShufflr', 'imgShufflr Demo']);">Demo</a>
  <a href="//www.toddmotto.com/labs/imgshufflr/imgshufflr.zip" onclick="_gaq.push(['_trackEvent', 'Click', 'Download imgShufflr', 'imgShufflr Download']);">Download</a>
  <a href="//github.com/toddmotto/imgShufflr" onclick="_gaq.push(['_trackEvent', 'Click', 'Fork imgShufflr', 'imgShufflr Fork']);">Fork</a>
</div>

### Markup and Usage

Include the file in your page, the minified or full version. You’ll need to call the imgShufflr in your page like so:

{% highlight javascript %}
$('#imgShufflr').imgShufflr();
{% endhighlight %}

You’ll also need an HTML element with your chosen ID:

{% highlight html %}
<div id="imgShufflr"></div>
{% endhighlight %}

Let’s look at the options included and the full markup:

{% highlight html %}
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/imgshufflr.min.js"></script>
<script>
$(function() {
  $('#imgShufflr').imgShufflr({
    imgType  : 'inline', // inline or background
    imgs     : ["image-1.jpg","image-2.jpg","image-3.jpg","image-4.jpg"], // Image array
    imgPath  : 'img/shuffle/', // Image directory
    imgAlt   : 'Random Image', // Alternate text on images
    imgTitle : 'Title', // Title text on images
    imgClass : 'shuffled' // Class name for the images
  });
});
</script>
{% endhighlight %}

Options explained:  
imgType – inline or background. Choosing ‘inline’ will produce an  tag with your options and attributes inside, whereas choosing background will use background-image as CSS instead. It’s as simple as that.

imgs – The array of images you want to shuffle on load.

imgPath – Your directory where your files are stored, if using a CMS such as WordPress, include the script inside  tags in your header.php file, with a template tag hook to the template directory.

imgAlt – Any alternate text you’d like to specify for your images (applies to all images).

imgTitle – Title tags for your images (applies to all images).

imgClass – HTML class attribute for CSS purposes if needed, default ‘shuffled’ class.

### How it works

The workings behind imgShufflr explained.

{% highlight javascript %}
;(function($) {
    
  $.fn.imgShufflr = function(options) {
    
    // imgShufflr settings
    var settings = {
      imgType  : 'inline', // inline or background
      imgs     : ["image-1.jpg","image-2.jpg","image-3.jpg","image-4.jpg"], // Image array
      imgPath  : 'img/shuffle/', // Image directory
      imgAlt   : 'Random Image', // Alternate text on images
      imgTitle : 'Title', // Title text on images
      imgClass : 'shuffled' // Class name for the images
    };
    
    // Load our settings
    if (options) {
      $.extend(settings, options);
    }
    
    // Shuffle, shuffle
    return this.each(function() {
    
      // Define our variables
      var $this = $(this),
        imgs  = settings.imgs,
        img   = imgs[Math.floor(Math.random() * imgs.length)];
      
      // If the settings are inline 
      if (settings.imgType === 'inline') {
      
        // Prepend the inline  with the following attributes
        $this.prepend(
          $('')
            .attr({
              src   : settings.imgPath   img,
              alt   : settings.imgAlt,
              title : settings.imgTitle,
              class : settings.imgClass
            })
        );
      
      }
      
      // If the settings are background image
      if (settings.imgType === 'background') {
      
        // Load the image into the CSS as a background image
        $this.css({
          'background-image':'url('   settings.imgPath   img   ')'
        });
      }
      
    });
  };
})(jQuery);
{% endhighlight %}

The main workings behind the plugin markup are pretty standard, it’s mainly inside our return this.each(function() that things get to work.

Firstly we declare some variables for using within our functions, using some JavaScript Math.Random() to be integrated into our image URL’s, which is how a random image is selected each time.

if (settings.imgType === ‘inline’) – here we run a check to see which settings are passed by the user, then if they match ‘inline’, we prepend an  with all our settings inside into our selected element.

if (settings.imgType === ‘background’) – here we run a check to see if the ‘background’ option was selected, and if so, this then applies the random image as a background image using CSS instead of inline.

### CSS Styling

When using the ‘background’ option, you’ll need to set the background size to the height and width of your image or it won’t appear.

<div class="download-box">
  <a href="//www.toddmotto.com/labs/imgshufflr" onclick="_gaq.push(['_trackEvent', 'Click', 'Demo imgShufflr', 'imgShufflr Demo']);">Demo</a>
  <a href="//www.toddmotto.com/labs/imgshufflr/imgshufflr.zip" onclick="_gaq.push(['_trackEvent', 'Click', 'Download imgShufflr', 'imgShufflr Download']);">Download</a>
  <a href="//github.com/toddmotto/imgShufflr" onclick="_gaq.push(['_trackEvent', 'Click', 'Fork imgShufflr', 'imgShufflr Fork']);">Fork</a>
</div>
