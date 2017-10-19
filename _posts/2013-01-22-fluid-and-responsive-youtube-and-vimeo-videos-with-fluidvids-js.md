---
title: Fluid and responsive YouTube and Vimeo videos with fluidvids.js
author: Todd Motto
layout: post
permalink: /fluid-and-responsive-youtube-and-vimeo-videos-with-fluidvids-js/
disqus: http://www.toddmotto.com/fluid-and-responsive-youtube-and-vimeo-videos-with-fluidvids-js
path: 2013-01-22-fluid-and-responsive-youtube-and-vimeo-videos-with-fluidvids-js.md
tag: js
---

One of the major drawbacks to responsive design is managing external plugins/resources, such as YouTube and Vimeo videos – which we can embed into our sites using an iframe. This is where we lose control. Working with iframes is sometimes tricky, especially with video and maintaining aspect ratios. There are some CSS hacks we can do to attempt making iframe videos responsive, but to no success.

<div class="toc" markdown="1">
<span class="gamma">Table of contents</span>
{:.no_toc}
* TOC
{:toc}
</div>

Better attempts have been made, jQuery plugins, scripts. Some work great, but some warrant further action. Until recent, I’ve been using [FitVids.js][1], from Paravel and Chris Coyier, which is a nifty plugin. But that’s exactly what I don’t want. More plugins. Scripts are by far more effective, and let’s face it, there’s no point using a plugin for responsive videos – why would you want to target a container and choose which videos are responsive? It’s responsive or not, all or nothing.

 [1]: //fitvidsjs.com

We’re in a world full of plugins, it’s time to start writing your own stuff. So here’s my raw JavaScript alternative to FitVids, it’s much lighter in code, doesn’t require the hefty jQuery library – and much faster too. FluidVids!

The demo includes both a YouTube and Vimeo iframe embed, both at different aspect ratios. Both fluid, both 100% width.

<div class="download-box">
  <a href="//toddmotto.com/labs/fluidvids" onclick="_gaq.push(['_trackEvent', 'Click', 'Demo FluidVids, 'FluidVids Demo']);">Demo</a>
  <a href="//github.com/toddmotto/fluidvids/archive/master.zip" onclick="_gaq.push(['_trackEvent', 'Click', 'Download FluidVids, 'FluidVids Download']);">Download</a>
  <a href="//github.com/toddmotto/fluidvids" onclick="_gaq.push(['_trackEvent', 'Click', 'Fork FluidVids, 'FluidVids Fork']);">Fork</a>
</div>

### The iFrame

Before attacking our iframe and ripping the attributes off it, let’s have a think of what we can use. Let’s look at our YouTube iframe:

{% highlight html %}
<iframe src="//www.youtube.com/embed/JMl8cQjBfqk" width="560" height="315" frameborder="0" allowfullscreen></iframe>
{% endhighlight %}

A width and height attribute already exist, I see no reason to ‘remove’ these like other plugins, let’s simply overwrite them with our future code. The inline width and height attributes may be oldschool, but they’re here for a reason this time – so let’s keep them. It saves extra lines of markup removing the attributes and adding new inline styles.

### Targeting the iFrame

Let’s grab the iframe in the page:

{% highlight javascript %}
var iframes = document.getElementsByTagName('iframe');
{% endhighlight %}

### For Loop

Next we need to setup a for loop, and loop through each of our iframes:

{% highlight javascript %}
for (var i = 0; i < iframes.length; i++) {
     // Do stuff
}
{% endhighlight %}

### Searching for YouTube and Vimeo

The next step we want to take is to identify our players when scanning through our iframes. We then run a quick if statement to test whether the iframe source contains youtube, or vimeo.

{% highlight javascript %}
var players = /www.youtube.com|player.vimeo.com/;
if(iframe.src.search(players) !== -1) {
     // YouTube and Vimeo videos!
}
{% endhighlight %}

From here, we can then get started with some magic.

### Aspect Ratio calculation

