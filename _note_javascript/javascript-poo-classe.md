---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-poo-classe
title: "Les classes"
path: javascript-poo-classe.md
date: "2022-08-17"
tag: js
status: draft
toc: javascript-note
order: 31
collection: note_javascript
   
---
L’ECMAScript 2015 ou ES6 fait apparaître un ajout syntaxiquement intéressant dans la gestion des objets en JavaScript. Le TC39 ajoute une déclaration de classe qui, sans remplacer l’héritage prototypal et la gestion des objets, simplie leur déclaration. Les classes ES6 sont un ajout syntaxique afin de clarifier l’écriture des objets en JavaScript, mais n’introduit initialement pas de changement majeur à l’héritage prototypal. 

L'utilisation des classes (comme des modules ou des prototype) permet de gérer facilement la portée de nos variables et de protéger l'accès aux diverses méthodes et propriétés de notre application. 



<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

# Les classes en JavaScript
Les classes ES6 ont l'avantage d'offrir une déclaration simple, sans (trop) d'ambiguité. Elles se déclare de manière similaire aux classes d'autres langages de programmation orientée objet. Par contre, elles ont leurs spécificités! 

## Déclaration des classes
Comme nous l'avons vue dans une section précédente, la déclaration des classes se fait en utilisant le mot clé `class` accompagné du nom de la classe. Cette syntaxe admet la déclaration explicite d'un constructeur, de méthodes et de propriétés (avec ou sans valeur initiale). 

Syntaxe de base :
```js
class NomObjet  {
    nomPropriete1 = "";
    nomPropriete2;

    constructor ([params]){

    }

    methode1 ([params]) { // Méthode
        // Instruction
    }

    methode2 ([params]) { // Méthode
        // Instruction
    }
};
```
Le constructeur, comme les méthodes, peuvent être défini avec ou sans paramètre. Le constructeur ne peut pas définir de valeur de retour, mais les méthodes le peuvent. 

## Accès aux propriétés et méthodes dans la classe
À l'intérieur d'une classe, il est possible d'avoir accès aux propriétés ou aux méthodes de l'instance de l'objet en utilisant le mot-clé `this`. Dans une classe ou bien une instance d'objet (à moins d'exception que nous verrons plus loin), le `this` fait référence à l'instance de la classe. Ainsi, s'il existe plusieurs instances d'un objet "Livre", chaque instance aura accès aux propriétés d'elle-même et non des autres instances. L'exemple suivant montre l'accès aux propriétés en utilisant une propriété ou une méthode.

Exemple : 
```js
class Livre  {
    nbPage;         // La déclaration des propriétés publiques est optionnelles
    titre;
    constructor (nbPage, titre){
        this.nbPage = nbPage;   // Assigne les valeurs reçues en paramètre aux propriétés de l'instance de Livre
        this.titre = titre;
    }
    getNbPage(){
        return this.nbPage;
    }
    setNbPage(nbPage){
        this.nbPage = nbPage;
    }
};

const livre1 = new Livre(300, "Livre 1")    // Pour un Livre qui se déclare en fonction du nombre de page et de son titre
const livre2 = new Livre(200, "Livre 2")    // Pour un Livre qui se déclare en fonction du nombre de page et de son titre

let nombrePageL1 = livre1.nbPage;           // => retourne 300 
let nombrePageL1_v2 = livre1.getNbPage();   // => retourne 300 
let nombrePageL2 = livre2.nbPage;           // => retourne 200
let nombrePageL2_v2 = livre2.getNbPage();   // => retourne 300 

livre2.nbPage = 4000;                       // Changement de taille du livre2
nombrePageL2 = livre2.nbPage;           // => retourne 4000
nombrePageL2_v2 = livre2.getNbPage();   // => retourne 4000

livre2.setNbPage (100);                     // Changement de taille du livre2
nombrePageL2 = livre2.nbPage;           // => retourne 100
nombrePageL2_v2 = livre2.getNbPage();   // => retourne 100
```

Dans certains cas (la majorité), il peut être avantageux de protéger l'accès aux propriétés qui sont essentielles à l'objet. Dans le cas précédent, si nous souhaitons que le nombre de page du livre ne puisse être modifié directement ou bien qu'il y ait une validation, il faudrait protéger la propriété nbPage et la rendre privée. C'est ce que la proposition des champs de classes (TC39/proposal-class-fields) a introduit et qui fut adopté progressivement par l'ensemble des navigateurs (2020-2021). 

Exemple : 
```js
class Livre  {
    #nbPage;         // La déclaration des propriétés privées est obligatoire
    #titre;
    constructor (nbPage, titre){
        this.#nbPage = nbPage;   // Assigne les valeurs reçues en paramètre aux propriétés de l'instance de Livre
        this.#titre = titre;
    }
    getNbPage(){
        return this.#nbPage;
    }
    setNbPage(nbPage){
        this.#nbPage = nbPage;
    }
};

const livre1 = new Livre(300, "Livre 1")    // Pour un Livre qui se déclare en fonction du nombre de page et de son titre
const livre2 = new Livre(200, "Livre 2")    // Pour un Livre qui se déclare en fonction du nombre de page et de son titre

let nombrePageL1 = livre1.nbPage;           // => retourne undefined
nombrePageL1 = livre1.#nbPage;              // => retourne SyntaxError
let nombrePageL1_v2 = livre1.getNbPage();   // => retourne 300 

livre2.nbPage = 4000;                       // Changement de taille du livre2 ?
nombrePageL2 = livre2.nbPage;               // => retourne 4000
nombrePageL2_v2 = livre2.getNbPage();       // => retourne 200, la propriété nbPage et #nbPage ne sont pas les mêmes. 

livre2.setNbPage (100);                     // Changement de taille du livre2
nombrePageL2 = livre2.nbPage;               // => retourne 4000
nombrePageL2_v2 = livre2.getNbPage();       // => retourne 100
```
> Il faut expliquer correctement pourquoi ça fait ça!


## Les *Modules* et les Import/Export 




# Stratégies et astuces de travail avec les classes/modules



# Exercices sur les classes/modules



# Sources additionnelles
* [Classe - JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)



