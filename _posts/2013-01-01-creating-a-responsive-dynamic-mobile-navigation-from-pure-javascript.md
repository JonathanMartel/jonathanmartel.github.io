---
title: Creating a responsive, dynamic mobile select navigation from pure javascript
author: Todd Motto
layout: post
permalink: /creating-a-responsive-dynamic-mobile-navigation-from-pure-javascript/
disqus: http://www.toddmotto.com/creating-a-responsive-dynamic-mobile-navigation-from-pure-javascript
path: 2013-01-01-creating-a-responsive-dynamic-mobile-navigation-from-pure-javascript.md
tag: js
---

Here’s how to create a select menu from an existing menu using JavaScript. The select menu will be comprised of an existing menu, which dynamically creates a select menu and populates it with menu items.

<div class="toc" markdown="1">
<span class="gamma">Table of contents</span>
{:.no_toc}
* TOC
{:toc}
</div>

A lot of people are using [Chris Coyier’s example][1], which relies on jQuery and doesn’t work so great if you’ve got multiple levels of nested menus. The CSS-Tricks example ignores their hierarchical value and simply appends the lower menu items to the select navigation as another option. From a usability perspective this isn’t the best approach as all items appear to have the same priority.

 [1]: //css-tricks.com/examples/ConvertMenuToDropdown

So here’s how to create a JavaScript navigation that doesn’t rely on jQuery and also appends navigation items with a hyphen to represent their hierarchy.

Tip: The demo has no CSS styling on the navigation to show it’s structure.

<div class="download-box">
  <a href="//www.toddmotto.com/labs/selectnav/" onclick="_gaq.push(['_trackEvent', 'Click', 'Demo Select Nav', 'Select Nav Demo']);">Demo</a>
  <a href="//www.toddmotto.com/labs/selectnav/selectnav.zip" onclick="_gaq.push(['_trackEvent', 'Click', 'Download Select Nav', 'Select Nav Download']);">Download</a>
  <a href="//github.com/toddmotto/selectnav" onclick="_gaq.push(['_trackEvent', 'Click', 'Fork Select Nav', 'Select Nav Fork']);">Fork</a>
</div>

### Navigation Markup

Let’s look at the current, demo, navigation structure, which you’ll see has three levels of hierarchy, Top Level, Sub Item, Sub-sub Item. I’ve merely named them as these for the demo. The task for our script is to then take these levels of hierarchy, and dynamically append each item to a new  inside a  element.

{% highlight html %}
<nav id="nav">
  <ul>
    <li>
      <a href="?=item-1">Top Level Item 1</a>
      <ul>
        <li><a href="?=sub-1">Sub Item 1</a></li>
        <li><a href="?=sub-2">Sub Item 2</a></li>
        <li><a href="?=sub-3">Sub Item 3</a></li>
        <li><a href="?=sub-4">Sub Item 4</a></li>
        <li><a href="?=sub-5">Sub Item 5</a></li>
      </ul>
    </li>
    <li>
      <a href="?=item-2">Top Level Item 2</a>
    </li>
    <li>
      <a href="?=item-3">Top Level Item 3</a>
    </li>
    <li>
      <a href="?=item-4">Top Level Item 4</a>
      <ul>
        <li><a href="?=sub-1">Sub Item 1</a></li>
        <li><a href="?=sub-2">Sub Item 2</a></li>
        <li><a href="?=sub-3">Sub Item 3</a></li>
        <li><a href="?=sub-4">Sub Item 4</a></li>
        <li>
          <a href="?=sub-5">Sub Item 5</a>
          <ul>
            <li><a href="?=sub-sub-1">Sub-sub Item 1</a></li>
            <li><a href="?=sub-sub-2">Sub-sub Item 2</a></li>
            <li><a href="?=sub-sub-3">Sub-sub Item 3</a></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</nav>
{% endhighlight %}

You’ll see the HTML5 element  is being used here, but to make it easier and not markup reliant, we’ll use an ID attribute for our project. I’ve given this element the ID of ‘nav’, for hooking into the JavaScript later on. We’ll then create a script to append the finalised  element inside it, so it sits alongside our markup.

### Creating the Select element

We need to create a  element, which will later be appended to our existing navigation. Doing this with JavaScript looks like so:

{% highlight javascript %}
document.createElement('select');
{% endhighlight %}

We then need to give our new element an ID of ‘mobile’, so we know it’s the mobile navigation, and for later CSS styling purposes. We’ll need to create a variable to add the ID attribute, let’s call our variable ‘select’ and set the mobile ID attribute.

