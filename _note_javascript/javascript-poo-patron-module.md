---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-poo-patron-module
title: "Le patron de conception Module"
path: javascript-poo-patron-module.md
date: "2022-08-16"
tag: js
status: publish
toc: javascript-note
order: 32
collection: note_javascript
   
---

La programmation orientée o.

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

## Le patron de conception Module
Le JavaScript est un langage de programmation qui peut avoir de multiples facettes et de multiples structures. Il n'y a qu'à penser aux fonctions anonymes, aux objets littéraux ou à la syntaxe des librairies externes telles que jQuery pour voir la grande diversité et la complexité de ce langage. La section suivante présentera quelques éléments qui apparaissent comme des techniques avancées et permettent de passer à un autre niveau dans l'usage de JavaScript. L'objectif de cette section est d'explorer le patron de conception Module. Pour ce faire, il faut d'abord voir certains principes en JavaScript tels que les fermetures ou clôtures (*closures*) et les *Immediately Invoked Function Expression* (IIFE).

### Closure
Une *closure* est une fonction qui retient la référence à son environnement, permet d'enregistrer et de conserver les valeurs de ses variables tout au long du déroulement du programme. Une *closure* est définie quand une fonction est définie à l'intérieur du corps d'une autre fonction et accède à des variables locales de celle-ci. Il ne s'agit donc pas d'un autre type d'objet ou d'un autre type de fonction, mais bien d'une structure syntaxique spécifique qui permet de créer des fonctions possédant une « mémoire » de certaines valeurs. Normalement, la portée des variables définies à l'intérieur des fonctions ne dépasse pas le stade de leur exécution, elles sont normalement effacées une fois la fonction terminée. Dans une fermeture, ces variables sont maintenues et reste disponible pour la fonction imbriquée.

Dans l'exemple suivant, la variable b ne maintient pas sa valeur entre les deux appels de la fonction aPlusB().

Exemple :
```js
function aPlusB(a, b) {
    let x;
    if(b)
    {
        x = b;
    }
    return x + a;
}
let res = aPlusB(5, 4);
console.log(res); // 9
let res = aPlusB(5);
console.log(res); // NaN, la valeur de x n'est pas maintenue entre les deux appels.
```

Cet exemple est un peu plus complexe et agit de manière inattendue. C'est là même l'exemple d'une *closure*.

Exemple :
```js
function closure() {
    let x=0;
    let y=0;
    return function (a, b) {
        if (b)
        {
            x = b;
        }
        if(a)
        {
            y = a;
        }
        return x + y;
    };
}

let aPlusB = closure(); // aPlusB devient la fonction retourné par closure().

let res1 = aPlusB(5, 4); // 5 + 4 = 9
console.log(res1); // Donc 9
let res2 = aPlusB(5); // 5 + ? = ?
console.log(res2); // 9, pourquoi ?
let res3 = aPlusB(null,10); // null + 10 = ?
console.log(res3); // 15, pourquoi ?
```
La fonction aPlusB(a, b) maintient sa référence à son contexte ou à son environnement lors de sa création, c'est-à-dire à la fonction closure(). Les variables x et y conservent donc leur valeur au-delà de l'appel de closure() et son accessible à l'aide de la fonction aPlusB(). 

La ligne let aPlusB = closure(); est cependant inélégante et le rapport entre le nom de la fonction closure() et la fonction finale (aPlusB()) n'est pas très explicite. Cette méthode de travail profiterait de pouvoir s'effectuer avec une fonction anonyme. Cependant, pour que la fonction aPlusB() retiennent la valeur de x et de y, il faut que la fonction soit appelée et non simplement déclaré. Ainsi l'exemple suivant ne fonctionne pas puisque la fonction anonyme n'est pas appelée initialement.

```js
let aPlusB = function () {
    let x=0;
    let y=0;
    return function (a, b) {
        if (b)
        {
            x = b;
        }

        if(a)
        {
            y = a;
        }
        return x + y;
    };
}

let res = aPlusB(5, 4); // 5 + 4 = 9

console.log(res); // => function()
```

