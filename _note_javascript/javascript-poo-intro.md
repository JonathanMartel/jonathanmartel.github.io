---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-poo
title: "La POO : les bases"
path: javascript-poo-intro.md
date: "2022-08-16"
tag: js
status: publish
toc: javascript-note
order: 30
collection: note_javascript
   
---

La programmation orientée objet est un paradigme de programmation qui a été défini au tournant des années 1960. On le distingue habituellement de la programmation procédurale, composée d'une longue liste d'instructions contenues dans diverses fonctions. Le modèle de la programmation orientée objet consiste à faire interagir ensemble des entités de codes, appelés objet, qui regroupe des données, mais aussi des opérations spécifiques à l'objet. Dans ce contexte, un objet représente une entité conceptuelle ou physique tel qu'un usager, un livre ou tout autre élément, selon le contexte du programme. La POO repose sur trois principes fondamentaux : l'encapsulation, l'héritage et le polymorphisme.

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

# Introduction aux concepts principaux de la programmation orientée objet (POO)

Afin d'introduire la POO en Javascript, je vous propose de faire une détour par des concepts plus généraux qui s'applique de manière spécifique dans la majorité des langages de programmation orientés objets. 
## Trois principes fondamentaux en programmation orientée objet (général)
Le premier principe de la POO est celui d'**encapsulation**. Contrairement aux langages procéduraux qui définissent des données (variables) et des procédures pour traiter ces données (fonction), l'encapsulation réfère au principe d'enfermer dans une même entité à la fois les données et les procédures de traitement. Ce qui permet de cacher tous les rouages internes du traitement des données, mais de laisser certaines données et procédures accessibles à l'extérieur de l'objet.

Le second principe est celui d'**héritage**. L'héritage permet de transmettre certaines caractéristiques entre les entités qui partagent des caractéristiques communes. Ainsi, les entités peuvent hériter les unes des autres selon le même principe que l'on retrouve dans le taxonomie, comme le classement des familles d'être vivant. Ainsi la classe des mammifères hérite des caractéristiques du règne des animaux, mais ajoute quelques caractéristiques. Les carnivores sont un ordre de mammifère. Ils héritent donc des caractéristiques jumelées des animaux et des mammifères, mais ont leurs propres propriétés, etc. L'objet chat hérite donc des propriétés jumelées des félins, des carnivores, des mammifères et des animaux. Dans le cadre de la programmation, une objet "usager administrateur" et un objet "usager client" hérite des caractéristiques communes d'un objet "usager", mais chacun d'eux définissent des caractéristiques et des fonctionnalités spécifiques.  

Le troisième principe est celui de **polymorphisme**. Le polymorphisme décrit la capacité d'un objet qui hérite des méthodes de ses ancêtres de modifier cette dernière ou bien d'appeler la méthode du parent. Un objet parent pourra définir une méthode générale et en faire hérité ses enfants, mais ceux-ci pourront redéfinir pour eux-mêmes cette méthode. Par exemple, si un objet de Bateau et un Objet Voiture hérite de la méthode `SeDéplacer()` de l'objet Véhicule, il faut que Bateau et Voiture puissent redéfinir cette méthode afin de l'adapter à leur caractéristique. Pour reprendre l'exemple de l'héritage entre un objet "Usager" et un objet "Usager administrateur", nous pourrions redéfinir la méthode `SeConnecter()` pour y mettre des éléments de vérification sécuritaire supplémentaire.

## Classes, objets, méthodes et propriétés
Les **classes** sont des modèles d'entité qui permettront de créer des instances d'objets. Une classe définie l'ensemble des comportements et des données que possèdera l'objet créé à partir de celle-ci. Une classe définie des fonctions et des variables qui peuvent être accédées uniquement par l'objet lui-même ou bien par les autres objets. Les variables internes sont des caractéristiques privées de l'objet qui n'ont pas d'existence publique, c'est-à-dire que ces variables ne peuvent être lues ou modifiées directement par d'autres objets. Une classe qui définirait une personne, par exemple, pourrait avoir comme variable privée le nombre de litre de sang. C'est une information nécessaire pour l'objet, mais elle n'est pas publique et ne peut être modifiée directement.

Un **objet** est une instance d'une classe. C'est une entité ayant un rôle précis qui a une existence et un rôle bien défini. Un objet contient les variables et les fonctions qui ont été définies par la classe duquelle il a été créé. Deux objets ayant la même classe partagent les mêmes variables et les mêmes fonctions, mais sans partagé les valeurs. Chaque objet enregistre et modifie ses propres valeurs.