This is the clever part (thanks to [intrinsic ratios](http://alistapart.com/article/creating-intrinsic-ratios-for-video)), and is why we need JavaScript over CSS to be fully extensible for any width/height dimensions. We set a variable to work out the iframe's width and height, which it will do very easily based on the inline dimension attributes. We then divide the height by the width, to obtain the aspect ratio. We then multiple it by 100 to be able to use it for CSS purposes for our fluid video.

{% highlight javascript %}
var videoRatio = (iframe.height / iframe.width) * 100;
{% endhighlight %}

### Adding attributes to the iFrame

First let's create a variable for our iterated iframe:

{% highlight javascript %}
var iframe = iframes[i];
{% endhighlight %}

This allows us to simply make one declaration of iframe inside our loop.

{% highlight javascript %}
iframe.style.position = 'absolute';
iframe.style.top = '0';
iframe.style.left = '0';
iframe.width = '100%';
iframe.height = '100%';
{% endhighlight %}

You'll notice I've used the style attribute here in the JavaScript, and width and height don't include the 'style' prefix. This is because it will over-ride the attribute width="" and height="". I see no performance or practical benefits to doing this (replaces width and height attributes with style="height:x;width:x;"):

{% highlight javascript %}
iframe.removeAttribute('height');
iframe.removeAttribute('width');
iframe.style.height = '';
iframe.style.width = '';
{% endhighlight %}

### Fluid div wrap

Now we've added some styles to our iframes, they're all ready to go. But now we need to wrap them in a  with fluid properties.

{% highlight javascript %}
var wrap = document.createElement('div');
wrap.className = 'fluid-vids';
wrap.style.width = '100%';
wrap.style.position = 'relative';
wrap.style.paddingTop = videoRatio + '%';
{% endhighlight %}

The trick I've used here is to apply the styles inline, using style="", instead of injecting styles into the  - saving additional script. What I have done though is include a class, which is appended to the div, for extra styling purposes should you need it. You'll notice at the end, we bring back our videoRatio (which we multiplied by 100 to use as a percentage). Then we add this figure to a percentage sign, which uses padding-top to 'emulate' the video aspect ratio. It's merely a clever hack-trick, but a brilliant one (used in FitVids but taken from A List Apart).

### Wrapping the div

Our script is almost complete, we just need to wrap our iframe in our newly created div. This is similar to jQuery's $.wrap(); function.

{% highlight javascript %}
var iframeParent = iframe.parentNode;
iframeParent.insertBefore(wrap, iframe);
wrap.appendChild(iframe);
{% endhighlight %}

### Putting it all together (now updated to v1.1.0)

Here's what our finished script looks like. The things we've been able to achieve are:  
- Plugin/jQuery free  
- Faster rendering  
- Minimal scripting  
- Enhanced performance

{% highlight javascript %}
(function ( window, document, undefined ) {

  /*
   * Grab all iframes on the page or return
   */
  var iframes = document.getElementsByTagName( 'iframe' );

  /*
   * Loop through the iframes array
   */
  for ( var i = 0; i < iframes.length; i++ ) {

    var iframe = iframes[i],

    /*
       * RegExp, extend this if you need more players
       */
    players = /www.youtube.com|player.vimeo.com/;

    /*
     * If the RegExp pattern exists within the current iframe
     */
    if ( iframe.src.search( players ) > 0 ) {

      /*
       * Calculate the video ratio based on the iframe's w/h dimensions
       */
      var videoRatio        = ( iframe.height / iframe.width ) * 100;
      
      /*
       * Replace the iframe's dimensions and position
       * the iframe absolute, this is the trick to emulate
       * the video ratio
       */
      iframe.style.position = 'absolute';
      iframe.style.top      = '0';
      iframe.style.left     = '0';
      iframe.width          = '100%';
      iframe.height         = '100%';
      
      /*
       * Wrap the iframe in a new <div> which uses a
       * dynamically fetched padding-top property based
       * on the video's w/h dimensions
       */
      var wrap              = document.createElement( 'div' );
      wrap.className        = 'fluid-vids';
      wrap.style.width      = '100%';
      wrap.style.position   = 'relative';
      wrap.style.paddingTop = videoRatio + '%';
      
      /*
       * Add the iframe inside our newly created <div>
       */
      var iframeParent      = iframe.parentNode;
      iframeParent.insertBefore( wrap, iframe );
      wrap.appendChild( iframe );

    }

  }

})( window, document );
{% endhighlight %}

### Usage

Just drop the JavaScript file into your page (this needs to be placed before the closing &lt;/body&gt; tag or inside a DOM ready function wrapper) and let it work its magic. No config required. Minified version also included in the download.

### Browser Compatibility

I've tested in Chrome, FireFox, Opera, Safari, IE7, IE8 and IE9, and all is well. Though if you run into any problems or even have a suggestion on improving FluidVids.js, feel free to comment or submit a on GitHub or Fork.

<div class="download-box">
  <a href="//toddmotto.com/labs/fluidvids" onclick="_gaq.push(['_trackEvent', 'Click', 'Demo FluidVids, 'FluidVids Demo']);">Demo</a>
  <a href="//github.com/toddmotto/fluidvids/archive/master.zip" onclick="_gaq.push(['_trackEvent', 'Click', 'Download FluidVids, 'FluidVids Download']);">Download</a>
  <a href="//github.com/toddmotto/fluidvids" onclick="_gaq.push(['_trackEvent', 'Click', 'Fork FluidVids, 'FluidVids Fork']);">Fork</a>
</div>
