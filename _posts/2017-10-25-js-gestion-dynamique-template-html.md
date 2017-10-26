---
layout: post
permalink: /js-gestion-dynamique-template-html
title: "Gestion de template en javascript"
path: 2017-10-25-js-gestion-dynamique-template-html.md
tag: js
status: publish
---

Cet article montre des techniques pour gérer la création dynamique d'HTML en JavaScript (vanille). Premièrement, l'article porte sur l'ajout de gestionnaire d'événement de manière dynamique. Deuxièmement, nous verrons plusieurs techniques de génération de contenu dynamique sans l'utilisation d'une librairie externe. Finalement, nous remanierons le code source de manière à introduire la programmation fonctionnelle en remplaçant les boucles `for` par les `forEach` et proposerons une version ES6 du même code.

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

### Attacher des gestionnaires d'événement dynamiquement
D'abord, je vous propose de voir les stratégies qui permettront d'attacher des gestionnaires d'événement dynamiquement sur les éléments du DOM. Ces exemples s'appliquent à des situations où une structure HTML se répète un nombre indéterminé de fois et que plusieurs gestionnaires d'événement doivent y être attaché. Il va sans dire qu'il existe plusieurs stratégies pour répondre à ce problème, les stratégies choisies ne le sont pas pour des raisons de performance, mais pour des raisons pédagogiques. 

Dans un premier temps, le HTML sera intégré directement dans le code source afin de faciliter le développement. Ensuite, le code sera ajusté pour tenir compte d'une création dynamique du contenu HTML.

Le code HTML suivant affiche des "cartes" avec des informations statiques, mais celles-ci pourraient provenir d'une source externe. 

<iframe width="100%" height="400" src="//jsfiddle.net/JonathanMartel/mmotvpee/7/embedded/html,css,result/" frameborder="0"></iframe>

#### Parcourir les éléments DOM
Voyons maintenant comment parcourir les éléments DOM pour y attacher les gestionnaires d'événement. D'abord, il faut récupérer un tableau des éléments HTML.
```js
var lesCartes = document.querySelectorAll(".carte");
```
Ensuite, il est possible d'ajouter des gestionnaires d'événement en parcourant le tableau avec une boucle `for()`. Pour cette exemple, on ajoutera des listeners qui ajouteront et retireront la classe `enter`.
```js
var lesCartes = document.querySelectorAll(".carte");    // Sélecteur de carte
for(var i=0; i<lesCartes.length; i++){                  // Pour toutes les cartes trouvées
    lesCartes[i].addEventListener("mouseenter", function(evt){  // Attache la fonction anonyme et recueille le paramètre de type MouseEvent
        evt.target.classList.add("enter");      // Manipulation des classes avec l'api ClassList
    });
    lesCartes[i].addEventListener("mouseleave", function(evt){
        evt.target.classList.remove("enter");
    });
}
```
#### Accès aux éléments enfants
La prochaine étape permettra d'ajouter des écouteurs d'événement sur les liens des boutons d'action (balise `<a>`).
```js
var lesCartes = document.querySelectorAll(".carte");    // Sélecteur de carte
for(var i=0; i<lesCartes.length; i++){                  // Pour toutes les cartes trouvées
    lesCartes[i].addEventListener("mouseenter", function(evt){  // Attache la fonction anonyme et recueille le paramètre de type MouseEvent
        evt.target.classList.add("enter");      // Manipulation des classes avec l'api ClassList
    });
    lesCartes[i].addEventListener("mouseleave", function(evt){
        evt.target.classList.remove("enter");
    });
    
    // Récupère les boutons d'une carte. Le querySelectorAll() cherche à partir du parent. Il retournera donc
    // seulement les 2 boutons de chaque carte.
    var btnActions = lesCartes[i].querySelectorAll(".action < a");  
    for(var j=0; j<btnActions.length;j++)
    {
        btnActions[j].addEventListener("click", function(evt){
            evt.target.classList.toggle("action"+j);
        });
    }
}
```
Oups, le code ne produit pas le résultat recherché. Lorsque le bouton est cliqué, la classe `"action2"` est ajoutée sur le `<a>`. La raison est simple. Au moment de la déclaration de la fonction (en raison de la closure), celle-ci a accès à la variable `j`, mais pas à sa valeur dans la boucle. Après la boucle `for` le `j` vaut 2 et lors de l'appel, `"action"+j`, `j` vaut donc 2. Pour régler ce problème, nous pouvons passer par une IIFE. Celle-ci deviens alors un Factory, c'est-à-dire une fonction qui construit une autre fonction (dans ce cas). Ici la IIFE retourne une nouvelle fonction à chaque boucle. Le paramètre `j` conserve alors sa valeur pour la fonction retournée.
```js
btnActions[j].addEventListener("click", (function(valeur_j){
    return function(evt){
        evt.target.classList.toggle("action"+valeur_j);
    }
})(j) );
```
> Pour plus de détails sur les IIFE et les closures, vous pouvez lire l'excellent article de [Ben Alman](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)

