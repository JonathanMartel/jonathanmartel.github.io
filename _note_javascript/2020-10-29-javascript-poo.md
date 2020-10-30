---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-poo
title: "Programmation orientée objet"
path: 2020-10-29-javascript-poo.md
tag: js
status: publish
has_children: true
toc: javascript-note
order: 5
collection: note_javascript
   
---

La programmation orientée objet est un paradigme de programmation qui a été défini au tournant des années 1960. On le distingue habituellement de la programmation procédurale, composée d'une longue liste d'instructions contenues dans diverses fonctions. Le modèle de la programmation orientée objet consiste à faire interagir ensemble des
entités de codes, appelés objet, qui regroupe des données, mais aussi des opérations spécifiques à l'objet. Dans ce contexte, un objet représente une entité conceptuelle ou physique tel qu'un usager, un livre ou tout autre élément, selon le contexte du programme. La POO repose sur trois principes fondamentaux : l'encapsulation, l'héritage et le polymorphisme.

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>
# Introduction aux concepts principaux de la programmation orientée (POO)
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

## Le JavaScript comme langage de programmation orientée basé sur les prototypes
Le JavaScript est un langage de programmation orientée basé sur les prototypes, un type de programmation orientée objet. La particularité de ce type est d'utiliser les instances d'objet comme modèle (prototype) afin d'instancier les autres objets du même type. Donc au lieu de définir des classes qui doivent être instancié, l'instance de l'objet devient lui-même le modèle qui permet sa reproduction. Ceci a pour conséquence de permettre, notamment, de redéfinir l'objet, donc le modèle, tout au long du déroulement du programme. Il est alors dit mutable tandis que la classe est statique. Un des revers de cette possibilité est la syntaxe particulière de ce type de langage. Les mécanismes d'héritage ou bien la définition du contrôle d'accès (privé vs public) devient plus difficile. 
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

### L'accès à soi-même, le mot-clé `this`
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

Dans le premier cas, l'objet module contient un prototype donc il peut être instancié. Il devrait être utilisé dans des cas où l'on doit déclarer plusieurs objets de ce type. Dans le deuxième cas, monModule est déjà instancié et il ne contient pas de prototype. Il doit être privilégié quand un seul objet de ce type doit être créé, tel que dans un objet qui contiendrait des méthodes utilitaires (exemple : jQuery).


# Stratégies et astuces de travail avec les tableaux



# Exercices sur les tableaux



# Sources additionnelles
* [Classe - JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)