Une **méthode** est une fonction qui appartient à un objet. Les méthodes décrivent donc les divers comportements des objets. L'approche orientée objet place donc à l'intérieur même des entités, les comportements spécifiques de chaque objet. Les méthodes peuvent être uniquement internes à l'objet ou privée ou bien accessible à d'autres objets, donc publique.

Une **propriété** est une variable qui appartient à un objet. Celle-ci contient habituellement des données qui permettent de gérer l'objet. Ces propriétés peuvent être publiques, donc disponibles directement aux autres objets, ou bien privées, réservées à l'usage unique de l'objet à laquelle elles appartiennent.

## Le JavaScript comme langage de programmation orientée prototype
Le JavaScript est un langage de programmation orientée prototype, un type de programmation orientée objet. La particularité de ce type est d'utiliser les instances d'objet comme modèle (prototype) afin d'instancier les autres objets du même type. Donc au lieu de définir des classes qui doivent être instancié, l'instance de l'objet devient lui-même le modèle qui permet sa reproduction. Ceci a pour conséquence de permettre, notamment, de redéfinir l'objet, donc le modèle, tout au long du déroulement du programme. Il est alors dit mutable tandis que la classe est statique. Un des revers de cette possibilité est la syntaxe particulière de ce type de langage. Les mécanismes d'héritage ou bien la définition du contrôle d'accès (privé vs public) devient plus difficile. 
> Bien qu'il soit possible de définir des classes en JavaScript, au sens strict, le langage demeure orienté prototype et la syntaxte des classes n'est qu'un "sucre syntaxique" qui rend l'écriture des objets plus facile ([voir section Définition des classes](#)). 

# Définition des objets
JavaScript admet plusieurs façons de créer un objet en fonction des besoins du programme : les objets littéraux, les prototypes (avec et sans constructeur) et les "classes". Nous verrons chacune de ces méthodes dans les sections suivantes. 

## Les objets littéraux
Les objets littéraux sont le type d'objet le plus simple à créer et le plus fréquemment utilisé. Un objet littéral est un objet sans prototype qui peut être modifié dynamiquement, c'est-à-dire qu'il admet l'ajout et la modification de ses propriétés et des valeurs de ses propriétés tout au long du déroulement de l'application. Les objets littéraux servent principalement de structure de données. C'est d'ailleurs sur ce modèle que le format JSON (JavaScript object notation) fut établi. 

### Déclaration
La création d'un objet littéral se fait selon la syntaxe suivante : 
```js
let nomObjet = {
    prop1 : val1,
    prop2 : val2
};
```
L'objet peut posséder plusieurs propriétés. Chaque propriété doit être séparée par une virgule (`,`). Le nom de la propriété est soumis aux mêmes règles que celui des variables, c'est-à-dire comporter des caractères alphanumériques et certains caractères spéciaux (`_`, `$`, etc). Les propriétés peuvent être défini en utilisant d'autres caractères que ceux des variables tels que `-`, `☠️`, un espace, etc. Dans ce cas, le nom de la propriété doit être placé entre guillemet (`"` ou `'`). Notez que bien que possible cette pratique n'est pas recommandée.

Exemple :
```js
let livre = {
    nombreDePage : 300,         // Valide et recommandé (Claire et facile)
    "nombre de page":300,       // Valide, mais pas recommandé
    "nombre-de-page" : 300,     // Valide, mais pas recommandé 
};
```
### Accès aux propriétés
Tout comme dans les tableaux, les éléments d'un objet littéral peut être lu et modifié en tout temps durant le déroulement du programme. L'accès aux éléments se fait selon la syntaxe montrée dans les exemples suivants :
```js
livre.nombreDePage = 200;           // Assignation d'une valeur à la propriété "nombresPage" de livre
let page = livre.pageActuelle;      // Lecture de la valeur à la propriété "pageActuelle" de livre
```
Il est aussi possible d'accéder (lecture ou écriture) aux propriétés d'un objet littéral en utilisant une syntaxe similaire à celle des tableaux. Cette syntaxe devient obligatoire quand le nom des propriétés ne respect pas la syntaxe des variables.

Exemple :
```js
// Les deux lignes suivantes sont équivalentes
livre.nombreDePage;     
livre["nombreDePage"];

// Seule syntaxe permise pour accéder à la propriété "nombre de page".
livre["nombre de page"];
```
Ce type d'objet peut être utilisé pour simuler un tableau associatif (en PHP), type non défini par l'API de JavaScript. Ce type de tableau permet d'utiliser des indexes alphanumériques et non simplement numérique. Donc, au lieu de structurer un tableau en utilisant une règle numérique pour y déposer des données spécifiques, on utilisera des indexes alphabétiques, beaucoup plus significatifs.

Exemple :
```js
let oUsager = {
    nom: "Martel",
    prenom : "Jonathan",
    courriel : "jmartel@cmaisonneuve.qc.ca"
};

oUsager['prenom'];  // => "Jonathan"
oUsager.prenom;     
```
### Déclaration de "méthodes"
Un objet littéral peut aussi contenir des méthodes. Le JavaScript ne défini pas de manière formelle pour définir ces méthodes. Une méthode sera donc une propriété à laquelle on assignera une fonction. Celle-ci peut être une fonction avec une déclaration complète ou bien un fonction anonyme. Il est plutôt courant d'utiliser une fonction anonyme afin de faciliter la lecture et la réutilisation du code.

La création d'une méthode dans un objet littéral se fait selon la syntaxe suivante :
```js
let nomObjet = {
    methode1: function(param, param, etc) {
        //Instructions...
    }
};
```
Tout comme pour une fonction (anonyme ou non), la méthode peut avoir des paramètres et retourner une valeur.

### L'accès à soi-même, le mot-clé *this*
Une méthode se définie comme une fonction qui produit une action sur son objet. La méthode doit donc posséder une manière pour référer à son objet et aux diverses propriétés de celui-ci. Le mot-clé `this` permet spécifiquement d'accéder à l'objet sur lequel s'applique la méthode. L'exemple suivant montre comment une méthode peut accéder et modifier les propriétés de son objet.

Exemple :
```js
let livre = {
    nombrePage:300,
    pageActuelle:1,
    auteur: "John Doe",
    avancePage: function () {
        if(this.pageActuelle < this.nombrePage) {
            this.pageActuelle++;
        }
    },
    reculePage: function () {
        if(this.pageActuelle>0) {
            this.pageActuelle--;
        }
    }
};
```

### Les limites des objets littéraux
Les objets littéraux sont très utiles afin de représenter et de manipuler des données rapidement et efficacement. Cependant, leur structure ne permet pas facilement leur reproduction (donc l'instanciation) de plusieurs copies. Dans l'exemple de l'objet `livre`, il faudrait définir plusieurs fois les mêmes méthodes et les mêmes propriétés pour chacun des livres dans le programme. Cette structure est donc limitée.

## Définition simple par prototype
La définition des objets par prototype permet de concevoir un modèle d'objet, le prototype, dont on peut créer des instances possédant les mêmes propriétés et méthodes. De plus, il est possible de définir un constructeur pour le prototype de l'objet. Le constructeur est une fonction qui est appelée automatiquement à la création d'une instance de l'objet et permet de fixer certaines valeurs initiales. Le constructeur, comme les autres méthodes, peut prendre plusieurs paramètres.

### Définition de l'objet avec son constructeur
Dans un premier temps, il faut définir un constructeur pour l'objet que l'on veut créer. Ce constructeur doit être une fonction. Cette fonction peut être vide ou non et recevoir des paramètres. Le nom de la fonction "constructeur" deviendra le nom du modèle d'objet.

Syntaxe :
```js
function NomObjet([param]) {

}
```

### Définition des méthodes
Une fois le constructeur défini, il est possible de définir les méthodes de l'objet. Les fonctions qui serviront de méthodes seront affectées à des propriétés de l'objet prototype. Pour ce faire, il existe 2 syntaxes. La première redéfinie l'ensemble des propriétés de l'objet prototype et la seconde ajoute les nouvelles méthodes sans affecter les autres méthodes précédemment définies.

Syntaxe 1 :
```js
// Prototype de l'objet Portee
NomObjet.prototype = {
    methode1: function () { // Méthode
        // Instruction
    }, 
    methode2: function () { // Méthode
        // Instruction
    }
};
```
Syntaxe 2 :
```js
// Prototype de l'objet Portee
NomObjet.prototype.methode1 = function () {// Méthode
    // Instructions
};

NomObjet.prototype.methode2 = function () {// Méthode
    // Instructions
};
```
### Instanciation d'un objet
Une fois le prototype de l'objet complété, il est possible de créer une instance de l'objet. Chaque instance sera indépendante et conservera ses propres valeurs.

Exemple :
```js
// Constructeur qui attend deux paramètres
function Portee(nbDebut, nbFin) {
    this.debut = nbDebut;       // Propriété debut
    this.fin = nbFin;           // Propriété fin
}

//Définition des méthodes du prototype de Portee2
Portee.prototype.inclus = function (x) {    
    return this.debut <= x && x<= this.fin;
};

// Méthode toString retourne une chaine composé des valeurs du début et de fin
Portee.prototype.toString = function() {
    return "De " + this.debut + " à " + this.fin;
};

let p1 = new Portee(10, 100);   // Instanciation d'un objet Portee
p1.inclus(58);                  // => true
p1.inclus(5);                   // => false
console.log(p1);                // => "De 10 à 100";
let p2 = new Portee(5, 50);     // Instanciation d'un objet Portee
p2.inclus(58);                  // => false
p2.inclus(5);                   // => true
console.log(p2);                // => "De 5 à 50";
```

## Manipulation des objets
Certains objets ou certains types en JavaScript doivent être traités différemment en JavaScript. Ceci s'applique particulièrement lorsque l'on veut copier, passer en paramètre ou comparer des objets entre eux. Les objets littéraux ou avec un prototype sont des types dont la valeur est manipulée par référence et non par copie. La variable qui contient l'objet n'est pas l'objet lui-même, mais une référence à celui-ci. Ainsi donc, si un objet contenu dans la variable `a` est assigné à la variable `b`, les deux variables contiendront le même objet et non chacun une copie de l'objet. Par ailleurs, cette propriété s'applique aussi aux tableaux qui ne peuvent être comparés directement, ni copiés par affectation.

### Comparaison des objets
Les objets ne sont pas comparables par valeurs. Même s'ils possèdent les mêmes propriétés avec les mêmes valeurs (incluant les méthodes), deux objets ne sont jamais identiques.

Exemple :
```js
let o = {x:0, y:0};
let p = {x:0, y:0};
console.log(o == p); //=> false
```
### Copie des objets
Puisque les objets sont définis par référence, leur copie se fait aussi par référence. Si l'opérateur d'assignation (`=`) procède par copie lorsque l'on assigne une chaine de caractère ou une valeur numérique, lorsqu'il s'agit d'objet ce n'est pas aussi simple.

Exemple :
```js
let p = {x:1};  // Crée un objet avec une propriété x défini à 1
let o = p;      // Copie la référence de p dans o
p.x = 2;        // Modifie la propriété x dans l'objet p
o.x;            //=>2   La valeur de l'objet o est aussi modifié
```

### Vérifier l'existence d'une propriété
Dans plusieurs cas, il peut être important de vérifier l'existence d'une propriété avant d'essayer de lire sa valeur. Pour ce faire, il faut utiliser l'opérateur in. Celui-ci retourne true si la propriété existe dans l'objet et false, si elle n'existe pas.

Exemple :
```js
let o = {x:0};
"x" in o;           //=> true
"y" in o;           //=> false
"toString" in o;    //=> true
```
Il n'est toutefois pas toujours nécessaire d'utiliser cet opérateur pour vérifier l'existence d'une propriété. Il est possible de le faire en vérifiant que la propriété n'est pas `undefined` avec un opérateur de stricte différence (`!==`). Le seul cas où cela sera impossible est si une propriété est définie à `undefined`.

Exemple :
```js
let o = {x:0, y:undefined};
"x" !== undefined;          //=> true
"y" !== undefined;          //=> false
```

## Définition d'un objet avec le mot-clé *class*
Si Javascript demeure une langage de programmation objet par protoype, la syntaxe moderne du langage admet une écriture des objets sous forme de classe. Dans les faits, il s'agit d'un sucre syntaxique qui produit la même chose qu'un prototype, mais qui rend la syntaxe plutôt similaire à ceux des autres langages de programmation orientée objet. 

### Définition d'une classe et de son constructeur
C'est avec le mot-clé `class` que l'on viendra définir une classe.

Syntaxe :
```js
class NomClasse {

}
```
Vous remarquerez que l'on est très proche de la syntaxe des fonctions vue précédemment. Par contre, dans la déclaration de classe, nous devrons définir le constructeur explicitement. Le constructeur est optionnel. 

Syntaxe :
```js
class NomClasse {
    constructor([params]){}
}
```

### Définition des méthodes
Les méthodes sont définis de la même manière que le constructeur, directement dans le bloc de la classe, sans l'usage du mot-clé `function`. De la même manière que des fonctions, on pourra y définir des paramètres selon les opérations à effectuer.

Syntaxe :
```js
// Prototype de l'objet Portee
class NomObjet  {
    constructor (){}

    methode1 ([params]) { // Méthode
        // Instruction
    }

    methode2 ([params]) { // Méthode
        // Instruction
    }
};
```




# Stratégies et astuces de travail avec les objets
à venir


# Exercices sur les objets
à venir


# Sources additionnelles
* [Classe - JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)