Le résultat peut être testé ici : 

<iframe width="100%" height="400" src="//jsfiddle.net/JonathanMartel/mmotvpee/11/embedded/" frameborder="0"></iframe>
Une fois les gestionnaires d'événement attachés, ne reste qu'à générer dynamique le contenu.

### Création dynamique de contenu HTML
Dans cette partie, nous aborderons des techniques pour générer du HTML dynamiquement, y ajouter des gestionnaires d'événements (*Event listener*) et y insérer du contenu provenant d'une source externe (requête XHR, JSON, tableau statique, etc). Afin de simplifier l'exemple, nous utiliserons des données qui se trouve directement dans une variable globale.

#### Générer des données "bidons"
Pour les données générées dynamiquement suivantes :
```js
var donnees = [];
for(var k=0; k<5; k++)
{
    donnees.push({
        titre:"Allo le monde "+k,
        soustitre : "Sous-titre de allo le monde "+k,
        description : "Lorem ipsum...."+k
    });
}
```
> La sursimplification des données n'a pour but que de produire des données variées et simples qui permettent de se concentrer sur le code source. Il existe des [générateurs de données](https://next.json-generator.com/) qui permettent de travailler avec des données plus complètes.

À partir de ces données, il faut maintenant insérer le contenu en HTML.
```js
var catalogue = document.querySelector(".catalogue");       // Récupère le main.catalogue
for(var k=0; k<donnees.length;k++){
    // Insère les éléments HTML comme des chaines de caractère en y insérant les éléments du tableau de données.
    catalogue.innerHTML +=  '<article class="carte produit">'+  
                                '<h2>'+donnees[k].titre+'</h2>'+
                                '<h3>'+donnees[k].soustitre+'</h3>'+
                                '<section class="action">'+
                                    '<a href="#">Action 1</a>'+
                                    '<a href="#">Action 2</a>'+
                                '</section>'+
                            '</article>';
  }
```
Vous pouvez tester le code ici :
<iframe width="100%" height="400" src="//jsfiddle.net/JonathanMartel/mmotvpee/15/embedded/" frameborder="0"></iframe>
#### Optimisation de la solution
Bien que fonctionnel, le code mériterait un remaniement du code (*refactoring*). 

#### Remaniement du code (*refactoring*)
D'abord, remplaçons les boucles par des `forEach()`.
<iframe width="100%" height="400" src="//jsfiddle.net/JonathanMartel/mmotvpee/16/embedded/" frameborder="0"></iframe>
En plus de rendre le code plus lisible et de réduire le nombre de variables utilisées (`i`,`j` et `k`), le remaniement nous permet de se débarasser de la IIFE. Celle qui servait à factoriser le gestionnaire d'événement sur les boutons d'action. En effet, la boucle `forEach`, en plus de donner en paramètre l'élément du tableau, passe comme second paramètre l'index du tableau.

