---
layout: post
permalink: /everything-you-wanted-to-know-about-javascript-scope/
title: Everything you wanted to know about JavaScript scope
path: 2013-12-29-everything-you-wanted-to-know-about-javascript-scope.md
tag: js
---

The JavaScript language has a few concepts of "scope", none of which are straightforward or easy to understand as a new JavaScript developer (and even some experienced JavaScript developers). This post is aimed at those wanting to learn about the many depths of JavaScript after hearing words such as `scope`, `closure`, `this`, `namespace`, `function scope`, `global scope`, `lexical scope` and `public/private scope`.

<div class="toc" markdown="1">
<span class="gamma">Table of contents</span>
{:.no_toc}
* TOC
{:toc}
</div>

Hopefully by reading this post you'll know the answers to:

- What is Scope?
- What is Global/Local Scope?
- What is a Namespace and how does it differ to Scope?
- What is the `this` keyword and how does Scope affect it?
- What is Function/Lexical Scope?
- What are Closures?
- What is Public/Private Scope?
- How can I understand/create/do all of the above?

### What is Scope?
In JavaScript, scope refers to the current context of your code. Scopes can be _globally_ or _locally_ defined. Understanding JavaScript scope is key to writing bulletproof code and being a better developer. You'll understand where variables/functions are accessible, be able to change the scope of your code's context and be able to write faster and more maintainable code, as well as debug much faster.

Thinking about scope is easy, are we inside `Scope A` or `Scope B`?

### What is Global Scope?
Before you write a line of JavaScript, you're in what we call the `Global Scope`. If we declare a variable, it's defined globally:

{% highlight javascript %}
// global scope
var name = 'Todd';
{% endhighlight %}

Global scope is your best friend and your worst nightmare, learning to control your scopes is easy and in doing so, you''ll run into no issues with global scope problems (usually namespace clashes). You'll often hear people saying "Global Scope is _bad_", but never really justifying as to _why_. Global scope isn't bad, you need it to create Modules/APIs that are accessible across scopes, you must use it to your advantage and not cause issues.

Everyone's used jQuery before, as soon as you do this...

{% highlight javascript %}
jQuery('.myClass');
{% endhighlight %}

... we're accessing jQuery in _global_ scope, we can refer to this access as the `namespace`. The namespace is sometimes an interchangeable word for scope, but usually the refers to the highest level scope. In this case, `jQuery` is in the global scope, and is also our namespace. The `jQuery` namespace is defined in the global scope, which acts as a namespace for the jQuery library as everything inside it becomes a descendent of that namespace.

### What is Local Scope?
A local scope refers to any scope defined past the global scope. There is typically one global scope, and each function defined has its own (nested) local scope. Any function defined within another function has a local scope which is linked to the outer function.

If I define a function and create variables inside it, those variables becomes locally scoped. Take this example:

{% highlight javascript %}
// Scope A: Global scope out here
var myFunction = function () {
  // Scope B: Local scope in here
};
{% endhighlight %}

Any locally scoped items are not visible in the global scope - _unless_ exposed, meaning if I define functions or variables within a new scope, it's inaccessible _outside_ of that current scope. A simple example of this is the following:

{% highlight javascript %}
var myFunction = function () {
  var name = 'Todd';
  console.log(name); // Todd
};
// Uncaught ReferenceError: name is not defined
console.log(name);
{% endhighlight %}

The variable `name` is scoped locally, it isn't exposed to the parent scope and therefore undefined.

### Function scope
All scopes in JavaScript are created with `Function Scope` _only_, they aren't created by `for` or `while` loops or expression statements like `if` or `switch`. New functions = new scope - that's the rule. A simple example to demonstrate this scope creation:

{% highlight javascript %}
// Scope A
var myFunction = function () {
  // Scope B
  var myOtherFunction = function () {
    // Scope C
  };
};
{% endhighlight %}

It's easy to create new scope and create local variables/functions/objects.

### Lexical Scope
Whenever you see a function within another function, the inner function has access to the scope in the outer function, this is called Lexical Scope or Closure - also referred to as Static Scope. The easiest way to demonstrate that again:

{% highlight javascript %}
// Scope A
var myFunction = function () {
  // Scope B
  var name = 'Todd'; // defined in Scope B
  var myOtherFunction = function () {
    // Scope C: `name` is accessible here!
  };
};
{% endhighlight %}

You'll notice that `myOtherFunction` _isn't_ being called here, it's simply defined. Its order of call also has effect on how the scoped variables react, here I've defined my function and called it _under_ another `console` statement:

{% highlight javascript %}
var myFunction = function () {
  var name = 'Todd';
  var myOtherFunction = function () {
    console.log('My name is ' + name);
  };
  console.log(name);
  myOtherFunction(); // call function
};

// Will then log out:
// `Todd`
// `My name is Todd`
{% endhighlight %}

Lexical scope is easy to work with, _any_ variables/objects/functions defined in _its_ parent scope, are available in the scope chain. For example:

{% highlight javascript %}
var name = 'Todd';
var scope1 = function () {
  // name is available here
  var scope2 = function () {
    // name is available here too
    var scope3 = function () {
      // name is also available here!
    };
  };
};
{% endhighlight %}

The only important thing to remember is that Lexical scope does _not_ work backwards. Here we can see how Lexical scope _doesn't_ work:

{% highlight javascript %}
// name = undefined
var scope1 = function () {
  // name = undefined
  var scope2 = function () {
    // name = undefined
    var scope3 = function () {
      var name = 'Todd'; // locally scoped
    };
  };
};
{% endhighlight %}

I can always return a reference to `name`, but never the variable itself.

### Scope Chain
Scope chains establish the scope for a given function. Each function defined has its own nested scope as we know, and any function defined within another function has a local scope which is linked to the outer function - this link is called the chain. It's always the _position_ in the code that defines the scope. When resolving a variable, JavaScript starts at the innermost scope and searches outwards until it finds the variable/object/function it was looking for.

### Closures
Closures ties in very closely with Lexical Scope. A better example of how the _closure_ side of things works, can be seen when returning a _function reference_ - a more practical usage. Inside our scope, we can return things so that they're available in the parent scope:

{% highlight javascript %}
var sayHello = function (name) {
  var text = 'Hello, ' + name;
  return function () {
    console.log(text);
  };
};
{% endhighlight %}

The `closure` concept we've used here makes our scope inside `sayHello` inaccessible to the public scope. Calling the function alone will do nothing as it _returns_ a function:

{% highlight javascript %}
sayHello('Todd'); // nothing happens, no errors, just silence...
{% endhighlight %}

The function returns a function, which means it needs assignment, and _then_ calling:

{% highlight javascript %}
var helloTodd = sayHello('Todd');
helloTodd(); // will call the closure and log 'Hello, Todd'
{% endhighlight %}

Okay, I lied, you _can_ call it, and you may have seen functions like this, but this will call your closure:

{% highlight javascript %}
sayHello('Bob')(); // calls the returned function without assignment
{% endhighlight %}

AngularJS uses the above technique for its `$compile` method, where you pass the current scope reference into the closure:

{% highlight javascript %}
$compile(template)(scope);
{% endhighlight %}

Meaning we could guess that their code would (over-simplified) look like this:

{% highlight javascript %}
var $compile = function (template) {
  // some magic stuff here
  // scope is out of scope, though...
  return function (scope) {
    // access to `template` and `scope` to do magic with too
  };
};
{% endhighlight %}

A function doesn't _have_ to return in order to be called a closure though. Simply accessing variables outside of the immediate lexical scope creates a closure.

### Scope and 'this'
Each scope binds a different value of `this` depending on how the function is invoked. We've all used the `this` keyword, but not all of us understand it and how it differs when invoked. By default `this` refers to the outer most global object, the `window`. We can easily show how invoking functions in different ways binds the `this` value differently:

{% highlight javascript %}
var myFunction = function () {
  console.log(this); // this = global, [object Window]
};
myFunction();

var myObject = {};
myObject.myMethod = function () {
  console.log(this); // this = Object { myObject }
};