{% highlight javascript %}
var select = document.createElement('select');
select.setAttribute('id', 'mobile');
{% endhighlight %}

This would dynamically give us this markup:

{% highlight html %}
<select id="mobile">
{% endhighlight %}

### ‘Navigation’ first option

The first option in our  menu will be called ‘Navigation’. You can of course call it whatever you like. It’s best to create a ‘dummy’ first option that doesn’t do anything, one for readability and secondly for letting the user know what it is.

Now we’ll create the first  item:

{% highlight javascript %}
var first = document.createElement('option');
first.innerHTML = 'Navigation';
{% endhighlight %}

We’ll now need to add our first item to the select menu:

{% highlight javascript %}
select.appendChild(first);
{% endhighlight %}

The full script for this portion looks as follows:

{% highlight javascript %}
var select = document.createElement('select');
var first = document.createElement('option');

first.innerHTML = 'Navigation';
first.setAttribute('selected', 'selected');
select.setAttribute('id', 'mobile');
select.appendChild(first);
{% endhighlight %}    

### Dynamically creating the options

Let’s target the existing markup, and create an option element for each item. We create a nav variable which targets our element by ID, which is  in our earlier markup. Using a recursive function, we then use a for loop to loop through the child elements of our nav ID.

{% highlight javascript %}
var nav = document.getElementById('nav');
var loadLinks = function(element, hyphen, level) {

  var e = element;
  var children = e.children;

  for(var i = 0; i < e.children.length; ++i) {

    var currentLink = children[i];

    switch(currentLink.nodeName) {
      case 'A':
        var option = document.createElement('option');
        option.innerHTML = (level++ < 1 ? '' : hyphen) + currentLink.innerHTML;
        option.value = currentLink.href;
        select.appendChild(option);
        break;
      default:
        if(currentLink.nodeName === 'UL') {
          (level < 2) || (hyphen += hyphen);
        }
        loadLinks(currentLink, hyphen, level);
        break;
    }
  }
}
loadLinks(nav, '- ', 0);
{% endhighlight %}  

Inside the loop, we've got two different sections, one that creates an option for all 'A' elements, and the other which looks for the 'UL' element. Each child element is then passed through the loop, creating an  for each  element found.

A special check is then passed if the element (nodeName check) is strictly 'UL' - a  tag. I've then setup a hierarchy detection piece, which detects the level of the 'UL'. If the 'UL' is detected under a specific level, it won't append a hyphen. For nested  tags, past the first level, it will append a hyphen.

### Unlimited levels

This script uses a function which is recursive, and is setup so it will append one more hyphen for each level of hierarchy, so you always know how deep you are inside the navigation when using the  nav. This has the added bonus in which you can pretty much have as many nested  tags as you wish, so you don't need to worry about how nested your navigation is.

### Cross-browser 'onchange' solution

Appending the links to the  element is the first section, now we need to make the menu work when an  is selected. jQuery makes this easy, but not everything fun is easy ;-)

A cross-browser solution to this uses a few different one-line feature detections:

First we find our newly created  and assign it to a variable mobile.

addEventListener is supported by pretty much all browsers, apart from IE.

attachEvent is IE's version of addEventListener.

Should all else fail, a default onchange has been added. These have been setup as if, else if, else statements for our browsers to run through and check which suits them.

{% highlight javascript %}
var mobile = document.getElementById('mobile');

if(mobile.addEventListener) {
  mobile.addEventListener('change', function () {
    window.location.href = mobile.options[mobile.selectedIndex].value;
  });
} else if(mobile.attachEvent) {
  mobile.attachEvent('onchange', function () {
    window.location.href = mobile.options[mobile.selectedIndex].value;
  });
} else {
  mobile.onchange = function () {
    window.location.href = mobile.options[mobile.selectedIndex].value;
  }
}
{% endhighlight %}

### Putting everything together

Now that we've created the main pieces of our script, we need to put it all together. I've wrapped it all inside a function named selectnav() which you need to call after the DOM structure has been rendered. You can either remove the function 'wrap' and add the script to the bottom of your page, or include it inside a DOM ready function - but you knew that already.

