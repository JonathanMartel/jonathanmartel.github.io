---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-fonctions
title: "Les fonctions"
path: 2020-09-29-javascript-fonctions.md
tag: js
status: publish
has_children: true
toc: javascript-note
order: 11
collection: note_javascript
   
---
Comme dans d'autres langages de programmation, les fonctions permettent de définir des instructions récurrentes dans un programme. En d'autres termes, elles sont un ensemble d'instructions qui sont définies une seule fois, mais peuvent être exécutées ou appelées plusieurs fois. 

Rapporté à des objets les fonctions sont appelées des méthodes et peuvent avoir accès aux données de l'objet pour laquelle elles sont définies [(voir Section Programmation orientée objet pour plus de détails)](url).

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>



# Définition de fonction

Les fonctions sont définies en utilisant le mot clé `function`, suivi des éléments suivants :

-   Un identifiant ou un nom. Le nom de la fonction servira lors des appels et représente un objet de type `fonction`.
-   Une liste d'identifiants optionnels séparés par des virgules et contenue entre parenthèses. Appelé *paramètre*, ces identifiants sont des valeurs dont pourra disposer la fonction pour opérer.
-   Un ensemble d'accolade `{ }` qui délimitera le bloc d'instructions de la fonction


```js
// Fonction "incremente" avec le paramètre x
function incremente (x) {       
    return x+1; // Retourne la valeur du paramètre + 1
}
```

> Notez que l'accolade ouvrante `{` peut être placée sur la même ligne que la définition de la fonction `function incremente (x) {` ou bien sous cette ligne. Afin de faciliter l'identification des blocs, il est souvent plus facile d'aligner les accolades ouvrantes `{` et fermantes `}` verticalement, donc de placer l'accolade ouvrante `{` sur une nouvelle ligne. L'usage veut qu'on place l'accolade ouvrante après la parenthèse des paramètres, par contre, L'essentiel, c'est de maintenir la cohérence dans votre choix : toujours au même endroit.

# Identifiant de la fonction (nom)
Une fonction standard doit avoir un identifiant unique qui permet de l'appeler. Ce nom doit débuter par une lettre, le symbole `$` ou `_` et peut comprendre des caractères alphanumériques. En JavaScript, le nom des variables et des fonctions est sensible à la case et respecte le standard Unicode, c'est-à-dire que `Bonjour()` et `bonjour()` ne sont pas équivalents et que la fonction `ಠ_ಠ()` est valide, mais franchement non conseillé.

# Paramètres
Les paramètres sont des valeurs qui peuvent être passées à la fonction afin qu'elle puisse réaliser des opérations en les utilisants. Ces paramètres sont disponibles dans la fonction seulement et ne sont pas modifiés globalement (voir la portée des variables). Une fonction peut avoir un nombre illimité de paramètres ou bien aucun.

Si dans plusieurs langages de programmation, les paramètres d'une fonction sont optionnels, il est essentiel de noter qu'en JavaScript, en plus d'être optionnel, ils peuvent être omis, même si la déclaration de la fonction définie plusieurs paramètres. Le programmeur doit donc être attentif à sa manière d'appeler les fonctions puisqu'aucune erreur ne sera générée si le nombre ou le type de paramètre est incompatible. 

# Appel de fonction
L'appel de fonction consiste à utiliser la fonction à l'intérieur d'un bloc de code (ou d'une autre fonction). Cet appel est fait de la manière suivante :

Syntaxe
```js
NomDeLaFonction(...paramètres);
```

En JavaScript, le nom de la fonction, sans les parenthèses, représente l'objet de type fonction. Une fonction peut donc recevoir en paramètre une autre fonction. L'appel se distingue de l'objet par l'utilisation des parenthèses. 
> Ceci est très important à retenir puisqu'il arrivera souvent qu'on passera une fonction en paramètre à une autre, notamment comme fonction de rappel (*callback*), d'une fonction de traitement comme dans le cas de l'itérateur `forEach(fn)` ou bien dans le cas d'un gestionnaire d'événement. 

