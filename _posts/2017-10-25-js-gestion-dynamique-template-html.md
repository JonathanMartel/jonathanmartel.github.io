---
layout: post
permalink: /js-gestion-dynamique-template-html
title: "Gestion de template en javascript"
path: 2017-10-25-js-gestion-dynamique-template-html.md
tag: js
status: draft
---

Ce petit article couvre des techniques de bases pour gérer la création dynamique d'HTML en JavaScript (vanille). 


<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

### Attacher des gestionnaires d'événement dynamiquement.
D'abord, je vous propose de voir les stratégies qui permettront d'attacher des gestionnaires d'événement dynamiquement sur les éléments HTML. Ces exemples s'appliquent à des situations où une structure HTML se répète un nombre indéterminé de fois et que plusieurs gestionnaires d'événement doivent y être attaché. Il va sans dire qu'il existe plusieurs stratégies pour répondre à ce problème, les stratégies choisies ne le sont pas pour des raisons de performance, mais pour des raisons pédagogiques. 

Dans un premier temps, le HTML sera intégré directement dans le code source afin de faciliter le développement. Ensuite, le code sera ajusté pour tenir compte d'une création dynamique du contenu HTML.
Prenons le code HTML suivant. Celui-ci affiche des "cartes" avec des informations qui pourraient provenir d'une source externe. 
<script async src="//jsfiddle.net/JonathanMartel/mmotvpee/7/embed/html,css,result/"></script>

Voyons maintenant comment parcourir les éléments DOM pour y attacher les gestionnaires d'événement. D'abord, il faut récupérer un tableau des éléments HTML.
```js
var lesCartes = document.querySelectorAll(".carte");
```
Ensuite, il est possible d'ajouter des gestionnaires d'événement avec une boucle `for()`. Pour cette exemple, on ajoutera des listeners qui ajouteront et retireront la classe `enter`
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
Oups, le code ne produit pas le résultat recherché, lorsque le bouton est cliqué, la classe "action2" est ajouté sur le `<a>`. La raison est simple, au moment de la déclaration de la fonction elle a accès à la variable `j`, mais pas à sa valeur lors de la déclaration. Après la boucle `for` le `j` vaut 2 et lors de l'appel, `"action"+j` vaut `"action2"`. Pour régler ce problème, nous pouvons passer par une IIFE. 
```js
btnActions[j].addEventListener("click", (function(valeur_j){
    return function(evt){
        evt.target.classList.toggle("action"+valeur_j);
    }
})(j) );
```
> La IIFE retourne une nouvelle fonction à chaque boucle. Le paramètre `j` conserve alors sa valeur pour la fonction retournée.

Le résultat peut être testé ici : 
<script async src="//jsfiddle.net/JonathanMartel/mmotvpee/11/embed/"></script>

Une fois les gestionnaires d'événement attachés, ne reste qu'à générer dynamique le contenu.

### Création dynamique de contenu HTML
Dans cette partie, nous aborderons des techniques pour générer du html dynamiquement, y ajouter des gestionnaires d'événements (Event listener) et y insérer du contenu provenant d'une source externe (requête XHR, JSON, tableau statique, etc). Afin de simplifier l'exemple, nous utiliserons des données qui se trouve directement dans une variable globale.

Pour les données générées dynamiquement suivantes:
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
> La sursimplification des données n'a pour but que de produire des données variées et simple qui permet de se concentrer sur le code source. Il existe des [générateurs de données](https://next.json-generator.com/) qui permettent de travailler avec des données plus complexes.

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
<script async src="//jsfiddle.net/JonathanMartel/mmotvpee/15/embed/"></script>

#### Optimisation de la solution
Bien que fonctionnel, le code mériterait un remaniement du code (*refactoring*). 

D'abord, remplaçons les boucles par des [`forEach()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/forEach). 
<script async src="//jsfiddle.net/JonathanMartel/mmotvpee/16/embed/"></script>
En plus de rendre le code plus lisible et de réduire le nombre de variables utilisées (i,j,k), le remaniement nous permet de se débarasser de la IIFE qui servait à factoriser le gestionnaire d'événement sur les boutons d'action. En effet, la boucle forEach, en plus de donner en paramètre l'élément du tableau, passe comme second paramètre l'index du tableau.

Mantenant, il reste un problème. L'intégration du HTML directement dans le code HTML n'est pas forcément une bonne pratique. Il serait intéressant de trouver une solution alternative qui permettrait de sortir le code de la "carte" et de laisser la structure dans le document HTML. C'est notamment le rôle de l'élément [`<template>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/template).

### Utilisation des &lt;template&gt;
Dans un premier temps, nous allons utiliser un template pour produire le même contenu HTML plusieurs fois. Ensuite, nous developperons, de manière simple, un mini-système de gestion des gabarits (à la manière de [{{ mustache}}](https://github.com/janl/mustache.js)).
> Les templates HTML 
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
> La balise template sert à déposer une structure HTML qui n'est pas apparente. Elle devra être clonée pour ensuite être insérée dans le document HTML.

Le code suivant permet de récupérer le modèle de carte dans le `<template>`. Ensuite, pour chaque article, il faut créer un clone et l'insérer dans le DOM (ici dans `main.catalogue`). Le clone doit être inséré après l'avoir importé avec la méthode [`document.importNode`](https://developer.mozilla.org/fr/docs/Web/API/Document/importNode). Le contenu du template est considéré comme un document externe.
```js
var modele = document.getElementById("modeleCarte");
var catalogue = document.querySelector(".catalogue");
donnees.forEach(function(article) {
    var carte = modele.cloneNode(true);
    catalogue.appendChild(document.importNode(carte.content, true))
});
```
<script async src="//jsfiddle.net/JonathanMartel/mmotvpee/18/embed/"></script>

Il faut maintenant créer une système qui permet d'insérer le contenu du tableau de données dans les gabarits. Pour ce faire, nous allons utiliser une syntaxe similaire à celle de l'engin de gabarit [{{ mustache}}](https://github.com/janl/mustache.js). Nous allons insérer le nom de propriété dans le template avec un préfixe et un suffixe que l'on ne retrouve pas normalement dans le code HTML ou dans un texte.
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
<script async src="//jsfiddle.net/JonathanMartel/mmotvpee/19/embed/"></script>

Maintenant, nous avons réglé la majorité des problèmes en créant un mini-système de gestion des gabarits. 

> Il faut noter que l'utilisation de ES5 est ici voulu. 

### Et ES6 ?
Pour le plaisir, vous trouverez une version du même code en ES6. Ce dernier utilise `let`, `const` et les *arrows functions*. Notez que ce dernier pourrait ne pas fonctionner avec l'ensemble des navigateurs.
<script async src="//jsfiddle.net/JonathanMartel/mmotvpee/20/embed/"></script>





### Sources :