{% highlight javascript %}
function selectnav() {

  var select = document.createElement('select');
  var first = document.createElement('option');

  first.innerHTML = 'Navigation';
  first.setAttribute('selected', 'selected');
  select.setAttribute('id', 'mobile');
  select.appendChild(first);

  var nav = document.getElementById('nav');
  var loadLinks = function(element, hyphen, level) {

    var e = element;
    var children = e.children;

    for(var i = 0; i < e.children.length; ++i) {

      var currentLink = children[i];

      switch(currentLink.nodeName) {
        case 'A':
          var option = document.createElement('option');
          option.innerHTML = (level++ < 1 ? '' : hyphen) + currentLink.innerHTML;
          option.value = currentLink.href;
          select.appendChild(option);
          break;
        default:
          if(currentLink.nodeName === 'UL') {
            (level < 2) || (hyphen += hyphen);
          }
          loadLinks(currentLink, hyphen, level);
          break;
      }
    }
  }

  loadLinks(nav, '- ', 0);

  nav.appendChild(select);

  var mobile = document.getElementById('mobile');

  if(mobile.addEventListener) {
    mobile.addEventListener('change', function () {
      window.location.href = mobile.options[mobile.selectedIndex].value;
    });
  } else if(mobile.attachEvent) {
    mobile.attachEvent('onchange', function () {
      window.location.href = mobile.options[mobile.selectedIndex].value;
    });
  } else {
    mobile.onchange = function () {
      window.location.href = mobile.options[mobile.selectedIndex].value;
    }
  }
}
{% endhighlight %}

Inside this script you'll notice this piece:

{% highlight javascript %}
nav.appendChild(select);
{% endhighlight %}

This adds our newly created  menu inside our  element. This keeps them inside the same element, which is great from a styling perspective as everything will be inside the same element. 

### Usage

Include the script inside your  tag, and call the function just before the closing  tag. For performance purposes you could include the script at the bottom of the page, and you wouldn't need to call the function. We merely call the function because it needs to be executed after the DOM elements have loaded.

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="js/selectnav.js"></script>
  </head>
  
  <body>
    <script>
      selectnav();
    </script>
  </body>
</html>
{% endhighlight %}

If you are using a DOM ready function handler or putting scripts before the closing body tag, then you can of course remove the script entirely from its function wrap, and add it like this:

{% highlight javascript %}
var select = document.createElement('select');
var first = document.createElement('option');

first.innerHTML = 'Navigation';
first.setAttribute('selected', 'selected');
select.setAttribute('id', 'mobile');
select.appendChild(first);

var nav = document.getElementById('nav');
var loadLinks = function(element, hyphen, level) {

  var e = element;
  var children = e.children;

  for(var i = 0; i < e.children.length; ++i) {

    var currentLink = children[i];

    switch(currentLink.nodeName) {
      case 'A':
        var option = document.createElement('option');
        option.innerHTML = (level++ < 1 ? '' : hyphen) + currentLink.innerHTML;
        option.value = currentLink.href;
        select.appendChild(option);
        break;
      default:
        if(currentLink.nodeName === 'UL') {
          (level < 2) || (hyphen += hyphen);
        }
        loadLinks(currentLink, hyphen, level);
        break;
    }
  }
}

loadLinks(nav, '- ', 0);

nav.appendChild(select);

var mobile = document.getElementById('mobile');

if(mobile.addEventListener) {
  mobile.addEventListener('change', function () {
    window.location.href = mobile.options[mobile.selectedIndex].value;
  });
} else if(mobile.attachEvent) {
  mobile.attachEvent('onchange', function () {
    window.location.href = mobile.options[mobile.selectedIndex].value;
  });
} else {
  mobile.onchange = function () {
    window.location.href = mobile.options[mobile.selectedIndex].value;
  }
}
{% endhighlight %}

### Browser compatibility

I've tested this in IE6, IE7, IE8, IE9, Chrome, iOS Safari & Chrome, Safari, FireFox, Opera. If you do run into any browser compatibility issues, drop a comment or pull/issue request on GitHub.

<div class="download-box">
  <a href="//www.toddmotto.com/labs/selectnav/" onclick="_gaq.push(['_trackEvent', 'Click', 'Demo Select Nav', 'Select Nav Demo']);">Demo</a>
  <a href="//www.toddmotto.com/labs/selectnav/selectnav.zip" onclick="_gaq.push(['_trackEvent', 'Click', 'Download Select Nav', 'Select Nav Download']);">Download</a>
  <a href="//github.com/toddmotto/selectnav" onclick="_gaq.push(['_trackEvent', 'Click', 'Fork Select Nav', 'Select Nav Fork']);">Fork</a>
</div>