La manière de contourner le problème est d'utiliser une *Immediately Invoked Function Expression* (IIFE).

## *Immediately Invoked Function Expression* (IIFE)
La IIFE est une fonction qui s'appelle automatique et immédiatement après avoir été déclaré.
Syntaxe

```js
// Syntaxe recommandée
(function() {
    /* code */
})();

// Syntaxe recommandée avec passage de paramètre
(function(param) { // Paramètre reçu
    /* code */
})(param); // paramètre passé à la IIFE
```

Elle est utilisée de plusieurs manières et dans plusieurs contextes. D'abord, elle permet d'isoler les fonctions et les variables dans un « scope » spécifique qui ne serait pas accessible au reste du code. Ensuite, comme elle est appelée automatiquement, elle est idéale dans les cas où l'on voudrait appliquer un correctif spécifique pour un navigateur, par exemple un « polyfill ». La IIFE peut aussi retourner des valeurs, elle pourrait donc être utilisée afin de créer ou d'initialiser un objet. C'est sur cet aspect qu'est construit le Module pattern.

Exemple
```js
let aPlusB = (function() {
    let x = 0;
    let y = 0;
    return function(a, b) {
        if (b) {
            x = b;
        }

        if (a) {
            y = a;
        }

        return x + y;
    };
})();

let res = aPlusB(5, 4); // 5 + 4 = 9
console.log(res); // Donc 9
let res = aPlusB(5); // 5 + ? = ?
console.log(res); // 9, pourquoi ?
console.log(aPlusB.x); // => undefined, aucun accès puisque seule la fonction est retournée
```
## Module pattern en JavaScript
Par définition, les propriétés et les méthodes d'un prototype ne peuvent être cachées à l'intérieur de l'objet. Il ne peut y avoir de propriétés inaccessibles puisque l'objet lui-même devient le modèle permettant la création des autres instances. Il existe une méthode de travail qui permet de reproduire le modèle de définition privée des propriétés et des méthodes des langages à classe. L'utilisation du patron de conception Module (*Javascript Module Pattern*) permet de contourner cette limite et de produire des objets ayant  des propriétés et des méthodes privées et publiques. Le Module Pattern consiste à utiliser dans une IIFE le principe des *closures* ce qui permet de retourner un objet littéral composé uniquement des méthodes et des propriétés publiques accessibles.

Il est possible de retourner deux modèles d'objet dans le patron Module, l'un avec un prototype et l'autre sans prototype

Exemple 1 : avec prototype
```js
let module = (function() {
    // Variables privées
    let foo = 'bar';
    
    // Méthodes privées
    function test(){};
    
    // Section publique

    // constructeur

    let module = function() {};
    
    // prototype
    module.prototype = {
        constructor: module,
        methode1: function() {},
        methode2: function() {}
    };

    // Retour de l'objet avec son prototype
    return module;
})();

let monModule = new module(); // Instanciation de l'objet
```

Exemple 2 : sans prototype
```js
let monModule = (function() {
    // Variables privées
    let foo = 'bar';

    // Méthodes privées
    function test(){};

    // Retour des methodes publiques
    return {
        get: function() {
            return foo;
        },
        set: function(val) {
            foo = val;
        },
        Methode1: function() {}
    };
})();
```

Dans le premier cas, l'objet module contient un prototype donc il peut être instancié. Il devrait être utilisé dans des cas où l'on doit déclarer plusieurs objets de ce type. Dans le deuxième cas, monModule est déjà instancié et il ne contient pas de prototype. Il doit être privilégié quand un seul objet de ce type doit être créé, tel que dans un objet qui contiendrait des méthodes utilitaires.


# Stratégies et astuces de travail avec les objets



# Exercices sur les objets



# Sources additionnelles
* [Classe - JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)



