---
layout: post
permalink: /transclusion-in-angular-2-with-ng-content
title: Transclusion in Angular 2 with ng-content
path: 2016-03-22-transclusion-in-angular-2-with-ng-content.md
tag: angular
---

Transclusion is an AngularJS (1.x) term, lost in the rewrite of Angular (v2+), so let's bring it back for this article just concept clarity. The word "transclusion" may be gone, but the concepts remain.

<div class="toc" markdown="1">
<span class="gamma">Table of contents</span>
{:.no_toc}
* TOC
{:toc}
</div>

Essentially, transclusion in AngularJS is/was taking content such as a text node or HTML, and injecting it into a template at a specific entry point.

This is now done in Angular through modern web APIs such as Shadow DOM and known as "Content Projection". Let's explore!

### AngularJS transclusion

For those coming from an AngularJS background, transclusion looks a little like this with the `.directive()` API (if you know this already please pass Go and collect £200):

#### Single-slot transclusion

In AngularJS, we can designate a single slot to transclude content into:

{% highlight javascript %}
function myComponent() {
  scope: {},
  transclude: true,
  template: `
    <div class="my-component">
      <div ng-transclude></div>
    </div>
  `
};
angular
  .module('app')
  .directive('myComponent', myComponent);
{% endhighlight %}

We can then use the Directive as follows:

{% highlight html %}
<my-component>
  This is my transcluded content!
</my-component>
{% endhighlight %}

The compiled HTML output would then evaluate to:

{% highlight html %}
<my-component>
  <div class="my-component">
    <div ng-transclude>
      This is my transcluded content!
    </div>
  </div>
</my-component>
{% endhighlight %}

#### Multi-slot transclusion

We can also define multiple entry points in AngularJS 1.5+ using an Object as the value:

{% highlight javascript %}
function myComponent() {
  scope: {},
  transclude: {
    slotOne: 'p',
    slotTwo: 'div'
  },
  template: `
    <div class="my-component">
      <div ng-transclude="slotOne"></div>
      <div ng-transclude="slotTwo"></div>
    </div>
  `
};
angular
  .module('app')
  .directive('myComponent', myComponent);
{% endhighlight %}

Directive usage would be matching `'p'` and `'div'` tags in the above example to the relevant slots:

{% highlight html %}
<my-component>
  <p>
    This is my transcluded content!
  </p>
  <div>
    Further content
  </div>
</my-component>
{% endhighlight %}

Evaluated DOM output:

{% highlight html %}
<my-component>
  <div class="my-component">
    <div ng-transclude="slotOne">
      <p>
        This is my transcluded content!
      </p>
    </div>
    <div ng-transclude="slotTwo">
      <div>
        Further content
      </div>
    </div>
  </div>
</my-component>
{% endhighlight %}

### Angular Content Projection

So now we know what we're looking at from an AngularJS perspective, we can easily migrate this concept to Angular. However, if you've not used AngularJS, fear not as this concept is easily demonstrated above on how to inject content into another element or Component.

#### Web Components <content>

In Web Components, we _had_ the `<content>` element, which was [recently deprecated](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/content), which acted as a Shadow DOM insertion point. Angular allows Shadow DOM through the use of [ViewEncapsulation](/emulated-native-shadow-dom-angular-2-view-encapsulation). Early alpha versions of Angular adopted the `<content>` element, however due to the nature of a bunch of Web Component helper elements being deprecated, it was changed to `<ng-content>`.

#### Single-slot content Projection

In Angular's single-slot content projection, the boilerplate is so much nicer and more descriptive. We simply use the `<ng-content>` element in our Component and that's it:

{% highlight javascript %}
// my-component.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-component',
  template: `
    <div class="my-component">
      <ng-content></ng-content>
    </div>
  `
})
export class MyComponent {}
{% endhighlight %}

Now to use the element we import `MyComponent`, and project some content between those `<my-component>` tags:

{% highlight javascript %}
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="app">
      <my-component>
        This is my transcluded content!
      </my-component>
    </div>
  `
})
export class AppComponent {}
{% endhighlight %}

DOM output:

{% highlight html %}
<div class="app">
  <my-component>
    <div class="my-component">
      This is my transcluded content!
    </div>
  </my-component>
</div>
{% endhighlight %}

Live output:

<iframe src="//embed.plnkr.co/TCusCR4NHGbJy9gBN7ZV?deferRun" frameborder="0" border="0" cellspacing="0" cellpadding="0" width="100%" height="250"></iframe>

#### Multi-slot content projection

Multi-slot is just as easy as you'd think as well. Much like multi-slot in AngularJS, we use named slots again. However the only difference is instead of aliasing the DOM reference against a custom `transclude: {}` property, we talk to the DOM node directly.

Let's assume the following markup inside our `my-app` Component:

{% highlight javascript %}
// app.component.ts
@Component({
  selector: 'my-app',
  template: `
    <div class="app">
      <my-component>
        <my-component-title>
          This is the Component title!
        </my-component-title>
        <my-component-content>
          And here's some awesome content.
        </my-component-content>
      </my-component>
    </div>
  `
})
{% endhighlight %}

Here we're assuming we have `my-component-title` and `my-component-content` available as custom components. Now we can grab references to the components and tell Angular to inject where appropriate.

The only change we need to make from AngularJS thinking is adding a dedicated `select=""` attribute to the `<ng-content>` element:

{% highlight javascript %}
// my-component.component.ts
@Component({
  selector: 'my-component',
  template: `
    <div class="my-component">
      <div>
        Title:
        <ng-content select="my-component-title"></ng-content>
      </div>
      <div>
        Content:
        <ng-content select="my-component-content"></ng-content>
      </div>
    </div>
  `
})
{% endhighlight %}

This internally fetches the relevant DOM node, which in this case are `<my-component-title>` and `<my-component-content>`.

DOM output:

{% highlight html %}
<div class="app">
  <my-component>
    <div class="my-component">
      <div>
        Title:
        <my-component-title>
          This is the Component title!
        </my-component-title>
      </div>
      <div>
        Content:
        <my-component-content>
          And here's some awesome content.
        </my-component-content>
      </div>
    </div>
  </my-component>
</div>
{% endhighlight %}

Live output:

<iframe src="//embed.plnkr.co/NbwoKx6yFQ2uFp2wWnj1?deferRun" frameborder="0" border="0" cellspacing="0" cellpadding="0" width="100%" height="250"></iframe>

We don't have to use a custom element approach as above when declaring content to be projected, we can use regular elements and target them the way we talk to elements with `document.querySelector`:

{% highlight javascript %}
// app.component.ts
@Component({
  selector: 'my-app',
  template: `
    <div class="app">
      <my-component>
        <div class="my-component-title">
          This is the Component title!
        </div>
        <div class="my-component-content">
          And here's some awesome content.
        </div>
      </my-component>
    </div>
  `
})
{% endhighlight %}

And corresponding template changes inside `MyComponent`:

{% highlight javascript %}
// my-component.component.ts
template: `
  <div class="my-component">
    <div>
      Title:
      <ng-content select=".my-component-title"></ng-content>
    </div>
    <div>
      Content:
      <ng-content select=".my-component-content"></ng-content>
    </div>
  </div>
`
{% endhighlight %}