var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  console.log(this); // this = <nav> element
};
nav.addEventListener('click', toggleNav, false);
{% endhighlight %}

There are also problems that we run into when dealing with the `this` value, for instance if I do this, even inside the same function the scope can be changed and the `this` value can be changed:

{% highlight javascript %}
var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  console.log(this); // <nav> element
  setTimeout(function () {
    console.log(this); // [object Window]
  }, 1000);
};
nav.addEventListener('click', toggleNav, false);
{% endhighlight %}

So what's happened here? We've created new scope which is not invoked from our event handler, so it defaults to the `window` Object as expected. There are several things we can do if we want to access the proper `this` value which isn't affected by the new scope. You might have seen this before, where we can cache a reference to the `this` value using a `that` variable and refer to the lexical binding:

{% highlight javascript %}
var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  var that = this;
  console.log(that); // <nav> element
  setTimeout(function () {
    console.log(that); // <nav> element
  }, 1000);
};
nav.addEventListener('click', toggleNav, false);
{% endhighlight %}

This is a neat little trick to be able to use the proper `this` value and resolve problems with newly created scope.

### Changing scope with .call(), .apply() and .bind()
Sometimes you need to manipulate the scopes of your JavaScript depending on what you're looking to do. A simple demonstration of how to change the scope when looping:

{% highlight javascript %}
var links = document.querySelectorAll('nav li');
for (var i = 0; i < links.length; i++) {
  console.log(this); // [object Window]
}
{% endhighlight %}

The `this` value here doesn't refer to our elements, we're not invoking anything or changing the scope. Let's look at how we can change scope (well, it looks like we change scope, but what we're really doing is changing the _context_ of how the function is called).

#### .call() and .apply()

The `.call()` and `.apply()` methods are really sweet, they allows you to pass in a scope to a function, which binds the correct `this` value. Let's manipulate the above function to make it so that our `this` value is each element in the array:

{% highlight javascript %}
var links = document.querySelectorAll('nav li');
for (var i = 0; i < links.length; i++) {
  (function () {
    console.log(this);
  }).call(links[i]);
}
{% endhighlight %}

You can see I'm passing in the current element in the Array iteration, `links[i]`, which changes the scope of the function so that the `this` value becomes that iterated element. We can then use the `this` binding if we wanted. We can use either `.call()` or `.apply()` to change the scope, but any further arguments are where the two differ: `.call(scope, arg1, arg2, arg3)` takes individual arguments, comma separated, whereas `.apply(scope, [arg1, arg2])` takes an Array of arguments.

It's important to remember that using `.call()` or `.apply()` actually invokes your function, so instead of doing this:

{% highlight javascript %}
myFunction(); // invoke myFunction
{% endhighlight %}

You'll let `.call()` handle it and chain the method:

{% highlight javascript %}
myFunction.call(scope); // invoke myFunction using .call()
{% endhighlight %}

#### .bind()
Unlike the above, using `.bind()` does not _invoke_ a function, it merely binds the values before the function is invoked. It's a real shame this was introduced in ECMAScript 5 and not earlier as this method is fantastic. As you know we can't pass parameters into function references, something like this:

{% highlight javascript %}
// works
nav.addEventListener('click', toggleNav, false);

// will invoke the function immediately
nav.addEventListener('click', toggleNav(arg1, arg2), false);
{% endhighlight %}

We _can_ fix this, by creating a new function inside it:

{% highlight javascript %}
nav.addEventListener('click', function () {
  toggleNav(arg1, arg2);
}, false);
{% endhighlight %}

But again this changes scope and we're creating a needless function again, which will be costly on performance if we were inside a loop and binding event listeners. This is where `.bind()` shines through, as we can pass in arguments but the functions are not called:

{% highlight javascript %}
nav.addEventListener('click', toggleNav.bind(scope, arg1, arg2), false);
{% endhighlight %}

The function isn't invoked, and the scope can be changed if needed, but arguments are sat waiting to be passed in.

### Private and Public Scope
In many programming languages, you'll hear about `public` and `private` scope, in JavaScript there is no such thing. We can, however, emulate public and private scope through things like Closures.