# Valeur de retour
Une fonction peut recevoir des valeurs sous forme de paramètres, mais elle peut aussi retourner une valeur. Le mot-clé `return` est utilisé pour définir la valeur à retourner.

Exemple :
```js
// Fonction "incremente" avec le paramètre x
function incremente (x) {
    let resultat = x + 1;
    return resultat; // Retourne la valeur du paramètre + 1`
}
```

Une fonction ne peut retourner qu'une seule variable. Pour retourner plusieurs valeurs, il faut placer ceux-ci dans un tableau ou un objet.
> Bien qu'il soit possible de le faire, il est généralement recommandé de ne mettre qu'une seule instruction `return` dans la fonction. 

# Portée des variables dans les fonctions
Les variables définies dans les fonctions ont une portée restreinte dans le code. À moins de définir globalement une variable, celle-ci n'est pas accessible à l'extérieur de sa fonction ou bien dans une fonction où elle n'est pas définie.

Dans le code source suivant, la variable possède deux valeurs distinctes :
```js
function portee() { 
    let a = 1;
    a; //=> 1
}

let a = 2;

portee();
a; //=> 2;
```
Dans ce cas, la variable `a` est définie à deux endroits distincts et possède deux valeurs. En fait et bien qu'aillant le même identifiant `a`, la variable dans la fonction et celle à l'extérieur ne sont pas les mêmes. Celle qui est définie dans la fonction n'existe que durant l'exécution de la fonction et n'est pas accessible à l'extérieur de celle-ci. Même chose pour celle définie à l'extérieur de la fonction, elle n'est pas accessible dans la fonction.

# Utilisation avancée des fonctions
JavaScript admet plusieurs façons pour travailler avec les fonctions ainsi que pour les définir. Puisque les fonctions sont aussi des objets, elles peuvent être définies comme les autres types et assignées à des variables. Cette possibilité sera fréquemment utilisé pour définir des méthodes d'une classe personnalisée [voir section
Programmation orientée objet](Lien). 

À l'aide du mot-clé `function` et de l'opérateur d'assignation `=`, il est possible de définir une fonction de la même manière que lorsqu'on assigne une valeur à une variable.

Exemple :
```js
// La variable maFonction contient le code de la fonction
let maFonction = function(a,b) { return a*b; };
let resultat = maFonction(2, 4); 
console.log(resultat);             // =>8
```
Il faut noter le point-virgule à la fin de l'instruction qui n'apparait pas dans la définition traditionnelle d'une fonction. Afin d'accroître la lisibilité du code, la fonction peut aussi être définie sur plusieurs lignes et n'a pas à être écrite sur une seule. 

Exemple :
```js
// La variable maFonction contient le code de la fonction`
let maFonction = function(a,b) {
    return a*b;
};
```

Comme une variable, la fonction peut aussi être copiée d'une variable à une autre. Dans le cas d'une fonction définie de manière traditionnelle, le nom de la fonction est utilisée comme nom de variable.

Exemple :
```js
autreFonction = maFonction;
maFonction(2, 4); // =>8
autreFonction(2, 4); // =>8
```

La fonction peut aussi être assignée à une propriété d'un objet, elle sera alors appelée une méthode. Elle aura accès avec le mot-clé `this` aux propriétés de l'objet.

Exemple :
```js
let o = {
    m: function (a, b) {       // Le mot clé this fait référence à l'objet sur lequel l'appel est fait.
                    this.x += a; // Ajoute la valeur de a à la propriété x
                    this.y += b; // Ajoute la valeur de b à la propriété y
                    },
    y: 0,
    x: 0
};

o.x = 50;
o.y = 10;

o.m(10, 5); // Appel de la méthode m sur l'objet o`
o.x; // => 60
o.y; // => 15
```


# Exercices sur les fonctions
À venir (ou pas)


# Sources additionnelles
* [Les fonctions \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/function)



