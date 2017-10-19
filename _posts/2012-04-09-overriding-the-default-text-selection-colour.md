---
title: Using CSS3 text-selection to override default highlight colour
author: Todd Motto
layout: post
permalink: /overriding-the-default-text-selection-colour/
disqus: http://www.toddmotto.com/overriding-the-default-text-selection-colour
path: 2012-04-09-overriding-the-default-text-selection-colour.md
tag: css3
---

Add something different to your website by overriding the default text selection colour (boring blue and no text styling) when highlighting words/images on your website. Check out the demo below by highlighting the paragraphs, and add the code to your own website. 

<div class="toc" markdown="1">
<span class="gamma">Table of contents</span>
{:.no_toc}
* TOC
{:toc}
</div>

> Note: Will not work in IE6-8, but you’re good on Safari/Chrome (WebKit), Mozilla FireFox (Gecko) and IE9+

Here’s the code to add to your CSS to implement your default text selection colour.

### CSS (Global Colour Change)

{% highlight css %}
/* IE9  - Also picked up by most modern browsers */
::selection {
  background:#AC2937;
  color:#FFF;
  text-shadow:none;
}
/* Safari & Chrome - Webkit Rendering */
::-webkit-selection {
  background:#AC2937;
  color:#FFF;
  text-shadow:none;
}
/* Mozilla based - Gecko Rendering */ 
::-moz-selection {
  background:#AC2937;
  color:#FFF;
  text-shadow:none;
}
{% endhighlight %}

### HTML
If you want to highlight different paragraphs, you can target individual elements like so:

{% highlight html %}
<!-- Green Paragraph -->
<p class="green-select">Your paragraph text here.</p>
{% endhighlight %}
    
### CSS (Specific Area Colour Change)

{% highlight css %}
/* Green Paragraph Custom Selection Colours */
.green-select::selection {
  background:#009E30;
  color:#FFF;
  text-shadow:none;
}

.green-select::-webkit-selection {
  background:#009E30;
  color:#FFF;
  text-shadow:none;
}

.green-select::-moz-selection {
  background:#009E30;
  color:#FFF;
  text-shadow:none;
}
{% endhighlight %}