By using JavaScript design patterns, such as the `Module` pattern for example, we can create `public` and `private` scope. A simple way to create private scope, is by wrapping our functions inside a function. As we've learned, functions create scope, which keeps things out of the global scope:

{% highlight javascript %}
(function () {
  // private scope inside here
})();
{% endhighlight %}

We might then add a few functions for use in our app:

{% highlight javascript %}
(function () {
  var myFunction = function () {
    // do some stuff here
  };
})();
{% endhighlight %}

But when we come to calling our function, it would be out of scope:

{% highlight javascript %}
(function () {
  var myFunction = function () {
    // do some stuff here
  };
})();

myFunction(); // Uncaught ReferenceError: myFunction is not defined
{% endhighlight %}

Success! We've created private scope. But what if I want the function to be public? There's a great pattern (called the Module Pattern [and Revealing Module Pattern]) which allows us to scope our functions correctly, using private and public scope and an `Object`. Here I grab my global namespace, called `Module`, which contains all of my relevant code for that module:

{% highlight javascript %}
// define module
var Module = (function () {
  return {
    myMethod: function () {
      console.log('myMethod has been called.');
    }
  };
})();

// call module + methods
Module.myMethod();
{% endhighlight %}

The `return` statement here is what returns our `public` methods, which are accessible in the global scope - _but_ are `namespaced`. This means our Module takes care of our namespace, and can contain as many methods as we want. We can extend the Module as we wish:

{% highlight javascript %}
// define module
var Module = (function () {
  return {
    myMethod: function () {

    },
    someOtherMethod: function () {

    }
  };
})();

// call module + methods
Module.myMethod();
Module.someOtherMethod();
{% endhighlight %}

So what about private methods? This is where a lot of developers go wrong and pollute the global namespace by dumping all their functions in the global scope. Functions that help our code _work_ do not need to be in the global scope, only the API calls do - things that _need_ to be accessed globally in order to work. Here's how we can create private scope, by _not_ returning functions:

{% highlight javascript %}
var Module = (function () {
  var privateMethod = function () {

  };
  return {
    publicMethod: function () {

    }
  };
})();
{% endhighlight %}

This means that `publicMethod` can be called, but `privateMethod` cannot, as it's privately scoped! These privately scoped functions are things like helpers, addClass, removeClass, Ajax/XHR calls, Arrays, Objects, anything you can think of.

Here's an interesting twist though, anything in the same scope has access to anything in the same scope, even _after_ the function has been returned. Which means, our `public` methods have _access_ to our `private` ones, so they can still interact but are unaccessible in the global scope.

{% highlight javascript %}
var Module = (function () {
  var privateMethod = function () {

  };
  return {
    publicMethod: function () {
      // has access to `privateMethod`, we can call it:
      // privateMethod();
    }
  };
})();
{% endhighlight %}

This allows a very powerful level of interactivity, as well as code security. A very important part of JavaScript is ensuring security, which is exactly _why_ we can't afford to put all functions in the global scope as they'll be publicly available, which makes them open to vulnerable attacks.

Here's an example of returning an Object, making use of `public` and `private` methods:

{% highlight javascript %}
var Module = (function () {
  var myModule = {};
  var privateMethod = function () {

  };
  myModule.publicMethod = function () {

  };
  myModule.anotherPublicMethod = function () {

  };
  return myModule; // returns the Object with public methods
})();

// usage
Module.publicMethod();
{% endhighlight %}

One neat naming convention is to begin `private` methods with an underscore, which visually helps you differentiate between public and private:

{% highlight javascript %}
var Module = (function () {
  var _privateMethod = function () {

  };
  var publicMethod = function () {

  };
})();
{% endhighlight %}

This helps us when returning an anonymous `Object`, which the Module can use in Object fashion as we can simply assign the function references:

{% highlight javascript %}
var Module = (function () {
  var _privateMethod = function () {

  };
  var publicMethod = function () {

  };
  return {
    publicMethod: publicMethod,
    anotherPublicMethod: anotherPublicMethod
  }
})();
{% endhighlight %}

Happy scoping!
