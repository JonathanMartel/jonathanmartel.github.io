---
layout: post
permalink: /js-classes-es6
title: "Les classes ECMAScript 6"
path: 2017-10-19-js-classes-es6.md
tag: js
status: publish
---

L'ECMAScript 2015 ou ES6 fait apparaître un ajout syntaxiquement intéressant dans la gestion des objets en JavaScript. Le TC39 ajoute une déclaration de classe qui, sans remplacer l'héritage prototypal et la gestion des objets, simplie leur déclaration. Celle-ci ne règle pas les problèmes d'espace privé déjà présente en JavaScript. Il faudra attendre encore quelques mois/années avant que les [espaces privés](https://tc39.github.io/proposal-class-fields/) ne fassent leur apparition.



<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

### Les limites de la IIFE et du patron de conception module
Auparavant, une des manières très populaire de créer un objet en Javascript est d'utiliser le patron de conception Module (*Module pattern*). Ce dernier permet de définir un objet avec ses méthodes et ses propriétés. Il permet aussi de définir une portée publique et privées à ces dernières. Ce patron de conception agit comme un espace de nom et ne permet pas de créer des instances multiples de l'objet. 

En voici un exemple simple.

```js
var MonObjet = (function(){
    //Propriété privée
    var _privee1, 
        _privee2;
    // Méthodes privées
    function _fctPrivee(){
    }
    function _fctPrivee2(){
    }
    // Zone de retour des méthodes publiques
    return {
        "fctPublique1": function(){},
        "fctPublique2": function(){},
    };
    
})();
MonObjet.fctPublique1();
```

Il y a plusieurs limites à ce type de structure, notamment, le manque de souplesse quant à la création d'instance de l'objet. Un espace de nom ne permet pas de créer des instances multiples. Pour régler ce problème, on peut retourner le constructeur d'un objet afin d'en créer des instances distinctes. 

L'exemple suivant montre ce choix.

```js
var MonObjet = (function(){
    //Propriété privée
    var _privee1, 
        _privee2;
        
    // Méthodes privées
    function _MonObjet(){
    // Code du constructeur
    }
    function _fctPrivee(){
    }
    function _fctPrivee2(){
    }
    // Zone des méthodes publiques
    _MonObjet.prototype.setVariable = function(param){
                                                        _privee1 = param
                                                        this.variable=param;
                                                    }
    _MonObjet.prototype.getPublic = function(){return this.variable}
    _MonObjet.prototype.getPrivee = function(){return _privee1}
    return _MonObjet;
})();
var monObjet1 = new MonObjet();
var monObjet2 = new MonObjet();
monObjet1.setVariable("test");  
monObjet2.setVariable("test2");  
console.log(monObjet1.getPublic());     // "test"
console.log(monObjet1.getPrivee());     // "test2" euh !?!
console.log(monObjet2.getPublic());     // "test2" 
console.log(monObjet2.getPrivee());     // "test2"

```
> Dans cet exemple monObjet1 et monObjet2 partage l'accès aux mêmes propriétés privée `_privee1` et `_privee2`. Les propriétés publiques sont distinctes, mais pas les propriétés privées sont communes. Elles ne sont définies qu'une seule fois lors de la création initiale de `MonObjet`.

Pour corriger ce problème, il faut plutôt utiliser un patron de type Factory. Il s'agira d'une fonction de construction d'une instance d'objet. Au lieu d'utiliser une IIFE, on appelera explicitement le factory qui retournera l'objet. Dans ce cas, chaque instance à accès à ses propres propriétés (publiques comme privées). L'inconvénient est qu'il n'y a plus le mot `new` pour clarifier la syntaxe.

```js
var MonFactoryObjet = function(){
    //Propriété privée
    var _privee1, 
        _privee2;
    // Méthodes privées
    var _MonObjet = {
    }
    function _fctPrivee(){
    }
    function _fctPrivee2(){
    }
    // Zone des méthodes publiques
    _MonObjet.setVariable = function(param){    
                                                _privee1 = param
                                                this.variable=param;
                                            }
    _MonObjet.getPublic = function(){return this.variable}
    _MonObjet.getPrivee = function(){return _privee1}
    return _MonObjet;
}
var monObjet1 = MonFactoryObjet();
var monObjet2 = MonFactoryObjet();

monObjet1.setVariable("test");  
monObjet2.setVariable("test2");  
console.log(monObjet1.getPublic());     // test
console.log(monObjet1.getPrivee());     // test
console.log(monObjet2.getPublic());     // test2
console.log(monObjet2.getPrivee());     // test2
console.log(monObjet1.getPublic());     // test
```

De prime abord le patron factory règle les problèmes et permet d'utiliser des instances d'objet encapsulé, mais le style d'écriture (la syntaxe) est toutefois loin de ce que l'on peut voir dans d'autres langages de programmation orientée objet (PHP >= 5, C++, Java, C#, TypeScript, etc). 

### Les classes ES6
Les classes ECMASScript 2015 sont un ajout syntaxique afin de clarifier l'écriture des objets en JavaScript. Elle n'introduit pas de changement majeur à l'héritage prototypal. 

Elle se déclare d'une matière simple et sans ambiguité.
```js
class MonObjet{
    constructor(param){
        this.param = param
    }
    methodePublique(){
        return this.param;
    }
}
```
Mais souffre de la même faiblesse que les objets prototypaux standards, c'est-à-dire qu'ils ne possède pas de propriétés ou méthodes privées. Pour avoir de tel bénéfice, il faudra attendre la que la proposition des Class-field[https://github.com/tc39/proposal-class-fields] traverse la lente progression des propositions du Comité technique 39 de l'ECMAScript (TC39 pour les intimes).




### Sources :
https://stackoverflow.com/questions/35237779/difference-between-an-iife-and-non-iife-in-javascript-modular-approach
https://toddmotto.com/mastering-the-module-pattern/
https://toddmotto.com/typescript-setters-getter
https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e
https://atendesigngroup.com/blog/factory-functions-javascript