### Gérer le code HTML à l'aide d'un gabarit.
Maintenant, il reste un problème. L'intégration du HTML directement dans le code JavaScript n'est pas une bonne pratique. En effet, il sera alors difficile de modifier la structure ultérieurement et de maintenir le code. Il serait intéressant de trouver une solution alternative qui permettrait de sortir le code de la "carte" et de laisser la structure dans le document HTML. C'est notamment le rôle de l'élément [`<template>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/template).

#### Utilisation des &lt;template&gt; 
Dans un premier temps, nous allons utiliser un template pour produire le même contenu HTML plusieurs fois. Ensuite, nous developperons, de manière simple, un mini-système de gestion des gabarits (à la manière de [mustache](https://github.com/janl/mustache.js)).

Premièrement, il faut définir le template. Dans le fichier index.html, nous ajouterons 
```html
<template id="modeleCarte">
  <article class="carte">
    <h2>Titre</h2>
    <h3>Sous-titre</h3>
    <section class="action">
      <a href="#">Action 1</a>
      <a href="#">Action 2</a>
    </section>
  </article>
</template>
```
> La balise template sert à déposer une structure HTML qui n'est pas apparente. Elle devra être clonée pour ensuite être insérée dans le DOM.

Le code suivant permet de récupérer le modèle de carte dans le `<template>`. Ensuite, pour chaque article, il faut créer un clone et l'insérer dans le DOM (ici dans `main.catalogue`). Le clone doit être inséré après l'avoir importé avec la méthode [`document.importNode`](https://developer.mozilla.org/fr/docs/Web/API/Document/importNode). L'importation du noeud est ici nécessaire puisque le contenu du template est considéré comme un document externe.
```js
var modele = document.getElementById("modeleCarte");
var catalogue = document.querySelector(".catalogue");
donnees.forEach(function(article) {
    var carte = modele.cloneNode(true);
    catalogue.appendChild(document.importNode(carte.content, true))
});
```
<iframe width="100%" height="400" src="//jsfiddle.net/JonathanMartel/mmotvpee/18/embedded/" frameborder="0"></iframe>

#### Création d'un moteur de gabarit
Il faut maintenant créer une système qui permet d'insérer le contenu du tableau de données dans les gabarits. Pour ce faire, nous allons utiliser une syntaxe similaire à celle de l'engin de gabarit [mustache](https://github.com/janl/mustache.js). Nous allons insérer le nom de la propriété dans le template avec un préfixe et un suffixe que l'on ne retrouve pas normalement dans le code HTML ou dans un texte. Ce marquage nous permettra par la suite de remplacer les occurences du nom des propriétés par leur valeur.
```html
<template id="modeleCarte">
  <article class="carte">
    {% raw  %}<h2>{{titre}}</h2>
    <h3>{{soustitre}}</h3> {% endraw  %}
    <section class="action">
      <a href="#">Action 1</a>
      <a href="#">Action 2</a>
    </section>
  </article>
</template>
```

Une fois le template adapté, nous devons ajouter le code qui permet de remplacer le nom des variables par les valeurs correspondantes.
```js
var carte = modele.cloneNode(true);
for (var cle in article){       // Pour chaque propriété des articles (provenant du tableau de données)
    carte.innerHTML = carte.innerHTML.replace("\{\{" + cle + "\}\}", article[cle]);
}
```
<iframe width="100%" height="400" src="//jsfiddle.net/JonathanMartel/mmotvpee/19/embedded/" frameborder="0"></iframe>
Maintenant, nous avons réglé la majorité des problèmes en créant un mini-système de gestion des gabarits!


### Et ES6 ?
Pour le plaisir, vous trouverez une version du même code en ES6. Ce dernier utilise [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) et les [*arrows functions*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). Notez que le code pourrait ne pas fonctionner avec l'ensemble des navigateurs.
<iframe width="100%" height="400" src="//jsfiddle.net/JonathanMartel/mmotvpee/20/embedded/" frameborder="0"></iframe>





### Sources :
* [https://github.com/janl/mustache.js](https://github.com/janl/mustache.js)
* [https://developer.mozilla.org/fr/docs/Web/API/Document/importNode](https://developer.mozilla.org/fr/docs/Web/API/Document/importNode)
* [https://developer.mozilla.org/fr/docs/Web/HTML/Element/template](https://developer.mozilla.org/fr/docs/Web/HTML/Element/template)
* [https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach)
* [http://benalman.com/news/2010/11/immediately-invoked-function-expression/](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
* [https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions/Fonctions_fl%C3%A9ch%C3%A9es](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions/Fonctions_fl%C3%A9ch%C3%A9es)
